const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 4;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

const light1 = new THREE.PointLight(0xff0033, 3, 100);
light1.position.set(5, 5, 5);
scene.add(light1);

const light2 = new THREE.PointLight(0xff3366, 2, 100);
light2.position.set(-5, -5, -5);
scene.add(light2);

const ambient = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambient);

// Custom Heart Shape
const heartShape = new THREE.Shape();
heartShape.moveTo(0, 0);
heartShape.bezierCurveTo(0, 0, -1.2, -1.2, -1.2, 0.6);
heartShape.bezierCurveTo(-1.2, 1.8, 0, 2.5, 0, 3);
heartShape.bezierCurveTo(0, 2.5, 1.2, 1.8, 1.2, 0.6);
heartShape.bezierCurveTo(1.2, -1.2, 0, 0, 0, 0);

const geometry = new THREE.ExtrudeGeometry(heartShape, {
  depth: 1,
  bevelEnabled: true,
  bevelSegments: 5,
  steps: 2,
  bevelSize: 0.2,
  bevelThickness: 0.2,
});

const material = new THREE.MeshStandardMaterial({
  color: 0xff0033,
  emissive: 0xff0033,
  emissiveIntensity: 0.8,
  roughness: 0.3,
  metalness: 0.2,
});

const heart = new THREE.Mesh(geometry, material);
heart.rotation.x = Math.PI;
heart.rotation.y = Math.PI;
heart.position.y = -1.5;
scene.add(heart);

// Beat Animation
gsap.to(heart.scale, {
  x: 1.2,
  y: 1.2,
  z: 1.2,
  duration: 0.4,
  repeat: -1,
  yoyo: true,
  ease: "power1.inOut"
});

// Floating Particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 500;
const posArray = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
  posArray[i] = (Math.random() - 0.5) * 10;
}

particlesGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(posArray, 3)
);

const particlesMaterial = new THREE.PointsMaterial({
  size: 0.02,
  color: 0xff6699
});

const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

function animate() {
  requestAnimationFrame(animate);
  heart.rotation.y += 0.01;
  particles.rotation.y += 0.0005;
  renderer.render(scene, camera);
}
animate();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
