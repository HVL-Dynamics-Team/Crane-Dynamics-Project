import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';  
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';
import WebGL from 'three/addons/capabilities/WebGL.js';
import { LineController, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js';
import {time, theta, phi, psi, g, T1, T2, T3, m1, m2, m3, a, b, c, h, l1, l2, r1, r2, r3, target_time, dt, thetad_max, phid_max, psid_max} from "./physics/crane_variables"
import {set_torque, set_mass, set_a, set_b, set_c, set_h, set_l1, set_l2, set_g, set_r1, set_r2, set_r3, set_target_time, set_dt, 
        set_thetad_max, set_phid_max, set_psid_max, reset_crane_varibles_to_default} from "./physics/crane_variables";
import {runge_kutta, reset_rk_results} from "./physics/Runge_Kutta";
import {Reaction_Forces_inertial} from "./physics/Reaction_Forces";

// Define variables for determining if the animations should run and at what stage it's running
var isStartButtonPressed = false;
var isPaused = false;
var counter = 0;

// Define reference objects for the button- and input-field elements on the HTML page.
const startBtn = document.getElementById("button_start");
const pauseBtn = document.getElementById("button_pause");
const resetBtn = document.getElementById("button_reset");
const simulationSettingsBtn = document.getElementById("button_simulation_settings");

// Make the pop-up page for the simulation settings.
const settingsDiv = document.createElement("div");
settingsDiv.id = "settings_panel";

// Motor control (torque and max velocity)
const settings_motors = document.createElement("div");
settings_motors.id = "settings_motors";

const settings_motor1 = document.createElement("div");
settings_motor1.id = "settings_motor1";
const settings_motor1_header = document.createElement("h3");
settings_motor1_header.innerHTML = "Motor 1";
settings_motor1.appendChild(settings_motor1_header);
const settings_motor1_currenttorque = document.createElement("h4");
settings_motor1_currenttorque.innerHTML = "Current torque: " + T1 + " [Nm]";
settings_motor1.appendChild(settings_motor1_currenttorque);
const settings_motor1_newtorque = document.createElement("input");
settings_motor1_newtorque.type = "text";
settings_motor1_newtorque.placeholder = "new torque [Nm]";
settings_motor1.appendChild(settings_motor1_newtorque);
settings_motors.appendChild(settings_motor1);

const settings_motor2 = document.createElement("div");
settings_motor2.id = "settings_motor2";
settings_motors.appendChild(settings_motor2);

const settings_motor3 = document.createElement("div");
settings_motor3.id = "settings_motor3";
settings_motors.appendChild(settings_motor3);

settingsDiv.appendChild(settings_motors);

// Time control

// Dimensions

// Masses

// Gravity control

// Update fields in settings
function update_settings ()
{
    // Update motors current torque
    settings_motor1_currenttorque.innerHTML = "Current torque: " + T1 + " [Nm]";
}

function clear_settings_fields ()
{
    // Clear motor text fields
    try {
        let new_T1 = parseFloat(settings_motor1_newtorque.value);
        set_torque()
    } catch (error) {
        alert("Value inserted into one or more of 'Motor new torque' field(s) was not accepted!");
    }
    settings_motor1_newtorque.value = "";
}

// Buttons for applying settings and closing settings page.
const settings_close_and_apply = document.createElement("form");
settings_close_and_apply.action = "";
settings_close_and_apply.id = "settings_apply_and_close";

const settings_apply = document.createElement("input");
settings_apply.type = "button";
settings_apply.id = "settings_apply";
settings_apply.value = "Apply";
settings_apply.addEventListener("click", function() {
    update_settings();
    clear_settings_fields();
});

const settings_close = document.createElement("input");
settings_close.type = "button";
settings_close.id = "settings_close";
settings_close.value = "Close";
settings_close.addEventListener("click", function() {
    document.getElementById("settings_panel_container").removeChild(settingsDiv);
    startBtn.disabled = "";
    pauseBtn.disabled = "";
    resetBtn.disabled = "disabled";
});

settings_close_and_apply.appendChild(settings_apply);
settings_close_and_apply.appendChild(settings_close);

settingsDiv.appendChild(settings_close_and_apply);


// Add eventlistener for start button.
startBtn.addEventListener("click", function() {
    if (!isStartButtonPressed) {
        runge_kutta();
        isStartButtonPressed = true;
        startBtn.disabled = "disabled";
        resetBtn.disabled = "";
        simulationSettingsBtn.disabled = "disabled";
    }
});

// Add eventlistener for pause button
pauseBtn.addEventListener("click", function() {
    if (!isPaused && isStartButtonPressed) {
        isPaused = true;
        pauseBtn.value = "Resume";
    } else {
        isPaused = false;
        pauseBtn.value = "Pause";
    }
});

// Disable the resetbutton at first stage of login.
resetBtn.disabled = "disabled";
resetBtn.addEventListener("click", function() {
    if (isStartButtonPressed) {    
        resetBtn.disabled = "disabled";
        reset_positions();
        counter = 0;
        isStartButtonPressed = false;
        startBtn.disabled = "";
        simulationSettingsBtn.disabled = "";
    }
});

simulationSettingsBtn.addEventListener("click", function() {
    startBtn.disabled = "disabled";
    pauseBtn.disabled = "disabled";
    resetBtn.disabled = "disabled";
    document.getElementById("settings_panel_container").appendChild(settingsDiv);
});

// Create the scene
const scene = new THREE.Scene();

// Create a renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth / 1.5, window.innerHeight / 1.5 ); // Render the model at a quarter of the page size for now.
const pageAnimationContainer = document.getElementById("animation_container");
pageAnimationContainer.appendChild( renderer.domElement );

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
body2.rotation.z = 0;
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

    if (isStartButtonPressed && !isPaused)
    {
        if (counter < time.length) 
        {
            body1.rotation.y = theta[counter];
            body2.rotation.z = phi[counter];
            body3.rotation.z = psi[counter];
            counter += 1;
        }
        else 
        {
            reset_positions();
            counter = 0;
        }
    }
}

function reset_positions()
{
    body1.rotation.y = 0;
    body2.rotation.z = 0;
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
