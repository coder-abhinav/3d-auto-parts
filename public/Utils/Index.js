import * as THREE from "three";
import { CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer";

export const light = ({ x, y, z, intensity, color }) => {
  let directionalLight = new THREE.DirectionalLight(color);
  directionalLight.position.set(x, y, z).normalize();
  directionalLight.intensity = intensity;

  return directionalLight;
};

export const generateText = ({ x, y, text }) => {
  const TEXT = document.createElement("p");

  (TEXT.textContent = text), (TEXT.style.color = "white");

  const Div = document.createElement("div");

  Div.appendChild(TEXT);

  const DivContainer = new CSS2DObject(Div);
  DivContainer.position.y = y;
  DivContainer.position.x = x;
  return DivContainer;
};

export const steelMaterial = () => {
  const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,

    roughness: 0.5,
    metalness: 0.7,

    // roughnessMap: roughnessMap,
    // metalnessMap: metalnessMap,

    // envMap: envMap, // important -- especially for metals!
    // envMapIntensity: envMapIntensity,
  });
  return material;
};
export const steelMaterialBlack = () => {
  const material = new THREE.MeshStandardMaterial({
    color: "black",

    roughness: 0.5,
    metalness: 0.7,

    // roughnessMap: roughnessMap,
    // metalnessMap: metalnessMap,

    // envMap: envMap, // important -- especially for metals!
    // envMapIntensity: envMapIntensity,
  });
  return material;
};
