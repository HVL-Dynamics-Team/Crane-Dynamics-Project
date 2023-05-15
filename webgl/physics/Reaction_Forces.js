export var Reaction_Forces_inertial = new Array();
export var Reaction_Forces_1 = new Array();
export var Reaction_Forces_2 = new Array();
export var Reaction_Forces_3 = new Array();

export function calc_reactionforce_inertial(theta, thetad, thetadd, phi, phid, phidd, psi, psid, psidd)
{
    let ReI = new Array();

    let Re1 = m2*Math.cos(theta)*((l1*phidd*Math.sin(phi)*Math.sin(theta))/2 - a*thetad^2*Math.cos(theta) - a*thetadd*Math.sin(theta) + (l1*phid^2*Math.cos(phi)*Math.sin(theta))/2 + (l1*thetad^2*Math.cos(phi)*Math.sin(theta))/2 - 
                (l1*thetadd*Math.cos(phi)*Math.cos(theta))/2 + l1*phid*thetad*Math.cos(theta)*Math.sin(phi)) + m3*Math.cos(theta)*(l1*phidd*Math.sin(phi)*Math.sin(theta) - c*thetadd*Math.sin(theta) - a*thetad^2*Math.cos(theta) - 
                c*thetad^2*Math.cos(theta) - a*thetadd*Math.sin(theta) + (l2*phid^2*Math.cos(phi + psi)*Math.sin(theta))/2 + (l2*psid^2*Math.cos(phi + psi)*Math.sin(theta))/2 + (l2*thetad^2*Math.cos(phi + psi)*Math.sin(theta))/2 + 
                l1*phid^2*Math.cos(phi)*Math.sin(theta) + l1*thetad^2*Math.cos(phi)*Math.sin(theta) - (l2*thetadd*Math.cos(phi + psi)*Math.cos(theta))/2 + (l2*phidd*Math.sin(phi + psi)*Math.sin(theta))/2 + (l2*psidd*Math.sin(phi + psi)*Math.sin(theta))/2 - 
                l1*thetadd*Math.cos(phi)*Math.cos(theta) + l2*phid*psid*Math.cos(phi + psi)*Math.sin(theta) + l2*phid*thetad*Math.sin(phi + psi)*Math.cos(theta) + l2*psid*thetad*Math.sin(phi + psi)*Math.cos(theta) + 
                2*l1*phid*thetad*Math.cos(theta)*Math.sin(phi)) + m3*Math.sin(phi + psi)*Math.sin(theta)*(phidd*(l1*Math.cos(phi) + (l2*Math.cos(phi))/2 - (l2*Math.sin(phi)*Math.sin(psi))/2) - phid*(l1*phid*Math.sin(phi) + (l2*phid*Math.sin(phi))/2 + 
                (l2*phid*Math.cos(phi)*Math.sin(psi))/2 + (l2*psid*Math.cos(psi)*Math.sin(phi))/2) + (l2*psidd*Math.cos(phi + psi))/2 - (l2*psid*Math.sin(phi + psi)*(phid + psid))/2) + m3*Math.cos(phi + psi)*Math.sin(theta)*(a*thetad^2*Math.sin(theta) - 
                c*thetadd*Math.cos(theta) - a*thetadd*Math.cos(theta) + c*thetad^2*Math.sin(theta) + (l2*phid^2*Math.cos(phi + psi)*Math.cos(theta))/2 + (l2*psid^2*Math.cos(phi + psi)*Math.cos(theta))/2 + (l2*thetad^2*Math.cos(phi + psi)*Math.cos(theta))/2 + 
                l1*phid^2*Math.cos(phi)*Math.cos(theta) + l1*thetad^2*Math.cos(phi)*Math.cos(theta) + (l2*phidd*Math.sin(phi + psi)*Math.cos(theta))/2 + (l2*psidd*Math.sin(phi + psi)*Math.cos(theta))/2 + (l2*thetadd*Math.cos(phi + psi)*Math.sin(theta))/2 + 
                l1*phidd*Math.cos(theta)*Math.sin(phi) + l1*thetadd*Math.cos(phi)*Math.sin(theta) + l2*phid*psid*Math.cos(phi + psi)*Math.cos(theta) - l2*phid*thetad*Math.sin(phi + psi)*Math.sin(theta) - l2*psid*thetad*Math.sin(phi + psi)*Math.sin(theta) - 
                2*l1*phid*thetad*Math.sin(phi)*Math.sin(theta)) + m2*Math.cos(phi)*Math.sin(theta)*(a*thetad^2*Math.sin(theta) - a*thetadd*Math.cos(theta) + (l1*phid^2*Math.cos(phi)*Math.cos(theta))/2 + (l1*thetad^2*Math.cos(phi)*Math.cos(theta))/2 + 
                (l1*phidd*Math.cos(theta)*Math.sin(phi))/2 + (l1*thetadd*Math.cos(phi)*Math.sin(theta))/2 - l1*phid*thetad*Math.sin(phi)*Math.sin(theta)) - (l1*m2*Math.sin(phi)*Math.sin(theta)*(Math.sin(phi)*phid^2 - phidd*Math.cos(phi)))/2;
    ReI.push(Re1);

    let Re2 = m2*Math.sin(theta)*((l1*phidd*Math.sin(phi)*Math.sin(theta))/2 - a*thetad^2*Math.cos(theta) - a*thetadd*Math.sin(theta) + (l1*phid^2*Math.cos(phi)*Math.sin(theta))/2 + (l1*thetad^2*Math.cos(phi)*Math.sin(theta))/2 - 
                (l1*thetadd*Math.cos(phi)*Math.cos(theta))/2 + l1*phid*thetad*Math.cos(theta)*Math.sin(phi)) + m3*Math.sin(theta)*(l1*phidd*Math.sin(phi)*Math.sin(theta) - c*thetadd*Math.sin(theta) - a*thetad^2*Math.cos(theta) - c*thetad^2*Math.cos(theta) - 
                a*thetadd*Math.sin(theta) + (l2*phid^2*Math.cos(phi + psi)*Math.sin(theta))/2 + (l2*psid^2*Math.cos(phi + psi)*Math.sin(theta))/2 + (l2*thetad^2*Math.cos(phi + psi)*Math.sin(theta))/2 + l1*phid^2*Math.cos(phi)*Math.sin(theta) + 
                l1*thetad^2*Math.cos(phi)*Math.sin(theta) - (l2*thetadd*Math.cos(phi + psi)*Math.cos(theta))/2 + (l2*phidd*Math.sin(phi + psi)*Math.sin(theta))/2 + (l2*psidd*Math.sin(phi + psi)*Math.sin(theta))/2 - l1*thetadd*Math.cos(phi)*Math.cos(theta) + 
                l2*phid*psid*Math.cos(phi + psi)*Math.sin(theta) + l2*phid*thetad*Math.sin(phi + psi)*Math.cos(theta) + l2*psid*thetad*Math.sin(phi + psi)*Math.cos(theta) + 2*l1*phid*thetad*Math.cos(theta)*Math.sin(phi)) - 
                m3*Math.sin(phi + psi)*Math.cos(theta)*(phidd*(l1*Math.cos(phi) + (l2*Math.cos(phi))/2 - (l2*Math.sin(phi)*Math.sin(psi))/2) - phid*(l1*phid*Math.sin(phi) + (l2*phid*Math.sin(phi))/2 + (l2*phid*Math.cos(phi)*Math.sin(psi))/2 + 
                (l2*psid*Math.cos(psi)*Math.sin(phi))/2) + (l2*psidd*Math.cos(phi + psi))/2 - (l2*psid*Math.sin(phi + psi)*(phid + psid))/2) - m3*Math.cos(phi + psi)*Math.cos(theta)*(a*thetad^2*Math.sin(theta) - c*thetadd*Math.cos(theta) - 
                a*thetadd*Math.cos(theta) + c*thetad^2*Math.sin(theta) + (l2*phid^2*Math.cos(phi + psi)*Math.cos(theta))/2 + (l2*psid^2*Math.cos(phi + psi)*Math.cos(theta))/2 + (l2*thetad^2*Math.cos(phi + psi)*Math.cos(theta))/2 + 
                l1*phid^2*Math.cos(phi)*Math.cos(theta) + l1*thetad^2*Math.cos(phi)*Math.cos(theta) + (l2*phidd*Math.sin(phi + psi)*Math.cos(theta))/2 + (l2*psidd*Math.sin(phi + psi)*Math.cos(theta))/2 + (l2*thetadd*Math.cos(phi + psi)*Math.sin(theta))/2 + 
                l1*phidd*Math.cos(theta)*Math.sin(phi) + l1*thetadd*Math.cos(phi)*Math.sin(theta) + l2*phid*psid*Math.cos(phi + psi)*Math.cos(theta) - l2*phid*thetad*Math.sin(phi + psi)*Math.sin(theta) - l2*psid*thetad*Math.sin(phi + psi)*Math.sin(theta) - 
                2*l1*phid*thetad*Math.sin(phi)*Math.sin(theta)) - m2*Math.cos(phi)*Math.cos(theta)*(a*thetad^2*Math.sin(theta) - a*thetadd*Math.cos(theta) + (l1*phid^2*Math.cos(phi)*Math.cos(theta))/2 + (l1*thetad^2*Math.cos(phi)*Math.cos(theta))/2 + 
                (l1*phidd*Math.cos(theta)*Math.sin(phi))/2 + (l1*thetadd*Math.cos(phi)*Math.sin(theta))/2 - l1*phid*thetad*Math.sin(phi)*Math.sin(theta)) + (l1*m2*Math.cos(theta)*Math.sin(phi)*(Math.sin(phi)*phid^2 - phidd*Math.cos(phi)))/2;
    ReI.push(Re2);

    let Re3 = (l2*m3*psidd*Math.cos(phi + psi)^2)/2 - (981*m2)/100 - (981*m3)/100 - (l1*m2*phid^2*Math.sin(2*phi))/4 - (l2*m3*psid^2*Math.sin(2*phi + 2*psi))/4 - (981*m1)/100 + (l1*m2*phidd*Math.cos(phi)^2)/2 + 
                l1*m3*phidd*Math.cos(phi + psi)*Math.cos(phi) + (l2*m3*phidd*Math.cos(phi + psi)*Math.cos(phi))/2 + a*m3*thetadd*Math.sin(phi + psi)*Math.cos(theta) + c*m3*thetadd*Math.sin(phi + psi)*Math.cos(theta) + a*m2*thetadd*Math.cos(theta)*Math.sin(phi) - 
                (l2*m3*phid*psid*Math.sin(2*phi + 2*psi))/4 - l1*m3*phid^2*Math.cos(phi + psi)*Math.sin(phi) - (l2*m3*phid^2*Math.cos(phi + psi)*Math.sin(phi))/2 - (l2*m3*phidd*Math.sin(phi + psi)^2*Math.cos(theta))/2 - 
                (l2*m3*psidd*Math.sin(phi + psi)^2*Math.cos(theta))/2 - a*m3*thetad^2*Math.sin(phi + psi)*Math.sin(theta) - c*m3*thetad^2*Math.sin(phi + psi)*Math.sin(theta) - (l1*m2*phidd*Math.cos(theta)*Math.sin(phi)^2)/2 - 
                a*m2*thetad^2*Math.sin(phi)*Math.sin(theta) - (l2*m3*phidd*Math.cos(phi + psi)*Math.sin(phi)*Math.sin(psi))/2 - l1*m3*phidd*Math.sin(phi + psi)*Math.cos(theta)*Math.sin(phi) + l2*m3*phid*thetad*Math.sin(phi + psi)^2*Math.sin(theta) + 
                l2*m3*psid*thetad*Math.sin(phi + psi)^2*Math.sin(theta) - l1*m3*thetadd*Math.sin(phi + psi)*Math.cos(phi)*Math.sin(theta) - (l2*m3*phid^2*Math.cos(phi + psi)*Math.sin(phi + psi)*Math.cos(theta))/2 - 
                (l2*m3*psid^2*Math.cos(phi + psi)*Math.sin(phi + psi)*Math.cos(theta))/2 - (l2*m3*thetad^2*Math.cos(phi + psi)*Math.sin(phi + psi)*Math.cos(theta))/2 + l1*m2*phid*thetad*Math.sin(phi)^2*Math.sin(theta) - 
                (l1*m2*thetadd*Math.cos(phi)*Math.sin(phi)*Math.sin(theta))/2 - (l2*m3*phid^2*Math.cos(phi + psi)*Math.cos(phi)*Math.sin(psi))/2 - l1*m3*phid^2*Math.sin(phi + psi)*Math.cos(phi)*Math.cos(theta) - 
                l1*m3*thetad^2*Math.sin(phi + psi)*Math.cos(phi)*Math.cos(theta) - (l1*m2*phid^2*Math.cos(phi)*Math.cos(theta)*Math.sin(phi))/2 - (l1*m2*thetad^2*Math.cos(phi)*Math.cos(theta)*Math.sin(phi))/2 - 
                (l2*m3*thetadd*Math.cos(phi + psi)*Math.sin(phi + psi)*Math.sin(theta))/2 - l2*m3*phid*psid*Math.cos(phi + psi)*Math.sin(phi + psi)*Math.cos(theta) - (l2*m3*phid*psid*Math.cos(phi + psi)*Math.cos(psi)*Math.sin(phi))/2 + 
                2*l1*m3*phid*thetad*Math.sin(phi + psi)*Math.sin(phi)*Math.sin(theta);
    ReI.push(Re3);

    Reaction_Forces_inertial.push(ReI);
}

export function calc_reactionforce_1() 
{
    let Re1;
    let Re2;
    let Re3;
}

export function calc_reactionforce_2()
{
    let Re1;
    let Re2;
    let Re3;
}

export function calc_reactionforce_3() 
{
    let Re1;
    let Re2;
    let Re3;
}

export function reset_reactionforce_results()
{
    // TODO: Make reset function for reaction forces data.
}
