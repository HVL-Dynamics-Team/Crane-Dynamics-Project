var g = 9.81;

var T1 = -0.15;
var T2 = 0.54;
var T3 = 0.15;

var m1 = 2;
var m2 = 0.2;
var m3 = 0.1;

var a = 0.150;
var b = 0.1;
var c = 0.3;
var h = 0.4;
var l1 = 0.150;
var l2 = 0.100;

var r1 = 0.05;
var r2 = 0.01;
var r3 = 0.01; 

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
    inverse_M_star();
    get_N_star(th_curr, thd_curr, ph_curr, phd_curr, ps_curr, psd_curr);
    get_F_star(th_curr, ph_curr, ps_curr);
    Qd.push(get_thetadd(thd_curr, phd_curr, psd_curr));
    Qd.push(get_phidd(thd_curr, phd_curr, psd_curr));
    Qd.push(get_psidd(thd_curr, phd_curr, psd_curr));

    //console.log("Qd: ", Qd, "\tMs: ", Mstar, "\tMs-inv: ", Mstar_inv, "\tNs: ", Nstar, "\tFs: ", Fstar); 
    return Qd;
}

function get_thetadd(thd_curr, phd_curr, psd_curr)
{
    /**
     * Gets the thetadd from the equation of motion with the current values.
     * Becomes a single value.
     */
    return (Mstar_inv[0][0] * (Fstar[0] - (Nstar[0][0] * thd_curr + Nstar[0][1] * phd_curr + Nstar[0][2] * psd_curr)) + 
            Mstar_inv[0][1] * (Fstar[1] - (Nstar[1][0] * thd_curr + Nstar[1][1] * phd_curr + Nstar[1][2] * psd_curr)) + 
            Mstar_inv[0][2] * (Fstar[2] - (Nstar[2][0] * thd_curr + Nstar[2][1] * phd_curr + Nstar[2][2] * psd_curr)) );
}

function get_phidd(thd_curr, phd_curr, psd_curr)
{
    /**
     * Gets the phidd from the equation of motion with the current values.
     * Becomes a single value.
     */
    return (Mstar_inv[1][0] * (Fstar[0] - (Nstar[0][0] * thd_curr + Nstar[0][1] * phd_curr + Nstar[0][2] * psd_curr)) + 
            Mstar_inv[1][1] * (Fstar[1] - (Nstar[1][0] * thd_curr + Nstar[1][1] * phd_curr + Nstar[1][2] * psd_curr)) + 
            Mstar_inv[1][2] * (Fstar[2] - (Nstar[2][0] * thd_curr + Nstar[2][1] * phd_curr + Nstar[2][2] * psd_curr)) );
}

function get_psidd(thd_curr, phd_curr, psd_curr)
{
    /**
     * Gets the psidd from the eqution of motion with the current values.
     * Becomes a single value.
     */
    return (Mstar_inv[2][0] * (Fstar[0] - (Nstar[0][0] * thd_curr + Nstar[0][1] * phd_curr + Nstar[0][2] * psd_curr)) + 
            Mstar_inv[2][1] * (Fstar[1] - (Nstar[1][0] * thd_curr + Nstar[1][1] * phd_curr + Nstar[1][2] * psd_curr)) + 
            Mstar_inv[2][2] * (Fstar[2] - (Nstar[2][0] * thd_curr + Nstar[2][1] * phd_curr + Nstar[2][2] * psd_curr)) );
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
    let Ns00 = J22*phid*Math.sin(2*phi) - J23*phid*Math.sin(2*phi) - (l1**2*m2*phid*Math.sin(2*phi))/8 - (l1**2*m3*phid*Math.sin(2*phi))/2 - (l2**2*m3*phid*Math.sin(2*phi + 2*psi))/8 - 
                (l2**2*m3*psid*Math.sin(2*phi + 2*psi))/8 - (l1*l2*m3*phid*Math.sin(2*phi + psi))/2 - (l1*l2*m3*psid*Math.sin(2*phi + psi))/4 - (l1*l2*m3*psid*Math.sin(psi))/4;

    let Ns01 = - m3*(l1*(phid*Math.cos(phi)*Math.sin(theta) + thetad*Math.cos(theta)*Math.sin(phi)) + (l2*(Math.cos(phi + psi)*Math.sin(theta)*(phid + psid) + 
                thetad*Math.sin(phi + psi)*Math.cos(theta)))/2)*(a*Math.sin(theta) + c*Math.sin(theta) + (l2*Math.cos(phi + psi)*Math.cos(theta))/2 + l1*Math.cos(phi)*Math.cos(theta)) - 
                m3*(l1*(phid*Math.cos(phi)*Math.cos(theta) - thetad*Math.sin(phi)*Math.sin(theta)) + (l2*(Math.cos(phi + psi)*Math.cos(theta)*(phid + psid) - 
                thetad*Math.sin(phi + psi)*Math.sin(theta)))/2)*(a*Math.cos(theta) + c*Math.cos(theta) - (l2*Math.cos(phi + psi)*Math.sin(theta))/2 - l1*Math.cos(phi)*Math.sin(theta)) - 
                (l1*m2*(phid*Math.cos(phi)*Math.sin(theta) + thetad*Math.cos(theta)*Math.sin(phi))*(a*Math.sin(theta) + (l1*Math.cos(phi)*Math.cos(theta))/2))/2 - 
                (l1*m2*(phid*Math.cos(phi)*Math.cos(theta) - thetad*Math.sin(phi)*Math.sin(theta))*(a*Math.cos(theta) - (l1*Math.cos(phi)*Math.sin(theta))/2))/2;

    let Ns02 = -(l2*m3*(2*l1*thetad*Math.sin(psi) + 2*l1*thetad*Math.sin(2*phi + psi) + l2*thetad*Math.sin(2*phi + 2*psi) + 4*a*phid*Math.cos(phi + psi) + 4*a*psid*Math.cos(phi + psi) + 
                4*c*phid*Math.cos(phi + psi) + 4*c*psid*Math.cos(phi + psi)))/8;

    Ns0.push(Ns00);
    Ns0.push(Ns01);
    Ns0.push(Ns02);

    // Second row
    let Ns10 = (thetad*(4*J33*Math.sin(2*phi + 2*psi) - 4*J32*Math.sin(2*phi + 2*psi) - 4*J22*Math.sin(2*phi) + 4*J23*Math.sin(2*phi) + l2**2*m3*Math.sin(2*phi + 2*psi) + l1**2*m2*Math.sin(2*phi) + 
                4*l1**2*m3*Math.sin(2*phi) + 4*l1*l2*m3*Math.sin(2*phi + psi)))/8;

    let Ns11 = (l2**2*m3*phid*Math.sin(psi))/4 - (l2**2*m3*psid*Math.sin(2*phi))/8 - (l2**2*m3*phid*Math.sin(2*psi))/8 - (l2**2*m3*phid*Math.sin(2*phi))/8 - (l2**2*m3*phid*Math.cos(phi)**2*Math.sin(psi))/2 - 
                (l1*l2*m3*phid*Math.sin(2*phi))/2 - (l1*l2*m3*psid*Math.sin(psi))/2 + (l1*l2*m3*psid*Math.cos(phi)**2*Math.sin(psi))/2 - (l2**2*m3*psid*Math.cos(phi)*Math.cos(psi)*Math.sin(phi))/4 + 
                (l2**2*m3*phid*Math.cos(phi)*Math.cos(psi)**2*Math.sin(phi))/4 + (l2**2*m3*psid*Math.cos(phi)*Math.cos(psi)**2*Math.sin(phi))/2 + (l2**2*m3*phid*Math.cos(phi)**2*Math.cos(psi)*Math.sin(psi))/2 + 
                (l2**2*m3*psid*Math.cos(phi)**2*Math.cos(psi)*Math.sin(psi))/4 - (l1**2*m2*phid*Math.cos(phi)*Math.cos(theta)**2*Math.sin(phi))/4 + (l1**2*m2*phid*Math.cos(phi)*Math.cos(theta)**2*Math.sin(phi))/4 + 
                l1*l2*m3*phid*Math.cos(phi)*Math.cos(psi)*Math.sin(phi);

    let Ns12 = -(l2*m3*(phid + psid)*(2*l1*Math.sin(psi) + l2*Math.cos(phi)**2*Math.sin(psi) + l2*Math.cos(phi)*Math.cos(psi)*Math.sin(phi) - l2*Math.cos(phi)*Math.cos(psi)**2*Math.sin(phi) - 
                l2*Math.cos(phi)**2*Math.cos(psi)*Math.sin(psi)))/4;

    Ns1.push(Ns10);
    Ns1.push(Ns11);
    Ns1.push(Ns12);

    // Third row
    let Ns20 = (thetad*(4*J33*Math.sin(2*phi + 2*psi) - 4*J32*Math.sin(2*phi + 2*psi) + l2**2*m3*Math.sin(2*phi + 2*psi) + 2*l1*l2*m3*Math.sin(psi) + 2*l1*l2*m3*Math.sin(2*phi + psi)))/8;

    let Ns21 = (l2*m3*(8*l1*phid*Math.sin(psi) + 2*l2*phid*Math.sin(psi) - 2*l2*phid*Math.sin(2*phi + psi) + l2*phid*Math.sin(2*phi) - l2*psid*Math.sin(2*phi) - l2*phid*Math.sin(2*psi) + l2*psid*Math.sin(2*psi) + 
                l2*phid*Math.sin(2*phi + 2*psi) + l2*psid*Math.sin(2*phi + 2*psi)))/16;

    let Ns22 = 0;

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
    let Ms00 = J13 + m3*(a*Math.sin(theta) + c*Math.sin(theta) + (l2*Math.cos(phi + psi)*Math.cos(theta))/2 + l1*Math.cos(phi)*Math.cos(theta))**2 + 
                m3*(a*Math.cos(theta) + c*Math.cos(theta) - (l2*Math.cos(phi + psi)*Math.sin(theta))/2 - l1*Math.cos(phi)*Math.sin(theta))**2 + 
                m2*(a*Math.cos(theta) - (l1*Math.cos(phi)*Math.sin(theta))/2)**2 + m2*(a*Math.sin(theta) + (l1*Math.cos(phi)*Math.cos(theta))/2)**2 + 
                J33*Math.cos(phi + psi)**2 + J32*Math.sin(phi + psi)**2 + J23*Math.cos(phi)**2 + J22*Math.sin(phi)**2;
                
    let Ms01 = - m3*((l2*Math.sin(phi + psi)*Math.cos(theta))/2 + l1*Math.cos(theta)*Math.sin(phi))*(a*Math.cos(theta) + c*Math.cos(theta) - (l2*Math.cos(phi + psi)*Math.sin(theta))/2 - 
                l1*Math.cos(phi)*Math.sin(theta)) - m3*((l2*Math.sin(phi + psi)*Math.sin(theta))/2 + 
                l1*Math.sin(phi)*Math.sin(theta))*(a*Math.sin(theta) + c*Math.sin(theta) + (l2*Math.cos(phi + psi)*Math.cos(theta))/2 + l1*Math.cos(phi)*Math.cos(theta)) - 
                (l1*m2*Math.cos(theta)*Math.sin(phi)*(a*Math.cos(theta) - (l1*Math.cos(phi)*Math.sin(theta))/2))/2 - 
                (l1*m2*Math.sin(phi)*Math.sin(theta)*(a*Math.sin(theta) + (l1*Math.cos(phi)*Math.cos(theta))/2))/2;
    
    let Ms02 = - (l2*m3*Math.sin(phi + psi)*Math.cos(theta)*(a*Math.cos(theta) + c*Math.cos(theta) - (l2*Math.cos(phi + psi)*Math.sin(theta))/2 - l1*Math.cos(phi)*Math.sin(theta)))/2 - 
                (l2*m3*Math.sin(phi + psi)*Math.sin(theta)*(a*Math.sin(theta) + c*Math.sin(theta) + (l2*Math.cos(phi + psi)*Math.cos(theta))/2 + l1*Math.cos(phi)*Math.cos(theta)))/2;

    Ms0.push(Ms00);
    Ms0.push(Ms01);
    Ms0.push(Ms02);

    // Second row
    let Ms10 = - m3*((l2*Math.sin(phi + psi)*Math.cos(theta))/2 + l1*Math.cos(theta)*Math.sin(phi))*(a*Math.cos(theta) + c*Math.cos(theta) - (l2*Math.cos(phi + psi)*Math.sin(theta))/2 - l1*Math.cos(phi)*Math.sin(theta)) - 
                m3*((l2*Math.sin(phi + psi)*Math.sin(theta))/2 + l1*Math.sin(phi)*Math.sin(theta))*(a*Math.sin(theta) + c*Math.sin(theta) + (l2*Math.cos(phi + psi)*Math.cos(theta))/2 + l1*Math.cos(phi)*Math.cos(theta)) - 
                (l1*m2*Math.cos(theta)*Math.sin(phi)*(a*Math.cos(theta) - (l1*Math.cos(phi)*Math.sin(theta))/2))/2 - 
                (l1*m2*Math.sin(phi)*Math.sin(theta)*(a*Math.sin(theta) + (l1*Math.cos(phi)*Math.cos(theta))/2))/2 ;

    let Ms11 = J21 + J31 + m3*(l1*Math.cos(phi) + (l2*Math.cos(phi))/2 - (l2*Math.sin(phi)*Math.sin(psi))/2)**2 + 
                m3*((l2*Math.sin(phi + psi)*Math.cos(theta))/2 + l1*Math.cos(theta)*Math.sin(phi))**2 + 
                m3*((l2*Math.sin(phi + psi)*Math.sin(theta))/2 + l1*Math.sin(phi)*Math.sin(theta))**2 + 
                (l1**2*m2*Math.cos(phi)**2)/4 + (l1**2*m2*Math.cos(theta)**2*Math.sin(phi)**2)/4 + 
                (l1**2*m2*Math.sin(phi)**2*Math.sin(theta)**2)/4;

    let Ms12 = J31 + (l2*m3*Math.cos(phi + psi)*(l1*Math.cos(phi) + (l2*Math.cos(phi))/2 - (l2*Math.sin(phi)*Math.sin(psi))/2))/2 + 
                (l2*m3*Math.sin(phi + psi)*Math.cos(theta)*((l2*Math.sin(phi + psi)*Math.cos(theta))/2 + l1*Math.cos(theta)*Math.sin(phi)))/2 + 
                (l2*m3*Math.sin(phi + psi)*Math.sin(theta)*((l2*Math.sin(phi + psi)*Math.sin(theta))/2 + l1*Math.sin(phi)*Math.sin(theta)))/2;

    Ms1.push(Ms10);
    Ms1.push(Ms11);
    Ms1.push(Ms12);

    // Third row
    let Ms20 = - (l2*m3*Math.sin(phi + psi)*Math.cos(theta)*(a*Math.cos(theta) + c*Math.cos(theta) - (l2*Math.cos(phi + psi)*Math.sin(theta))/2 - l1*Math.cos(phi)*Math.sin(theta)))/2 - 
                (l2*m3*Math.sin(phi + psi)*Math.sin(theta)*(a*Math.sin(theta) + c*Math.sin(theta) + (l2*Math.cos(phi + psi)*Math.cos(theta))/2 + l1*Math.cos(phi)*Math.cos(theta)))/2;

    let Ms21 = J31 + (l2*m3*Math.cos(phi + psi)*(l1*Math.cos(phi) + (l2*Math.cos(phi))/2 - (l2*Math.sin(phi)*Math.sin(psi))/2))/2 + 
                (l2*m3*Math.sin(phi + psi)*Math.cos(theta)*((l2*Math.sin(phi + psi)*Math.cos(theta))/2 + l1*Math.cos(theta)*Math.sin(phi)))/2 + 
                (l2*m3*Math.sin(phi + psi)*Math.sin(theta)*((l2*Math.sin(phi + psi)*Math.sin(theta))/2 + l1*Math.sin(phi)*Math.sin(theta)))/2;

    let Ms22 = J31 + (l2**2*m3*Math.cos(phi + psi)**2)/4 + (l2**2*m3*Math.sin(phi + psi)**2*Math.cos(theta)**2)/4 + (l2**2*m3*Math.sin(phi + psi)**2*Math.sin(theta)**2)/4;

    Ms2.push(Ms20);
    Ms2.push(Ms21);
    Ms2.push(Ms22);

    Ms.push(Ms0);
    Ms.push(Ms1);
    Ms.push(Ms2);

    Mstar = Ms;
}

function inverse_M_star()
{
    // JavaScript program to find adjoint and
    // inverse of a matrix

    let N = 3;

    Mstar_inv.push(new Array(N));
    Mstar_inv.push(new Array(N));
    Mstar_inv.push(new Array(N));   

    // Function to get cofactor of
    // A[p][q] in temp[][]. n is current
    // dimension of A[][]
    function getCofactor(A,temp,p,q,n)
    {
        let i = 0, j = 0;
   
        // Looping for each element of the matrix
        for (let row = 0; row < n; row++)
        {
            for (let col = 0; col < n; col++)
            {
                // Copying into temporary matrix only those element
                // which are not in given row and column
                if (row != p && col != q)
                {
                    temp[i][j++] = A[row][col];
   
                    // Row is filled, so increase row index and
                    // reset col index
                    if (j == n - 1)
                    {
                        j = 0;
                        i++;
                    }
                }
            }
        }
    }
 
    /* Recursive function for finding determinant of matrix. n is current dimension of A[][]. */
    function determinant(A,n)
    {
        let D = 0; // Initialize result
   
        // Base case : if matrix contains single element
        if (n == 1)
            return A[0][0];
   
        let temp = new Array(N);// To store cofactors
        for(let i=0;i<N;i++)
        {
            temp[i]=new Array(N);
        }
   
        let sign = 1; // To store sign multiplier
   
        // Iterate for each element of first row
        for (let f = 0; f < n; f++)
        {
            // Getting Cofactor of A[0][f]
            getCofactor(A, temp, 0, f, n);
            D += sign * A[0][f] * determinant(temp, n - 1);
   
            // terms are to be added with alternate sign
            sign = -sign;
        }
   
        return D;
    }
 
    // Function to get adjoint of A[N][N] in adj[N][N].
    function  adjoint(A,adj)
    {
        if (N == 1)
        {
            adj[0][0] = 1;
            return;
        }
   
        // temp is used to store cofactors of A[][]
        let sign = 1;
        let temp = new Array(N);
        for(let i=0;i<N;i++)
        {
            temp[i]=new Array(N);
        }
   
        for (let i = 0; i < N; i++)
        {
            for (let j = 0; j < N; j++)
            {
                // Get cofactor of A[i][j]
                getCofactor(A, temp, i, j, N);
   
                // sign of adj[j][i] positive if sum of row
                // and column indexes is even.
                sign = ((i + j) % 2 == 0)? 1: -1;
   
                // Interchanging rows and columns to get the
                // transpose of the cofactor matrix
                adj[j][i] = (sign)*(determinant(temp, N-1));
            }
        }
    }
 
    // Function to calculate and store inverse, returns false if
    // matrix is singular
    function inverse(A,inverse)
    {
        // Find determinant of A[][]
        let det = determinant(A, N);
        if (det == 0)
        {
            document.write("Singular matrix, can't find its inverse");
            return false;
        }
   
        // Find adjoint
        let adj = new Array(N);
        for(let i=0;i<N;i++)
        {
            adj[i]=new Array(N);
        }
        adjoint(A, adj);
   
        // Find Inverse using formula "inverse(A) = adj(A)/det(A)"
        for (let i = 0; i < N; i++)
            for (let j = 0; j < N; j++)
                inverse[i][j] = adj[i][j]/det;
   
        return true;
    }

    inverse(Mstar, Mstar_inv);
}

function get_F_star(theta, phi, psi)
{
    /**
     * Calculates and sets a new F-star from given theta, phi and psi. (It turns out that here, theta is redundant but it is included as a input just for clarity, though this is not the best use of memory on the stack.)
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