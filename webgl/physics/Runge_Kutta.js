import * as EoM from "./Equation_Of_Motion";

var target_time = 10; // Measured in seconds

var time_current = 0;
var time = [time_current];
var dt = 0.1;

var theta_current = 0;
var thetad_current = 0;
var thetadd_current = 0;

var psi_current = 0;
var psid_current = 0;
var psidd_current = 0;

var phi_current = 0;
var phid_current = 0;
var phidd_current = 0;

const theta = [theta_current];
const thetad = [thetad_current];
const thetadd = [thetadd_current];

const phi = [phi_current];
const phid = [phid_current];
const phidd = [phidd_current];

const psi = [psi_current];
const psid = [psid_current];
const psidd = [psidd_current];


function runge_kutta() {
    /**
     * The main function for running the Runge-Kutta numerical analysis of the differential equations provided from the Equation of Motion.
     * The calculations will loop through till we have reached the targeted time.
     * All the variables are stored in lists that can be used for graphical illustrations, saving as raw data or performing calculations.
     */

    // Temp terms for calculating without interfering with the bigger picture.
    let thetad_temp = thetad_current;
    let theta_temp = theta_current;
    let phid_temp = phid_current;
    let phi_temp = phi_current;
    let psid_temp = psid_current;
    let psi_temp = psi_current;

    while (time_current < target_time) {
        
        // Find k1.
        let k1 = dt * get_Qd(theta_temp, thetad_temp, psi_temp, psid_temp, phi_temp, phid_temp);

        // Assign new temp values before proceeding.
        thetad_temp = thetad_temp + (dt / 2) * k1[0];
        theta_temp = theta_temp + (dt / 2) * thetad_temp;

        phid_temp = phid_temp + (dt / 2) * k1[1];
        phi_temp = phi_temp + (dt / 2) * phid_temp;

        psid_temp = psid_temp + (dt / 2) * k1[2];
        psi_temp = psi_temp + (dt / 2) * psid_temp;


        // Find k2.
        let k2 = dt * get_Qd(theta_temp, thetad_temp, phi_temp, phid_temp, psi_temmp, psid_temp);

        // Assign new temp values before proceeding.
        thetad_temp = thetad_temp + (dt / 2) * k2[0];
        theta_temp = theta_temp + (dt / 2) * thetad_temp;

        phid_temp = phid_temp + (dt / 2) * k2[1];
        phi_tmep = phi_temp + (dt / 2) * phid_temp;

        psid_temp = psid_temp + (dt / 2) * k2[2];
        psi_temp = psi_temp + (dt / 2) * psid_temp;


        // Find k3.
        let k3 = dt * get_Qd(theta_temp, thetad_temp, phi_temp, phid_temp, psi_temp, psid_temp);

        // Assign new temp values for the angles and velocities before proceeding.
        thetad_temp = thetad_temp + (dt) * k3[0];
        theta_temp = theta_temp + (dt) * thetad_temp;

        phid_temp = phid_temp + (dt) * k3[1];
        phi_temp = phi_temp + (dt) * phid_temp;

        psid_temp = psid_temp + (dt) * k3[2];
        psi_temp = psi_temp + (dt) * psid_temp;


        // Find k4.
        let k4 = dt * get_Qd(theta_temp, thetad_temp, phi_temp, phid_temp, psi_temp, psid_temp);


        // Find new acceleration terms.
        thetadd_current = thetadd_current + (dt / 6) * (k1[0] + 2 * k2[0] + 2 * k3[0] + k4[0]);
        phidd_current = phidd_current + (dt / 6) * (k1[1] + 2 * k2[1] + 2 * k3[1] + k4[1]);
        psidd_current = psidd_current + (dt / 6) * (k1[2] + 2 * k2[2] + 2 * k3[2] + k4[2]);

        // Find new velocity terms.
        thetad_current = thetad_current + thetadd_current * dt;
        phid_current = phid_current + phidd_current * dt;
        psid_current = psid_current + psidd_current * dt;

        // Find new angular positions.
        theta_current = theta_current + thetad_current * dt + (1 / 2) * thetadd_current * dt * dt;
        phi_current = phi_current + phid_current * dt + (1 / 2) * phidd_current * dt * dt;
        psi_current = psi_current + psid_current * dt + (1 / 2) * psidd_current * dt * dt;

        // Increment timestep
        time_current = time_current + dt;

        // Store the new variables in our lists.
        time.push(time_current);
        theta.push(theta_current);
        thetad.push(thetad_current);
        thetadd.push(thetadd_current);
        phi.push(phi_current);
        phid.push(phid_current);
        phidd.push(phidd_current);
        psi.push(psi_current);
        psid.push(psid_current);
        psidd.push(psidd_current);
    }
}
