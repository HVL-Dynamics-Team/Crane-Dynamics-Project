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

var J11 = (1/12)* m1 * (3*(r1)^2 + (h + b)^2);
var J12 = (1/12)* m1 * (3*(r1)^2 + (h + b)^2);
var J13 = (1/2) * m1 *(r1^2);

var J21 = (1/12)* m2 * (3*(r2)^2 + (l1)^2);
var J22 = (1/2) * m2 *(r2^2);
var J23 = (1/12)* m2 * (3*(r2)^2 + (l1)^2);

var J31 = (1/12)* m3 * (3*(r3)^2 + (l2)^2);
var J32 = (1/2) * m3 *(r3^2);
var J33 = (1/12)* m3 * (3*(r3)^2 + (l2)^2);


function get_Qd (th_curr, thd_curr, ph_curr, phd_curr, ps_curr, psd_curr)
{
    /**
     * Calculates the acceleration terms from the equation of moiton as:
     * Qd = (1/Ms) * 
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