var g = 9.81;

var T1 = 1;
var T2 = 1;
var T3 = 1;

var m1 = 1;
var m2 = 1;
var m3 = 1;

var a = 1.2;
var b = 1;
var c = 0.8;
var h = 3;
var l1 = 2;
var l2 = 1.5;

var r1 = 1;
var r2 = 0.5;
var r3 = 0.5; 

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
    get_M_star(th_curr, ph_curr, ps_curr);
    get_M_star_inverse();
    get_N_star(th_curr, thd_curr, ph_curr, phd_curr, ps_curr, psd_curr);
    get_F_star(th_curr, ph_curr, ps_curr);
    Qd.push(get_thetaadd(thd_curr, phd_curr, psd_curr));
    Qd.push(get_phiidd(thd_curr, phd_curr, psd_curr));
    Qd.push(get_psiidd(thd_curr, phd_curr, psd_curr));

    console.log("Qd: ", Qd, "\tMs: ", Mstar, "\tMs-inv: ", Mstar_inv, "\tNs-inv: ", Nstar, "\tFs: ", Fstar); 
    return Qd;
}

function get_thetaadd(thd_curr, phd_curr, psd_curr)
{
    /**
     * Gets the thetaadd from the equation of motion with the current values.
     * Becomes a single value.
     */
    return (Mstar_inv[0][0] * (Fstar[0] - (Nstar[0][0] * thd_curr + Nstar[0][1] * phd_curr + Nstar[0][2] * psd_curr)) + 
            Mstar_inv[0][1] * (Fstar[1] - (Nstar[1][0] * thd_curr + Nstar[1][1] * phd_curr + Nstar[1][2] * psd_curr)) + 
            Mstar_inv[0][2] * (Fstar[2] - (Nstar[2][0] * thd_curr + Nstar[2][1] * phd_curr + Nstar[2][2] * psd_curr)) );
}

function get_phiidd(thd_curr, phd_curr, psd_curr)
{
    /**
     * Gets the phiidd from the equation of motion with the current values.
     * Becomes a single value.
     */
    return (Mstar_inv[1][0] * (Fstar[0] - (Nstar[0][0] * thd_curr + Nstar[0][1] * phd_curr + Nstar[0][2] * psd_curr)) + 
            Mstar_inv[1][1] * (Fstar[1] - (Nstar[1][0] * thd_curr + Nstar[1][1] * phd_curr + Nstar[1][2] * psd_curr)) + 
            Mstar_inv[1][2] * (Fstar[2] - (Nstar[2][0] * thd_curr + Nstar[2][1] * phd_curr + Nstar[2][2] * psd_curr)) );
}

function get_psiidd(thd_curr, phd_curr, psd_curr)
{
    /**
     * Gets the psiidd from the eqution of motion with the current values.
     * Becomes a single value.
     */
    return (Mstar_inv[2][0] * (Fstar[0] - (Nstar[0][0] * thd_curr + Nstar[0][1] * phd_curr + Nstar[0][2] * psd_curr)) + 
            Mstar_inv[2][1] * (Fstar[1] - (Nstar[1][0] * thd_curr + Nstar[1][1] * phd_curr + Nstar[1][2] * psd_curr)) + 
            Mstar_inv[2][2] * (Fstar[2] - (Nstar[2][0] * thd_curr + Nstar[2][1] * phd_curr + Nstar[2][2] * psd_curr)) );
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

function get_N_star(thetaa, thetaad, phii, phiid, psii, psiid)
{
    /**
     * Calculates and sets a new N-star matrix from given thetaa, thetaad, phii, phiid, psii and psiid.
     * N-star becomes a 3x3 matrix.
     */
    let Ns = new Array();
    let Ns0 = new Array();
    let Ns1 = new Array();
    let Ns2 = new Array();
    
    // First row
    let Ns00 = 2*J22*phiid*Math.cos(phii)*Math.sin(phii) - m3*(a*Math.sin(thetaa) + c*Math.sin(thetaa) + (l2*Math.cos(phii + psii)*Math.cos(thetaa))/2 + 
                l1*Math.cos(phii)*Math.cos(thetaa))*(l1*(phiid*Math.cos(thetaa)*Math.sin(phii) + thetaad*Math.cos(phii)*Math.sin(thetaa)) + (l2*(Math.sin(phii + psii)*Math.cos(thetaa)*(phiid + psiid) + 
                thetaad*Math.cos(phii + psii)*Math.sin(thetaa)))/2 - a*thetaad*Math.cos(thetaa) - c*thetaad*Math.cos(thetaa)) - m3*(a*Math.cos(thetaa) + c*Math.cos(thetaa) - 
                (l2*Math.cos(phii + psii)*Math.sin(thetaa))/2 - l1*Math.cos(phii)*Math.sin(thetaa))*(l1*(thetaad*Math.cos(phii)*Math.cos(thetaa) - phiid*Math.sin(phii)*Math.sin(thetaa)) - 
                (l2*(Math.sin(phii + psii)*Math.sin(thetaa)*(phiid + psiid) - thetaad*Math.cos(phii + psii)*Math.cos(thetaa)))/2 + a*thetaad*Math.sin(thetaa) + c*thetaad*Math.sin(thetaa)) - 
                m2*(a*Math.sin(thetaa) + (l1*Math.cos(phii)*Math.cos(thetaa))/2)*((l1*(phiid*Math.cos(thetaa)*Math.sin(phii) + thetaad*Math.cos(phii)*Math.sin(thetaa)))/2 - 
                a*thetaad*Math.cos(thetaa)) - m2*(a*Math.cos(thetaa) - (l1*Math.cos(phii)*Math.sin(thetaa))/2)*((l1*(thetaad*Math.cos(phii)*Math.cos(thetaa) - 
                phiid*Math.sin(phii)*Math.sin(thetaa)))/2 + a*thetaad*Math.sin(thetaa)) - 2*J23*phiid*Math.cos(phii)*Math.sin(phii);

    let Ns01 = - m3*(l1*(phiid*Math.cos(phii)*Math.sin(thetaa) + thetaad*Math.cos(thetaa)*Math.sin(phii)) + (l2*(Math.cos(phii + psii)*Math.sin(thetaa)*(phiid + psiid) + 
                thetaad*Math.sin(phii + psii)*Math.cos(thetaa)))/2)*(a*Math.sin(thetaa) + c*Math.sin(thetaa) + (l2*Math.cos(phii + psii)*Math.cos(thetaa))/2 + l1*Math.cos(phii)*Math.cos(thetaa)) - 
                m3*(l1*(phiid*Math.cos(phii)*Math.cos(thetaa) - thetaad*Math.sin(phii)*Math.sin(thetaa)) + (l2*(Math.cos(phii + psii)*Math.cos(thetaa)*(phiid + psiid) - 
                thetaad*Math.sin(phii + psii)*Math.sin(thetaa)))/2)*(a*Math.cos(thetaa) + c*Math.cos(thetaa) - (l2*Math.cos(phii + psii)*Math.sin(thetaa))/2 - l1*Math.cos(phii)*Math.sin(thetaa)) - 
                (l1*m2*(phiid*Math.cos(phii)*Math.sin(thetaa) + thetaad*Math.cos(thetaa)*Math.sin(phii))*(a*Math.sin(thetaa) + (l1*Math.cos(phii)*Math.cos(thetaa))/2))/2 - 
                (l1*m2*(phiid*Math.cos(phii)*Math.cos(thetaa) - thetaad*Math.sin(phii)*Math.sin(thetaa))*(a*Math.cos(thetaa) - (l1*Math.cos(phii)*Math.sin(thetaa))/2))/2;

    let Ns02 = - (l2*m3*(Math.cos(phii + psii)*Math.sin(thetaa)*(phiid + psiid) + thetaad*Math.sin(phii + psii)*Math.cos(thetaa))*(a*Math.sin(thetaa) + c*Math.sin(thetaa) + 
                (l2*Math.cos(phii + psii)*Math.cos(thetaa))/2 + l1*Math.cos(phii)*Math.cos(thetaa)))/2 - (l2*m3*(Math.cos(phii + psii)*Math.cos(thetaa)*(phiid + psiid) - 
                thetaad*Math.sin(phii + psii)*Math.sin(thetaa))*(a*Math.cos(thetaa) + c*Math.cos(thetaa) - (l2*Math.cos(phii + psii)*Math.sin(thetaa))/2 - l1*Math.cos(phii)*Math.sin(thetaa)))/2;

    Ns0.push(Ns00);
    Ns0.push(Ns01);
    Ns0.push(Ns02);

    // Second row
    let Ns10 = m3*((l2*Math.sin(phii + psii)*Math.cos(thetaa))/2 + l1*Math.cos(thetaa)*Math.sin(phii))*(l1*(thetaad*Math.cos(phii)*Math.cos(thetaa) - phiid*Math.sin(phii)*Math.sin(thetaa)) - 
                (l2*(Math.sin(phii + psii)*Math.sin(thetaa)*(phiid + psiid) - thetaad*Math.cos(phii + psii)*Math.cos(thetaa)))/2 + a*thetaad*Math.sin(thetaa) + c*thetaad*Math.sin(thetaa)) + 
                m3*((l2*Math.sin(phii + psii)*Math.sin(thetaa))/2 + l1*Math.sin(phii)*Math.sin(thetaa))*(l1*(phiid*Math.cos(thetaa)*Math.sin(phii) + thetaad*Math.cos(phii)*Math.sin(thetaa)) + 
                (l2*(Math.sin(phii + psii)*Math.cos(thetaa)*(phiid + psiid) + thetaad*Math.cos(phii + psii)*Math.sin(thetaa)))/2 - a*thetaad*Math.cos(thetaa) - c*thetaad*Math.cos(thetaa)) - 
                J32*thetaad*Math.cos(phii + psii)*Math.sin(phii + psii) + J33*thetaad*Math.cos(phii + psii)*Math.sin(phii + psii) - J22*thetaad*Math.cos(phii)*Math.sin(phii) + 
                J23*thetaad*Math.cos(phii)*Math.sin(phii) + (l1*m2*Math.cos(thetaa)*Math.sin(phii)*((l1*(thetaad*Math.cos(phii)*Math.cos(thetaa) - phiid*Math.sin(phii)*Math.sin(thetaa)))/2 + 
                a*thetaad*Math.sin(thetaa)))/2 + (l1*m2*Math.sin(phii)*Math.sin(thetaa)*((l1*(phiid*Math.cos(thetaa)*Math.sin(phii) + thetaad*Math.cos(phii)*Math.sin(thetaa)))/2 - 
                a*thetaad*Math.cos(thetaa)))/2;

    let Ns11 = m3*((l2*Math.sin(phii + psii)*Math.cos(thetaa))/2 + l1*Math.cos(thetaa)*Math.sin(phii))*(l1*(phiid*Math.cos(phii)*Math.cos(thetaa) - thetaad*Math.sin(phii)*Math.sin(thetaa)) + 
                (l2*(Math.cos(phii + psii)*Math.cos(thetaa)*(phiid + psiid) - thetaad*Math.sin(phii + psii)*Math.sin(thetaa)))/2) + m3*(l1*(phiid*Math.cos(phii)*Math.sin(thetaa) + 
                thetaad*Math.cos(thetaa)*Math.sin(phii)) + (l2*(Math.cos(phii + psii)*Math.sin(thetaa)*(phiid + psiid) + thetaad*Math.sin(phii + psii)*Math.cos(thetaa)))/2)*((l2*Math.sin(phii + psii)*Math.sin(thetaa))/2 + 
                l1*Math.sin(phii)*Math.sin(thetaa)) - m3*(l1*Math.cos(phii) + (l2*Math.cos(phii))/2 - (l2*Math.sin(phii)*Math.sin(psii))/2)*((l2*(phiid*Math.cos(phii)*Math.sin(psii) + 
                psiid*Math.cos(psii)*Math.sin(phii)))/2 + l1*phiid*Math.sin(phii) + (l2*phiid*Math.sin(phii))/2) - (l1**2*m2*phiid*Math.cos(phii)*Math.sin(phii))/4 + 
                (l1**2*m2*Math.cos(thetaa)*Math.sin(phii)*(phiid*Math.cos(phii)*Math.cos(thetaa) - thetaad*Math.sin(phii)*Math.sin(thetaa)))/4 + (l1**2*m2*Math.sin(phii)*Math.sin(thetaa)*(phiid*Math.cos(phii)*Math.sin(thetaa) + 
                thetaad*Math.cos(thetaa)*Math.sin(phii)))/4;

    let Ns12 = (l2*m3*((l2*Math.sin(phii + psii)*Math.cos(thetaa))/2 + l1*Math.cos(thetaa)*Math.sin(phii))*(Math.cos(phii + psii)*Math.cos(thetaa)*(phiid + psiid) - 
                thetaad*Math.sin(phii + psii)*Math.sin(thetaa)))/2 + (l2*m3*((l2*Math.sin(phii + psii)*Math.sin(thetaa))/2 + l1*Math.sin(phii)*Math.sin(thetaa))*(Math.cos(phii + psii)*Math.sin(thetaa)*(phiid + psiid) + 
                thetaad*Math.sin(phii + psii)*Math.cos(thetaa)))/2 - (l2*m3*Math.sin(phii + psii)*(phiid + psiid)*(l1*Math.cos(phii) + (l2*Math.cos(phii))/2 - (l2*Math.sin(phii)*Math.sin(psii))/2))/2;

    Ns1.push(Ns10);
    Ns1.push(Ns11);
    Ns1.push(Ns12);

    // Third row
    let Ns20 = J33*thetaad*Math.cos(phii + psii)*Math.sin(phii + psii) - J32*thetaad*Math.cos(phii + psii)*Math.sin(phii + psii) + 
                (l2*m3*Math.sin(phii + psii)*Math.sin(thetaa)*(l1*(phiid*Math.cos(thetaa)*Math.sin(phii) + thetaad*Math.cos(phii)*Math.sin(thetaa)) + 
                (l2*(Math.sin(phii + psii)*Math.cos(thetaa)*(phiid + psiid) + thetaad*Math.cos(phii + psii)*Math.sin(thetaa)))/2 - a*thetaad*Math.cos(thetaa) - 
                c*thetaad*Math.cos(thetaa)))/2 + (l2*m3*Math.sin(phii + psii)*Math.cos(thetaa)*(l1*(thetaad*Math.cos(phii)*Math.cos(thetaa) - phiid*Math.sin(phii)*Math.sin(thetaa)) - 
                (l2*(Math.sin(phii + psii)*Math.sin(thetaa)*(phiid + psiid) - thetaad*Math.cos(phii + psii)*Math.cos(thetaa)))/2 + a*thetaad*Math.sin(thetaa) + c*thetaad*Math.sin(thetaa)))/2;

    let Ns21 = (l2*m3*Math.sin(phii + psii)*Math.cos(thetaa)*(l1*(phiid*Math.cos(phii)*Math.cos(thetaa) - thetaad*Math.sin(phii)*Math.sin(thetaa)) + 
                (l2*(Math.cos(phii + psii)*Math.cos(thetaa)*(phiid + psiid) - thetaad*Math.sin(phii + psii)*Math.sin(thetaa)))/2))/2 - 
                (l2*m3*Math.cos(phii + psii)*((l2*(phiid*Math.cos(phii)*Math.sin(psii) + psiid*Math.cos(psii)*Math.sin(phii)))/2 + l1*phiid*Math.sin(phii) + (l2*phiid*Math.sin(phii))/2))/2 + 
                (l2*m3*Math.sin(phii + psii)*Math.sin(thetaa)*(l1*(phiid*Math.cos(phii)*Math.sin(thetaa) + thetaad*Math.cos(thetaa)*Math.sin(phii)) + 
                (l2*(Math.cos(phii + psii)*Math.sin(thetaa)*(phiid + psiid) + thetaad*Math.sin(phii + psii)*Math.cos(thetaa)))/2))/2;

    let Ns22 = (l2**2*m3*Math.sin(phii + psii)*Math.cos(thetaa)*(Math.cos(phii + psii)*Math.cos(thetaa)*(phiid + psiid) - thetaad*Math.sin(phii + psii)*Math.sin(thetaa)))/4 + 
                (l2**2*m3*Math.sin(phii + psii)*Math.sin(thetaa)*(Math.cos(phii + psii)*Math.sin(thetaa)*(phiid + psiid) + thetaad*Math.sin(phii + psii)*Math.cos(thetaa)))/4 - 
                (l2**2*m3*Math.cos(phii + psii)*Math.sin(phii + psii)*(phiid + psiid))/4;

    Ns2.push(Ns20);
    Ns2.push(Ns21);
    Ns2.push(Ns22);

    Ns.push(Ns0);
    Ns.push(Ns1);
    Ns.push(Ns2);

    Nstar = Ns;
}

function get_M_star(thetaa, phii, psii)
{
    /**
     * Calculates and sets a new M-star matrix from given thetaa, tehtad, phii, phiid, psii and psiid.
     * M-star becomes a 3x3 matrix.
     */
    let Ms = new Array();
    let Ms0 = new Array();
    let Ms1 = new Array();
    let Ms2 = new Array();
    // First row
    let Ms00 = J13 + m3*(a*Math.sin(thetaa) + c*Math.sin(thetaa) + (l2*Math.cos(phii + psii)*Math.cos(thetaa))/2 + l1*Math.cos(phii)*Math.cos(thetaa))**2 + 
                m3*(a*Math.cos(thetaa) + c*Math.cos(thetaa) - (l2*Math.cos(phii + psii)*Math.sin(thetaa))/2 - l1*Math.cos(phii)*Math.sin(thetaa))**2 + 
                m2*(a*Math.cos(thetaa) - (l1*Math.cos(phii)*Math.sin(thetaa))/2)**2 + m2*(a*Math.sin(thetaa) + (l1*Math.cos(phii)*Math.cos(thetaa))/2)**2 + 
                J33*Math.cos(phii + psii)**2 + J32*Math.sin(phii + psii)**2 + J23*Math.cos(phii)**2 + J22*Math.sin(phii)**2;
                
    let Ms01 = - m3*((l2*Math.sin(phii + psii)*Math.cos(thetaa))/2 + l1*Math.cos(thetaa)*Math.sin(phii))*(a*Math.cos(thetaa) + c*Math.cos(thetaa) - (l2*Math.cos(phii + psii)*Math.sin(thetaa))/2 - l1*Math.cos(phii)*Math.sin(thetaa)) - 
                m3*((l2*Math.sin(phii + psii)*Math.sin(thetaa))/2 + 
                l1*Math.sin(phii)*Math.sin(thetaa))*(a*Math.sin(thetaa) + c*Math.sin(thetaa) + (l2*Math.cos(phii + psii)*Math.cos(thetaa))/2 + l1*Math.cos(phii)*Math.cos(thetaa)) - 
                (l1*m2*Math.cos(thetaa)*Math.sin(phii)*(a*Math.cos(thetaa) - (l1*Math.cos(phii)*Math.sin(thetaa))/2))/2 - 
                (l1*m2*Math.sin(phii)*Math.sin(thetaa)*(a*Math.sin(thetaa) + (l1*Math.cos(phii)*Math.cos(thetaa))/2))/2;
    
    let Ms02 = - (l2*m3*Math.sin(phii + psii)*Math.cos(thetaa)*(a*Math.cos(thetaa) + c*Math.cos(thetaa) - (l2*Math.cos(phii + psii)*Math.sin(thetaa))/2 - l1*Math.cos(phii)*Math.sin(thetaa)))/2 - 
                (l2*m3*Math.sin(phii + psii)*Math.sin(thetaa)*(a*Math.sin(thetaa) + c*Math.sin(thetaa) + (l2*Math.cos(phii + psii)*Math.cos(thetaa))/2 + l1*Math.cos(phii)*Math.cos(thetaa)))/2;

    Ms0.push(Ms00);
    Ms0.push(Ms01);
    Ms0.push(Ms02);

    // Second row
    let Ms10 = - m3*((l2*Math.sin(phii + psii)*Math.cos(thetaa))/2 + l1*Math.cos(thetaa)*Math.sin(phii))*(a*Math.cos(thetaa) + c*Math.cos(thetaa) - (l2*Math.cos(phii + psii)*Math.sin(thetaa))/2 - l1*Math.cos(phii)*Math.sin(thetaa)) - 
                m3*((l2*Math.sin(phii + psii)*Math.sin(thetaa))/2 + l1*Math.sin(phii)*Math.sin(thetaa))*(a*Math.sin(thetaa) + c*Math.sin(thetaa) + (l2*Math.cos(phii + psii)*Math.cos(thetaa))/2 + l1*Math.cos(phii)*Math.cos(thetaa)) - 
                (l1*m2*Math.cos(thetaa)*Math.sin(phii)*(a*Math.cos(thetaa) - (l1*Math.cos(phii)*Math.sin(thetaa))/2))/2 - 
                (l1*m2*Math.sin(phii)*Math.sin(thetaa)*(a*Math.sin(thetaa) + (l1*Math.cos(phii)*Math.cos(thetaa))/2))/2 ;

    let Ms11 = J21 + J31 + m3*(l1*Math.cos(phii) + (l2*Math.cos(phii))/2 - (l2*Math.sin(phii)*Math.sin(psii))/2)**2 + 
                m3*((l2*Math.sin(phii + psii)*Math.cos(thetaa))/2 + l1*Math.cos(thetaa)*Math.sin(phii))**2 + 
                m3*((l2*Math.sin(phii + psii)*Math.sin(thetaa))/2 + l1*Math.sin(phii)*Math.sin(thetaa))**2 + 
                (l1**2*m2*Math.cos(phii)**2)/4 + (l1**2*m2*Math.cos(thetaa)**2*Math.sin(phii)**2)/4 + 
                (l1**2*m2*Math.sin(phii)**2*Math.sin(thetaa)**2)/4;

    let Ms12 = J31 + (l2*m3*Math.cos(phii + psii)*(l1*Math.cos(phii) + (l2*Math.cos(phii))/2 - (l2*Math.sin(phii)*Math.sin(psii))/2))/2 + 
                (l2*m3*Math.sin(phii + psii)*Math.cos(thetaa)*((l2*Math.sin(phii + psii)*Math.cos(thetaa))/2 + l1*Math.cos(thetaa)*Math.sin(phii)))/2 + 
                (l2*m3*Math.sin(phii + psii)*Math.sin(thetaa)*((l2*Math.sin(phii + psii)*Math.sin(thetaa))/2 + l1*Math.sin(phii)*Math.sin(thetaa)))/2;

    Ms1.push(Ms10);
    Ms1.push(Ms11);
    Ms1.push(Ms12);

    // Third row
    let Ms20 = - (l2*m3*Math.sin(phii + psii)*Math.cos(thetaa)*(a*Math.cos(thetaa) + c*Math.cos(thetaa) - (l2*Math.cos(phii + psii)*Math.sin(thetaa))/2 - l1*Math.cos(phii)*Math.sin(thetaa)))/2 - 
                (l2*m3*Math.sin(phii + psii)*Math.sin(thetaa)*(a*Math.sin(thetaa) + c*Math.sin(thetaa) + (l2*Math.cos(phii + psii)*Math.cos(thetaa))/2 + l1*Math.cos(phii)*Math.cos(thetaa)))/2;

    let Ms21 = J31 + (l2*m3*Math.cos(phii + psii)*(l1*Math.cos(phii) + (l2*Math.cos(phii))/2 - (l2*Math.sin(phii)*Math.sin(psii))/2))/2 + 
                (l2*m3*Math.sin(phii + psii)*Math.cos(thetaa)*((l2*Math.sin(phii + psii)*Math.cos(thetaa))/2 + l1*Math.cos(thetaa)*Math.sin(phii)))/2 + 
                (l2*m3*Math.sin(phii + psii)*Math.sin(thetaa)*((l2*Math.sin(phii + psii)*Math.sin(thetaa))/2 + l1*Math.sin(phii)*Math.sin(thetaa)))/2;

    let Ms22 = J31 + (l2**2*m3*Math.cos(phii + psii)**2)/4 + (l2**2*m3*Math.sin(phii + psii)**2*Math.cos(thetaa)**2)/4 + (l2**2*m3*Math.sin(phii + psii)**2*Math.sin(thetaa)**2)/4;

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
     * 
     * The inverse is found by first finding the M-star matrix (see function get_M_star), then finding the covariance matrix of M-star, 
     * transposing it to get the adjugate-matrix and dividing each member of the adjugate matrix by the M-star's determinant yields the inverse M-star matrix.
     */

    let Ms = Mstar;
    determinant = ( Ms[0][0] * (Ms[1][1]*Ms[2][2] - Ms[1][2]*Ms[2][1]) - 
                    Ms[0][1] * (Ms[1][0]*Ms[2][2] - Ms[1][2]*Ms[2][0]) + 
                    Ms[0][2] * (Ms[1][0]*Ms[2][1] - Ms[1][1]*Ms[2][0]) );

    // Define all members of the covariance matrix.
    let cov_Ms00 = (Ms[0][0] * (Ms[1][1] * Ms[2][2] - Ms[1][2] * Ms[2][1]));
    let cov_Ms01 = (Ms[0][1] * (Ms[1][0] * Ms[2][2] - Ms[1][2] * Ms[2][0])) * (-1);
    let cov_Ms02 = (Ms[0][2] * (Ms[1][0] * Ms[2][1] - Ms[1][1] * Ms[2][0]));

    let cov_Ms10 = (Ms[1][0] * (Ms[0][1] * Ms[2][2] - Ms[0][2] * Ms[2][1])) * (-1);
    let cov_Ms11 = (Ms[1][1] * (Ms[0][0] * Ms[2][2] - Ms[0][2] * Ms[2][0]));
    let cov_Ms12 = (Ms[1][2] * (Ms[0][0] * Ms[2][1] - Ms[0][1] * Ms[2][0])) * (-1);

    let cov_Ms20 = (Ms[2][0] * (Ms[0][1] * Ms[1][2] - Ms[0][2] * Ms[1][1]));
    let cov_Ms21 = (Ms[2][1] * (Ms[0][0] * Ms[1][2] - Ms[0][2] * Ms[1][0])) * (-1);
    let cov_Ms22 = (Ms[2][2] * (Ms[0][0] * Ms[1][1] - Ms[0][1] * Ms[1][0]));

    // We don't need to build the covariance- or adjugate matrices, since we won't be using them and we have all the terms so we can build the inverse matrix right away.
    let Ms_inv = new Array();
    let Ms_inv0 = new Array();
    let Ms_inv1 = new Array();
    let Ms_inv2 = new Array();

    let Ms_inv00 = cov_Ms00 / determinant;
    let Ms_inv01 = cov_Ms10 / determinant;
    let Ms_inv02 = cov_Ms20 / determinant;

    let Ms_inv10 = cov_Ms01 / determinant;
    let Ms_inv11 = cov_Ms11 / determinant;
    let Ms_inv12 = cov_Ms21 / determinant;

    let Ms_inv20 = cov_Ms02 / determinant;
    let Ms_inv21 = cov_Ms12 / determinant;
    let Ms_inv22 = cov_Ms22 / determinant;

    Ms_inv0.push(Ms_inv00);
    Ms_inv0.push(Ms_inv01);
    Ms_inv0.push(Ms_inv02);

    Ms_inv1.push(Ms_inv10);
    Ms_inv1.push(Ms_inv11);
    Ms_inv1.push(Ms_inv12);
    
    Ms_inv2.push(Ms_inv20);
    Ms_inv2.push(Ms_inv21);
    Ms_inv2.push(Ms_inv22);

    Ms_inv.push(Ms_inv0);
    Ms_inv.push(Ms_inv1);
    Ms_inv.push(Ms_inv2);

    Mstar_inv = Ms_inv;
}

function get_F_star(thetaa, phii, psii)
{
    /**
     * Calculates and sets a new F-star from given thetaa, phii and psii. (It turns out that here, thetaa is redundant but it is included as a input just for clarity, though this is not the best use of memory on the stack.)
     * Fstar becomes a 3x1 matrix.
     */
    let Fs = new Array();
    let Fs1 = T1 - T2;
    let Fs2 = T2 - (g*m3)*(l1*Math.cos(phii) + (l2*Math.cos(phii))/2 - (l2*Math.sin(phii)*Math.sin(psii))/2) - (g*l1*m2*Math.cos(phii))/2;
    let Fs3 = T3 - (l2*Math.cos(phii + psii)*(g*m3))/2;
    Fs.push(Fs1);
    Fs.push(Fs2);
    Fs.push(Fs3);
    Fstar = Fs;
}