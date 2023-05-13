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

// We assume here that the tower and arms can all be considered cylinders, of course this may not hold in which case some other formula for mass moment of inertia should be used.
// Any modern CAD software is also likely to give the mass moment of inertia about the axises and can also be inserted directly.
var J11 = (1/12)* m1 * (3*(r1)**2 + (h + b)**2);
var J12 = (1/12)* m1 * (3*(r1)**2 + (h + b)**2);
var J13 = (1/2) * m1 *(r1**2);

var J21 = (1/12)* m2 * (3*(r2)**2 + (l1)**2);
var J22 = (1/2) * m2 *(r2**2);
var J23 = (1/12)* m2 * (3*(r2)**2 + (l1)**2);

var J31 = (1/12)* m3 * (3*(r3)**2 + (l2)**2);
var J32 = (1/2) * m3 *(r3**2);
var J33 = (1/12)* m3 * (3*(r3)**2 + (l2)**2);

var Mstar = new Array();
var Mstar_inv = new Array();
var Nstar = new Array();
var Fstar = new Array();


function get_Qd (th_curr, thd_curr, ph_curr, phd_curr, ps_curr, psd_curr)
{
    /**
     * Calculates the acceleration terms from the equation of moiton as:
     * Qd = Ms**-1 * (Fs - Ns * qd); 
     */
    let Qd = new Array();
    get_M_star();
    get_M_star_inverse();
    get_N_star();
    get_F_star();
    Qd.push(get_thetadd(th_curr, thd_curr, ph_curr, phd_curr, ps_curr, psd_curr));
    Qd.push(get_phidd(th_curr, thd_curr, ph_curr, phd_curr, ps_curr, psd_curr));
    Qd.push(get_psidd(th_curr, thd_curr, ph_curr, phd_curr, ps_curr, psd_curr));
    return Qd;
}

function get_thetadd(th_curr, thd_curr, ph_curr, phd_curr, ps_curr, psd_curr)
{
    /**
     * Gets the thetadd from the equation of motion with the current values.
     * Becomes a single value.
     */
    return (Mstar_inv[0][0] * (Fstar[0] - (Nstar[0][0] * thd_curr + Nstar[0][1] * phd_curr + Nstar[0][2] * psd_curr)) + Mstar_inv[0][1] * (Fstar[1] - (Nstar[1][0] * thd_curr + Nstar[1][1] * phd_curr + Nstar[1][2] * psd_curr)) + Mstar_inv[0][2] * (Fstar[2] - (Nstar[2][0] * thd_curr + Nstar[2][1] * phd_curr + Nstar[2][2] * psd_curr)));
}

function get_phidd(th_curr, thd_curr, ph_curr, phd_curr, ps_curr, psd_curr)
{
    /**
     * Gets the phidd from the equation of motion with the current values.
     * Becomes a single value.
     */
    return (Mstar_inv[1][0] * (Fstar[0] - (Nstar[0][0] * thd_curr + Nstar[0][1] * phd_curr + Nstar[0][2] * psd_curr)) + Mstar_inv[1][1] * (Fstar[1] - (Nstar[1][0] * thd_curr + Nstar[1][1] * phd_curr + Nstar[1][2] * psd_curr)) + Mstar_inv[1][2] * (Fstar[2] - (Nstar[2][0] * thd_curr + Nstar[2][1] * phd_curr + Nstar[2][2] * psd_curr)));
}

function get_psidd(th_curr, thd_curr, ph_curr, phd_curr, ps_curr, psd_curr)
{
    /**
     * Gets the psidd from the eqution of motion with the current values.
     * Becomes a single value.
     */
    return (Mstar_inv[2][0] * (Fstar[0] - (Nstar[0][0] * thd_curr + Nstar[0][1] * phd_curr + Nstar[0][2] * psd_curr)) + Mstar_inv[2][1] * (Fstar[1] - (Nstar[1][0] * thd_curr + Nstar[1][1] * phd_curr + Nstar[1][2] * psd_curr)) + Mstar_inv[2][2] * (Fstar[2] - (Nstar[2][0] * thd_curr + Nstar[2][1] * phd_curr + Nstar[2][2] * psd_curr)));
}

function multiply_matrices(matrixA, matrixB, rowsA, colsA, rowsB, colsB)
{
    /**
     * Takes 2 matrices and multiplies them together, then returns the resulting matrix.
     */
    let result_matrix = new Array();
    for (let i = 0; i < rowsA; i++)
    {
        let matrix_row = new Array();

        for (let j = 0; j < colsB; j++)
        {
            let matrix_member = 0;
            for (let k = 0; k < colsA; k++)
            {
                matrix_member += matrixA[i][k] * matrixB[j][i];
            }
            matrix_row.push(matrix_member);
        }
        result_matrix.push(matrix_row);
    }
    return result_matrix;
}

function get_N_star(theta, thetad, phi, phid, psi, psid)
{
    /**
     * Calculates and sets a new N-star matrix from given theta, thetad, phi, phid, psi and psid.
     * N-star becomes a 3x3 matrix.
     */
    let Ns = new Array();
    let Ns0 = new Array();
    let Ns1 = new Array();
    let Ns2 = new Array();
    
    // First row
    let Ns00 = 2*J22*phid*Math.cos(phi)*Math.sin(phi) - m3*(a*Math.sin(theta) + c*Math.sin(theta) + (l2*Math.cos(phi + psi)*Math.cos(theta))/2 + l1*Math.cos(phi)*Math.cos(theta))*(l1*(phid*Math.cos(theta)*Math.sin(phi) + thetad*Math.cos(phi)*Math.sin(theta)) + (l2*(Math.sin(phi + psi)*Math.cos(theta)*(phid + psid) + thetad*Math.cos(phi + psi)*Math.sin(theta)))/2 - a*thetad*Math.cos(theta) - c*thetad*Math.cos(theta)) - m3*(a*Math.cos(theta) + c*Math.cos(theta) - (l2*Math.cos(phi + psi)*Math.sin(theta))/2 - l1*Math.cos(phi)*Math.sin(theta))*(l1*(thetad*Math.cos(phi)*Math.cos(theta) - phid*Math.sin(phi)*Math.sin(theta)) - (l2*(Math.sin(phi + psi)*Math.sin(theta)*(phid + psid) - thetad*Math.cos(phi + psi)*Math.cos(theta)))/2 + a*thetad*Math.sin(theta) + c*thetad*Math.sin(theta)) - m2*(a*Math.sin(theta) + (l1*Math.cos(phi)*Math.cos(theta))/2)*((l1*(phid*Math.cos(theta)*Math.sin(phi) + thetad*Math.cos(phi)*Math.sin(theta)))/2 - a*thetad*Math.cos(theta)) - m2*(a*Math.cos(theta) - (l1*Math.cos(phi)*Math.sin(theta))/2)*((l1*(thetad*Math.cos(phi)*Math.cos(theta) - phid*Math.sin(phi)*Math.sin(theta)))/2 + a*thetad*Math.sin(theta)) - 2*J23*phid*Math.cos(phi)*Math.sin(phi);
    let Ns01 = - m3*(l1*(phid*Math.cos(phi)*Math.sin(theta) + thetad*Math.cos(theta)*Math.sin(phi)) + (l2*(Math.cos(phi + psi)*Math.sin(theta)*(phid + psid) + thetad*Math.sin(phi + psi)*Math.cos(theta)))/2)*(a*Math.sin(theta) + c*Math.sin(theta) + (l2*Math.cos(phi + psi)*Math.cos(theta))/2 + l1*Math.cos(phi)*Math.cos(theta)) - m3*(l1*(phid*Math.cos(phi)*Math.cos(theta) - thetad*Math.sin(phi)*Math.sin(theta)) + (l2*(Math.cos(phi + psi)*Math.cos(theta)*(phid + psid) - thetad*Math.sin(phi + psi)*Math.sin(theta)))/2)*(a*Math.cos(theta) + c*Math.cos(theta) - (l2*Math.cos(phi + psi)*Math.sin(theta))/2 - l1*Math.cos(phi)*Math.sin(theta)) - (l1*m2*(phid*Math.cos(phi)*Math.sin(theta) + thetad*Math.cos(theta)*Math.sin(phi))*(a*Math.sin(theta) + (l1*Math.cos(phi)*Math.cos(theta))/2))/2 - (l1*m2*(phid*Math.cos(phid)*Math.cos(theta) - thetad*Math.sin(phi)*Math.sin(theta))*(a*Math.cos(theta) - (l1*Math.cos(phi)*Math.sin(theta))/2))/2;
    let Ns02 = - (l2*m3*(Math.cos(phi + psi)*Math.sin(theta)*(phid + psid) + thetad*Math.sin(phi + psi)*Math.cos(theta))*(a*Math.sin(theta) + c*Math.sin(theta) + (l2*Math.cos(phi + psi)*Math.cos(theta))/2 + l1*Math.cos(phi)*Math.cos(theta)))/2 - (l2*m3*(Math.cos(phi + psi)*Math.cos(theta)*(phid + psid) - thetad*Math.sin(phi + psi)*Math.sin(theta))*(a*Math.cos(theta) + c*Math.cos(theta) - (l2*Math.cos(phi + psi)*Math.sin(theta))/2 - l1*Math.cos(phi)*Math.sin(theta)))/2;
    Ns0.push(Ns00);
    Ns0.push(Ns01);
    Ns0.push(Ns02);

    // Second row
    let Ns10 = m3*((l2*Math.sin(phi + psi)*Math.cos(theta))/2 + l1*Math.cos(theta)*Math.sin(phi))*(l1*(thetad*Math.cos(phi)*Math.cos(theta) - phid*Math.sin(phi)*Math.sin(theta)) - (l2*(Math.sin(phi + psi)*Math.sin(theta)*(phid + psid) - thetad*Math.cos(phi + psi)*Math.cos(theta)))/2 + a*thetad*Math.sin(theta) + c*thetad*Math.sin(theta)) + m3*((l2*Math.sin(phi + psi)*Math.sin(theta))/2 + l1*Math.sin(phi)*Math.sin(theta))*(l1*(phid*Math.cos(theta)*Math.sin(phi) + thetad*Math.cos(phi)*Math.sin(theta)) + (l2*(Math.sin(phi + psi)*Math.cos(theta)*(phid + psid) + thetad*Math.cos(phi + psi)*Math.sin(theta)))/2 - a*thetad*Math.cos(theta) - c*thetad*Math.cos(theta)) - J32*thetad*Math.cos(phi + psi)*Math.sin(phi + psi) + J33*thetad*Math.cos(phi + psi)*Math.sin(phi + psi) - J22*thetad*Math.cos(phi)*Math.sin(phi) + J23*thetad*Math.cos(phi)*Math.sin(phi) + (l1*m2*Math.cos(theta)*Math.sin(phi)*((l1*(thetad*Math.cos(phi)*Math.cos(theta) - phid*Math.sin(phi)*Math.sin(theta)))/2 + a*thetad*Math.sin(theta)))/2 + (l1*m2*Math.sin(phi)*Math.sin(theta)*((l1*(phid*Math.cos(theta)*Math.sin(phi) + thetad*Math.cos(phi)*Math.sin(theta)))/2 - a*thetad*Math.cos(theta)))/2;
    let Ns11 = m3*((l2*Math.sin(phi + psi)*Math.cos(theta))/2 + l1*Math.cos(theta)*Math.sin(phi))*(l1*(phid*Math.cos(phi)*Math.cos(theta) - thetad*Math.sin(phi)*Math.sin(theta)) + (l2*(Math.cos(phi + psi)*Math.cos(theta)*(phid + psid) - thetad*Math.sin(phi + psi)*Math.sin(theta)))/2) + m3*(l1*(phid*Math.cos(phi)*Math.sin(theta) + thetad*Math.cos(theta)*Math.sin(phi)) + (l2*(Math.cos(phi + psi)*Math.sin(theta)*(phid + psid) + thetad*Math.sin(phi + psi)*Math.cos(theta)))/2)*((l2*Math.sin(phi + psi)*Math.sin(theta))/2 + l1*Math.sin(phi)*Math.sin(theta)) - m3*(l1*Math.cos(phi) + (l2*Math.cos(phi))/2 - (l2*Math.sin(phi)*Math.sin(psi))/2)*((l2*(phid*Math.cos(phi)*Math.sin(psi) + psid*Math.cos(psi)*Math.sin(phi)))/2 + l1*phid*Math.sin(phi) + (l2*phid*Math.sin(phi))/2) - (l1**2*m2*phid*Math.cos(phi)*Math.sin(phi))/4 + (l1**2*m2*Math.cos(theta)*Math.sin(phi)*(phid*Math.cos(phid)*Math.cos(theta) - thetad*Math.sin(phi)*Math.sin(theta)))/4 + (l1**2*m2*Math.sin(phi)*Math.sin(theta)*(phid*Math.cos(phi)*Math.sin(theta) + thetad*Math.cos(theta)*Math.sin(phi)))/4;
    let Ns12 = (l2*m3*((l2*Math.sin(phi + psi)*Math.cos(theta))/2 + l1*Math.cos(theta)*Math.sin(phi))*(Math.cos(phi + psi)*Math.cos(theta)*(phid + psid) - thetad*Math.sin(phi + psi)*Math.sin(theta)))/2 + (l2*m3*((l2*Math.sin(phi + psi)*Math.sin(theta))/2 + l1*Math.sin(phi)*Math.sin(theta))*(Math.cos(phi + psi)*Math.sin(theta)*(phid + psid) + thetad*Math.sin(phi + psi)*Math.cos(theta)))/2 - (l2*m3*Math.sin(phi + psi)*(phid + psid)*(l1*Math.cos(phi) + (l2*Math.cos(phi))/2 - (l2*Math.sin(phi)*Math.sin(psi))/2))/2;
    Ns1.push(Ns10);
    Ns1.push(Ns11);
    Ns1.push(Ns12);

    // Third row
    let Ns20 = J33*thetad*Math.cos(phi + psi)*Math.sin(phi + psi) - J32*thetad*Math.cos(phi + psi)*Math.sin(phi + psi) + (l2*m3*Math.sin(phi + psi)*Math.sin(theta)*(l1*(phid*Math.cos(theta)*Math.sin(phi) + thetad*Math.cos(phi)*Math.sin(theta)) + (l2*(Math.sin(phi + psi)*Math.cos(theta)*(phid + psid) + thetad*Math.cos(phi + psi)*Math.sin(theta)))/2 - a*thetad*Math.cos(theta) - c*thetad*Math.cos(theta)))/2 + (l2*m3*Math.sin(phi + psi)*Math.cos(theta)*(l1*(thetad*Math.cos(phi)*Math.cos(theta) - phid*Math.sin(phi)*Math.sin(theta)) - (l2*(Math.sin(phi + psi)*Math.sin(theta)*(phid + psid) - thetad*Math.cos(phi + psi)*Math.cos(theta)))/2 + a*thetad*Math.sin(theta) + c*thetad*Math.sin(theta)))/2;
    let Ns21 = (l2*m3*Math.sin(phi + psi)*Math.cos(theta)*(l1*(phid*Math.cos(phi)*Math.cos(theta) - thetad*Math.sin(phi)*Math.sin(theta)) + (l2*(Math.cos(phi + psi)*Math.cos(theta)*(phid + psid) - thetad*Math.sin(phi + psi)*Math.sin(theta)))/2))/2 - (l2*m3*Math.cos(phi + psi)*((l2*(phid*Math.cos(phi)*Math.sin(psi) + psid*Math.cos(psi)*Math.sin(phi)))/2 + l1*phid*Math.sin(phi) + (l2*phid*Math.sin(phi))/2))/2 + (l2*m3*Math.sin(phi + psi)*Math.sin(theta)*(l1*(phid*Math.cos(phi)*Math.sin(theta) + thetad*Math.cos(theta)*Math.sin(phi)) + (l2*(Math.cos(phi + psi)*Math.sin(theta)*(phid + psid) + thetad*Math.sin(phi + psi)*Math.cos(theta)))/2))/2;
    let Ns22 = (l2**2*m3*Math.sin(phi + psi)*Math.cos(theta)*(Math.cos(phi + psi)*Math.cos(theta)*(phid + psid) - thetad*Math.sin(phi + psi)*Math.sin(theta)))/4 + (l2**2*m3*Math.sin(phi + psi)*Math.sin(theta)*(Math.cos(phi + psi)*Math.sin(theta)*(phid + psid) + thetad*Math.sin(phi + psi)*Math.cos(theta)))/4 - (l2**2*m3*Math.cos(phi + psi)*Math.sin(phi + psi)*(phid + psid))/4;
    Ns2.push(Ns20);
    Ns2.push(Ns21);
    Ns2.push(Ns22);

    Ns.push(Ns0);
    Ns.push(Ns1);
    Ns.push(Ns2);

    Nstar = Ns;
}

function get_M_star(theta, phi, psi)
{
    /**
     * Calculates and sets a new M-star matrix from given theta, tehtad, phi, phid, psi and psid.
     * M-star becomes a 3x3 matrix.
     */
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

    Mstar = Ms;
}

function get_M_star_inverse()
{
    /**
     * Calculates and sets a new M-star-inverse.
     * M-star-inverse becomes a 3x3 matrix.
     */
    // TODO: finish inverse M-star function.
    Ms_inv = new Array();
    Ms = get_M_star();
    determinant = ( Ms[0][0] * (Ms[1][1]*Ms[2][2] - Ms[1][2]*Ms[2][1]) - Ms[0][1] * (Ms[1][0]*Ms[2][2] - Ms[1][2]*Ms[2][0]) + Ms[0][2] * (Ms[1][0]*Ms[2][1] - Ms[1][1]*Ms[2][0]) );

    Mstar_inv = Ms_inv;
}   

function get_F_star(theta, phi, psi)
{
    /**
     * Calculates and sets a new F-star from given theta, phi and psi.
     * Fstar becomes a 3x1 matrix.
     */
    let Fs = new Array();
    let Fs1 = T1 - T2;
    let Fs2 = T2 - (g*m3)*(l1*Math.cos(phi) + (l2*Math.cos(phi))/2 - (l2*Math.sin(phi)*Math.sin(psi))/2) - (g*l1*m2*Math.cos(phi))/2;
    let Fs3 = T3 - (l2*Math.cos(phi + psi)*(g*m3))/2;
    Fs.push(Fs1);
    Fs.push(Fs2);
    Fs.push(Fs3);
    Fstar = Fs;
}