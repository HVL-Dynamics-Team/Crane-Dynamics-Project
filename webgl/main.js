import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';  
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';
import WebGL from 'three/addons/capabilities/WebGL.js';

// Create the scene
const scene = new THREE.Scene();

// Create a renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth / 1.5, window.innerHeight / 1.5 ); // Render the model at a quarter of the page size for now.
document.body.appendChild( renderer.domElement );

// Camera for looking at the scene
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set( 400, 500, 400 ); // Sets camera position. z value must be higher so that scene and camera are not inside each other.
camera.lookAt( 0, 0, 0 ); // Rotates the camera to face the origin.

// Orbital controls for moving the scene around
const controls = new OrbitControls( camera, renderer.domElement );
controls.minDistance = 100;
controls.maxDistance = 1000;

// Lights
const pointLight1 = new THREE.PointLight(0xffffff);
pointLight1.position.set(1000, 1000, 1000);

const pointLight2 = new THREE.PointLight(0xffffff);
pointLight2.position.set(-600, 1000, -1800);

const pointLight3 = new THREE.PointLight(0xffffff);
pointLight3.position.set(-1800, 1000, -600);

scene.add(pointLight1);
scene.add(pointLight2);
scene.add(pointLight3);


// Making a coordinate system at the base that represents the inertial frame
const material_csysx = new THREE.LineBasicMaterial( {color: 0x110000} );
const points_csysx = [];
points_csysx.push( new THREE.Vector3(0, 0, 0) );
points_csysx.push( new THREE.Vector3(500, 0, 0) );
const geometry_csysx = new THREE.BufferGeometry().setFromPoints( points_csysx );
const line_csysx = new THREE.Line( geometry_csysx, material_csysx );

const material_csysy = new THREE.LineBasicMaterial( {color: 0x110000} );
const points_csysy = [];
points_csysy.push( new THREE.Vector3(0, 0, 0) );
points_csysy.push( new THREE.Vector3(0, 500, 0) );
const geometry_csysy = new THREE.BufferGeometry().setFromPoints( points_csysy );
const line_csysy = new THREE.Line( geometry_csysy, material_csysy );

const material_csysz = new THREE.LineBasicMaterial( {color: 0x110000} );
const points_csysz = [];
points_csysz.push( new THREE.Vector3(0, 0, 0) );
points_csysz.push( new THREE.Vector3(0, 0, -500) );
const geometry_csysz = new THREE.BufferGeometry().setFromPoints( points_csysz );
const line_csysz = new THREE.Line( geometry_csysz, material_csysz );

renderer.setClearColor(0x0000ff, 0.4);
scene.add( line_csysx );
scene.add( line_csysy );
scene.add( line_csysz );

// Define 3D objects to store model parts in.
const base = new THREE.Object3D();
const body1 = new THREE.Object3D();
const body2 = new THREE.Object3D();
const body3 = new THREE.Object3D();

// Load .obj model files and corresponding .mtl texture files.
const mtl_loader = new MTLLoader();

mtl_loader.load("./model/base.mtl", function (materials) {
    materials.preload();
    const obj_loader = new OBJLoader();
    obj_loader.setMaterials(materials);
    obj_loader.load("./model/base.obj", function (object) {
        base.add(object);
    });
});

mtl_loader.load("./model/body1.mtl", function (materials) {
    materials.preload();
    const obj_loader = new OBJLoader();
    obj_loader.setMaterials(materials);
    obj_loader.load("./model/body1.obj", function (object) {
        body1.add(object);
    });
});

mtl_loader.load("./model/body2.mtl", function (materials) {
    materials.preload();
    const obj_loader = new OBJLoader();
    obj_loader.setMaterials(materials);
    obj_loader.load("./model/body2.obj", function (object) {
        body2.add(object);
    })
});

mtl_loader.load("./model/body3.mtl", function (materials) {
    materials.preload();
    const obj_loader = new OBJLoader();
    obj_loader.setMaterials(materials);
    obj_loader.load("./model/body3.obj", function (object) {
        body3.add(object);
    });
});

// Attach parts to each other
base.add(body1);
body1.add(body2);
body2.add(body3);

// Set all the relative positions for the bodies.
// Body 1
body1.position.y = 75;
// Body 2
body2.position.y = 225;
body2.rotation.y = Math.PI / 2;
body2.rotation.z = Math.PI;
body2.position.x = 70;
// Body 3
body3.position.x = 120;
body3.position.z = -30;

// Add parts to scene
scene.add(base);


function animate()
{
    requestAnimationFrame( animate );
    controls.update();
    renderer.render( scene, camera );

    rotate_body_1(0.0189);
    rotate_body_2(0.025);
    rotate_body_3(0.0132);
}

function rotate_body_1 (angle)
{
    body1.rotation.y += angle;
}

function rotate_body_2 (angle) 
{
    body2.rotation.z += angle;
}

function rotate_body_3 (angle)
{
    body3.rotation.z += angle;
}

function reset_positions()
{
    body1.rotation.y = 0;
    body2.rotation.z = Math.PI;
    body3.rotation.z = 0;
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