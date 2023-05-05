import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import WebGL from 'three/addons/capabilities/WebGL.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth / 2, window.innerHeight / 2 ); // Render the model at a quarter of the page size for now.
document.body.appendChild( renderer.domElement );

const geometry_box = new THREE.BoxGeometry( 1, 1, 1 );
const material_box = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
const cube = new THREE.Mesh( geometry_box, material_box );

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
scene.add( cube );
scene.add( line_csysx );
scene.add( line_csysy );
scene.add( line_csysz );

const loader = new GLTFLoader();
loader.load( 'model/', function ( gltf ) {
    scene.add( gltf.scene );
} );

camera.position.set( 5, 5, 5 ); // Sets camera position. z value must be higher so that scene and camera are not inside each other.
camera.lookAt( 0, 0, 0 ); // Rotates the camera to face the origin.

function animate()
{
    requestAnimationFrame( animate );
    renderer.render( scene, camera );

    //cube.rotation.x += 0.01;
    //cube.rotation.y += 0.01;
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