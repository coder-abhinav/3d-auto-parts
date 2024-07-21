import * as THREE from "three";
import Spring from "./Spring";

const ThreadedBolt = ({
  radius,
  height,
  shaftHeight,
  material,
  boltPosition,
  springPosition,
  shaftPosition,
  springRadius,
  turns,
  segmentsPerTurn,
  springHeight,
  growth,
}) => {
  let threadGroup = new THREE.Group();

  const shaft = radius - 0.07;

  let middleBoltGeometry = new THREE.CylinderGeometry(radius, radius, height);
  let middleBolt = new THREE.Mesh(middleBoltGeometry, material);
  middleBolt.position.y = boltPosition;

  threadGroup.add(middleBolt);

  let lowerBoltGeometry = new THREE.CylinderGeometry(
    radius,
    shaft,
    shaftHeight
  );
  let bottomBolt = new THREE.Mesh(lowerBoltGeometry, material);
  bottomBolt.position.y = shaftPosition;

  threadGroup.add(bottomBolt);

  let spring = new Spring(
    springRadius,
    turns,
    segmentsPerTurn,
    springHeight,
    growth,
    material
  );
  spring.update();

  spring.position.y = springPosition;

  threadGroup.add(spring);

  return threadGroup;
};

export default ThreadedBolt;
