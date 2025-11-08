import './style.css';
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as jeans from "./assets/jeans-fabric_albedo.png";
import * as normal from "./assets/jeans-fabric_normal-ogl.png";
import * as jeansao from "./assets/jeans-fabric_ao.png";
import * as bark from "./assets/bark1-albedo.png";
import * as barkNorm from "./assets/bark1-normal3.png";
import * as barkao from "./assets/bark1-ao.png";
import * as future from "./assets/background.jpg"


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75, window.innerWidth / window.innerHeight, 0.1, 1000
);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')!
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(0);

const futurama = new THREE.TextureLoader().load(future.default);
scene.background = futurama;
scene.backgroundIntensity = 0.05;

// bark texture for the ball
const barkText = new THREE.TextureLoader().load(bark.default);
const barkNormal = new THREE.TextureLoader().load(barkNorm.default);
const barkAo = new THREE.TextureLoader().load(barkao.default);

const geometry = new THREE.TorusGeometry(10, 3.5, 25, 200);
const material = new THREE.MeshStandardMaterial({
  map: barkText,
  normalMap: barkNormal,
  aoMap: barkAo
});
const torus = new THREE.Mesh(geometry, material);


// jeans texture for the ball
const jeansText = new THREE.TextureLoader().load(jeans.default);
const jeansNormal = new THREE.TextureLoader().load(normal.default);
const jeansAo = new THREE.TextureLoader().load(jeansao.default);

const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(5, 20, 20),
  new THREE.MeshStandardMaterial({
    map: jeansText,
    normalMap: jeansNormal,
    aoMap: jeansAo,
  })
);
sphere.position.set(10, 0, -30);
torus.position.set(10, 0, -30);
scene.add(torus, sphere);

// let there be bluish light
const pointLight = new THREE.PointLight(0xffffff, 25);
pointLight.position.set(10, 2, -23);
const pointLight2 = new THREE.PointLight(0x6f5050, 100);
pointLight2.position.set(-5, 5, 20);
const ambientLight = new THREE.AmbientLight(0x888888);

scene.add(pointLight, pointLight2, ambientLight);
const controls = new OrbitControls(camera, renderer.domElement);


// helper
// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

function addStar() {
  const size = Math.random() * 0.05;
  const [shiftR, shiftG, shiftB] = Array(3).fill(0).map(() => Math.floor(Math.random() * 50 + 206));
  const color = (shiftR << 16) | (shiftG << 8) | shiftB;
  const material = new THREE.MeshStandardMaterial({ color: color });

  const geometry = new THREE.SphereGeometry(size, 5, 5);
  const sphere = new THREE.Mesh(geometry, material);

  const [x, y, z] = [
    THREE.MathUtils.randFloatSpread(100),
    THREE.MathUtils.randFloatSpread(100),
    THREE.MathUtils.randFloatSpread(100)
  ];
  sphere.position.set(x, y, z);
  scene.add(sphere);
}

function moveCamera() {
  const t = Math.min(0, document.body.getBoundingClientRect().top);
  camera.position.z = t * -0.01;
  camera.position.y = t * -0.0002;
  camera.position.x = t * -0.0002;
}

document.body.onscroll = moveCamera;

function animate() {
  requestAnimationFrame(animate);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  torus.rotation.x += 0.005;
  torus.rotation.y += 0.004;
  torus.rotation.z += 0.005;
  sphere.rotation.y += 0.01;

  controls.update()
  renderer.render(scene, camera);
}

for (let i = 0; i < 5_000; i++) { addStar(); }
animate();
