import * as THREE from "three";

class Spring extends THREE.Mesh {
  constructor(radius, turns, segmentsPerTurn, height, growth, material) {
    let g = new THREE.CylinderGeometry(
      0.02,
      0.055,
      1,
      16,
      segmentsPerTurn * turns
    )
      .translate(0, 0.5, 0)
      .rotateX(Math.PI * 0.5);
    let initPos = g.attributes.position.clone();
    super(g, material);
    this.radius = radius;
    this.turns = turns;
    this.segmentsPerTurn = segmentsPerTurn;
    this.height = height;
    this.growth = growth;

    this.update = () => {
      let _n = new THREE.Vector3(0, 1, 0),
        _v3 = new THREE.Vector3(),
        _s = new THREE.Vector3();

      let pos = g.attributes.position;
      for (let i = 0; i < initPos.count; i++) {
        let ratio = initPos.getZ(i) * this.growth;
        let angle = this.turns * Math.PI * 2 * ratio;
        _v3.fromBufferAttribute(initPos, i).setZ(0);
        _v3.applyAxisAngle(_n, angle + Math.PI * 0.5);
        _v3.add(
          _s.setFromCylindricalCoords(this.radius, angle, this.height * ratio)
        );
        pos.setXYZ(i, ..._v3);
      }
      g.computeVertexNormals();
      pos.needsUpdate = true;
    };
  }
}

export default Spring;
