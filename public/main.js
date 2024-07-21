import * as THREE from "three";
import { CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { generateText, light } from "./Utils/Index";
import HexBolt from "./Components/HexBolt";

// Create a scene
let scene = new THREE.Scene();
let boltGroup = new THREE.Group();

// Create a camera
let camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

// Create a renderer
let renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

const labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(window.innerWidth, window.innerHeight);
labelRenderer.domElement.style.position = "absolute";
labelRenderer.domElement.style.top = "0px";

// uncomment this if you want orbit controls
// labelRenderer.domElement.style.pointerEvents = "none";

document.body.appendChild(labelRenderer.domElement);

let hexBolt = HexBolt();

boltGroup.add(hexBolt);

scene.add(boltGroup);

//lighting starts here

const directionalLight1 = light({
  x: 1,
  y: 1,
  z: 1,
  intensity: 0.5,
  color: 0xffffff,
});

scene.add(directionalLight1);

const directionalLight2 = light({
  x: 1,
  y: 1,
  z: 1,
  intensity: 0.5,
  color: 0xffffff,
});

scene.add(directionalLight2);
const directionalLight3 = light({
  x: -1,
  y: 1,
  z: -1,
  intensity: 0.5,
  color: 0xffffff,
});

scene.add(directionalLight3);
const directionalLight4 = light({
  x: 1,
  y: 1,
  z: -1,
  intensity: 0.5,
  color: 0xffffff,
});

scene.add(directionalLight4);

//lighting ends here

// Dimensions starts Here

const flatHeadText = generateText({ x: 4, y: 3, text: "Flat Head : 2cm" });
scene.add(flatHeadText);

const boltLengthText = generateText({
  x: 4,
  y: 2.7,
  text: "Bolt Length : 10cm",
});
scene.add(boltLengthText);

const pitchLengthText = generateText({
  x: 4,
  y: 2.4,
  text: "Pitch Length : 1mm ",
});
scene.add(pitchLengthText);

// dimensions end here

// Mouse interaction variables
let isDragging = false;
let previousMousePosition = {
  x: 0,
  y: 0,
};

// Event listeners for mouse interaction
document.addEventListener("mousedown", function (event) {
  isDragging = true;
  previousMousePosition.x = event.clientX;
  previousMousePosition.y = event.clientY;
});

document.addEventListener("mousemove", function (event) {
  if (isDragging) {
    let deltaMove = {
      x: event.clientX - previousMousePosition.x,
      y: event.clientY - previousMousePosition.y,
    };

    boltGroup.rotation.y += deltaMove.x * 0.01;
    boltGroup.rotation.x += deltaMove.y * 0.01;
    boltGroup.rotation.z += -(deltaMove.x + deltaMove.y) * 0.01;
  }

  previousMousePosition = {
    x: event.clientX,
    y: event.clientY,
  };
  labelRenderer.render(scene, camera);
});

document.addEventListener("mouseup", function (event) {
  isDragging = false;
});

// Render loop
function animate() {
  boltGroup.rotation.y += 0.01;
  boltGroup.rotation.x += 0.01;
  boltGroup.rotation.z += 0.01;
  renderer.render(scene, camera); //display what the camera in the scene captured
  window.requestAnimationFrame(animate);
}

animate();
