import './style.scss'
import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
//import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let mixer: Object = {};

let canvasObj= document.getElementById('planeWrap');
  
  const scene = new THREE.Scene()
   //scene.background = new THREE.Color(0xdddddd);

  const camera = new THREE.PerspectiveCamera(
    40,
    window.innerWidth / window.innerHeight,
    1,
    5000
  )

  let scaleSize = 2.5
if(window.innerWidth >1025) {
  camera.position.set(0,0,3.3)
}else{
  camera.position.set(0,0,5)
  scaleSize = 4
}
  
  //camera.rotation.z = -.3

  
  let hlight = new THREE.AmbientLight(0x404040, 100)

  scene.add(hlight)

  const renderer = new THREE.WebGLRenderer({ 
    antialias: true, 
    alpha: true,
   // canvas : document.querySelector('#planeWrap')
   })
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  canvasObj!.appendChild(renderer.domElement);

  // const controls = new OrbitControls(camera, renderer.domElement);
  // controls.update();

  //HELPERS 
// const axesHelper = new THREE.AxesHelper(5);
// let gridHelper = new THREE.GridHelper(30, 30);

// scene.add( axesHelper, gridHelper);

  

  let loader = new GLTFLoader()

  loader.load('./gltf/scene.gltf', (gltf) => {
    let model = gltf.scene;
    model.position.y = -0.2;
    model.rotation.x = 0.6;
    model.rotation.y = 0.6;
    scene.add(model)

    //const clips = gltf.animations;
    mixer = new THREE.AnimationMixer( model );
   // const idleClip = THREE.AnimationClip.findByName(clips, 'Take 001')
   
      
    //const idleAction = mixer.clipAction(idleClip)
    const idleAction = mixer.clipAction((gltf as any).animations[0])
    idleAction.play()     
    animate()
    renderer.render(scene, camera)
    
    
  }) 

  const clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);

    if (mixer) {
      mixer.update(clock.getDelta());
    }
    renderer.render(scene, camera);
  }

  ScrollTrigger.defaults({
    immediateRender: false,
  //  ease: "power1.inOut",
    scrub: true
  });
  let car_anim = gsap.timeline()
 
  car_anim.to(scene.rotation, {y: -.5, x: -.5, z:-.25, scrollTrigger: {
    trigger: ".homeBanner",
    scrub: 1,
    start: "top top",
    end: "50% top",
   // markers: true,
}}, .2).to(scene.rotation, {y: -.9,x: -.8, z:-.8, scrollTrigger: {
  trigger: ".bgColor",
  scrub: 1,
  start: "top top",
  end: "bottom top",
  //markers: true,
}}, 0) 
.to(camera.position, {y: .18, z:scaleSize, scrollTrigger: {
  trigger: ".bgColor",
  scrub: 1,
  start: "top top",
  end: "bottom top",
  //markers: true,
}}, 0)

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener("resize", onWindowResize);
