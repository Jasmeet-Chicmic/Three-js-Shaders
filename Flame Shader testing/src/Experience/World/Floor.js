import * as THREE from "three";
import Experience from "../Experience.js";
import vertexshader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";
export default class Floor {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.setGeometry();
    this.setTextures();
    this.setMaterial();
    this.setMesh();
  }

  setGeometry() {
    // this.boxGeometry = new THREE.BoxGeometry(1, 1, 1);
    // this.boxMesh = new THREE.Mesh(
    //   this.boxGeometry,
    //   new THREE.MeshBasicMaterial({ color: "#fffff" })
    // );
    // this.scene.add(this.boxMesh);
    // this.boxMesh.position.z -= 2;
    this.geometry = new THREE.PlaneGeometry(1, 1.5);
  }

  setTextures() {
    this.textures = {};

    this.textures.color = this.resources.items.flameTexture;
    this.textures.color.colorSpace = THREE.SRGBColorSpace;
    this.textures.color.repeat.set(1.5, 1.5);
    this.textures.color.wrapS = THREE.RepeatWrapping;
    this.textures.color.wrapT = THREE.RepeatWrapping;

    this.textures.normal = this.resources.items.grassNormalTexture;
    this.textures.normal.repeat.set(1.5, 1.5);
    this.textures.normal.wrapS = THREE.RepeatWrapping;
    this.textures.normal.wrapT = THREE.RepeatWrapping;
  }

  setMaterial() {
    this.material = new THREE.RawShaderMaterial({
      vertexShader: vertexshader,
      fragmentShader: fragmentShader,
      transparent: true,
      uniforms: {
        uNoiseTexture: { value: this.resources.items.flameTexture },
        u_time: { value: 0 },
        u_PivotPosition: { value: new THREE.Vector3() },
        u_FlameColor: { value: new THREE.Color(0, 0.725, 1) },
        u_AlphaFalloffStart: { value: 0.3 },
        u_AlphaFalloffEnd: { value: 0.4 },
        u_FlameFalloffStart: { value: 0.45 },
        u_FlameFalloffEnd: { value: 0.48 },
      },
    });
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    // this.mesh.rotation.x = -Math.PI * 0.5;
    this.mesh.receiveShadow = true;
    this.scene.add(this.mesh);
  }
  update() {
    console.log(this.experience.time.elapsed);
    if (this.material)
      this.material.uniforms.u_time.value =
        this.experience.time.elapsed * 0.002;
  }
}
