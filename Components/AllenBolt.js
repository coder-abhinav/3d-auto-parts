import * as THREE from "three";

import ThreadedBolt from "./ThreadedBolt";
import { steelMaterial } from "../Utils/Index";
import AllenHead from "./AllenHead";
import { GUI } from "dat.gui";

const AllenBolt = () => {
  let allenBolt = new THREE.Group();
  let boltGroup = new THREE.Group();

  const gui = new GUI();

  const material = steelMaterial();

  const head = AllenHead(0.8, material);
  head.position.y = 1.8;

  boltGroup.add(head);

  // top-most layer of bolt

  let topBoltGeometry = new THREE.CylinderGeometry(0.4, 0.4, 1.5);
  let topBolt = new THREE.Mesh(topBoltGeometry, material);
  topBolt.position.y = 1;

  boltGroup.add(topBolt);

  // Threaded part

  const threadedBolt = ThreadedBolt({
    radius: 0.32,
    height: 3,
    shaftHeight: 0.1,
    material,
    boltPosition: 0,
    springPosition: 1.4,
    shaftPosition: -1.55,
    springRadius: 0.34,
    turns: 9,
    segmentsPerTurn: 100,
    springHeight: -0.96,
    growth: 3,
  });
  boltGroup.add(threadedBolt);

  allenBolt.add(boltGroup);

  gui.add(boltGroup.scale, "y", 0, 2).name("Bolt Length");

  return allenBolt;
};

export default AllenBolt;
