var g = 9.81;

var T1 = 0;
var T2 = 0;
var T3 = 0;



var m1 = 2;
var m2 = 2;
var m3 = 2;

var a = 0;
var b = 0;
var c = 0;
var h = 0;
var l1 = 0;
var l2 = 0;

var r1 = 0;
var r2 = 0;
var r3 = 0; 

var J11 = (1/12)* m1 * (3*(r1)**2 + (h + b)**2);
var J12 = (1/12)* m1 * (3*(r1)**2 + (h + b)**2);
var J13 = (1/2) * m1 *(r1**2);

var J21 = (1/12)* m2 * (3*(r2)**2 + (l1)**2);
var J22 = (1/2) * m2 *(r2**2);
var J23 = (1/12)* m2 * (3*(r2)**2 + (l1)**2);

var J31 = (1/12)* m3 * (3*(r3)**2 + (l2)**2);
var J32 = (1/2) * m3 *(r3**2);
var J33 = (1/12)* m3 * (3*(r3)**2 + (l2)**2);


function get_Qd (th_curr, thd_curr, ph_curr, phd_curr, ps_curr, psd_curr)
{
    /**
     * Calculates the acceleration terms from the equation of moiton as:
     * Qd = Ms**-1 * (Fs - Ns * qd); 
     */
    let Qd = new Array();
    Qd.push(get_thetadd(th_curr, thd_curr, ph_curr, phd_curr, ps_curr, psd_curr));
    Qd.push(get_phidd(th_curr, thd_curr, ph_curr, phd_curr, ps_curr, psd_curr));
    Qd.push(get_psidd(th_curr, thd_curr, ph_curr, phd_curr, ps_curr, psd_curr));
    return Qd;
}

function get_thetadd(th_curr, thd_curr, ph_curr, phd_curr, ps_curr, psd_curr)
{
    
}

function get_phidd(th_curr, thd_curr, ph_curr, phd_curr, ps_curr, psd_curr)
{

}

function get_psidd(th_curr, thd_curr, ph_curr, phd_curr, ps_curr, psd_curr)
{

}

function multiply_matrix(matrixA, matrixB)
{

}

function get_N_star(theta, thetad, phi, phid, psi, psid)
{
    let Ns = new Array();
    
    // First row
    let Ns00 = 2*J22*phid*Math.cos(phi)*Math.sin(phi) - m3*(a*Math.sin(theta) + c*Math.sin(theta) + (l2*Math.cos(phi + psi)*Math.cos(theta))/2 + l1*Math.cos(phi)*Math.cos(theta))*(l1*(phid*Math.cos(theta)*Math.sin(phi) + thetad*Math.cos(phi)*Math.sin(theta)) + (l2*(Math.sin(phi + psi)*Math.cos(theta)*(phid + psid) + thetad*Math.cos(phi + psi)*Math.sin(theta)))/2 - a*thetad*Math.cos(theta) - c*thetad*Math.cos(theta)) - m3*(a*Math.cos(theta) + c*Math.cos(theta) - (l2*Math.cos(phi + psi)*Math.sin(theta))/2 - l1*Math.cos(phi)*Math.sin(theta))*(l1*(thetad*Math.cos(phi)*Math.cos(theta) - phid*Math.sin(phi)*Math.sin(theta)) - (l2*(Math.sin(phi + psi)*Math.sin(theta)*(phid + psid) - thetad*Math.cos(phi + psi)*Math.cos(theta)))/2 + a*thetad*Math.sin(theta) + c*thetad*Math.sin(theta)) - m2*(a*Math.sin(theta) + (l1*Math.cos(phi)*Math.cos(theta))/2)*((l1*(phid*Math.cos(theta)*Math.sin(phi) + thetad*Math.cos(phi)*Math.sin(theta)))/2 - a*thetad*Math.cos(theta)) - m2*(a*Math.cos(theta) - (l1*Math.cos(phi)*Math.sin(theta))/2)*((l1*(thetad*Math.cos(phi)*Math.cos(theta) - phid*Math.sin(phi)*Math.sin(theta)))/2 + a*thetad*Math.sin(theta)) - 2*J23*phid*Math.cos(phi)*Math.sin(phi);
    let Ns01 = - m3*(l1*(phid*Math.cos(phi)*Math.sin(theta) + thetad*Math.cos(theta)*Math.sin(phi)) + (l2*(Math.cos(phi + psi)*Math.sin(theta)*(phid + psid) + thetad*Math.sin(phi + psi)*Math.cos(theta)))/2)*(a*Math.sin(theta) + c*Math.sin(theta) + (l2*Math.cos(phi + psi)*Math.cos(theta))/2 + l1*Math.cos(phi)*Math.cos(theta)) - m3*(l1*(phid*Math.cos(phi)*Math.cos(theta) - thetad*Math.sin(phi)*Math.sin(theta)) + (l2*(Math.cos(phi + psi)*Math.cos(theta)*(phid + psid) - thetad*Math.sin(phi + psi)*Math.sin(theta)))/2)*(a*Math.cos(theta) + c*Math.cos(theta) - (l2*Math.cos(phi + psi)*Math.sin(theta))/2 - l1*Math.cos(phi)*Math.sin(theta)) - (l1*m2*(phid*Math.cos(phi)*Math.sin(theta) + thetad*Math.cos(theta)*Math.sin(phi))*(a*Math.sin(theta) + (l1*Math.cos(phi)*Math.cos(theta))/2))/2 - (l1*m2*(phid*Math.cos(phid)*Math.cos(theta) - thetad*Math.sin(phi)*Math.sin(theta))*(a*Math.cos(theta) - (l1*Math.cos(phi)*Math.sin(theta))/2))/2;
    let Ns02 = - (l2*m3*(Math.cos(phi + psi)*Math.sin(theta)*(phid + psid) + thetad*Math.sin(phi + psi)*Math.cos(theta))*(a*Math.sin(theta) + c*Math.sin(theta) + (l2*Math.cos(phi + psi)*Math.cos(theta))/2 + l1*Math.cos(phi)*Math.cos(theta)))/2 - (l2*m3*(Math.cos(phi + psi)*Math.cos(theta)*(phid + psid) - thetad*Math.sin(phi + psi)*Math.sin(theta))*(a*Math.cos(theta) + c*Math.cos(theta) - (l2*Math.cos(phi + psi)*Math.sin(theta))/2 - l1*Math.cos(phi)*Math.sin(theta)))/2;

    // Second row
    let Ns10 = m3*((l2*Math.sin(phi + psi)*Math.cos(theta))/2 + l1*Math.cos(theta)*Math.sin(phi))*(l1*(thetad*Math.cos(phi)*Math.cos(theta) - phid*Math.sin(phi)*Math.sin(theta)) - (l2*(Math.sin(phi + psi)*Math.sin(theta)*(phid + psid) - thetad*Math.cos(phi + psi)*Math.cos(theta)))/2 + a*thetad*Math.sin(theta) + c*thetad*Math.sin(theta)) + m3*((l2*Math.sin(phi + psi)*Math.sin(theta))/2 + l1*Math.sin(phi)*Math.sin(theta))*(l1*(phid*Math.cos(theta)*Math.sin(phi) + thetad*Math.cos(phi)*Math.sin(theta)) + (l2*(Math.sin(phi + psi)*Math.cos(theta)*(phid + psid) + thetad*Math.cos(phi + psi)*Math.sin(theta)))/2 - a*thetad*Math.cos(theta) - c*thetad*Math.cos(theta)) - J32*thetad*Math.cos(phi + psi)*Math.sin(phi + psi) + J33*thetad*Math.cos(phi + psi)*Math.sin(phi + psi) - J22*thetad*Math.cos(phi)*Math.sin(phi) + J23*thetad*Math.cos(phi)*Math.sin(phi) + (l1*m2*Math.cos(theta)*Math.sin(phi)*((l1*(thetad*Math.cos(phi)*Math.cos(theta) - phid*Math.sin(phi)*Math.sin(theta)))/2 + a*thetad*Math.sin(theta)))/2 + (l1*m2*Math.sin(phi)*Math.sin(theta)*((l1*(phid*Math.cos(theta)*Math.sin(phi) + thetad*Math.cos(phi)*Math.sin(theta)))/2 - a*thetad*Math.cos(theta)))/2;
    let Ns11 = m3*((l2*Math.sin(phi + psi)*Math.cos(theta))/2 + l1*Math.cos(theta)*Math.sin(phi))*(l1*(phid*Math.cos(phi)*Math.cos(theta) - thetad*Math.sin(phi)*Math.sin(theta)) + (l2*(Math.cos(phi + psi)*Math.cos(theta)*(phid + psid) - thetad*Math.sin(phi + psi)*Math.sin(theta)))/2) + m3*(l1*(phid*Math.cos(phi)*Math.sin(theta) + thetad*Math.cos(theta)*Math.sin(phi)) + (l2*(Math.cos(phi + psi)*Math.sin(theta)*(phid + psid) + thetad*Math.sin(phi + psi)*Math.cos(theta)))/2)*((l2*Math.sin(phi + psi)*Math.sin(theta))/2 + l1*Math.sin(phi)*Math.sin(theta)) - m3*(l1*Math.cos(phi) + (l2*Math.cos(phi))/2 - (l2*Math.sin(phi)*Math.sin(psi))/2)*((l2*(phid*Math.cos(phi)*Math.sin(psi) + psid*Math.cos(psi)*Math.sin(phi)))/2 + l1*phid*Math.sin(phi) + (l2*phid*Math.sin(phi))/2) - (l1**2*m2*phid*Math.cos(phi)*Math.sin(phi))/4 + (l1**2*m2*Math.cos(theta)*Math.sin(phi)*(phid*Math.cos(phid)*Math.cos(theta) - thetad*Math.sin(phi)*Math.sin(theta)))/4 + (l1**2*m2*Math.sin(phi)*Math.sin(theta)*(phid*Math.cos(phi)*Math.sin(theta) + thetad*Math.cos(theta)*Math.sin(phi)))/4;
    let Ns12 = (l2*m3*((l2*Math.sin(phi + psi)*Math.cos(theta))/2 + l1*Math.cos(theta)*Math.sin(phi))*(Math.cos(phi + psi)*Math.cos(theta)*(phid + psid) - thetad*Math.sin(phi + psi)*Math.sin(theta)))/2 + (l2*m3*((l2*Math.sin(phi + psi)*Math.sin(theta))/2 + l1*Math.sin(phi)*Math.sin(theta))*(Math.cos(phi + psi)*Math.sin(theta)*(phid + psid) + thetad*Math.sin(phi + psi)*Math.cos(theta)))/2 - (l2*m3*Math.sin(phi + psi)*(phid + psid)*(l1*Math.cos(phi) + (l2*Math.cos(phi))/2 - (l2*Math.sin(phi)*Math.sin(psi))/2))/2;

    // Third row
    let Ns20 = J33*thetad*Math.cos(phi + psi)*Math.sin(phi + psi) - J32*thetad*Math.cos(phi + psi)*Math.sin(phi + psi) + (l2*m3*Math.sin(phi + psi)*Math.sin(theta)*(l1*(phid*Math.cos(theta)*Math.sin(phi) + thetad*Math.cos(phi)*Math.sin(theta)) + (l2*(Math.sin(phi + psi)*Math.cos(theta)*(phid + psid) + thetad*Math.cos(phi + psi)*Math.sin(theta)))/2 - a*thetad*Math.cos(theta) - c*thetad*Math.cos(theta)))/2 + (l2*m3*Math.sin(phi + psi)*Math.cos(theta)*(l1*(thetad*Math.cos(phi)*Math.cos(theta) - phid*Math.sin(phi)*Math.sin(theta)) - (l2*(Math.sin(phi + psi)*Math.sin(theta)*(phid + psid) - thetad*Math.cos(phi + psi)*Math.cos(theta)))/2 + a*thetad*Math.sin(theta) + c*thetad*Math.sin(theta)))/2;
    let Ns21 = (l2*m3*Math.sin(phi + psi)*Math.cos(theta)*(l1*(phid*Math.cos(phi)*Math.cos(theta) - thetad*Math.sin(phi)*Math.sin(theta)) + (l2*(Math.cos(phi + psi)*Math.cos(theta)*(phid + psid) - thetad*Math.sin(phi + psi)*Math.sin(theta)))/2))/2 - (l2*m3*Math.cos(phi + psi)*((l2*(phid*Math.cos(phi)*Math.sin(psi) + psid*Math.cos(psi)*Math.sin(phi)))/2 + l1*phid*Math.sin(phi) + (l2*phid*Math.sin(phi))/2))/2 + (l2*m3*Math.sin(phi + psi)*Math.sin(theta)*(l1*(phid*Math.cos(phi)*Math.sin(theta) + thetad*Math.cos(theta)*Math.sin(phi)) + (l2*(Math.cos(phi + psi)*Math.sin(theta)*(phid + psid) + thetad*Math.sin(phi + psi)*Math.cos(theta)))/2))/2;
    let Ns22 = (l2**2*m3*Math.sin(phi + psi)*Math.cos(theta)*(Math.cos(phi + psi)*Math.cos(theta)*(phid + psid) - thetad*Math.sin(phi + psi)*Math.sin(theta)))/4 + (l2**2*m3*Math.sin(phi + psi)*Math.sin(theta)*(Math.cos(phi + psi)*Math.sin(theta)*(phid + psid) + thetad*Math.sin(phi + psi)*Math.cos(theta)))/4 - (l2**2*m3*Math.cos(phi + psi)*Math.sin(phi + psi)*(phid + psid))/4;

}

function get_M_star(theta, phi, psi)
{
    let Ms = new Array();
    let Ms0 = new Array();
    let Ms1 = new Array();
    let Ms2 = new Array();
    // First row
    let Ms00 = J13 + m3*(a*Math.sin(theta) + c*Math.sin(theta) + (l2*Math.cos(phi + psi)*Math.cos(theta))/2 + l1*Math.cos(phi)*Math.cos(theta))**2 + m3*(a*Math.cos(theta) + c*Math.cos(theta) - (l2*Math.cos(phi + psi)*Math.sin(theta))/2 - l1*Math.cos(phi)*Math.sin(theta))**2 + m2*(a*Math.cos(theta) - (l1*Math.cos(phi)*Math.sin(theta))/2)**2 + m2*(a*Math.sin(theta) + (l1*Math.cos(phi)*Math.cos(theta))/2)**2 + J33*Math.cos(phi + psi)**2 + J32*Math.sin(phi + psi)**2 + J23*Math.cos(phi)**2 + J22*Math.sin(phi)**2;
    let Ms01 = - m3*((l2*Math.sin(phi + psi)*Math.cos(theta))/2 + l1*Math.cos(theta)*Math.sin(phi))*(a*Math.cos(theta) + c*Math.cos(theta) - (l2*Math.cos(phi + psi)*Math.sin(theta))/2 - l1*Math.cos(phi)*Math.sin(theta)) - m3*((l2*Math.sin(phi + psi)*Math.sin(theta))/2 + l1*Math.sin(phi)*Math.sin(theta))*(a*Math.sin(theta) + c*Math.sin(theta) + (l2*Math.cos(phi + psi)*Math.cos(theta))/2 + l1*Math.cos(phi)*Math.cos(theta)) - (l1*m2*Math.cos(theta)*Math.sin(phi)*(a*Math.cos(theta) - (l1*Math.cos(phi)*Math.sin(theta))/2))/2 - (l1*m2*Math.sin(phi)*Math.sin(theta)*(a*Math.sin(theta) + (l1*Math.cos(phi)*Math.cos(theta))/2))/2;
    let Ms02 = - (l2*m3*Math.sin(phi + psi)*Math.cos(theta)*(a*Math.cos(theta) + c*Math.cos(theta) - (l2*Math.cos(phi + psi)*Math.sin(theta))/2 - l1*Math.cos(phi)*Math.sin(theta)))/2 - (l2*m3*Math.sin(phi + psi)*Math.sin(theta)*(a*Math.sin(theta) + c*Math.sin(theta) + (l2*Math.cos(phi + psi)*Math.cos(theta))/2 + l1*Math.cos(phi)*Math.cos(theta)))/2;
    Ms0.push(Ms00);
    Ms0.push(Ms01);
    Ms0.push(Ms02);

    // Second row
    let Ms10 = - m3*((l2*Math.sin(phi + psi)*Math.cos(theta))/2 + l1*Math.cos(theta)*Math.sin(phi))*(a*Math.cos(theta) + c*Math.cos(theta) - (l2*Math.cos(phi + psi)*Math.sin(theta))/2 - l1*Math.cos(phi)*Math.sin(theta)) - m3*((l2*Math.sin(phi + psi)*Math.sin(theta))/2 + l1*Math.sin(phi)*Math.sin(theta))*(a*Math.sin(theta) + c*Math.sin(theta) + (l2*Math.cos(phi + psi)*Math.cos(theta))/2 + l1*Math.cos(phi)*Math.cos(theta)) - (l1*m2*Math.cos(theta)*Math.sin(phi)*(a*Math.cos(theta) - (l1*Math.cos(phi)*Math.sin(theta))/2))/2 - (l1*m2*Math.sin(phi)*Math.sin(theta)*(a*Math.sin(theta) + (l1*Math.cos(phi)*Math.cos(theta))/2))/2;
    let Ms11 = J21 + J31 + m3*(l1*Math.cos(phi) + (l2*Math.cos(phi))/2 - (l2*Math.sin(phi)*Math.sin(psi))/2)**2 + m3*((l2*Math.sin(phi + psi)*Math.cos(theta))/2 + l1*Math.cos(theta)*Math.sin(phi))**2 + m3*((l2*Math.sin(phi + psi)*Math.sin(theta))/2 + l1*Math.sin(phi)*Math.sin(theta))**2 + (l1**2*m2*Math.cos(phi)**2)/4 + (l1**2*m2*Math.cos(theta)**2*Math.sin(phi)**2)/4 + (l1**2*m2*Math.sin(phi)**2*Math.sin(theta)**2)/4;
    let Ms12 = J31 + (l2*m3*Math.cos(phi + psi)*(l1*Math.cos(phi) + (l2*Math.cos(phi))/2 - (l2*Math.sin(phi)*Math.sin(psi))/2))/2 + (l2*m3*Math.sin(phi + psi)*Math.cos(theta)*((l2*Math.sin(phi + psi)*Math.cos(theta))/2 + l1*Math.cos(theta)*Math.sin(phi)))/2 + (l2*m3*Math.sin(phi + psi)*Math.sin(theta)*((l2*Math.sin(phi + psi)*Math.sin(theta))/2 + l1*Math.sin(phi)*Math.sin(theta)))/2;
    Ms1.push(Ms10);
    Ms1.push(Ms11);
    Ms1.push(Ms12);

    // Third row
    let Ms20 = - (l2*m3*Math.sin(phi + psi)*Math.cos(theta)*(a*Math.cos(theta) + c*Math.cos(theta) - (l2*Math.cos(phi + psi)*Math.sin(theta))/2 - l1*Math.cos(phi)*Math.sin(theta)))/2 - (l2*m3*Math.sin(phi + psi)*Math.sin(theta)*(a*Math.sin(theta) + c*Math.sin(theta) + (l2*Math.cos(phi + psi)*Math.cos(theta))/2 + l1*Math.cos(phi)*Math.cos(theta)))/2;
    let Ms21 = J31 + (l2*m3*Math.cos(phi + psi)*(l1*Math.cos(phi) + (l2*Math.cos(phi))/2 - (l2*Math.sin(phi)*Math.sin(psi))/2))/2 + (l2*m3*Math.sin(phi + psi)*Math.cos(theta)*((l2*Math.sin(phi + psi)*Math.cos(theta))/2 + l1*Math.cos(theta)*Math.sin(phi)))/2 + (l2*m3*Math.sin(phi + psi)*Math.sin(theta)*((l2*Math.sin(phi + psi)*Math.sin(theta))/2 + l1*Math.sin(phi)*Math.sin(theta)))/2;
    let Ms22 = J31 + (l2**2*m3*Math.cos(phi + psi)**2)/4 + (l2**2*m3*Math.sin(phi + psi)**2*Math.cos(theta)**2)/4 + (l2**2*m3*Math.sin(phi + psi)**2*Math.sin(theta)**2)/4;
    Ms2.push(Ms20);
    Ms2.push(Ms21);
    Ms2.push(Ms22);

    Ms.push(Ms0);
    Ms.push(Ms1);
    Ms.push(Ms2);

    return Ms;
}

function get_M_star_inverse()
{
    Ms = get_M_star();
    determinant = ( Ms[0][0] * (Ms[1][1]*Ms[2][2] - Ms[1][2]*Ms[2][1]) - Ms[0][1] * (Ms[1][0]*Ms[2][2] - Ms[1][2]*Ms[2][0]) + Ms[0][2] * (Ms[1][0]*Ms[2][1] - Ms[1][1]*Ms[2][0]) );

}

function get_F_star(theta, phi, psi)
{
    let Fs = new Array();
    let Fs1 = T1 - T2;
    let Fs2 = T2 - (g*m3)*(l1*Math.cos(phi) + (l2*Math.cos(phi))/2 - (l2*Math.sin(phi)*Math.sin(psi))/2) - (g*l1*m2*Math.cos(phi))/2;
    let Fs3 = T3 - (l2*Math.cos(phi + psi)*(g*m3))/2;
    Fs.push(Fs1);
    Fs.push(Fs2);
    Fs.push(Fs3);
    return Fs;
}