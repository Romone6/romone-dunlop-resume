import { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { Sky } from "three/addons/objects/Sky.js";

const story = [
  {
    navLabel: "Origin",
    accent: "#8be0eb",
    eyebrow: "Port Macquarie · Mid North Coast",
    title: "I build from where I am, and look beyond it.",
    text: "I’m Romone Dunlop, a Year 12 student and youth advocate from Port Macquarie. I build projects that open opportunities and make systems easier to navigate.",
    planet: "Departure",
  },
  {
    navLabel: "Youth voice",
    accent: "#9bd7b4",
    eyebrow: "2026 NSW Youth Advisory Council · Mid-North Coast",
    title: "Regional young people belong in the room.",
    text: "As the Mid-North Coast representative on NSW’s 2026 Youth Advisory Council, I bring local perspectives into state conversations. I also contribute to Hastings Youth Voice and serve as Port Macquarie–Hastings Council’s Youth Media Spokesperson.",
    proof: "Statewide advice · local listening · regional perspective",
    image: "/romone-yac.jpg",
    imageAlt: "Romone Dunlop, photographed for the NSW Youth Advisory Council",
    imageCaption: "NSW Youth Advisory Council · 2026",
    imageHref: "https://www.acyp.nsw.gov.au/romone-yac-2026",
    link: ["Read my official YAC profile", "https://www.acyp.nsw.gov.au/romone-yac-2026"],
    secondaryLink: ["Port Macquarie–Hastings Youth", "https://www.pmhc.nsw.gov.au/Residents/Community-support/Youth"],
    planet: "Youth voice",
  },
  {
    navLabel: "Pathway",
    accent: "#f0c27e",
    eyebrow: "Pathway to Entry · Education access",
    title: "The next step after school should be clearer.",
    text: "I started Pathway to Entry to help regional students navigate what comes after school. We gathered student input and built a practical toolkit with application dates, scholarships and planning resources.",
    proof: "40+ schools · 200+ young people consulted · 103 opportunities · 59 key dates",
    link: ["Explore Pathway to Entry", "https://www.pathwaytoentry.com/"],
    secondaryLink: ["See the project on GitHub", "https://github.com/Romone6/yac-project"],
    planet: "Pathway to Entry",
  },
  {
    navLabel: "Bloom",
    accent: "#dca7df",
    eyebrow: "Bloom · Active development · Pilot stage",
    title: "Small changes deserve to be seen.",
    text: "I’m working on Bloom, a cognitive-monitoring tool designed to help participants, carers and clinicians notice changes over time. It is in active development and has been implemented in 10 clinics.",
    proof: "Built around participants, caregivers and clinicians",
    link: ["Explore Bloom", "https://app.bloom.pm/"],
    planet: "Bloom",
  },
  {
    navLabel: "MindBridge",
    accent: "#8fb8ed",
    eyebrow: "MindBridge Health · Active development",
    title: "Care should start with a clearer first step.",
    text: "I’m developing an AI-assisted intake experience for mental-health clinics. It helps organise a person’s first account and prepare a more useful handoff to a clinician. Clinical judgement stays with the clinician.",
    proof: "Patient intake · triage support · clinician handoff",
    link: ["Visit MindBridge", "https://www.mindbridge.health"],
    secondaryLink: ["See the project on GitHub", "https://github.com/Romone6/mindbridge"],
    planet: "MindBridge",
  },
  {
    navLabel: "JOINRFS",
    accent: "#eea977",
    eyebrow: "JOINRFS · Community software",
    title: "Good tools make it easier to step up.",
    text: "I helped build JOINRFS, a volunteer-recruitment funnel and operator dashboard for rural fire services. It helps teams organise enquiries, follow-ups and next steps in one place.",
    proof: "Volunteer recruitment support for rural fire services",
    link: ["Explore JOINRFS", "https://joinrfs.com.au"],
    secondaryLink: ["See the build on GitHub", "https://github.com/Romone6/joinrfs"],
    planet: "JOINRFS",
  },
  {
    navLabel: "Markets",
    accent: "#aab6e8",
    eyebrow: "Market intelligence research · In development",
    title: "Research needs a reliable timeline.",
    text: "I’m building a point-in-time research system to study company events without letting future information leak into the test. Each observation stays connected to its source and timestamp so the result can be checked.",
    proof: "50 companies · 161 SEC filings · 3,683 embedded documents",
    link: ["Read the research code", "https://github.com/Romone6/market-intelligence-system"],
    secondaryLink: ["Research only · no live trading", "https://github.com/Romone6/market-intelligence-system"],
    planet: "Market research",
  },
  {
    navLabel: "Tau Ceti",
    accent: "#a3c9e5",
    eyebrow: "Tau Ceti · Reproducibility release",
    title: "Show the working and the uncertainty.",
    text: "I assembled a reproducible analysis of Tau Ceti’s debris disc, with the data, code and checks available alongside the result. I want the evidence and its limits to be visible, not hidden behind a confident headline.",
    proof: "Archived research release · Zenodo DOI 10.5281/zenodo.22021388",
    image: "/media/tau-ceti-geometry.svg",
    imageAlt: "Research figure comparing geometries used in the Tau Ceti debris-disc analysis",
    imageCaption: "Model geometry comparison · project figure",
    imageHref: "https://github.com/Romone6/tau-ceti-debris-disc",
    link: ["Explore the research release", "https://github.com/Romone6/tau-ceti-debris-disc"],
    secondaryLink: ["Open the archived record", "https://doi.org/10.5281/zenodo.22021388"],
    planet: "Tau Ceti",
  },
  {
    navLabel: "Work",
    accent: "#e9bf86",
    eyebrow: "School · Work · Port Macquarie",
    title: "I learn by taking responsibility.",
    text: "I’m completing Year 12 at Hastings Secondary College and studying through the Southern Cross University Scholars Program. I’ve earned a distinction average and a $10,000 scholarship. At McDonald’s, I’m a Crew Trainer and NextGen Shift Leader. I train new crew members and help keep busy shifts moving.",
    proof: "Southern Cross Scholars Program · distinction average · $10,000 scholarship",
    link: ["Connect through GitHub", "https://github.com/Romone6"],
    planet: "Field notes",
  },
  {
    navLabel: "Contact",
    accent: "#8bd8df",
    eyebrow: "That’s my orbit for now",
    title: "I’m still learning where this can go.",
    text: "I’m drawn to work that gives people more room to participate: a better tool, a clearer path, or a more useful question. If you’re working on something similar, you can find me through the projects here.",
    link: ["Find me on GitHub", "https://github.com/Romone6"],
    planet: "The horizon",
  },
];

const randomSeed = () => Math.floor(Math.random() * 2_000_000_000) + 1;
const FLIGHT_MIN_TRANSIT_MS = 18000;
const FLIGHT_MAX_TRANSIT_MS = 36000;
const FLIGHT_SPEED = 0.006;
const ATMOSPHERIC_ASCENT_MS = 24000;
const ORBIT_PERIOD_MS = 72000;
const ORBIT_ANGULAR_SPEED = (Math.PI * 2) / ORBIT_PERIOD_MS;

function seededRandom(seed) {
  let n = seed >>> 0;
  return () => {
    n += 0x6d2b79f5;
    let t = n;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function disposeObject(root) {
  const geometries = new Set();
  const materials = new Set();
  const textures = new Set();
  root.traverse((object) => {
    if (object.geometry) geometries.add(object.geometry);
    const objectMaterials = Array.isArray(object.material) ? object.material : [object.material];
    objectMaterials.filter(Boolean).forEach((material) => {
      materials.add(material);
      Object.values(material).forEach((value) => { if (value?.isTexture) textures.add(value); });
    });
  });
  geometries.forEach((geometry) => geometry.dispose());
  materials.forEach((material) => material.dispose());
  textures.forEach((texture) => texture.dispose());
}

function captureMaterialState(root) {
  const entries = [];
  root.traverse((object) => {
    const materials = Array.isArray(object.material) ? object.material : [object.material];
    materials.filter(Boolean).forEach((material) => entries.push({
      material,
      opacity: material.opacity ?? 1,
      transparent: material.transparent ?? false,
      depthWrite: material.depthWrite ?? true,
    }));
  });
  return entries;
}

function setMaterialFade(entries, alpha, restore = false) {
  for (const entry of entries) {
    entry.material.opacity = entry.opacity * alpha;
    entry.material.transparent = restore ? entry.transparent : true;
    entry.material.depthWrite = restore ? entry.depthWrite : false;
  }
}

function startModelTransition(parent, previous, next, transitions, now, duration = 900) {
  const incoming = captureMaterialState(next);
  const outgoing = captureMaterialState(previous);
  setMaterialFade(incoming, 0);
  setMaterialFade(outgoing, 1);
  parent.add(next);
  transitions.push({ parent, previous, next, incoming, outgoing, started: now, duration });
}

function advanceModelTransitions(transitions, now) {
  for (let i = transitions.length - 1; i >= 0; i--) {
    const transition = transitions[i];
    const linear = THREE.MathUtils.clamp((now - transition.started) / transition.duration, 0, 1);
    const alpha = linear * linear * (3 - 2 * linear);
    setMaterialFade(transition.incoming, alpha, linear >= 1);
    setMaterialFade(transition.outgoing, 1 - alpha, linear >= 1);
    if (linear >= 1) {
      transition.parent.remove(transition.previous);
      disposeObject(transition.previous);
      transitions.splice(i, 1);
    }
  }
}

function makePlanetAtmosphere(color, opacity = 0.52) {
  return new THREE.ShaderMaterial({
    uniforms: { uColor: { value: new THREE.Color(color) }, uOpacity: { value: opacity } },
    vertexShader: `
      varying vec3 vNormalView;
      varying vec3 vPositionView;
      void main() {
        vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
        vPositionView = viewPosition.xyz;
        vNormalView = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * viewPosition;
      }
    `,
    fragmentShader: `
      uniform vec3 uColor;
      uniform float uOpacity;
      varying vec3 vNormalView;
      varying vec3 vPositionView;
      void main() {
        float facing = abs(dot(normalize(vNormalView), normalize(-vPositionView)));
        float rim = pow(1.0 - facing, 2.15);
        float glow = smoothstep(0.06, 0.86, rim);
        gl_FragColor = vec4(uColor * (0.58 + glow * 1.7), glow * uOpacity);
        #include <colorspace_fragment>
      }
    `,
    transparent: true,
    side: THREE.BackSide,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    toneMapped: false,
  });
}

function makePlanetRing(radius, color, rotation) {
  const innerRadius = radius * 1.24;
  const outerRadius = radius * 2.05;
  const geometry = new THREE.RingGeometry(innerRadius, outerRadius, 180, 12);
  const positions = geometry.getAttribute("position");
  const colors = new Float32Array(positions.count * 3);
  const base = new THREE.Color(color);
  for (let i = 0; i < positions.count; i++) {
    const r = Math.hypot(positions.getX(i), positions.getY(i));
    const band = Math.sin((r - innerRadius) * 5.1) * 0.5 + Math.sin((r - innerRadius) * 11.7) * 0.2;
    const brightness = 0.42 + Math.max(0, band) * 0.58;
    const shaded = base.clone().multiplyScalar(brightness);
    colors.set([shaded.r, shaded.g, shaded.b], i * 3);
  }
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  const ring = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({
    color: 0xffffff,
    vertexColors: true,
    roughness: 0.76,
    metalness: 0.12,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.82,
    depthWrite: false,
  }));
  ring.rotation.copy(rotation);
  return ring;
}

function makeSpaceEnvironment(rng) {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 512;
  const context = canvas.getContext("2d");
  const base = context.createLinearGradient(0, 0, 0, canvas.height);
  base.addColorStop(0, "#050a1b");
  base.addColorStop(0.48, "#11102a");
  base.addColorStop(1, "#030817");
  context.fillStyle = base;
  context.fillRect(0, 0, canvas.width, canvas.height);

  const clouds = [
    [0.19, 0.43, 0.38, 0.34, "rgba(62, 62, 178, .36)"],
    [0.43, 0.47, 0.32, 0.29, "rgba(116, 47, 157, .33)"],
    [0.67, 0.39, 0.4, 0.32, "rgba(21, 127, 164, .32)"],
    [0.85, 0.55, 0.28, 0.3, "rgba(177, 57, 119, .22)"],
  ];
  for (const [x, y, rx, ry, color] of clouds) {
    const gradient = context.createRadialGradient(x * canvas.width, y * canvas.height, 0, x * canvas.width, y * canvas.height, rx * canvas.width);
    gradient.addColorStop(0, color);
    gradient.addColorStop(1, "rgba(8, 12, 31, 0)");
    context.save();
    context.translate(x * canvas.width, y * canvas.height);
    context.scale(1, ry / rx);
    context.translate(-x * canvas.width, -y * canvas.height);
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.restore();
  }
  const starColors = ["#dce8ff", "#a9c8ff", "#ffe5c0", "#ffc5d5"];
  for (let i = 0; i < 1100; i++) {
    const x = rng() * canvas.width;
    const y = rng() * canvas.height;
    const size = rng() > 0.992 ? 1.45 : 0.55 + rng() * 0.55;
    context.globalAlpha = 0.18 + rng() * 0.72;
    context.fillStyle = starColors[Math.floor(rng() * starColors.length)];
    context.beginPath();
    context.arc(x, y, size, 0, Math.PI * 2);
    context.fill();
  }
  context.globalAlpha = 1;
  const texture = new THREE.CanvasTexture(canvas);
  texture.mapping = THREE.EquirectangularReflectionMapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  return texture;
}

const planetFamilies = {
  terran: { tint: [0xdbe4e2, 0xb5d0d3, 0xd3c39b, 0x9dc0b5], atmosphere: [0x92d9e8, 0x92bce8, 0xb0ddda], moons: [0, 1, 2], ringChance: 0.1, scale: [0.78, 1.08] },
  desert: { tint: [0xffe0bd, 0xe9c18d, 0xd8a982, 0xf3d19b], atmosphere: [0xe99e70, 0xe9bd89, 0xc99b82], moons: [0, 1, 2], ringChance: 0.08, scale: [0.72, 1.02] },
  ice: { tint: [0xeaf4ff, 0xa9d8ea, 0xc6c9ed, 0xd6e4d8], atmosphere: [0x8bd8ff, 0xa9c9ff, 0xc4eced], moons: [0, 1], ringChance: 0.24, scale: [0.74, 1.08] },
  gas: { tint: [0xffd4a4, 0xd3d6ed, 0xe8a7a0, 0xe2d39d], atmosphere: [0xffc17b, 0xa6bbff, 0xf19b92], moons: [2, 3, 4], ringChance: 0.82, scale: [1.2, 1.75] },
};

function choosePlanetFamily(rng) {
  const roll = rng();
  if (roll < 0.31) return "terran";
  if (roll < 0.55) return "desert";
  if (roll < 0.78) return "ice";
  return "gas";
}

function makeTransitCurve(from, to, startDirection, startSpeed, endDirection, endSpeed, duration, restStart = false, obstacles = []) {
  const distance = from.distanceTo(to);
  const firstHandle = restStart ? Math.max(distance * 0.06, 1) : Math.max(startSpeed * duration / 3, 0.5);
  const lastHandle = Math.max(endSpeed * duration / 3, 0.5);
  const p0 = from.clone();
  const p3 = to.clone();
  const lift = Math.max(12, Math.min(42, distance * 0.12));
  const makeCurve = (offset = new THREE.Vector3()) => {
    const p1 = from.clone().addScaledVector(startDirection, firstHandle);
    const p2 = to.clone().addScaledVector(endDirection, -lastHandle);
    return {
      getPoint(t) {
        const u = THREE.MathUtils.clamp(t, 0, 1);
        const v = 1 - u;
        return p0.clone().multiplyScalar(v * v * v)
          .addScaledVector(p1, 3 * v * v * u)
          .addScaledVector(p2, 3 * v * u * u)
          .addScaledVector(p3, u * u * u)
          .add(new THREE.Vector3(0, lift * 16 * u * u * v * v, 0))
          .addScaledVector(offset, 16 * u * u * v * v);
      },
      getTangent(t) {
        const u = THREE.MathUtils.clamp(t, 0, 1);
        const v = 1 - u;
        const tangent = p1.clone().sub(p0).multiplyScalar(3 * v * v)
          .addScaledVector(p2.clone().sub(p1), 6 * v * u)
          .addScaledVector(p3.clone().sub(p2), 3 * u * u);
        tangent.y += lift * 32 * u * v * (1 - 2 * u);
        tangent.addScaledVector(offset, 32 * u * v * (1 - 2 * u));
        return tangent.normalize();
      },
      getSpeed(t, progressSpeed = 1) {
        const u = THREE.MathUtils.clamp(t, 0, 1);
        const v = 1 - u;
        const derivative = p1.clone().sub(p0).multiplyScalar(3 * v * v)
          .addScaledVector(p2.clone().sub(p1), 6 * v * u)
          .addScaledVector(p3.clone().sub(p2), 3 * u * u);
        derivative.y += lift * 32 * u * v * (1 - 2 * u);
        derivative.addScaledVector(offset, 32 * u * v * (1 - 2 * u));
        return derivative.length() * progressSpeed / duration;
      },
    };
  };
  const routeIsClear = (curve) => {
    if (!obstacles.length) return true;
    const samples = 72;
    for (let i = 1; i < samples; i++) {
      const point = curve.getPoint(i / samples);
      for (const obstacle of obstacles) {
        if (point.distanceToSquared(obstacle.center) < obstacle.clearance * obstacle.clearance) return false;
      }
    }
    return true;
  };

  // First try the natural flight arc. If it intersects a world or its ring
  // envelope, raise or bank the curve while preserving both endpoint headings.
  const direct = to.clone().sub(from).setY(0).normalize();
  const side = new THREE.Vector3(-direct.z, 0, direct.x).normalize();
  const liftAxis = new THREE.Vector3(0, 1, 0);
  const directions = [
    liftAxis, liftAxis.clone().negate(), side, side.clone().negate(),
    liftAxis.clone().add(side).normalize(), liftAxis.clone().sub(side).normalize(),
    liftAxis.clone().negate().add(side).normalize(), liftAxis.clone().negate().sub(side).normalize(),
  ];
  const naturalCurve = makeCurve();
  if (routeIsClear(naturalCurve)) return naturalCurve;

  for (const amount of [28, 48, 72, 104, 148, 204, 280, 380, 520, 700, 920]) {
    let best = null;
    let bestLength = Infinity;
    for (const direction of directions) {
      const candidate = makeCurve(direction.clone().multiplyScalar(amount));
      if (!routeIsClear(candidate)) continue;
      let length = 0;
      let previous = candidate.getPoint(0);
      for (let i = 1; i <= 24; i++) {
        const point = candidate.getPoint(i / 24);
        length += point.distanceTo(previous);
        previous = point;
      }
      if (length < bestLength) { best = candidate; bestLength = length; }
    }
    if (best) return best;
  }
  return naturalCurve;
}

function pointOnOrbit(orbit, angle) {
  const radial = orbit.radial.clone().multiplyScalar(Math.cos(angle));
  const tangent = orbit.tangent.clone().multiplyScalar(Math.sin(angle));
  return orbit.center.clone().addScaledVector(radial.add(tangent), orbit.distance);
}

function makeAtmosphericAscent(destination) {
  const ground = new THREE.Vector3(0, -9.5, 0);
  const upperAtmosphere = destination.clone().multiplyScalar(0.18).setY(35);
  const exosphere = destination.clone().multiplyScalar(0.58).setY(82);
  return {
    ground,
    curve: new THREE.CatmullRomCurve3([
      ground,
      new THREE.Vector3(0, -7, 0),
      new THREE.Vector3(0, 5, 0),
      new THREE.Vector3(0, 19, 0),
      upperAtmosphere,
      exosphere,
      destination,
    ], false, "centripetal"),
  };
}

function makeLaunchComplex() {
  const group = new THREE.Group();
  const concrete = new THREE.MeshStandardMaterial({ color: 0x40464a, roughness: 0.92 });
  const darkSteel = new THREE.MeshStandardMaterial({ color: 0x252d32, metalness: 0.72, roughness: 0.38 });
  const steel = new THREE.MeshStandardMaterial({ color: 0x929b9b, metalness: 0.78, roughness: 0.31 });
  const ceramic = new THREE.MeshStandardMaterial({ color: 0xe7e5dd, metalness: 0.18, roughness: 0.42 });
  const thermal = new THREE.MeshStandardMaterial({ color: 0x20272c, metalness: 0.22, roughness: 0.8 });
  const goldFoil = new THREE.MeshStandardMaterial({ color: 0xb27d4c, metalness: 0.6, roughness: 0.42 });
  const engineBell = new THREE.MeshStandardMaterial({ color: 0x373d40, metalness: 0.82, roughness: 0.27 });
  const padY = -3.65;
  const addMesh = (geometry, material, position, parent = group) => {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.copy(position);
    parent.add(mesh);
    return mesh;
  };
  const beam = (start, end, radius, material, parent = group) => {
    const a = new THREE.Vector3(...start);
    const b = new THREE.Vector3(...end);
    const delta = b.clone().sub(a);
    const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, delta.length(), 8), material);
    mesh.position.copy(a.add(b).multiplyScalar(0.5));
    mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), delta.normalize());
    parent.add(mesh);
    return mesh;
  };

  // Wide reinforced pad, flame trench, and four service piers.
  addMesh(new THREE.CylinderGeometry(9.5, 10, 0.72, 64), concrete, new THREE.Vector3(0, padY, 0));
  addMesh(new THREE.CylinderGeometry(7.5, 7.8, 0.22, 64), darkSteel, new THREE.Vector3(0, padY + 0.47, 0));
  addMesh(new THREE.BoxGeometry(6.2, 0.8, 13), darkSteel, new THREE.Vector3(0, padY - 0.26, 1.4));
  addMesh(new THREE.BoxGeometry(5.1, 0.25, 10), thermal, new THREE.Vector3(0, padY + 0.26, 1.6));
  for (const x of [-6.5, 6.5]) {
    for (const z of [-5.5, 5.5]) {
      addMesh(new THREE.CylinderGeometry(0.34, 0.5, 1.05, 12), steel, new THREE.Vector3(x, padY + 0.53, z));
    }
  }
  for (let i = -4; i <= 4; i++) {
    addMesh(new THREE.BoxGeometry(0.12, 0.11, 0.16), steel, new THREE.Vector3(i * 1.65, padY + 0.61, -7.7));
  }

  // A tall, white, two-booster launch stack, with realistic stage seams and dark engine bells.
  const vehicle = new THREE.Group();
  const baseY = -0.1;
  const core = addMesh(new THREE.CylinderGeometry(0.68, 0.72, 6.6, 40), ceramic, new THREE.Vector3(0, baseY - 0.35, 0), vehicle);
  core.material = ceramic;
  addMesh(new THREE.CylinderGeometry(0.69, 0.69, 0.3, 40), thermal, new THREE.Vector3(0, baseY - 3.5, 0), vehicle);
  addMesh(new THREE.CylinderGeometry(0.63, 0.68, 2.15, 40), ceramic, new THREE.Vector3(0, baseY + 4.05, 0), vehicle);
  addMesh(new THREE.CylinderGeometry(0.64, 0.64, 0.12, 40), goldFoil, new THREE.Vector3(0, baseY + 2.88, 0), vehicle);
  addMesh(new THREE.ConeGeometry(0.62, 1.8, 40), ceramic, new THREE.Vector3(0, baseY + 6.0, 0), vehicle);
  addMesh(new THREE.CylinderGeometry(0.14, 0.36, 0.72, 24), engineBell, new THREE.Vector3(0, baseY - 4.05, 0), vehicle);
  for (const x of [-0.37, 0.37]) {
    addMesh(new THREE.CylinderGeometry(0.13, 0.28, 0.65, 20), engineBell, new THREE.Vector3(x, baseY - 4.0, 0), vehicle);
  }
  for (const x of [-0.91, 0.91]) {
    addMesh(new THREE.CylinderGeometry(0.29, 0.31, 4.85, 32), ceramic, new THREE.Vector3(x, baseY - 1.75, 0), vehicle);
    addMesh(new THREE.ConeGeometry(0.29, 0.65, 32), ceramic, new THREE.Vector3(x, baseY + 1.0, 0), vehicle);
    addMesh(new THREE.CylinderGeometry(0.3, 0.3, 0.2, 32), thermal, new THREE.Vector3(x, baseY - 4.18, 0), vehicle);
    addMesh(new THREE.CylinderGeometry(0.1, 0.17, 0.54, 20), engineBell, new THREE.Vector3(x, baseY - 4.55, 0), vehicle);
    addMesh(new THREE.CylinderGeometry(0.34, 0.34, 0.075, 32), goldFoil, new THREE.Vector3(x, baseY - 1.8, 0), vehicle);
  }
  for (let i = 0; i < 4; i++) {
    const fin = new THREE.Mesh(new THREE.BoxGeometry(0.08, 1.28, 0.72), thermal);
    fin.position.set(0, baseY - 3.1, 0.6);
    fin.rotation.y = i * Math.PI / 2;
    vehicle.add(fin);
  }
  vehicle.position.y = 0;
  group.add(vehicle);

  // Steel lattice gantry, bracing, work platforms, and vehicle access arms.
  const towerX = -2.05;
  const towerZ = -0.72;
  const towerLevels = [padY + 0.5, -2.9, -0.9, 1.2, 3.2, 5.3];
  for (const x of [towerX - 0.7, towerX + 0.7]) {
    for (const z of [towerZ - 0.7, towerZ + 0.7]) {
      beam([x, towerLevels[0], z], [x, towerLevels.at(-1), z], 0.075, steel);
    }
  }
  for (let i = 0; i < towerLevels.length - 1; i++) {
    const y0 = towerLevels[i], y1 = towerLevels[i + 1];
    for (const z of [towerZ - 0.7, towerZ + 0.7]) {
      beam([towerX - 0.7, y0, z], [towerX + 0.7, y1, z], 0.035, darkSteel);
      beam([towerX + 0.7, y0, z], [towerX - 0.7, y1, z], 0.035, darkSteel);
    }
    for (const x of [towerX - 0.7, towerX + 0.7]) {
      beam([x, y0, towerZ - 0.7], [x, y1, towerZ + 0.7], 0.035, darkSteel);
      beam([x, y0, towerZ + 0.7], [x, y1, towerZ - 0.7], 0.035, darkSteel);
    }
  }
  for (const y of [-2.5, -0.4, 1.8, 4.0]) {
    addMesh(new THREE.BoxGeometry(2.0, 0.14, 2.0), darkSteel, new THREE.Vector3(towerX, y, towerZ));
    beam([towerX + 0.7, y, towerZ], [-0.72, y, 0], 0.1, steel);
    beam([-0.72, y, 0], [-0.72, y + 0.35, 0], 0.12, steel);
  }
  for (const z of [-1.3, 1.3]) {
    beam([-3.1, -3.3, z], [3.3, -3.3, z], 0.14, steel);
    beam([-3.1, -3.3, z], [-3.1, -2.6, z], 0.16, darkSteel);
  }
  const lightMat = new THREE.MeshBasicMaterial({ color: 0xffdca0, toneMapped: false });
  for (const position of [[-3.2, 5.55, -1.9], [-0.9, 5.55, -1.9], [-3.2, 5.55, 0.5], [-0.9, 5.55, 0.5]]) {
    addMesh(new THREE.SphereGeometry(0.09, 10, 8), lightMat, new THREE.Vector3(...position));
    const lamp = new THREE.PointLight(0xffdca0, 1.8, 18, 1.8);
    lamp.position.set(...position);
    group.add(lamp);
  }

  const flame = new THREE.Group();
  const flameOuter = new THREE.MeshBasicMaterial({ color: 0xff792e, transparent: true, opacity: 0.78, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide, toneMapped: false });
  const flameCore = new THREE.MeshBasicMaterial({ color: 0xffe7ad, transparent: true, opacity: 0.92, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide, toneMapped: false });
  const outer = new THREE.Mesh(new THREE.ConeGeometry(1.3, 5.4, 24, 1, true), flameOuter);
  outer.rotation.z = Math.PI;
  outer.position.set(0, -5.35, 0);
  flame.add(outer);
  const coreGlow = new THREE.Mesh(new THREE.ConeGeometry(0.55, 3.7, 20, 1, true), flameCore);
  coreGlow.rotation.z = Math.PI;
  coreGlow.position.set(0, -4.55, 0);
  flame.add(coreGlow);
  const plumeLight = new THREE.PointLight(0xff953f, 0, 20, 1.8);
  plumeLight.position.set(0, -4.0, 0);
  flame.add(plumeLight);
  vehicle.add(flame);
  group.userData.vehicle = vehicle;
  group.userData.flame = flame;
  group.userData.flameMaterials = [flameOuter, flameCore];
  group.userData.plumeLight = plumeLight;
  return group;
}

function clonePlanet(template, tint) {
  const model = template.clone(true);
  model.traverse((object) => {
    if (!object.isMesh || !object.material) return;
    const recolor = (material) => {
      const instance = material.clone();
      if (instance.color) instance.color.lerp(new THREE.Color(tint), 0.34);
      if ("envMapIntensity" in instance) instance.envMapIntensity = 1.15;
      if ("roughness" in instance) instance.roughness = Math.max(0.48, instance.roughness ?? 0.72);
      return instance;
    };
    object.material = Array.isArray(object.material) ? object.material.map(recolor) : recolor(object.material);
  });
  return model;
}

function styleShipModel(template, targetSize) {
  const model = template.clone(true);
  const bounds = new THREE.Box3().setFromObject(model);
  const dimensions = bounds.getSize(new THREE.Vector3());
  const center = bounds.getCenter(new THREE.Vector3());
  const scale = targetSize / Math.max(dimensions.x, dimensions.y, dimensions.z, 0.001);
  model.scale.setScalar(scale);
  model.position.sub(center.multiplyScalar(scale));
  model.traverse((object) => {
    if (!object.isMesh || !object.material) return;
    const enhance = (source) => {
      const material = source.clone();
      if ("envMapIntensity" in material) material.envMapIntensity = 1.55;
      if ("roughness" in material) material.roughness = Math.max(0.2, Math.min(material.roughness ?? 0.5, 0.52));
      if (object.name.toLowerCase().includes("glow") && "emissive" in material) {
        material.emissive.set(0x42cfff);
        material.emissiveIntensity = 2.4;
      }
      return material;
    };
    object.material = Array.isArray(object.material) ? object.material.map(enhance) : enhance(object.material);
  });
  return model;
}

function makeEnginePlumes() {
  const group = new THREE.Group();
  const outerMaterial = new THREE.MeshBasicMaterial({ color: 0x28bffa, transparent: true, opacity: 0.23, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide, toneMapped: false });
  const coreMaterial = new THREE.MeshBasicMaterial({ color: 0xbdf6ff, transparent: true, opacity: 0.45, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide, toneMapped: false });
  for (const { x, radius, length } of [
    { x: -0.64, radius: 0.13, length: 1.04 },
    { x: 0, radius: 0.19, length: 1.38 },
    { x: 0.64, radius: 0.13, length: 1.04 },
  ]) {
    const outer = new THREE.Mesh(new THREE.ConeGeometry(radius, length, 14, 1, true), outerMaterial);
    outer.rotation.x = -Math.PI / 2;
    outer.position.set(x, -0.03, -3.25);
    outer.frustumCulled = false;
    group.add(outer);
    const core = new THREE.Mesh(new THREE.ConeGeometry(radius * 0.38, length * 0.68, 12, 1, true), coreMaterial);
    core.rotation.x = -Math.PI / 2;
    core.position.set(x, -0.03, -3.04);
    core.frustumCulled = false;
    group.add(core);
  }
  const engineLight = new THREE.PointLight(0x38cfff, 4.2, 12, 1.8);
  engineLight.position.set(0, 0, -1.65);
  group.add(engineLight);
  group.userData.materials = [outerMaterial, coreMaterial];
  group.userData.light = engineLight;
  return group;
}

function makeStarLayer(rng, count, near, far, size) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const phases = new Float32Array(count);
  const spectral = [0x9db8ff, 0xcad9ff, 0xfff4df, 0xffd49e, 0xffad7c];
  for (let i = 0; i < count; i++) {
    const y = rng() * 2 - 1;
    const angle = rng() * Math.PI * 2;
    const horizontal = Math.sqrt(1 - y * y);
    const radius = near + rng() * (far - near);
    positions[i * 3] = radius * horizontal * Math.cos(angle);
    positions[i * 3 + 1] = radius * y;
    positions[i * 3 + 2] = radius * horizontal * Math.sin(angle);
    const color = new THREE.Color(spectral[Math.floor(rng() * spectral.length)]);
    color.multiplyScalar(0.42 + rng() * 0.7);
    colors.set([color.r, color.g, color.b], i * 3);
    sizes[i] = size * (0.52 + rng() * 0.9);
    phases[i] = rng() * Math.PI * 2;
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
  geometry.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));
  const material = new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 } },
    vertexShader: `
      attribute vec3 aColor;
      attribute float aSize;
      attribute float aPhase;
      uniform float uTime;
      varying vec3 vColor;
      varying float vPulse;
      varying float vSize;
      void main() {
        vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
        float pulse = 0.78 + 0.22 * sin(uTime * (0.45 + aPhase * 0.04) + aPhase);
        gl_PointSize = max(1.0, aSize * (280.0 / max(1.0, -viewPosition.z)) * pulse);
        gl_Position = projectionMatrix * viewPosition;
        vColor = aColor;
        vPulse = pulse;
        vSize = aSize;
      }
    `,
    fragmentShader: `
      varying vec3 vColor;
      varying float vPulse;
      varying float vSize;
      void main() {
        float d = length(gl_PointCoord - vec2(0.5));
        float glow = 1.0 - smoothstep(0.02, 0.5, d);
        float core = 1.0 - smoothstep(0.02, 0.18, d);
        vec2 p = gl_PointCoord - vec2(0.5);
        float spikes = max(exp(-abs(p.x) * 34.0) * (1.0 - smoothstep(0.035, 0.5, abs(p.y))),
                           exp(-abs(p.y) * 34.0) * (1.0 - smoothstep(0.035, 0.5, abs(p.x))));
        float flare = smoothstep(2.2, 3.8, vSize) * spikes * 0.34;
        gl_FragColor = vec4(vColor * (0.72 + core * 1.05 + flare), max(glow, flare) * vPulse);
        #include <colorspace_fragment>
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    toneMapped: false,
  });
  return { points: new THREE.Points(geometry, material), material };
}

function makeShip() {
  const ship = new THREE.Group();
  const hull = new THREE.MeshStandardMaterial({ color: 0xbacccf, metalness: 0.78, roughness: 0.27 });
  const dark = new THREE.MeshStandardMaterial({ color: 0x142b37, metalness: 0.72, roughness: 0.3 });
  const copper = new THREE.MeshStandardMaterial({ color: 0xf2a65d, metalness: 0.62, roughness: 0.3, emissive: 0x4a1e0b });
  const glass = new THREE.MeshPhysicalMaterial({ color: 0x70d8ed, metalness: 0.25, roughness: 0.08, transmission: 0.2, transparent: true, opacity: 0.92 });
  const body = new THREE.Mesh(new THREE.ConeGeometry(0.55, 2.7, 10), hull);
  body.rotation.x = Math.PI / 2;
  body.position.z = 0.3;
  ship.add(body);
  const spine = new THREE.Mesh(new THREE.CylinderGeometry(0.23, 0.3, 2.0, 8), dark);
  spine.rotation.x = Math.PI / 2;
  spine.position.z = -0.75;
  ship.add(spine);
  const wings = new THREE.Mesh(new THREE.BoxGeometry(2.7, 0.09, 0.9), hull);
  wings.position.set(0, -0.05, -0.6);
  ship.add(wings);
  const wingTips = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.12, 0.48), copper);
  wingTips.position.set(0, 0, -0.65);
  ship.add(wingTips);
  const cockpit = new THREE.Mesh(new THREE.SphereGeometry(0.34, 18, 12), glass);
  cockpit.scale.set(0.75, 0.62, 1.25);
  cockpit.position.set(0, 0.34, 0.2);
  ship.add(cockpit);
  for (const { x, radius } of [{ x: -0.48, radius: 0.15 }, { x: 0, radius: 0.21 }, { x: 0.48, radius: 0.15 }]) {
    const engine = new THREE.Mesh(new THREE.CylinderGeometry(radius * 0.72, radius, 0.45, 12), dark);
    engine.rotation.x = Math.PI / 2;
    engine.position.set(x, -0.04, -1.55);
    ship.add(engine);
    const glow = new THREE.PointLight(0x56dff5, 3.6, 8);
    glow.position.set(x, 0, -1.95);
    ship.add(glow);
  }
  ship.scale.setScalar(1.55);
  return ship;
}

function SpaceScene({ station, seed, reducedMotion, playing, started, onUnavailable, onLaunchState }) {
  const mount = useRef(null);
  const [sceneReady, setSceneReady] = useState(false);
  const stationRef = useRef(station);
  const previousStation = useRef(station);
  const travel = useRef({ curve: null, started: 0, duration: 0, pausedAt: null });
  const orbitData = useRef([]);
  const routeObstaclesRef = useRef([]);
  const shipPosition = useRef(null);
  const shipDirection = useRef(new THREE.Vector3(0, 0, 1));
  const shipSpeed = useRef(0);
  const orbitAngle = useRef(0);
  const orbitLastFrame = useRef(null);
  const playingRef = useRef(playing);
  const startedRef = useRef(started);
  const ascent = useRef({ curve: null, elapsed: 0, complete: false, active: false });
  const queuedStation = useRef(null);

  useEffect(() => { stationRef.current = station; }, [station]);
  useEffect(() => { playingRef.current = playing; }, [playing]);
  useEffect(() => { startedRef.current = started; }, [started]);

  useEffect(() => {
    const host = mount.current;
    if (!host) return undefined;
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "high-performance" });
    } catch (error) {
      onUnavailable?.(`WebGL could not start: ${error?.message || "renderer unavailable"}`);
      return undefined;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setSize(host.clientWidth, host.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.5;
    host.replaceChildren(renderer.domElement);
    const handleContextLost = (event) => {
      event.preventDefault();
      onUnavailable?.("The browser lost the graphics context.");
    };
    renderer.domElement.addEventListener("webglcontextlost", handleContextLost, { once: true });

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x030713);
    scene.fog = new THREE.FogExp2(0x030713, 0.00024);
    const camera = new THREE.PerspectiveCamera(58, host.clientWidth / host.clientHeight, 0.1, 450_000);
    // A very faint, irregular Milky Way band gives the star field depth without
    // turning the flight into a saturated game backdrop.
    const nebula = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      new THREE.ShaderMaterial({
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec2 vUv;
          uniform float uTime;
          float hash(vec2 p) {
            p = fract(p * vec2(123.34, 456.21));
            p += dot(p, p + 45.32);
            return fract(p.x * p.y);
          }
          float noise(vec2 p) {
            vec2 i = floor(p);
            vec2 f = fract(p);
            f = f * f * (3.0 - 2.0 * f);
            return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
                       mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
          }
          float fbm(vec2 p) {
            float value = 0.0;
            float amplitude = 0.5;
            for (int i = 0; i < 5; i++) {
              value += amplitude * noise(p);
              p = p * 2.03 + vec2(17.1, 9.2);
              amplitude *= 0.5;
            }
            return value;
          }
          void main() {
            vec2 p = vUv;
            p.x += uTime * 0.0018;
            p.y += sin(uTime * 0.035 + p.x * 3.1) * 0.0025;
            float bandY = 0.5 + 0.15 * sin(p.x * 4.8) + 0.045 * sin(p.x * 12.0 + 1.4);
            float band = exp(-pow((p.y - bandY) / 0.24, 2.0));
            float cloud = fbm(p * vec2(6.4, 4.2) + vec2(0.8, 1.7));
            float wisps = fbm(p * vec2(13.0, 8.0) + vec2(5.3, 2.6));
            float filaments = smoothstep(0.34, 0.72, cloud) * band;
            float haze = smoothstep(0.43, 0.74, wisps) * band;
            float colorFlow = 0.5 + 0.5 * sin(p.x * 8.0 + cloud * 7.0);
            float violetCloud = filaments * smoothstep(0.1, 0.9, colorFlow);
            float cyanCloud = filaments * (1.0 - smoothstep(0.25, 0.82, colorFlow));
            vec3 color = vec3(0.004, 0.008, 0.021);
            color += vec3(0.045, 0.095, 0.29) * filaments * 1.05;
            color += vec3(0.19, 0.045, 0.31) * violetCloud * 0.95;
            color += vec3(0.012, 0.16, 0.24) * cyanCloud * 0.9;
            color += vec3(0.21, 0.044, 0.17) * haze * (0.34 + colorFlow * 0.38);
            color += vec3(0.035, 0.048, 0.12) * band * 0.18;
            gl_FragColor = vec4(color, 1.0);
            #include <colorspace_fragment>
          }
        `,
        uniforms: { uTime: { value: 0 } },
        depthTest: false,
        depthWrite: false,
        toneMapped: false,
      }),
    );
    nebula.renderOrder = -1000;
    nebula.position.z = -1.7;
    camera.add(nebula);
    scene.add(camera);
    // The stops are authored as a stable route. Each replay can redraw the
    // surrounding sky without reordering planets or changing the travel path.
    const rng = seededRandom(284_193_771);
    const skyRng = seededRandom(seed);
    const environmentTexture = makeSpaceEnvironment(skyRng);
    scene.environment = environmentTexture;
    scene.environmentIntensity = 0.82;
    scene.add(new THREE.AmbientLight(0x687dbd, 0.46));
    const fill = new THREE.DirectionalLight(0xb9d8ff, 1.65);
    fill.position.set(-35, 28, -50);
    scene.add(fill);
    const rimLight = new THREE.DirectionalLight(0x9c6eff, 0.62);
    rimLight.position.set(42, -9, 22);
    scene.add(rimLight);
    const atmosphericSky = new Sky();
    atmosphericSky.scale.setScalar(450_000);
    atmosphericSky.material.uniforms.turbidity.value = 7;
    atmosphericSky.material.uniforms.rayleigh.value = 2.2;
    atmosphericSky.material.uniforms.mieCoefficient.value = 0.005;
    atmosphericSky.material.uniforms.mieDirectionalG.value = 0.78;
    const sunDirection = new THREE.Vector3(-0.3, 0.52, -0.8).normalize();
    atmosphericSky.material.uniforms.sunPosition.value.copy(sunDirection);
    scene.add(atmosphericSky);

    const sun = new THREE.Group();
    const sunBall = new THREE.Mesh(new THREE.SphereGeometry(8.2, 40, 32), new THREE.MeshBasicMaterial({ color: 0xffc36a }));
    sun.add(sunBall);
    const corona = new THREE.Mesh(new THREE.SphereGeometry(10.6, 32, 24), new THREE.MeshBasicMaterial({ color: 0xff8246, transparent: true, opacity: 0.17, side: THREE.BackSide, blending: THREE.AdditiveBlending, depthWrite: false }));
    sun.add(corona);
    const sunLight = new THREE.PointLight(0xffc474, 2500, 640, 1.6);
    sun.add(sunLight);
    scene.add(sun);
    const routeObstacles = [{ center: new THREE.Vector3(), clearance: 16 }];
    const stationPoints = [];
    orbitData.current = [];
    const planetGroups = [];
    const backgroundPlanets = [];
    const loader = new GLTFLoader();
    let disposed = false;
    const modelTransitions = [];
    const modelCache = new Map();
    const loadModel = (path) => {
      if (!modelCache.has(path)) modelCache.set(path, loader.loadAsync(path).then((gltf) => gltf.scene));
      return modelCache.get(path);
    };
    let hasPlanetRing = false;
    for (let i = 0; i < story.length; i++) {
      const angle = (i / story.length) * Math.PI * 2 + (rng() - 0.5) * 0.24;
      const orbitalRadius = 72 + i * 40 + rng() * 8;
      const eccentricity = 0.94 + rng() * 0.08;
      const family = choosePlanetFamily(rng);
      const profile = planetFamilies[family];
      const bodyScale = profile.scale[0] + rng() * (profile.scale[1] - profile.scale[0]);
      const radius = Math.min(
        (family === "gas" ? 7.6 + rng() * 2.6 : 4.1 + rng() * 2.1) * bodyScale,
        family === "gas" ? 11.5 : 6.5,
      );
      const tilt = (rng() - 0.5) * 0.48;
      const position = new THREE.Vector3(Math.cos(angle) * orbitalRadius, (rng() - 0.5) * 23, Math.sin(angle) * orbitalRadius * eccentricity);
      const approach = position.clone().setY(0).normalize();
      const orbit = {
        center: position.clone(),
        radial: approach.clone(),
        tangent: new THREE.Vector3(-approach.z, 0, approach.x),
        distance: radius + 9,
      };
      orbitData.current.push(orbit);
      const stop = pointOnOrbit(orbit, 0);
      stationPoints.push(stop);
      const planet = new THREE.Group();
      planet.position.copy(position);
      planet.rotation.set((rng() - 0.5) * 0.25, rng() * Math.PI * 2, tilt);
      planet.userData.baseRotationX = planet.rotation.x;
      planet.userData.baseRotationY = planet.rotation.y;
      planet.userData.axialTilt = tilt;
      const tint = profile.tint[Math.floor(rng() * profile.tint.length)];
      const atmosphereColor = profile.atmosphere[Math.floor(rng() * profile.atmosphere.length)];
      const material = new THREE.MeshStandardMaterial({ color: tint, roughness: 0.72, metalness: 0.045, envMapIntensity: 1.1 });
      const mesh = new THREE.Mesh(new THREE.SphereGeometry(radius, 32, 24), material);
      planet.add(mesh);
      planet.userData.planetType = family;
      loadModel(`${import.meta.env.BASE_URL}models/planets/${family}.glb`).then((template) => {
        if (disposed) return;
        const model = clonePlanet(template, tint);
        model.scale.set(radius, radius * (family === "gas" ? 0.93 : 1), radius);
        startModelTransition(planet, mesh, model, modelTransitions, performance.now());
      }).catch(() => {});
      const atmosphere = new THREE.Mesh(new THREE.SphereGeometry(radius * 1.075, 40, 28), makePlanetAtmosphere(atmosphereColor, family === "gas" ? 0.62 : 0.5));
      planet.add(atmosphere);
      const ringRoll = rng();
      const hasRing = !hasPlanetRing && family === "gas" && ringRoll < 0.56;
      if (hasRing) {
        hasPlanetRing = true;
        // Keep the ship outside the ring's full outer radius with room for its hull.
        orbit.distance = radius * 2.05 + 7.5;
        stationPoints[i].copy(pointOnOrbit(orbit, 0));
        const ringColor = new THREE.Color(atmosphereColor).lerp(new THREE.Color(0xc7cbd5), 0.36);
        const ring = makePlanetRing(radius, ringColor, new THREE.Euler(1.15 + tilt, rng() * 0.45, (rng() - 0.5) * 0.2));
        planet.add(ring);
      }
      routeObstacles.push({
        center: position.clone(),
        clearance: (hasRing ? radius * 2.05 : radius * 1.075) + 5,
      });
      const moonPivot = new THREE.Group();
      const moonCount = profile.moons[Math.floor(rng() * profile.moons.length)];
      for (let moonIndex = 0; moonIndex < moonCount; moonIndex++) {
        const moonRadius = radius * (0.045 + rng() * 0.055);
        const moon = new THREE.Mesh(new THREE.IcosahedronGeometry(moonRadius, 2), new THREE.MeshStandardMaterial({ color: [0xaeb7c3, 0xc8bcae, 0xa6b5ad][Math.floor(rng() * 3)], roughness: 0.92 }));
        const orbitDistance = radius * (1.55 + moonIndex * 0.48 + rng() * 0.24);
        const moonAngle = rng() * Math.PI * 2;
        moon.position.set(Math.cos(moonAngle) * orbitDistance, (rng() - 0.5) * radius * 0.2, Math.sin(moonAngle) * orbitDistance);
        moonPivot.add(moon);
      }
      planet.add(moonPivot);
      planet.userData.moonPivot = moonPivot;
      scene.add(planet);
      planetGroups.push(planet);
    }

    for (let i = 0; i < 3; i++) {
      const segment = Math.min(stationPoints.length - 2, Math.floor((i + 1) * (stationPoints.length - 1) / 4));
      const from = stationPoints[segment];
      const to = stationPoints[segment + 1];
      const direction = to.clone().sub(from).normalize();
      const sideways = new THREE.Vector3(-direction.z, 0, direction.x).normalize();
      const position = from.clone().lerp(to, 0.52).addScaledVector(sideways, (i % 2 ? -1 : 1) * (245 + rng() * 65));
      position.y += 95 + rng() * 55;
      const family = choosePlanetFamily(rng);
      const profile = planetFamilies[family];
      const tint = profile.tint[Math.floor(rng() * profile.tint.length)];
      const radius = 3.2 + rng() * 3.8;
      const hasRing = family === "gas" && rng() < 0.12;
      const bodyMaterial = new THREE.MeshStandardMaterial({ color: tint, roughness: 0.72, envMapIntensity: 1.05 });
      const body = new THREE.Mesh(new THREE.SphereGeometry(radius, 24, 18), bodyMaterial);
      const world = new THREE.Group();
      world.position.copy(position);
      world.rotation.set((rng() - 0.5) * 0.35, rng() * Math.PI * 2, (rng() - 0.5) * 0.4);
      world.userData.baseRotationY = world.rotation.y;
      world.userData.spin = 0.006 + rng() * 0.01;
      world.add(body);
      world.add(new THREE.Mesh(new THREE.SphereGeometry(radius * 1.075, 32, 24), makePlanetAtmosphere(profile.atmosphere[Math.floor(rng() * profile.atmosphere.length)], 0.5)));
      if (hasRing) {
        const ring = makePlanetRing(radius, profile.atmosphere[0], new THREE.Euler(1.22, 0.25 + rng() * 0.5, 0));
        world.add(ring);
      }
      routeObstacles.push({
        center: position.clone(),
        clearance: (hasRing ? radius * 2.05 : radius * 1.075) + 5,
      });
      loadModel(`${import.meta.env.BASE_URL}models/planets/${family}.glb`).then((template) => {
        if (disposed) return;
        const model = clonePlanet(template, tint);
        model.scale.set(radius, radius * (family === "gas" ? 0.93 : 1), radius);
        startModelTransition(world, body, model, modelTransitions, performance.now());
      }).catch(() => {});
      scene.add(world);
      backgroundPlanets.push(world);
    }

    const asteroidGeometry = new THREE.IcosahedronGeometry(1, 1);
    const asteroidMaterial = new THREE.MeshStandardMaterial({ color: 0x8d837a, roughness: 0.96, metalness: 0.04, flatShading: true });
    const asteroidBelt = new THREE.InstancedMesh(asteroidGeometry, asteroidMaterial, 1500);
    asteroidBelt.instanceMatrix.setUsage(THREE.StaticDrawUsage);
    const asteroidTransform = new THREE.Object3D();
    const asteroidColor = new THREE.Color();
    for (let i = 0; i < 1500; i++) {
      const radius = 42 + (rng() - 0.5) * 8;
      const angle = rng() * Math.PI * 2;
      asteroidTransform.position.set(Math.cos(angle) * radius, (rng() - 0.5) * 5.5, Math.sin(angle) * radius);
      asteroidTransform.rotation.set(rng() * Math.PI, rng() * Math.PI, rng() * Math.PI);
      const size = 0.16 + Math.pow(rng(), 2) * 0.82;
      asteroidTransform.scale.set(size * (0.7 + rng() * 0.9), size * (0.55 + rng() * 0.7), size * (0.7 + rng() * 0.9));
      asteroidTransform.updateMatrix();
      asteroidBelt.setMatrixAt(i, asteroidTransform.matrix);
      asteroidColor.setHSL(0.055 + rng() * 0.07, 0.055 + rng() * 0.11, 0.2 + rng() * 0.25);
      asteroidBelt.setColorAt(i, asteroidColor);
    }
    asteroidBelt.instanceMatrix.needsUpdate = true;
    if (asteroidBelt.instanceColor) asteroidBelt.instanceColor.needsUpdate = true;
    scene.add(asteroidBelt);

    const starLayers = [
      makeStarLayer(skyRng, 900, 100, 230, 0.95),
      makeStarLayer(skyRng, 6500, 470, 1450, 1.4),
      makeStarLayer(skyRng, 1900, 245, 490, 1.3),
      makeStarLayer(skyRng, 260, 360, 1350, 3.4),
    ];
    const stars = new THREE.Group();
    starLayers.forEach(({ points }) => stars.add(points));
    scene.add(stars);

    const ship = makeShip();
    const shipFallback = ship;
    const shipContainer = new THREE.Group();
    shipContainer.add(ship);
    const shipFill = new THREE.PointLight(0x9adfff, 18, 38, 1.7);
    shipFill.position.set(0, 2.2, 0.8);
    shipContainer.add(shipFill);
    const enginePlumes = makeEnginePlumes();
    shipContainer.add(enginePlumes);
    loadModel(`${import.meta.env.BASE_URL}models/romone-explorer.glb`).then((template) => {
      if (disposed) return;
      const model = styleShipModel(template, host.clientWidth < 760 ? 5.35 : 6.55);
      startModelTransition(shipContainer, shipFallback, model, modelTransitions, performance.now());
    }).catch(() => {});
    scene.add(shipContainer);
    const initialOrbit = orbitData.current[Math.min(stationRef.current, orbitData.current.length - 1)];
    const initialPoint = pointOnOrbit(initialOrbit, 0);
    const initialAscent = makeAtmosphericAscent(initialPoint);
    ascent.current = { curve: initialAscent.curve, length: initialAscent.curve.getLength(), elapsed: 0, complete: false, active: false };
    const launchComplex = makeLaunchComplex();
    launchComplex.position.copy(initialAscent.ground);
    scene.add(launchComplex);
    shipContainer.position.copy(initialAscent.ground);
    shipContainer.visible = false;
    shipPosition.current = initialAscent.ground.clone();
    shipDirection.current.set(0, 1, 0);
    shipSpeed.current = 0;
    routeObstaclesRef.current = routeObstacles;
    setSceneReady(true);
    const initialTime = performance.now();
    travel.current = { curve: null, started: initialTime, duration: 0, pausedAt: playingRef.current ? initialTime : null };
    orbitAngle.current = 0;
    orbitLastFrame.current = null;
    let frame = 0;
    const animationStartedAt = performance.now();
    const resize = () => {
      if (!host.clientWidth || !host.clientHeight) return;
      camera.aspect = host.clientWidth / host.clientHeight;
      camera.updateProjectionMatrix();
      const skyHeight = 1.7 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * 1.15;
      nebula.scale.set(skyHeight * camera.aspect, skyHeight, 1);
      renderer.setSize(host.clientWidth, host.clientHeight);
    };
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);

    let previousFrameTime = performance.now();
    let launchTransitionStarted = null;
    let smoothedBank = 0;
    const animate = (now) => {
      if (disposed) return;
      frame = requestAnimationFrame(animate);
      const t = (now - animationStartedAt) / 1000;
      const frameDelta = THREE.MathUtils.clamp((now - previousFrameTime) / 1000, 0, 0.05);
      previousFrameTime = now;
      const move = travel.current;
      const climb = ascent.current;
      if (startedRef.current && launchTransitionStarted === null) launchTransitionStarted = now;
      const launchMix = launchTransitionStarted === null
        ? 0
        : THREE.MathUtils.smoothstep((now - launchTransitionStarted) / 2200, 0, 1);
      const travelTime = move.pausedAt ?? now;
      const linear = Math.min(1, Math.max(0, (travelTime - move.started) / Math.max(1, move.duration)));
      const progress = move.easeFromRest ? linear * linear * (2 - linear) : linear;
      const progressSpeed = move.easeFromRest ? 4 * linear - 3 * linear * linear : 1;
      const arrivalIndex = Math.min(stationRef.current, orbitData.current.length - 1);
      const arrivalOrbit = orbitData.current[arrivalIndex];
      let point;
      let tangent;
      let ascentProgress = 0;
      const climbing = startedRef.current && !climb.complete;
      if (!startedRef.current && !climb.complete) {
        point = climb.curve.getPoint(0);
        tangent = climb.curve.getTangent(0);
        shipSpeed.current = 0;
        orbitAngle.current = 0;
        orbitLastFrame.current = null;
      } else if (climbing) {
        if (playingRef.current) climb.elapsed += frameDelta * 1000;
        ascentProgress = reducedMotion ? 1 : THREE.MathUtils.clamp(climb.elapsed / ATMOSPHERIC_ASCENT_MS, 0, 1);
        const easedAscent = ascentProgress * ascentProgress * (3 - 2 * ascentProgress);
        point = climb.curve.getPoint(easedAscent);
        tangent = climb.curve.getTangent(easedAscent);
        shipSpeed.current = reducedMotion ? 0 : climb.length / ATMOSPHERIC_ASCENT_MS * (6 * ascentProgress * (1 - ascentProgress));
        orbitAngle.current = 0;
        orbitLastFrame.current = null;
        if (!climb.active) {
          climb.active = true;
          onLaunchState?.(true);
        }
        if (ascentProgress >= 1) {
          climb.complete = true;
          point.copy(pointOnOrbit(orbitData.current[0], 0));
          tangent.copy(orbitData.current[0].tangent);
          const nextStop = Math.min(queuedStation.current ?? stationRef.current, orbitData.current.length - 1);
          if (nextStop > 0) {
            const departure = orbitData.current[0];
            const targetOrbit = orbitData.current[nextStop];
            const startPoint = pointOnOrbit(departure, 0);
            const targetPoint = pointOnOrbit(targetOrbit, 0);
            const routeDuration = THREE.MathUtils.clamp(startPoint.distanceTo(targetPoint) / FLIGHT_SPEED, FLIGHT_MIN_TRANSIT_MS, FLIGHT_MAX_TRANSIT_MS);
            move.curve = makeTransitCurve(
              startPoint, targetPoint, departure.tangent, departure.distance * ORBIT_ANGULAR_SPEED,
              targetOrbit.tangent, targetOrbit.distance * ORBIT_ANGULAR_SPEED, routeDuration, true, routeObstaclesRef.current,
            );
            move.started = now;
            move.duration = routeDuration;
            move.pausedAt = playingRef.current ? null : now;
            move.easeFromRest = true;
            queuedStation.current = null;
          }
          onLaunchState?.(false);
        }
      } else if (linear < 1 && move.curve) {
        const travelProgress = reducedMotion ? 1 : progress;
        point = move.curve.getPoint(travelProgress);
        tangent = move.curve.getTangent(travelProgress);
        shipSpeed.current = reducedMotion ? 0 : move.curve.getSpeed(travelProgress, progressSpeed);
        orbitAngle.current = 0;
        orbitLastFrame.current = null;
      } else {
        if (playingRef.current && !reducedMotion && orbitLastFrame.current !== null) {
          orbitAngle.current += (now - orbitLastFrame.current) * ORBIT_ANGULAR_SPEED;
        }
        orbitLastFrame.current = playingRef.current && !reducedMotion ? now : null;
        point = pointOnOrbit(arrivalOrbit, orbitAngle.current);
        tangent = arrivalOrbit.radial.clone().multiplyScalar(-Math.sin(orbitAngle.current))
          .addScaledVector(arrivalOrbit.tangent, Math.cos(orbitAngle.current)).normalize();
        shipSpeed.current = playingRef.current && !reducedMotion ? arrivalOrbit.distance * ORBIT_ANGULAR_SPEED : 0;
      }
      shipContainer.position.copy(point);
      const direction = tangent.clone().normalize();
      const launchVehicle = launchComplex.userData.vehicle;
      // Keep the booster bells just above the pad deck as the vehicle rotates
      // to follow the ascent curve.
      launchVehicle.position.copy(point).sub(launchComplex.position).addScaledVector(direction, 1.75);
      launchVehicle.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);
      const launchVehicleVisible = !climb.complete && (!startedRef.current || (climbing && ascentProgress < 0.91));
      launchVehicle.visible = launchVehicleVisible;
      launchComplex.userData.flame.visible = startedRef.current && climbing && ascentProgress < 0.22;
      const plumePower = launchComplex.userData.flame.visible ? 0.92 - ascentProgress * 1.5 : 0;
      launchComplex.userData.flameMaterials[0].opacity = 0.72 * plumePower;
      launchComplex.userData.flameMaterials[1].opacity = 0.9 * plumePower;
      launchComplex.userData.plumeLight.intensity = plumePower * 150;
      shipContainer.visible = climb.complete || (climbing && ascentProgress > 0.86);
      if (!reducedMotion) shipContainer.position.y += Math.sin(t * 1.1) * 0.12;
      shipPosition.current.copy(shipContainer.position);
      const previousDirection = shipDirection.current.clone();
      shipDirection.current.copy(direction);
      shipContainer.lookAt(point.clone().add(direction));
      const turn = new THREE.Vector3().crossVectors(previousDirection, direction).y;
      const turnRate = frameDelta > 0 ? THREE.MathUtils.clamp(turn / frameDelta, -2.2, 2.2) : 0;
      smoothedBank = reducedMotion ? 0 : THREE.MathUtils.damp(smoothedBank, -turnRate * 0.055, 3.2, frameDelta);
      if (!reducedMotion) shipContainer.rotateZ(smoothedBank + Math.sin(t * 0.75) * 0.008);
      const isMobile = host.clientWidth < 760;
      const cameraDistance = isMobile ? 22 : 15;
      const cameraRight = new THREE.Vector3(direction.z, 0, -direction.x);
      const frameShift = isMobile ? 1.1 : THREE.MathUtils.lerp(1.7, 3.3, launchMix);
      const targetHeight = isMobile
        ? THREE.MathUtils.lerp(-2.8, -5.2, launchMix)
        : THREE.MathUtils.lerp(4, -1.2, launchMix);
      const followCamera = point.clone().addScaledVector(direction, -cameraDistance).add(new THREE.Vector3(0, cameraDistance * 0.25, 0));
      const lookTarget = point.clone().addScaledVector(direction, 5)
        .addScaledVector(cameraRight, -frameShift)
        .add(new THREE.Vector3(0, targetHeight, 0));
      if (!climb.complete) {
        const padView = point.clone().add(isMobile ? new THREE.Vector3(10, 6, 16) : new THREE.Vector3(17, 8, 26));
        const padTarget = point.clone().add(new THREE.Vector3(0, 2, 0));
        camera.position.copy(followCamera).lerp(padView, 1 - launchMix);
        camera.lookAt(lookTarget.lerp(padTarget, 1 - launchMix));
      } else {
        camera.position.copy(followCamera);
        camera.lookAt(lookTarget);
      }
      const atmosphericDensity = climb.complete
        ? 0
        : climbing ? 1 - THREE.MathUtils.smoothstep(ascentProgress, 0.38, 1) : 1;
      const scattering = Math.max(atmosphericDensity, 0.02);
      atmosphericSky.material.uniforms.cloudCoverage.value = 0;
      atmosphericSky.material.uniforms.turbidity.value = 1.8 + atmosphericDensity * 0.8;
      atmosphericSky.material.uniforms.rayleigh.value = scattering * 0.85;
      atmosphericSky.material.uniforms.mieCoefficient.value = scattering * 0.002;
      atmosphericSky.visible = climb.complete || (startedRef.current && launchMix > 0.92);
      sun.rotation.y = reducedMotion ? 0 : t * 0.018;
      sun.visible = climb.complete;
      const launchView = (!startedRef.current && stationRef.current === 0) || climbing;
      planetGroups.forEach((planet, i) => {
        planet.visible = !launchView;
        planet.rotation.y = planet.userData.baseRotationY + (reducedMotion ? 0 : t * (i % 2 ? 0.035 : -0.027));
        planet.rotation.x = planet.userData.baseRotationX + (reducedMotion ? 0 : Math.sin(t * 0.11 + i) * 0.006);
        planet.userData.moonPivot.rotation.y = reducedMotion ? 0 : t * (0.16 + i * 0.008);
      });
      backgroundPlanets.forEach((planet, i) => {
        planet.visible = !launchView;
        planet.rotation.y = planet.userData.baseRotationY + (reducedMotion ? 0 : t * planet.userData.spin);
      });
      asteroidBelt.visible = !launchView;
      asteroidBelt.rotation.y = reducedMotion ? 0 : t * 0.012;
      nebula.visible = climb.complete;
      starLayers.forEach(({ points }) => { points.visible = climb.complete; });
      stars.rotation.y = reducedMotion ? 0 : t * 0.00042;
      starLayers.forEach(({ material }, i) => { material.uniforms.uTime.value = reducedMotion ? 0 : t * (0.55 + i * 0.16); });
      nebula.material.uniforms.uTime.value = reducedMotion ? 0 : t * 0.22;
      const enginePulse = reducedMotion ? 0.82 : 0.82 + 0.18 * Math.sin(t * 5.2);
      const thrust = Math.min(1, shipSpeed.current / 0.008);
      const ignition = startedRef.current ? 1 : 0.08;
      enginePlumes.userData.materials[0].opacity = (0.12 + thrust * 0.13) * enginePulse * ignition;
      enginePlumes.userData.materials[1].opacity = (0.24 + thrust * 0.22) * enginePulse * ignition;
      enginePlumes.userData.light.intensity = 0.35 + ignition * (1.8 + thrust * 3.4);
      enginePlumes.scale.z = 0.9 + enginePulse * 0.16 + thrust * 0.16;
      advanceModelTransitions(modelTransitions, now);
      try {
        renderer.render(scene, camera);
      } catch (error) {
        disposed = true;
        cancelAnimationFrame(frame);
        onUnavailable?.(`WebGL rendering stopped: ${error?.message || "unknown graphics error"}`);
      }
    };
    frame = requestAnimationFrame(animate);

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      renderer.domElement.removeEventListener("webglcontextlost", handleContextLost);
      disposeObject(scene);
      environmentTexture.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [seed, reducedMotion, onUnavailable, onLaunchState]);

  useEffect(() => {
    if (!sceneReady) return undefined;
    const now = performance.now();
    const move = travel.current;
    const stationChanged = previousStation.current !== station;
    if (stationChanged) {
      if (!ascent.current.complete) {
        previousStation.current = station;
        queuedStation.current = station;
        return undefined;
      }
      const previousOrbit = orbitData.current[previousStation.current];
      const arrivalOrbit = orbitData.current[station];
      if (!previousOrbit || !arrivalOrbit || !shipPosition.current) {
        onUnavailable?.("The flight route was not ready when autopilot started.");
        return undefined;
      }
      const current = shipPosition.current.clone();
      const target = pointOnOrbit(arrivalOrbit, 0);
      const targetDirection = arrivalOrbit.tangent.clone();
      const duration = THREE.MathUtils.clamp(current.distanceTo(target) / FLIGHT_SPEED, FLIGHT_MIN_TRANSIT_MS, FLIGHT_MAX_TRANSIT_MS);
      const easeFromRest = !playing || shipSpeed.current < 0.0001;
      const startDirection = shipDirection.current.clone().normalize();
      const startSpeed = easeFromRest ? 0 : shipSpeed.current;
      const endSpeed = arrivalOrbit.distance * ORBIT_ANGULAR_SPEED;
      move.curve = makeTransitCurve(current, target, startDirection, startSpeed, targetDirection, endSpeed, duration, easeFromRest, routeObstaclesRef.current);
      move.started = now;
      move.duration = duration;
      move.pausedAt = playing ? null : now;
      move.easeFromRest = easeFromRest;
      orbitAngle.current = 0;
      orbitLastFrame.current = null;
      previousStation.current = station;
    } else if (move.pausedAt !== null && playing) {
      move.started += now - move.pausedAt;
      move.pausedAt = null;
    } else if (move.pausedAt === null && !playing) {
      move.pausedAt = now;
    }
  }, [station, playing, sceneReady, onUnavailable]);

  return <div className="space-canvas" ref={mount} aria-hidden="true" />;
}

export function App() {
  const [station, setStation] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const [originVisible, setOriginVisible] = useState(true);
  const [originLeaving, setOriginLeaving] = useState(false);
  const [startVisible, setStartVisible] = useState(true);
  const [startLeaving, setStartLeaving] = useState(false);
  const startHideTimer = useRef(null);
  const dwellTime = FLIGHT_MAX_TRANSIT_MS + 9000;
  const dwellRemaining = useRef(dwellTime);
  const dwellDeadline = useRef(null);
  const [seed, setSeed] = useState(randomSeed);
  const [webgl, setWebgl] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [flightError, setFlightError] = useState("");
  const [launchActive, setLaunchActive] = useState(false);
  const routeStops = useRef(null);
  const step = story[station];
  const finish = station === story.length - 1;
  const handleWebglUnavailable = useCallback((reason = "The 3D flight is unavailable.") => {
    setFlightError(reason);
    setWebgl(false);
  }, []);
  const handleLaunchState = useCallback((active) => setLaunchActive(active), []);

  useEffect(() => {
    const handleWindowError = (event) => {
      if (event.filename && !event.filename.startsWith(window.location.origin)) return;
      setFlightError(event.message || "A browser error interrupted the flight.");
      setWebgl(false);
    };
    const handleUnhandledRejection = (event) => {
      setFlightError(event.reason?.message || "A background task interrupted the flight.");
      setWebgl(false);
    };
    window.addEventListener("error", handleWindowError);
    window.addEventListener("unhandledrejection", handleUnhandledRejection);
    return () => {
      window.removeEventListener("error", handleWindowError);
      window.removeEventListener("unhandledrejection", handleUnhandledRejection);
    };
  }, []);

  useEffect(() => {
    if (!started || !playing || finish) return undefined;
    const remaining = dwellRemaining.current;
    dwellDeadline.current = performance.now() + remaining;
    const timer = window.setTimeout(() => {
      dwellDeadline.current = null;
      dwellRemaining.current = dwellTime;
      setStation((current) => Math.min(story.length - 1, current + 1));
    }, remaining);
    return () => {
      window.clearTimeout(timer);
      if (dwellDeadline.current !== null) {
        dwellRemaining.current = Math.max(0, dwellDeadline.current - performance.now());
        dwellDeadline.current = null;
      }
    };
  }, [station, started, playing, finish]);

  useEffect(() => {
    if (!finish || !playing) return undefined;
    const timer = window.setTimeout(() => setPlaying(false), dwellTime);
    return () => window.clearTimeout(timer);
  }, [finish, playing, dwellTime]);

  useEffect(() => {
    const rail = routeStops.current;
    const active = rail?.querySelector(".route-stop.is-current");
    if (rail && active) {
      const left = active.offsetLeft + active.offsetWidth / 2 - rail.clientWidth / 2;
      rail.scrollTo({ left: Math.max(0, left), behavior: reducedMotion ? "auto" : "smooth" });
    }
  }, [station, reducedMotion]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const applyPreference = () => {
      setReducedMotion(media.matches);
      if (media.matches) setPlaying(false);
    };
    applyPreference();
    const onChange = applyPreference;
    media.addEventListener?.("change", onChange);
    return () => media.removeEventListener?.("change", onChange);
  }, []);

  const goTo = (index) => {
    if (started && launchActive) return;
    const target = Math.min(story.length - 1, Math.max(0, index));
    if (target !== station) {
      dwellRemaining.current = dwellTime;
      dwellDeadline.current = null;
    }
    setStation(target);
    if (!started) {
      setStarted(true);
      dwellRemaining.current = dwellTime + ATMOSPHERIC_ASCENT_MS;
      dwellDeadline.current = null;
      setOriginLeaving(true);
      setStartLeaving(true);
      setPlaying(true);
      window.clearTimeout(startHideTimer.current);
      startHideTimer.current = window.setTimeout(() => setStartVisible(false), 750);
    }
  };
  const restart = () => {
    setSeed(randomSeed());
    setStation(0);
    setStarted(false);
    setLaunchActive(false);
    setOriginVisible(true);
    setOriginLeaving(false);
    setStartVisible(true);
    setStartLeaving(false);
    window.clearTimeout(startHideTimer.current);
    startHideTimer.current = null;
    setPlaying(false);
    dwellRemaining.current = dwellTime;
    dwellDeadline.current = null;
  };

  useEffect(() => {
    const onKeyDown = (event) => {
      if (["ArrowRight", "PageDown"].includes(event.key)) {
        event.preventDefault();
        goTo(station + 1);
      } else if (["ArrowLeft", "PageUp"].includes(event.key)) {
        event.preventDefault();
        goTo(station - 1);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [station, launchActive, started]);

  return (
    <main className={`flight ${webgl ? "" : "flight--fallback"} ${started ? "flight--started" : "flight--intro"}`}>
      {webgl && <SpaceScene station={station} seed={seed} reducedMotion={reducedMotion} playing={playing} started={started} onUnavailable={handleWebglUnavailable} onLaunchState={handleLaunchState} />}
      <div className="space-fallback" aria-hidden="true" />
      {originVisible && <div className={`origin-scene ${originLeaving ? "is-leaving" : ""}`} aria-hidden="true" onTransitionEnd={(event) => { if (event.propertyName === "opacity" && originLeaving) setOriginVisible(false); }} />}
      {!webgl && <div className="spacecraft-fallback" aria-hidden="true">
        <div className="spacecraft-fallback__world" />
        <svg viewBox="0 0 420 520" role="presentation">
          <defs>
            <linearGradient id="fallback-hull" x1="0" x2="1" y1="0" y2="1"><stop stopColor="#f4f3ea"/><stop offset=".48" stopColor="#8c9ba9"/><stop offset="1" stopColor="#354453"/></linearGradient>
            <linearGradient id="fallback-solar" x1="0" x2="1"><stop stopColor="#28628a"/><stop offset=".5" stopColor="#6da6c2"/><stop offset="1" stopColor="#163c60"/></linearGradient>
            <radialGradient id="fallback-engine"><stop stopColor="#e9fbff"/><stop offset=".26" stopColor="#72e5ff" stopOpacity=".86"/><stop offset="1" stopColor="#46a8ff" stopOpacity="0"/></radialGradient>
            <filter id="fallback-glow"><feGaussianBlur stdDeviation="8"/></filter>
          </defs>
          <g stroke="#b7c5ce" strokeWidth="2" fill="none" opacity=".82">
            <path d="M207 267 158 334M213 267 262 334M207 372 158 421M213 372 262 421"/>
          </g>
          <g stroke="#d0dce4" strokeWidth="2">
            <path d="M27 333 185 322 190 431 31 445Z" fill="url(#fallback-solar)"/>
            <path d="M393 333 235 322 230 431 389 445Z" fill="url(#fallback-solar)"/>
          </g>
          <g stroke="#b7d2e2" strokeWidth="1" opacity=".58">
            <path d="m65 330 4 111m37-114 3 110m37-113 2 109m37-112 2 108M355 330l-4 111m-37-114-3 110m-37-113-2 109m-37-112-2 108M33 368l154-6m-153 43 155-6m198-31-154-6m153 43-155-6"/>
          </g>
          <ellipse cx="210" cy="451" rx="40" ry="52" fill="url(#fallback-engine)" filter="url(#fallback-glow)"/>
          <path d="M210 60c-13 25-22 55-24 91l-11 69 10 115 8 42h34l8-42 10-115-11-69c-2-36-11-66-24-91Z" fill="url(#fallback-hull)" stroke="#f1f4ef" strokeWidth="3"/>
          <path d="M194 171q16-30 32 0l7 31h-46Z" fill="#7ed7eb" stroke="#ddf6fc" strokeWidth="2"/>
          <path d="M180 331h60l-8 43h-44Z" fill="#263746" stroke="#d0dce4" strokeWidth="2"/>
          <path d="M188 386h44l-7 38h-30Z" fill="#bb8051" stroke="#f2be8b" strokeWidth="2"/>
          <path d="M210 85v64" stroke="#fff9e7" strokeWidth="3" opacity=".72"/>
        </svg>
      </div>}
      <div className="space-vignette" aria-hidden="true" />
      {flightError && <div className="flight-diagnostic" role="status">
        <span>The flight switched to its backup view.</span>
        <details><summary>Show the error</summary><code>{flightError}</code></details>
      </div>}

      <header className="flight-header">
        <a href="#top" className="wordmark" onClick={(event) => { event.preventDefault(); started ? restart() : goTo(1); }} aria-label="Romone Dunlop, restart flight">ROMONE<span>.</span></a>
        {started
          ? <button className={`autopilot ${playing ? "is-on" : "is-paused"}`} onClick={() => setPlaying((value) => !value)} aria-label={playing ? "Pause autopilot" : "Resume autopilot"} aria-pressed={playing}>
              <span className="autopilot__light" />{playing ? "Pause flight" : "Resume flight"}
            </button>
          : <div className="autopilot autopilot--ready"><span className="autopilot__light" />Autopilot ready</div>}
      </header>

      {startVisible && <button
        className={`start-flight ${startLeaving ? "is-leaving" : ""}`}
        onClick={() => goTo(1)}
        onTransitionEnd={(event) => {
          if (event.propertyName === "opacity" && startLeaving) {
            window.clearTimeout(startHideTimer.current);
            startHideTimer.current = null;
            setStartVisible(false);
          }
        }}
        aria-label="Start the automatic flight through Romone's projects"
      >
        <span className="start-flight__icon" aria-hidden="true">↗</span>
        <span className="start-flight__label"><small>From the coast, outward</small>Begin the flight</span>
      </button>}

      <section className={`story-panel ${station === 0 ? "story-panel--intro" : ""}`} style={{ "--story-accent": step.accent }} key={station} aria-labelledby="story-title" aria-live="polite">
        <p className="story-eyebrow">{step.eyebrow}</p>
        <h1 id="story-title">{step.title}</h1>
        <p className="story-copy">{step.text}</p>
        {(step.proof || step.image) && <div className="story-details">
          {step.proof && <p className="story-proof">{step.proof}</p>}
          {step.image && <figure className={`story-media ${step.image.endsWith(".svg") ? "story-media--landscape" : ""}`}>
            <a href={step.imageHref} target="_blank" rel="noreferrer"><img src={step.image} alt={step.imageAlt} loading="lazy" /></a>
            <figcaption><a href={step.imageHref} target="_blank" rel="noreferrer">{step.imageCaption}</a></figcaption>
          </figure>}
        </div>}
        {step.link && <a className="story-link" href={step.link[1]} target={step.link[1].startsWith("https://") && !step.link[1].includes("romone.me") ? "_blank" : undefined} rel="noreferrer">{step.link[0]}<span aria-hidden="true"> ↗</span></a>}
        {step.secondaryLink && <a className="story-secondary-link" href={step.secondaryLink[1]} target="_blank" rel="noreferrer">{step.secondaryLink[0]}</a>}
      </section>

      <div className="planet-label" aria-hidden="true"><span className="planet-label__line" />{step.planet}</div>
      <div className="flight-controls" aria-label="Flight controls">
        <button className="icon-button text-control" onClick={() => goTo(station - 1)} disabled={station === 0} aria-label="Previous story stop">PREV</button>
        <nav className="flight-route" ref={routeStops} aria-label="Story chapters">
          {story.map((item, index) => <button key={item.planet} onClick={() => goTo(index)} className={`route-stop ${index === station ? "is-current" : ""} ${index < station ? "is-passed" : ""}`} aria-label={`Go to ${item.navLabel}`} aria-current={index === station ? "step" : undefined}><span className="route-stop__number">{String(index + 1).padStart(2, "0")}</span><span className="route-stop__label">{item.navLabel}</span></button>)}
        </nav>
        {finish ? <button className="icon-button icon-button--replay" onClick={restart} aria-label="Fly a new randomized route">REPLAY</button> : <button className="icon-button text-control" onClick={() => goTo(station + 1)} aria-label="Next story stop">NEXT</button>}
        <span className="flight-counter">{String(station + 1).padStart(2, "0")} <i>/</i> {String(story.length).padStart(2, "0")}</span>
      </div>
    </main>
  );
}
