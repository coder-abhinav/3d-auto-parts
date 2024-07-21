import * as THREE from "three";
import HexHead from "./HexHead";
import ThreadedBolt from "./ThreadedBolt";
import { steelMaterial } from "../Utils/Index";

const HexBolt = () => {
  let hexBolt = new THREE.Group();

  const material = steelMaterial();

  const head = HexHead(0.6, material);

  hexBolt.add(head);

  // top-most layer of bolt

  let topBoltGeometry = new THREE.CylinderGeometry(0.3, 0.3, 1.5);
  let topBolt = new THREE.Mesh(topBoltGeometry, material);
  topBolt.position.y = 1;

  hexBolt.add(topBolt);

  // Threaded part

  const threadedBolt = ThreadedBolt({
    radius: 0.22,
    height: 3,
    shaftHeight: 0.1,
    material,
    boltPosition: 0,
    springPosition: 0.43,
    shaftPosition: -1.55,
    springRadius: 0.24,
    turns: 8,
    segmentsPerTurn: 100,
    springHeight: -0.96,
    growth: 2,
  });
  hexBolt.add(threadedBolt);

  return hexBolt;
};

export default HexBolt;
