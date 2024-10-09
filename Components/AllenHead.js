import * as THREE from "three";
import { Brush, Evaluator, SUBTRACTION } from "three-bvh-csg";
import { GUI } from "dat.gui";

const AllenHead = (flatHead, material) => {
  let headGroup = new THREE.Group();
  const gui = new GUI();

  const params = {
    headDiameter: 1,
  };

  const baseGeometry = new THREE.CylinderGeometry(flatHead, flatHead, 0.5);
  let base = new Brush(baseGeometry, material);

  let hexCylinder = new THREE.CylinderGeometry(
    flatHead - flatHead / 2,
    flatHead - flatHead / 2,
    0.5,
    6
  );
  let cylinder = new Brush(hexCylinder, material);

  const evaluator = new Evaluator();
  let result = evaluator.evaluate(base, cylinder, SUBTRACTION);
  headGroup.add(result);

  const regenerateAllenHead = () => {
    const newBaseGeometry = new THREE.CylinderGeometry(
      params.headDiameter,
      params.headDiameter,
      0.5
    );

    base.geometry.dispose();
    base.geometry = newBaseGeometry;

    const newHexCylinder = new THREE.CylinderGeometry(
      params.headDiameter - params.headDiameter / 2,
      params.headDiameter - params.headDiameter / 2,
      0.5,
      6
    );

    cylinder.geometry.dispose();
    cylinder.geometry = newHexCylinder;

    headGroup.remove(result);
    result = evaluator.evaluate(base, cylinder, SUBTRACTION);
    headGroup.add(result);
  };

  gui
    .add(params, "headDiameter", 0.1, 2)
    .name("Flat Head Radius")
    .onChange(regenerateAllenHead);

  return headGroup;
};

export default AllenHead;
