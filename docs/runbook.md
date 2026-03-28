# Runbook

## Local Development (PowerShell)

```powershell
npm install
npm run dev
```

Open <http://localhost:3000>.

## Quality Checks

```powershell
npm run lint
npm run typecheck
npm run test
```

## Local E2E Smoke Proof

```powershell
npm run smoke
```

This builds the app, starts it on port `4010`, checks all core routes for `200`, and verifies content markers.

## Production Build Check

```powershell
npm run build
npm run start
```
