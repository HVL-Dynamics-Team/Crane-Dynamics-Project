/**
 * This code creates a pop-up page along with it's buttons for changing the settings for the Runge-Kutta numerical intergration.
 */

import {startBtn, pauseBtn, stopBtn, simulationSettingsBtn} from "./../main";
import {time, theta, phi, psi, g, T1, T2, T3, m1, m2, m3, a, b, c, h, l1, l2, r1, r2, r3, target_time, dt, thetad_max, phid_max, psid_max} from "./crane_variables"
import {set_torque, set_mass, set_a, set_b, set_c, set_h, set_l1, set_l2, set_g, set_r1, set_r2, set_r3, set_target_time, set_dt, 
        set_thetad_max, set_phid_max, set_psid_max, reset_crane_varibles_to_default} from "./crane_variables";


/**
 * Make the pup-up page for the simulation settings.
 */
export const settingsDiv = document.createElement("div");
settingsDiv.id = "settings_panel";



/**
 * Motor controls (torque and max velocity)
 */
const settings_motors = document.createElement("div");
settings_motors.id = "settings_motors";

// Settings for the first motor
const settings_motor1 = document.createElement("div");
settings_motor1.id = "settings_motor1";
const settings_motor1_header = document.createElement("h3");
settings_motor1_header.innerHTML = "Motor 1";
settings_motor1.appendChild(settings_motor1_header);
const settings_motor1_currenttorque = document.createElement("h4");
settings_motor1_currenttorque.innerHTML = "Torque: " + T1 + " [Nm]";
settings_motor1.appendChild(settings_motor1_currenttorque);
const settings_motor1_newtorque = document.createElement("input");
settings_motor1_newtorque.type = "text";
settings_motor1_newtorque.placeholder = "new torque [Nm]";
settings_motor1.appendChild(settings_motor1_newtorque);
const settings_motor1_currentmaxvelocity = document.createElement("h4");
settings_motor1_currentmaxvelocity.innerHTML = "Max velocity: " + thetad_max + " [rad/s]";
settings_motor1.appendChild(settings_motor1_currentmaxvelocity);
const settings_motor1_newmaxvelocity = document.createElement("input");
settings_motor1_newmaxvelocity.type = "text";
settings_motor1_newmaxvelocity.placeholder = "new max velocity [rad/s]";
settings_motor1.appendChild(settings_motor1_newmaxvelocity);
settings_motors.appendChild(settings_motor1);

// Settings for the second motor
const settings_motor2 = document.createElement("div");
settings_motor2.id = "settings_motor2";
const settings_motor2_header = document.createElement("h3");
settings_motor2_header.innerHTML = "Motor 2";
settings_motor2.appendChild(settings_motor2_header);
const settings_motor2_currenttorque = document.createElement("h4");
settings_motor2_currenttorque.innerHTML = "Torque: " + T2 + " [Nm]";
settings_motor2.appendChild(settings_motor2_currenttorque);
const settings_motor2_newtorque = document.createElement("input");
settings_motor2_newtorque.type = "text";
settings_motor2_newtorque.placeholder = "new torque [Nm]";
settings_motor2.appendChild(settings_motor2_newtorque);
const settings_motor2_currentmaxvelocity = document.createElement("h4");
settings_motor2_currentmaxvelocity.innerHTML = "Max velocity: " + phid_max + " [rad/s]";
settings_motor2.appendChild(settings_motor2_currentmaxvelocity);
const settings_motor2_newmaxvelocity = document.createElement("input");
settings_motor2_newmaxvelocity.type = "text";
settings_motor2_newmaxvelocity.placeholder = "new max velocity [rad/s]";
settings_motor2.appendChild(settings_motor2_newmaxvelocity);
settings_motors.appendChild(settings_motor2);

// Settings for the third motor.
const settings_motor3 = document.createElement("div");
settings_motor3.id = "settings_motor3";
const settings_motor3_header = document.createElement("h3");
settings_motor3_header.innerHTML = "Motor 3";
settings_motor3.appendChild(settings_motor3_header);
const settings_motor3_currenttorque = document.createElement("h4");
settings_motor3_currenttorque.innerHTML = "Torque: " + T3 + " [Nm]";
settings_motor3.appendChild(settings_motor3_currenttorque);
const settings_motor3_newtorque = document.createElement("input");
settings_motor3_newtorque.type = "text";
settings_motor3_newtorque.placeholder = "new torque [Nm]";
settings_motor3.appendChild(settings_motor3_newtorque);
const settings_motor3_currentmaxvelocity = document.createElement("h4");
settings_motor3_currentmaxvelocity.innerHTML = "Max velocity: " + psid_max + " [rad/s]";
settings_motor3.appendChild(settings_motor3_currentmaxvelocity);
const settings_motor3_newmaxvelocity = document.createElement("input");
settings_motor3_newmaxvelocity.type = "text";
settings_motor3_newmaxvelocity.placeholder = "new max velocity [rad/s]";
settings_motor3.appendChild(settings_motor3_newmaxvelocity);
settings_motors.appendChild(settings_motor3);

// Add motors' settings to the pop-up.
settingsDiv.appendChild(settings_motors);



/**
 * Time control for the runge-kutta simulation. Controls both the target time and the timesteps taken.
 */
const settings_time = document.createElement("div");
settings_time.id = "settings_time";

// Settings for the target time
const settings_target_time = document.createElement("div");
settings_target_time.id = "settings_target_time";
const settings_target_time_header = document.createElement("h3");
settings_target_time_header.innerHTML = "Target time";
settings_target_time.appendChild(settings_target_time_header);
const settings_target_time_currentvalue = document.createElement("h4");
settings_target_time_currentvalue.innerHTML = "Current target: " + target_time + " [s]";
settings_target_time.appendChild(settings_target_time_currentvalue);
const settings_target_time_newvalue = document.createElement("input");
settings_target_time_newvalue.type = "text";
settings_target_time_newvalue.placeholder = "new target time [s]";
settings_target_time.appendChild(settings_target_time_newvalue);
settings_time.appendChild(settings_target_time);

// Settings for the timestep
const settings_timestep = document.createElement("div");
settings_timestep.id = "settings_timestep";
const settings_timestep_header = document.createElement("h3");
settings_timestep_header.innerHTML = "Timestep (avoid changing)";
settings_timestep.appendChild(settings_timestep_header);
const settings_timestep_currentvalue = document.createElement("h4");
settings_timestep_currentvalue.innerHTML = "Current timestep: " + dt + " [s]";
settings_timestep.appendChild(settings_timestep_currentvalue);
const settings_timestep_newvalue = document.createElement("input");
settings_timestep_newvalue.type = "text";
settings_timestep_newvalue.placeholder = "new timestep [s]";
settings_timestep.appendChild(settings_timestep_newvalue);
settings_time.appendChild(settings_timestep);

// Add time controls' settings to the pop-up
settingsDiv.appendChild(settings_time);



/**
 * Dimensions controls for the model. The physical model animated won't change in any way, but the way it is perceived by the caluclations will, 
 * and the angles will change as if the physical model had changed dimensions.
 */
// First row of dimensions
const settings_dimensions1 = document.createElement("div");
settings_dimensions1.id = "settings_dimensions";

// Settings for the a-dimension
const settings_dimension_a = document.createElement("div");
settings_dimension_a.id = "settings_dimension_a";
const settings_dimension_a_header = document.createElement("h3");
settings_dimension_a_header.innerHTML = "Dimension: 'a'";
settings_dimension_a.appendChild(settings_dimension_a_header);
const settings_dimension_a_currentvalue = document.createElement("h4");
settings_dimension_a_currentvalue.innerHTML = "Current 'a': " + a + " [m]";
settings_dimension_a.appendChild(settings_dimension_a_currentvalue);
const settings_dimension_a_newvalue = document.createElement("input");
settings_dimension_a_newvalue.type = "text";
settings_dimension_a_newvalue.placeholder = "new 'a' [m]";
settings_dimension_a.appendChild(settings_dimension_a_newvalue);
settings_dimensions1.appendChild(settings_dimension_a);

// Settings for the b-dimension
const settings_dimension_b = document.createElement("div");
settings_dimension_b.id = "settings_dimension_b";
const settings_dimension_b_header = document.createElement("h3");
settings_dimension_b_header.innerHTML = "Dimension: 'b'";
settings_dimension_b.appendChild(settings_dimension_b_header);
const settings_dimension_b_currentvalue = document.createElement("h4");
settings_dimension_b_currentvalue.innerHTML = "Current 'b': " + b + " [m]";
settings_dimension_b.appendChild(settings_dimension_b_currentvalue);
const settings_dimension_b_newvalue = document.createElement("input");
settings_dimension_b_newvalue.type = "text";
settings_dimension_b_newvalue.placeholder = "new 'b' [m]";
settings_dimension_b.appendChild(settings_dimension_b_newvalue);
settings_dimensions1.appendChild(settings_dimension_b);

// Settings for the c-dimension
const settings_dimension_c = document.createElement("div");
settings_dimension_c.id = "settings_dimension_c";
const settings_dimension_c_header = document.createElement("h3");
settings_dimension_c_header.innerHTML = "Dimension: 'c'";
settings_dimension_c.appendChild(settings_dimension_c_header);
const settings_dimension_c_currentvalue = document.createElement("h4");
settings_dimension_c_currentvalue.innerHTML = "Current 'c': " + c + " [m]";
settings_dimension_c.appendChild(settings_dimension_c_currentvalue);
const settings_dimension_c_newvalue = document.createElement("input");
settings_dimension_c_newvalue.type = "text";
settings_dimension_c_newvalue.placeholder = "new 'c' [m]";
settings_dimension_c.appendChild(settings_dimension_c_newvalue);
settings_dimensions1.appendChild(settings_dimension_c);


// Second row of dimensions
const settings_dimensions2 = document.createElement("div");
settings_dimensions2.id = "settings_dimensions";

// Settings for the h-dimension
const settings_dimension_h = document.createElement("div");
settings_dimension_h.id = "settings_dimension_h";
const settings_dimension_h_header = document.createElement("h3");
settings_dimension_h_header.innerHTML = "Dimension: 'h'";
settings_dimension_h.appendChild(settings_dimension_h_header);
const settings_dimension_h_currentvalue = document.createElement("h4");
settings_dimension_h_currentvalue.innerHTML = "Current 'h': " + h + " [m]";
settings_dimension_h.appendChild(settings_dimension_h_currentvalue);
const settings_dimension_h_newvalue = document.createElement("input");
settings_dimension_h_newvalue.type = "text";
settings_dimension_h_newvalue.placeholder = "new 'h' [m]";
settings_dimension_h.appendChild(settings_dimension_h_newvalue);
settings_dimensions2.appendChild(settings_dimension_h);

// Settings for the l1-dimension
const settings_dimension_l1 = document.createElement("div");
settings_dimension_l1.id = "settings_dimension_l1";
const settings_dimension_l1_header = document.createElement("h3");
settings_dimension_l1_header.innerHTML = "Dimension: 'l1'";
settings_dimension_l1.appendChild(settings_dimension_l1_header);
const settings_dimension_l1_currentvalue = document.createElement("h4");
settings_dimension_l1_currentvalue.innerHTML = "Current 'l1': " + l1 + " [m]";
settings_dimension_l1.appendChild(settings_dimension_l1_currentvalue);
const settings_dimension_l1_newvalue = document.createElement("input");
settings_dimension_l1_newvalue.type = "text";
settings_dimension_l1_newvalue.placeholder = "new 'l1' [m]";
settings_dimension_l1.appendChild(settings_dimension_l1_newvalue);
settings_dimensions2.appendChild(settings_dimension_l1);

// Settings for the l2-dimension
const settings_dimension_l2 = document.createElement("div");
settings_dimension_l2.id = "settings_dimension_l2";
const settings_dimension_l2_header = document.createElement("h3");
settings_dimension_l2_header.innerHTML = "Dimension: 'l2'";
settings_dimension_l2.appendChild(settings_dimension_l2_header);
const settings_dimension_l2_currentvalue = document.createElement("h4");
settings_dimension_l2_currentvalue.innerHTML = "Current 'l2': " + l2 + " [m]";
settings_dimension_l2.appendChild(settings_dimension_l2_currentvalue);
const settings_dimension_l2_newvalue = document.createElement("input");
settings_dimension_l2_newvalue.type = "text";
settings_dimension_l2_newvalue.placeholder = "new 'l2' [m]";
settings_dimension_l2.appendChild(settings_dimension_l2_newvalue);
settings_dimensions2.appendChild(settings_dimension_l2);


// Third row of dimensions
const settings_dimensions3 = document.createElement("div");
settings_dimensions3.id = "settings_dimensions";

// Settings for the r1-dimension
const settings_dimension_r1 = document.createElement("div");
settings_dimension_r1.id = "settings_dimension_r1";
const settings_dimension_r1_header = document.createElement("h3");
settings_dimension_r1_header.innerHTML = "Dimension: 'r1'";
settings_dimension_r1.appendChild(settings_dimension_r1_header);
const settings_dimension_r1_currentvalue = document.createElement("h4");
settings_dimension_r1_currentvalue.innerHTML = "Current 'r1': " + r1 + " [m]";
settings_dimension_r1.appendChild(settings_dimension_r1_currentvalue);
const settings_dimension_r1_newvalue = document.createElement("input");
settings_dimension_r1_newvalue.type = "text";
settings_dimension_r1_newvalue.placeholder = "new 'r1' [m]";
settings_dimension_r1.appendChild(settings_dimension_r1_newvalue);
settings_dimensions3.appendChild(settings_dimension_r1);

// Settings for the r2-dimension
const settings_dimension_r2 = document.createElement("div");
settings_dimension_r2.id = "settings_dimension_r2";
const settings_dimension_r2_header = document.createElement("h3");
settings_dimension_r2_header.innerHTML = "Dimension: 'r2'";
settings_dimension_r2.appendChild(settings_dimension_r2_header);
const settings_dimension_r2_currentvalue = document.createElement("h4");
settings_dimension_r2_currentvalue.innerHTML = "Current 'r2': " + r2 + " [m]";
settings_dimension_r2.appendChild(settings_dimension_r2_currentvalue);
const settings_dimension_r2_newvalue = document.createElement("input");
settings_dimension_r2_newvalue.type = "text";
settings_dimension_r2_newvalue.placeholder = "new 'r2' [m]";
settings_dimension_r2.appendChild(settings_dimension_r2_newvalue);
settings_dimensions3.appendChild(settings_dimension_r2);

// Settings for the r3-dimension
const settings_dimension_r3 = document.createElement("div");
settings_dimension_r3.id = "settings_dimension_r3";
const settings_dimension_r3_header = document.createElement("h3");
settings_dimension_r3_header.innerHTML = "Dimension: 'r3'";
settings_dimension_r3.appendChild(settings_dimension_r3_header);
const settings_dimension_r3_currentvalue = document.createElement("h4");
settings_dimension_r3_currentvalue.innerHTML = "Current 'r3': " + r3 + " [m]";
settings_dimension_r3.appendChild(settings_dimension_r3_currentvalue);
const settings_dimension_r3_newvalue = document.createElement("input");
settings_dimension_r3_newvalue.type = "text";
settings_dimension_r3_newvalue.placeholder = "new 'r3' [m]";
settings_dimension_r3.appendChild(settings_dimension_r3_newvalue);
settings_dimensions3.appendChild(settings_dimension_r3);

settingsDiv.appendChild(settings_dimensions1);
settingsDiv.appendChild(settings_dimensions2);
settingsDiv.appendChild(settings_dimensions3);



/**
 * Mass control of the crane for the Runge-Kutta.
 */
const settings_mass = document.createElement("div");
settings_mass.id = "settings_mass";

// Settings for the m1 of the first body (and the base)
const settings_mass_m1 = document.createElement("div");
settings_mass_m1.id = "settings_mass_m1";
const settings_mass_m1_header = document.createElement("h3");
settings_mass_m1_header.innerHTML = "Mass: 'm1'";
settings_mass_m1.appendChild(settings_mass_m1_header);
const settings_mass_m1_currentvalue = document.createElement("h4");
settings_mass_m1_currentvalue.innerHTML = "Current 'm1': " + m1 + " [kg]";
settings_mass_m1.appendChild(settings_mass_m1_currentvalue);
const settings_mass_m1_newvalue = document.createElement("input");
settings_mass_m1_newvalue.type = "text";
settings_mass_m1_newvalue.placeholder = "new 'm1' [kg]";
settings_mass_m1.appendChild(settings_mass_m1_newvalue);
settings_mass.appendChild(settings_mass_m1);

// Settings for the m2 of the second body
const settings_mass_m2 = document.createElement("div");
settings_mass_m2.id = "settings_mass_m2";
const settings_mass_m2_header = document.createElement("h3");
settings_mass_m2_header.innerHTML = "Mass: 'm2'";
settings_mass_m2.appendChild(settings_mass_m2_header);
const settings_mass_m2_currentvalue = document.createElement("h4");
settings_mass_m2_currentvalue.innerHTML = "Current 'm2': " + m2 + " [kg]";
settings_mass_m2.appendChild(settings_mass_m2_currentvalue);
const settings_mass_m2_newvalue = document.createElement("input");
settings_mass_m2_newvalue.type = "text";
settings_mass_m2_newvalue.placeholder = "new 'm2' [kg]";
settings_mass_m2.appendChild(settings_mass_m2_newvalue);
settings_mass.appendChild(settings_mass_m2);

// Settings for the m3 of the third body
const settings_mass_m3 = document.createElement("div");
settings_mass_m3.id = "settings_mass_m3";
const settings_mass_m3_header = document.createElement("h3");
settings_mass_m3_header.innerHTML = "Mass: 'm3'";
settings_mass_m3.appendChild(settings_mass_m3_header);
const settings_mass_m3_currentvalue = document.createElement("h4");
settings_mass_m3_currentvalue.innerHTML = "Current 'm3': " + m3 + " [kg]";
settings_mass_m3.appendChild(settings_mass_m3_currentvalue);
const settings_mass_m3_newvalue = document.createElement("input");
settings_mass_m3_newvalue.type = "text";
settings_mass_m3_newvalue.placeholder = "new 'm3' [kg]";
settings_mass_m3.appendChild(settings_mass_m3_newvalue);
settings_mass.appendChild(settings_mass_m3);

settingsDiv.appendChild(settings_mass);



/**
 * Gravity controls for the Runge-Kutta.
 */
const settings_gravity_control = document.createElement("div");
settings_gravity_control.id = "settings_gravity_control";

// Settings for the gravity-value
const settings_gravity = document.createElement("div");
settings_gravity.id = "settings_gravity";
const settings_gravity_header = document.createElement("h3");
settings_gravity_header.innerHTML = "Gravity";
settings_gravity.appendChild(settings_gravity_header);
const settings_gravity_currentvalue = document.createElement("h4");
settings_gravity_currentvalue.innerHTML = "Current 'g': " + g + " [kg/s2]";
settings_gravity.appendChild(settings_gravity_currentvalue);
const settings_gravity_newvalue = document.createElement("input");
settings_gravity_newvalue.type = "text";
settings_gravity_newvalue.placeholder = "new 'g' [kg/s2]";
settings_gravity.appendChild(settings_gravity_newvalue);
settings_gravity_control.appendChild(settings_gravity);

settingsDiv.appendChild(settings_gravity_control);



/**
 * Apply and close buttons for the settings page.
 */
const settings_close_and_apply = document.createElement("form");
settings_close_and_apply.action = "";
settings_close_and_apply.id = "settings_apply_and_close";

const settings_apply = document.createElement("input");
settings_apply.type = "button";
settings_apply.id = "settings_apply";
settings_apply.value = "Apply";
settings_apply.addEventListener("click", function() {
    apply_new_settings();
    update_fields();
});

const settings_close = document.createElement("input");
settings_close.type = "button";
settings_close.id = "settings_close";
settings_close.value = "Close";
settings_close.addEventListener("click", function() {
    update_fields();
    document.getElementById("settings_panel_container").removeChild(settingsDiv);
    startBtn.disabled = "";
    pauseBtn.disabled = "";
    stopBtn.disabled = "disabled";
});

settings_close_and_apply.appendChild(settings_apply);
settings_close_and_apply.appendChild(settings_close);

settingsDiv.appendChild(settings_close_and_apply);


/**
 * Below are functions that aid in the updating of values and text fields.
 */

// Update fields in settings
function update_fields ()
{
    // Update motors current torque fields
    settings_motor1_newtorque.value = "";
    settings_motor2_newtorque.value = "";
    settings_motor3_newtorque.value = "";
    settings_motor1_currenttorque.innerHTML = "Torque: " + T1 + " [Nm]";
    settings_motor2_currenttorque.innerHTML = "Torque: " + T2 + " [Nm]";
    settings_motor3_currenttorque.innerHTML = "Torque: " + T3 + " [Nm]";
    // Update motors current max velocity fields
    settings_motor1_currentmaxvelocity.innerHTML = "Max velocity: " + thetad_max + " [rad/s]";
    settings_motor2_currentmaxvelocity.innerHTML = "Max velocity: " + phid_max + " [rad/s]";
    settings_motor3_currentmaxvelocity.innerHTML = "Max velocity: " + psid_max + " [rad/s]";
    settings_motor1_newmaxvelocity.value = "";
    settings_motor2_newmaxvelocity.value = "";
    settings_motor3_newmaxvelocity.value = "";

    // Update target time fields
    settings_target_time_newvalue.value = "";
    settings_target_time_currentvalue.innerHTML = "Current target: " + target_time + " [s]";
    // Update timestep fields
    settings_timestep_newvalue.value = "";
    settings_timestep_currentvalue.innerHTML = "Current timestep: " + dt + " [s]";

    // Update 'a' dimension
    settings_dimension_a_newvalue.value = "";
    settings_dimension_a_currentvalue.innerHTML = "Current 'a': " + a + " [m]";
    // Update 'b' dimension
    settings_dimension_b_newvalue.value = "";
    settings_dimension_b_currentvalue.innerHTML = "Current 'b': " + b + " [m]";
    // Update 'c' dimension
    settings_dimension_c_newvalue.value = "";
    settings_dimension_c_currentvalue.innerHTML = "Current 'c': " + c + " [m]";
    // Update 'h' dimension
    settings_dimension_h_newvalue.value = "";
    settings_dimension_h_currentvalue.innerHTML = "Current 'h': " + h + " [m]";
    // Update 'l1' dimension
    settings_dimension_l1_newvalue.value = "";
    settings_dimension_l1_currentvalue.innerHTML = "Current 'l1': " + l1 + " [m]";
    // Update 'l2' dimension
    settings_dimension_l2_newvalue.value = "";
    settings_dimension_l2_currentvalue.innerHTML = "Current 'l2': " + l2 + " [m]";
    // Update 'r1' dimension
    settings_dimension_r1_newvalue.value = "";
    settings_dimension_r1_currentvalue.innerHTML = "Current 'r1': " + r1 + " [m]";
    // Update 'r2' dimension
    settings_dimension_r2_newvalue.value = "";
    settings_dimension_r2_currentvalue.innerHTML = "Current 'r2': " + r2 + " [m]";
    // Update 'r3' dimension
    settings_dimension_r3_newvalue.value = "";
    settings_dimension_r3_currentvalue.innerHTML = "Current 'r3': " + r3 + " [m]";

    // Update 'm1' mass
    settings_mass_m1_newvalue.value = "";
    settings_mass_m1_currentvalue.innerHTML = "Current 'm1': " + m1 + " [kg]";
    // Update 'm2' mass
    settings_mass_m2_newvalue.value = "";
    settings_mass_m2_currentvalue.innerHTML = "Current 'm2': " + m2 + " [kg]";
    // Update 'm3' mass
    settings_mass_m3_newvalue.value = "";
    settings_mass_m3_currentvalue.innerHTML = "Current 'm3': " + m3 + " [kg]";

    // Update 'g' gravity
    settings_gravity_newvalue.value = "";
    settings_gravity_currentvalue.innerHTML = "Current 'g': " + g + " [kg/s2]";
}

function apply_new_settings ()
{
    // Set new motor settings.
    try {
        let new_T1 = parseFloat(settings_motor1_newtorque.value);
        let new_T2 = parseFloat(settings_motor2_newtorque.value);
        let new_T3 = parseFloat(settings_motor3_newtorque.value);
        
        if (isNaN(new_T1)) {
            new_T1 = T1;
        }
        if (isNaN(new_T2)) {
            new_T2 = T2;
        }
        if (isNaN(new_T3)) {
            new_T3 = T3;
        }
        set_torque(new_T1, new_T2, new_T3);

    } catch (error) {
        alert("Value inserted into one or more of 'Motor new torque' field(s) was not accepted!");
        console.log(error);
    }
    
    try {
        let new_thetad_max = parseFloat(settings_motor1_newmaxvelocity.value);
        let new_phid_max = parseFloat(settings_motor2_newmaxvelocity.value);
        let new_psid_max = parseFloat(settings_motor3_newmaxvelocity.value);

        if (isNaN(new_thetad_max)) {
            new_thetad_max = thetad_max;
        }
        set_thetad_max(new_thetad_max);

        if (isNaN(new_phid_max)) {
            new_phid_max = phid_max;
        }
        set_phid_max(new_phid_max);

        if (isNaN(new_psid_max)) {
            new_psid_max = psid_max;
        }
        set_psid_max(new_psid_max);

    } catch (error) {
        alert("Value inserted into one or more of 'Motor new max velocity' field(s) was not accepted!");
        console.log(error);
    }


    // Set new time settings.
    try {
        let new_target_time = parseFloat(settings_target_time_newvalue.value);

        if (isNaN(new_target_time)) {
            new_target_time = target_time;
            set_target_time(new_target_time);
        }
        else {
            if (new_target_time >= 1000)
            {
                if (confirm("Changing the target time to a high value will cause the starting of the simulation to take longer to calculate. Do you wish to proceed?")) {
                    set_target_time(new_target_time);
                }
            }
            else {
                set_target_time(new_target_time);
            }
        }
    } catch (error) {
        alert ("Value inserted into the target time field was not accepted!");
        console.log(error);
    }

    try {
        let new_timestep = parseFloat(settings_timestep_newvalue.value);

        if (isNaN(new_timestep)) {
            new_timestep = dt;
            set_dt(new_timestep);
        }
        else if (confirm("Changing the timestep can lead to some strange behavior in the animation. Are you sure you want to change the timestep value?")) {
            set_dt(new_timestep);
        }
    } catch (error) {
        alert("Value inserted into the timestep field was not accepted!");
        console.log(error);
    }


    // Set new dimension settings
    try {
        let new_a = parseFloat(settings_dimension_a_newvalue.value);

        if (isNaN(new_a)) {
            new_a = a;
        }
        set_a(new_a);
    } catch (error) {
        alert("Value inserted into the 'a' field was not accepted!");
        console.log(error);
    }

    try {
        let new_b = parseFloat(settings_dimension_b_newvalue.value);

        if (isNaN(new_b)) {
            new_b = b;
        }
        set_b(new_b);
    } catch (error) {
        alert("Value inserted into the 'b' field was not accepted!");
        console.log(error);
    }

    try {
        let new_c = parseFloat(settings_dimension_c_newvalue.value);

        if (isNaN(new_c)) {
            new_c = c;
        }
        set_c(new_c);
    } catch (error) {
        alert("Value inserted into the 'c' field was not accepted!");
        console.log(error);
    }

    try {
        let new_h = parseFloat(settings_dimension_h_newvalue.value);

        if (isNaN(new_h)) {
            new_h = h;
        }
        set_h(new_h);
    } catch (error) {
        alert("Value inserted into the 'h' field was not accepted!");
        console.log(error);
    }

    try {
        let new_l1 = parseFloat(settings_dimension_l1_newvalue.value);

        if (isNaN(new_l1)) {
            new_l1 = l1;
        }
        set_l1(new_l1);
    } catch (error) {
        alert("Value inserted into the 'l1' field was not accepted!");
        console.log(error);
    }

    try {
        let new_l2 = parseFloat(settings_dimension_l2_newvalue.value);

        if (isNaN(new_l2)) {
            new_l2 = l2;
        }
        set_l2(new_l2);
    } catch (error) {
        alert("Value inserted into the 'l2' field was not accepted!");
        console.log(error);
    }

    try {
        let new_r1 = parseFloat(settings_dimension_r1_newvalue.value);

        if (isNaN(new_r1)) {
            new_r1 = r1;
        }
        set_r1(new_r1);
    } catch (error) {
        alert("Value inserted into the 'r1' field was not accepted!");
        console.log(error);
    }

    try {
        let new_r2 = parseFloat(settings_dimension_r2_newvalue.value);

        if (isNaN(new_r2)) {
            new_r2 = r2;
        }
        set_r2(new_r2);
    } catch (error) {
        alert("Value inserted into the 'r2' field was not accepted!");
        console.log(error);
    }

    try {
        let new_r3 = parseFloat(settings_dimension_r3_newvalue.value);

        if (isNaN(new_r3)) {
            new_r3 = r3;
        }
        set_r3(new_r3);
    } catch (error) {
        alert("Value inserted into the 'r3' field was not accepted!");
        console.log(error);
    }

    // Update masses
    try {
        let new_m1 = parseFloat(settings_mass_m1_newvalue.value);
        let new_m2 = parseFloat(settings_mass_m2_newvalue.value);
        let new_m3 = parseFloat(settings_mass_m3_newvalue.value);
        
        if (isNaN(new_m1)) {
            new_m1 = m1;
        }
        if (isNaN(new_m2)) {
            new_m2 = m2;
        }
        if (isNaN(new_m3)) {
            new_m3 = m3;
        }
        set_mass(new_m1, new_m2, new_m3);

    } catch (error) {
        alert("Value inserted into one or more of 'Masses' field(s) was not accepted!");
        console.log(error);
    }

    // Update gravity
    try {
        let new_g = parseFloat(settings_gravity_newvalue.value);

        if (isNaN(new_g)) {
            new_g = g;
        }
        set_g(new_g);
    } catch (error) {
        alert("Value inserted into the 'g' field was not accepted!");
        console.log(error);
    }
}