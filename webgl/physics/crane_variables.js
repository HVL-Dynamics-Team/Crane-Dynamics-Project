export var debug_mode = false; // True if debug info should be printed to the console, false if not.

export var g = 9.81;

export var T1 = -0.15;
export var T2 = 0.54;
export var T3 = 0.15;

export var m1 = 2;
export var m2 = 0.2;
export var m3 = 0.1;

export var a = 0.150;
export var b = 0.1;
export var c = 0.3;
export var h = 0.4;
export var l1 = 0.150;
export var l2 = 0.100;

export var r1 = 0.05;
export var r2 = 0.01;
export var r3 = 0.01; 

export var target_time = 10; // Measured in seconds

export const time = [];
export var dt = 0.01;

export var thetad_max = 2*3.14 / 4 ;
export var phid_max = 2*3.14 ;
export var psid_max = 2*3.14 / 4 ;

export const theta = [];
export const thetad = [];
export const thetadd = [];

export const phi = [];
export const phid = [];
export const phidd = [];

export const psi = [];
export const psid = [];
export const psidd = [];

// Setter funcitons. Updates values for any given value. If there are no set new values, sets the current ones.
export function set_torque (new_t1, new_t2, new_t3) {
    T1 = new_t1;
    T2 = new_t2;
    T3 = new_t3;
}

export function set_mass (new_m1, new_m2, new_m3) {
    m1 = new_m1;
    m2 = new_m2;
    m3 = new_m3;
}

export function set_a (new_a) {
    a = new_a;
}

export function set_b (new_b) {
    b = new_b;
}

export function set_c (new_c) {
    c = new_c;
}

export function set_h (new_h) {
    h = new_h;
}

export function set_l1 (new_l1) {
    l1 = new_l1;
}

export function set_l2 (new_l2) {
    l2 = new_l2;
}

export function set_g (new_g) {
    g = new_g;
}

export function set_r1 (new_r1) {
    r1 = new_r1;
}

export function set_r2 (new_r2) {
    r2 = new_r2;
}

export function set_r3 (new_r3) {
    r3 = new_r3;
}

export function set_target_time (new_target_time) {
    target_time = new_target_time;
}

export function set_dt (new_dt) {
    dt = new_dt;
}

export function set_thetad_max (new_thetad_max) {
    thetad_max = new_thetad_max;
}

export function set_phid_max (new_phid_max) {
    phid_max = new_phid_max;
}

export function set_psid_max (new_psid_max) {
    psid_max = new_psid_max;
}

export function reset_crane_varibles_to_default ()
{

}