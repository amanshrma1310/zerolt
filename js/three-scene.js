/**
 * ZEROLT.COM - INTERACTIVE 3D HERO ENGINE
 * Built with Three.js (WebGL)
 * Creates dynamic 3D neural nodes & floating geometric workflow constellation
 */

(function () {
  'use strict';

  const canvas = document.getElementById('hero-3d-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  // Scene setup
  const scene = new THREE.Scene();
  
  // Camera
  const camera = new THREE.PerspectiveCamera(
    60,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    1000
  );
  camera.position.z = 85;

  // Renderer with antialias and alpha
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance'
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);

  // Mouse interaction variables with easing
  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;
  const windowHalfX = window.innerWidth / 2;
  const windowHalfY = window.innerHeight / 2;

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(ambientLight);

  const pointLight1 = new THREE.PointLight(0x5e43f3, 2.5, 200);
  pointLight1.position.set(40, 30, 40);
  scene.add(pointLight1);

  const pointLight2 = new THREE.PointLight(0xff7a59, 1.8, 200);
  pointLight2.position.set(-40, -30, 30);
  scene.add(pointLight2);

  // Central Floating 3D Geometric Torus / Polyhedron (The Automation Core)
  const group = new THREE.Group();
  scene.add(group);

  // Wireframe outer sphere
  const icosahedronGeo = new THREE.IcosahedronGeometry(26, 2);
  const icosahedronMat = new THREE.MeshStandardMaterial({
    color: 0x5e43f3,
    wireframe: true,
    transparent: true,
    opacity: 0.18,
    roughness: 0.2,
    metalness: 0.8
  });
  const icosahedron = new THREE.Mesh(icosahedronGeo, icosahedronMat);
  group.add(icosahedron);

  // Inner Torus Knot
  const torusGeo = new THREE.TorusKnotGeometry(12, 2.8, 100, 16);
  const torusMat = new THREE.MeshStandardMaterial({
    color: 0x6e56cf,
    emissive: 0x221355,
    roughness: 0.3,
    metalness: 0.7,
    wireframe: true,
    transparent: true,
    opacity: 0.35
  });
  const torusKnot = new THREE.Mesh(torusGeo, torusMat);
  group.add(torusKnot);

  // Floating Neural Particle Nodes
  const particleCount = window.innerWidth < 768 ? 45 : 90;
  const particleGeo = new THREE.BufferGeometry();
  const particlePositions = new Float32Array(particleCount * 3);
  const particleScales = new Float32Array(particleCount);

  for (let i = 0; i < particleCount * 3; i += 3) {
    particlePositions[i] = (Math.random() - 0.5) * 160;
    particlePositions[i + 1] = (Math.random() - 0.5) * 120;
    particlePositions[i + 2] = (Math.random() - 0.5) * 80;
    particleScales[i / 3] = Math.random() * 2 + 1;
  }

  particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

  // Particle Material
  const particleMat = new THREE.PointsMaterial({
    color: 0x7c65f9,
    size: 2.2,
    transparent: true,
    opacity: 0.7,
    blending: THREE.AdditiveBlending
  });

  const particles = new THREE.Points(particleGeo, particleMat);
  scene.add(particles);

  // Position group slightly towards the right for desktop
  function updateGroupPosition() {
    if (window.innerWidth > 992) {
      group.position.x = 22;
      group.position.y = 0;
    } else {
      group.position.x = 0;
      group.position.y = -10;
    }
  }
  updateGroupPosition();

  // Mouse move listener
  document.addEventListener('mousemove', function (e) {
    mouseX = (e.clientX - windowHalfX) * 0.05;
    mouseY = (e.clientY - windowHalfY) * 0.05;
  });

  // Touch move listener for mobile
  document.addEventListener('touchmove', function (e) {
    if (e.touches.length > 0) {
      mouseX = (e.touches[0].clientX - windowHalfX) * 0.04;
      mouseY = (e.touches[0].clientY - windowHalfY) * 0.04;
    }
  }, { passive: true });

  // Window resize handler
  window.addEventListener('resize', function () {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    updateGroupPosition();
  });

  // Animation Loop
  let clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();
    const elapsedTime = clock.getElapsedTime();

    // Smooth camera / group rotation following mouse with inertia
    targetX += (mouseX - targetX) * 0.04;
    targetY += (mouseY - targetY) * 0.04;

    group.rotation.y = elapsedTime * 0.18 + targetX * 0.02;
    group.rotation.x = Math.sin(elapsedTime * 0.12) * 0.15 - targetY * 0.02;

    torusKnot.rotation.z = elapsedTime * 0.25;
    torusKnot.rotation.y = elapsedTime * 0.3;

    // Gentle floating bob
    group.position.y += Math.sin(elapsedTime * 1.5) * 0.025;

    // Subtle particle drift
    particles.rotation.y = elapsedTime * 0.05;

    renderer.render(scene, camera);
  }

  animate();
})();
