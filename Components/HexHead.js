import { GUI } from "dat.gui";
import * as THREE from "three";

const HexHead = (flatHead, material) => {
  const headGroup = new THREE.Group();
  const gui = new GUI();

  const buffTop = flatHead - 0.15;
  const circleEnd = buffTop - 0.4;

  const headGeometry = new THREE.CylinderGeometry(flatHead, flatHead, 0.4, 6);
  const head = new THREE.Mesh(headGeometry, material);
  head.position.y = 1.85;

  const buffingGeometry = new THREE.CylinderGeometry(
    buffTop,
    flatHead,
    0.04,
    6
  );
  const buffedHead = new THREE.Mesh(buffingGeometry, material);
  buffedHead.position.y = 0.225;
  head.add(buffedHead);

  const circularCylinderGeometry = new THREE.CylinderGeometry(
    buffTop,
    circleEnd,
    0.1
  );
  const topCircle = new THREE.Mesh(circularCylinderGeometry, material);
  topCircle.position.y = 2.05;

  headGroup.add(topCircle);

  const geometryParams = { headDiameter: 0.8 };

  const regenerateFlatHead = () => {
    const newBuffedTop = geometryParams.headDiameter - 0.15;

    const newCircularEnd = newBuffedTop - 0.4;

    const newHeadGeometry = new THREE.CylinderGeometry(
      geometryParams.headDiameter,
      geometryParams.headDiameter,
      0.4,
      6
    );
    head.geometry.dispose();
    head.geometry = newHeadGeometry;

    const newBuffingGeometry = new THREE.CylinderGeometry(
      newBuffedTop,
      geometryParams.headDiameter,
      0.04,
      6
    );

    buffedHead.geometry.dispose();
    buffedHead.geometry = newBuffingGeometry;

    const newCircularCylinderGeometry = new THREE.CylinderGeometry(
      newBuffedTop,
      newCircularEnd,
      0.1
    );

    topCircle.geometry.dispose();
    topCircle.geometry = newCircularCylinderGeometry;
  };

  gui
    .add(geometryParams, "headDiameter", 0.5, 1)
    .name("Flat Head")
    .onChange(regenerateFlatHead);

  headGroup.add(head);

  return headGroup;
};

export default HexHead;
