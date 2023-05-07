import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';  
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';
import WebGL from 'three/addons/capabilities/WebGL.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth / 1.5, window.innerHeight / 1.5 ); // Render the model at a quarter of the page size for now.
document.body.appendChild( renderer.domElement );

const controls = new OrbitControls( camera, renderer.domElement );
controls.minDistance = 100;
controls.maxDistance = 1000;

const material_csysx = new THREE.LineBasicMaterial( {color: 0xff0000} );
const points_csysx = [];
points_csysx.push( new THREE.Vector3(-5, 0, 0) );
points_csysx.push( new THREE.Vector3(5, 0, 0) );
const geometry_csysx = new THREE.BufferGeometry().setFromPoints( points_csysx );
const line_csysx = new THREE.Line( geometry_csysx, material_csysx );

const material_csysy = new THREE.LineBasicMaterial( {color: 0xff0000} );
const points_csysy = [];
points_csysy.push( new THREE.Vector3(0, -5, 0) );
points_csysy.push( new THREE.Vector3(0, 5, 0) );
const geometry_csysy = new THREE.BufferGeometry().setFromPoints( points_csysy );
const line_csysy = new THREE.Line( geometry_csysy, material_csysy );

const material_csysz = new THREE.LineBasicMaterial( {color: 0xff0000} );
const points_csysz = [];
points_csysz.push( new THREE.Vector3(0, 0, -5) );
points_csysz.push( new THREE.Vector3(0, 0, 5) );
const geometry_csysz = new THREE.BufferGeometry().setFromPoints( points_csysz );
const line_csysz = new THREE.Line( geometry_csysz, material_csysz );

renderer.setClearColor(0x0000ff, 0.4);
scene.add( line_csysx );
scene.add( line_csysy );
scene.add( line_csysz );


const mtl_loader = new MTLLoader();
mtl_loader.load("./model/base.mtl", function (materials) {
    materials.preload();
    const obj_loader = new OBJLoader();
    obj_loader.setMaterials(materials);
    obj_loader.load("./model/base.obj", function (object) {
        scene.add(object);
    });
});

mtl_loader.load("./model/body1.mtl", function (materials) {
    materials.preload();
    const obj_loader = new OBJLoader();
    obj_loader.setMaterials(materials);
    obj_loader.load("./model/body1.obj", function (object) {
        object.position.y = 75;
        scene.add(object);
    });
});

mtl_loader.load("./model/body2.mtl", function (materials) {
    materials.preload();
    const obj_loader = new OBJLoader();
    obj_loader.setMaterials(materials);
    obj_loader.load("./model/body2.obj", function (object) {
        object.position.y = 300;
        object.position.x = 70;
        object.rotation.y = Math.PI / 2;
        scene.add(object);
    })
});

mtl_loader.load("./model/body3.mtl", function (materials) {
    materials.preload();
    const obj_loader = new OBJLoader();
    obj_loader.setMaterials(materials);
    obj_loader.load("./model/body3.obj", function (object) {
        object.position.y = 300;
        object.position.x = 40;
        object.position.z = -120;
        object.rotation.y = Math.PI / 2;
        scene.add(object);
    });
});

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(1000, 1000, 1000);

//const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight);//, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(2000, 500, -100);

camera.position.set( 100, 100, 500 ); // Sets camera position. z value must be higher so that scene and camera are not inside each other.
camera.lookAt( 0, 0, 0 ); // Rotates the camera to face the origin.

function animate()
{
    requestAnimationFrame( animate );
    controls.update();
    renderer.render( scene, camera );
}

// Check that WebGL is available for the browser and start animating the 3D model.
if ( WebGL.isWebGLAvailable() )
{
    animate();
}
else
{
    alert("Error in loading WebGL. Please check that your browser supports WebGL!");
}