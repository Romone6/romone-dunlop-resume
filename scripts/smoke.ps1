$ErrorActionPreference = "Stop"

$port = 4010
$routes = @("/", "/about", "/projects", "/roles", "/vision", "/contact")

Write-Host "Building production bundle..."
npm run build | Out-Host

Write-Host "Starting Next.js server on port $port..."
$process = Start-Process -FilePath "cmd.exe" -ArgumentList "/c", "npm run start -- -p $port" -PassThru -WindowStyle Hidden

try {
  $maxAttempts = 40
  $attempt = 0
  $ready = $false

  while (-not $ready -and $attempt -lt $maxAttempts) {
    Start-Sleep -Milliseconds 600
    try {
      $health = Invoke-WebRequest -Uri "http://localhost:$port/" -UseBasicParsing -TimeoutSec 5
      if ($health.StatusCode -eq 200) {
        $ready = $true
      }
    } catch {
      $attempt++
    }
  }

  if (-not $ready) {
    throw "Server did not become ready in time."
  }

  foreach ($route in $routes) {
    $response = Invoke-WebRequest -Uri "http://localhost:$port$route" -UseBasicParsing -TimeoutSec 10
    if ($response.StatusCode -ne 200) {
      throw "Route $route returned status $($response.StatusCode)."
    }
    if (-not $response.Content.Contains("Romone")) {
      throw "Route $route did not contain expected content marker."
    }
    Write-Host "PASS $route"
  }

  Write-Host "Smoke test complete."
}
finally {
  if ($process -and -not $process.HasExited) {
    Stop-Process -Id $process.Id -Force
  }
}
