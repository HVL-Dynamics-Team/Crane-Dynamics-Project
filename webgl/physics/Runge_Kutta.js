var target_time = 10; // Measured in seconds

var time_current = 0;
export const time = [time_current];
var dt = 0.01;

var thetad_max = 2*3.14 / 4 ;
var phid_max = 2*3.14 / 2 ;
var psid_max = 2*3.14 / 4 ;

var theta_current = 0;
var thetad_current = 0;
var thetadd_current = 0;

var phi_current = 0;
var phid_current = 0;
var phidd_current = 0;

var psi_current = 0;
var psid_current = 0;
var psidd_current = 0;

export const theta = [theta_current];
export const thetad = [thetad_current];
export const thetadd = [thetadd_current];

export const phi = [phi_current];
export const phid = [phid_current];
export const phidd = [phidd_current];

export const psi = [psi_current];
export const psid = [psid_current];
export const psidd = [psidd_current];


function runge_kutta() {
    /**
     * The main function for running the Runge-Kutta numerical analysis of the differential equations provided from the Equation of Motion.
     * The calculations will loop through till we have reached the targeted time.
     * All the variables are stored in lists that can be used for graphical illustrations, saving as raw data or performing calculations.
     */

    while (time_current < target_time) {
        
        // Temp terms for calculating without interfering with the bigger picture.
        let thetad_temp = thetad_current;
        let theta_temp = theta_current;
        let phid_temp = phid_current;
        let phi_temp = phi_current;
        let psid_temp = psid_current;
        let psi_temp = psi_current;

        // Find k1.
        let k1 = get_Qd(theta_temp, thetad_temp, phi_temp, phid_temp, psi_temp, psid_temp);

        k1[0] = k1[0] * dt;
        k1[1] = k1[1] * dt;
        k1[2] = k1[2] * dt;

        // Assign new temp values before proceeding.
        thetad_temp = thetad_temp + (1 / 2) * k1[0];
        theta_temp = theta_temp + (dt / 2) * thetad_temp;

        phid_temp = phid_temp + (1 / 2) * k1[1];
        phi_temp = phi_temp + (dt / 2) * phid_temp;

        psid_temp = psid_temp + (1 / 2) * k1[2];
        psi_temp = psi_temp + (dt / 2) * psid_temp;


        // Find k2.
        let k2 = get_Qd(theta_temp, thetad_temp, phi_temp, phid_temp, psi_temp, psid_temp);

        k2[0] = k2[0] * dt;
        k2[1] = k2[1] * dt;
        k2[2] = k2[2] * dt;

        // Assign new temp values before proceeding.
        thetad_temp = thetad_temp + (1 / 2) * k2[0];
        theta_temp = theta_temp + (dt / 2) * thetad_temp;

        phid_temp = phid_temp + (1 / 2) * k2[1];
        phi_temp = phi_temp + (dt / 2) * phid_temp;

        psid_temp = psid_temp + (1 / 2) * k2[2];
        psi_temp = psi_temp + (dt / 2) * psid_temp;


        // Find k3.
        let k3 = get_Qd(theta_temp, thetad_temp, phi_temp, phid_temp, psi_temp, psid_temp);

        k3[0] = k3[0] * dt;
        k3[1] = k3[1] * dt;
        k3[2] = k3[2] * dt;

        // Assign new temp values for the angles and velocities before proceeding.
        thetad_temp = thetad_temp + (1) * k3[0];
        theta_temp = theta_temp + (dt) * thetad_temp;

        phid_temp = phid_temp + (1) * k3[1];
        phi_temp = phi_temp + (dt) * phid_temp;

        psid_temp = psid_temp + (1) * k3[2];
        psi_temp = psi_temp + (dt) * psid_temp;


        // Find k4.
        let k4 = get_Qd(theta_temp, thetad_temp, phi_temp, phid_temp, psi_temp, psid_temp);

        k4[0] = k4[0] * dt;
        k4[1] = k4[1] * dt;
        k4[2] = k4[2] * dt;

        // Find new velocity terms.
        thetad_current = thetad_current + (1 / 6) * (k1[0] + 2 * k2[0] + 2 * k3[0] + k4[0]);
        phid_current = phid_current + (1 / 6) * (k1[1] + 2 * k2[1] + 2 * k3[1] + k4[1]);
        psid_current = psid_current + (1 / 6) * (k1[2] + 2 * k2[2] + 2 * k3[2] + k4[2]);

        if (thetad_current > thetad_max) {
            thetad_current = thetad_max 
        } else if (Math.abs(thetad_current) > thetad_max) {
            thetad_current = (-1) * thetad_max;
        }

        if (phid_current > phid_max) {
            phid_current = phid_max;
        } else if (Math.abs(phid_current) > phid_max) {
            phid_current = (-1) * phid_max;
        }

        if (psid_current > psid_max) {
            psid_current = psid_max;
        } else if (Math.abs(psid_current) > psid_max) {
            psid_current = (-1) * psid_max;
        }

        // Find new angular position terms.
        theta_current = theta_current + thetad_current * dt;
        phi_current = phi_current + phid_current * dt;
        psi_current = psi_current + psid_current * dt;

        // Increment timestep
        time_current = time_current + dt;

        //console.log("k1: ", k1, "\tk2: ", k2, "\tk3: ", k3, "\tk4: ", k4);
        //console.log("theta: ", theta_current, "\tphi: ", phi_current, "\tpsi: ", psi_current, "\tthetad: ", thetad_current, "\tphid: ", phid_current, "\tpsid: ", psid_current);

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

runge_kutta();
console.log("Runge kutta. \n");
for (let i = 0; i < time.length; i++)
{
    console.log("time: ", time[i], "\ttheta ", theta[i], "\tphi ", phi[i], "\tpsi ", psi[i], "\tthetad: ", thetad[i], "\tphid: ", phid[i], "\tpsid: ", psid[i]);
}
