var vmaxs = 2; //in volt
var tmaxs = 0.001; //in sec
var flag, image;
var axes = {};
//------------------------------------------------------------------------triangular wave---------------------------------------------------------------//
function switchimag() {

    image = document.getElementById('mypic');
    image.addEventListener('click', switchimage, false);
    canvas = document.getElementById("mycanvas");
    ctx = canvas.getContext("2d");

    if (image.src.match("switchcls")) {
        image.src = "image/switchopn.png";

        clearCanvas();
        drawAxis();
        drawGrid(ctx);
        drawtr();

    } else {
        image.src = "image/switchcls.png";
        drawsqr();
    }//else end

}
function drawtr() {
    canvas = document.getElementById("mycanvas");
    if (null == canvas || !canvas.getContext)
        return;
    ctx = canvas.getContext("2d");
    // fill canvas
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawGrid(ctx);
    drawAxis();
    trif();
}
//------------------------------------------------------------Input wave(channel one)----------------------------------------------------------------------------//
function trif() {

    clearCanvas();
    drawGrid(ctx);

    document.getElementById("onsw").style.display = "none";
    document.getElementById("twsw").style.display = "block";
    document.getElementById("thrsw").style.display = "none";
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "black";
    flag = 3;

    ctx.beginPath();
    ctx.moveTo(0, 88);
    for (var j = 130; j < 520; j += 265) {
        ctx.lineTo(j, 263);
        ctx.lineTo(j + 135, 88);
    }
    ctx.stroke();
}

//--------------------------------------------------------output wave(channel-two)-----------------------------------------------------------------------------------//

function drawsqr() {
    canvas = document.getElementById("mycanvas");
    if (null == canvas || !canvas.getContext)
        return;
    ctx = canvas.getContext("2d");
    // fill canvas
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawGrid(ctx);
    drawAxis();
    squareot();
}

function squareot() {

    var Vp = document.getElementById("vp").value;
    var fo = document.getElementById("fo").value;
    var phase = document.getElementById("phase").value;
    var pos = document.getElementById("pstny").value;

    var x = new Array(), y = new Array();  // x,y plotting variables
    var dt, tstart, tstop;             // time variables
    flag = 4;
    // define plot paramaters
    tstart = -tmaxs;//-0.001
    // alert(tstart);
    tstop = tmaxs;//0.001
    // alert(tstop );
    dt = (tstop - tstart) / (101 - 1);//0.00002

    //alert(dt);// time increment over N points


    // create function 
    for (i = 0; i < 101; i++) {
        x[i] = (tstart + i * dt).toPrecision(6);//-0.001 to 0.00102 at i=50 x=0
        y[i] = (Vp * Math.sin(2 * 3.1415 * fo * x[i] + phase * 3.1415 / 180)).toPrecision(6);
    }// for fo=1000  y= -0.1093 to 0.1115
    //for fo=2000 y=-0.2174 to 0.2217
    //for fo=3000 y=-0.3229 to 0.3291


//alert(x);
//alert(y);
    //document.getElementById("xx").value = x;
    //document.getElementById("yy").value = y;

    var i, x0, y0, xscale, yscale;
    var xp, yp;
    var pos = document.getElementById("pstny").value;
    x0 = axes.x0;
    // alert(x0);260.5
    y0 = axes.y0;
    // alert(y0);175.5
    xscale = axes.xscale;
    yscale = axes.yscale;

    ctx.beginPath();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "black";
    var p = y0 - parseInt(pos) * yscale;
    for (i = 0; i < 101; i++) {
        // translate actual x,y to plot xp,yp
        xp = x0 + x[i] * xscale;
        yp = y0 - Math.sign(y[i]) * yscale + p - 175;

        // draw ine to next point
        if (i == 0)
            ctx.moveTo(xp, yp);
        else
            ctx.lineTo(xp, yp);
    }
    //document.getElementById("xpx").value = xp;
    // document.getElementById("ypy").value = yp;
    ctx.stroke();
}
//----------------------------------------------------- For Both Channel ---------------------------------------------------------------------------------//
function drawsqtr() {
    canvas = document.getElementById("mycanvas");
    if (null == canvas || !canvas.getContext)
        return;
    ctx = canvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawGrid(ctx);
    drawAxis();
    sqrtri();
}

function sqrtri() {

    flag = 9;

    //----------input triangle wave----------------//
    ctx.beginPath();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "black";
    ctx.moveTo(0, 88);
    for (var j = 130; j < 520; j += 265) {
        ctx.lineTo(j, 263);
        ctx.lineTo(j + 135, 88);
    }
    ctx.stroke();

    //--------output square wave----------//

    var Vp = document.getElementById("vp").value;
    var fo = document.getElementById("fo").value;
    var phase = document.getElementById("phase").value;
    var pos = document.getElementById("pstny").value;

    var x = new Array(), y = new Array();  // x,y plotting variables
    var dt, tstart, tstop;             // time variables

    // define plot paramaters
    tstart = -tmaxs;//-0.001
    // alert(tstart);
    tstop = tmaxs;//0.001
    // alert(tstop );
    dt = (tstop - tstart) / (101 - 1);//0.00002

    //alert(dt);// time increment over N points


    // create function 
    for (i = 0; i < 101; i++) {
        x[i] = (tstart + i * dt).toPrecision(6);//-0.001 to 0.00102 at i=50 x=0
        y[i] = (Vp * Math.sin(2 * 3.1415 * fo * x[i] + phase * 3.1415 / 180)).toPrecision(6);
    }// for fo=1000  y= -0.1093 to 0.1115
    //for fo=2000 y=-0.2174 to 0.2217
    //for fo=3000 y=-0.3229 to 0.3291


//alert(x);
//alert(y);
    //document.getElementById("xx").value = x;
    //document.getElementById("yy").value = y;

    var i, x0, y0, xscale, yscale;
    var xp, yp;
    var pos = document.getElementById("pstny").value;
    x0 = axes.x0;
    // alert(x0);260.5
    y0 = axes.y0;
    // alert(y0);175.5
    xscale = axes.xscale;
    yscale = axes.yscale;

    ctx.beginPath();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "black";
    var p = y0 - parseInt(pos) * yscale;
    for (i = 0; i < 101; i++) {
        // translate actual x,y to plot xp,yp
        xp = x0 + x[i] * xscale;
        yp = y0 - Math.sign(y[i]) * yscale + p - 175;

        // draw ine to next point
        if (i == 0)
            ctx.moveTo(xp, yp);
        else
            ctx.lineTo(xp, yp);
    }
    //document.getElementById("xpx").value = xp;
    // document.getElementById("ypy").value = yp;
    ctx.stroke();

}

//--------------------------------------------Ground channel---------------------------------------------------------------------------------------------//

function drawtrgr() {
    canvas = document.getElementById("mycanvas");
    if (null == canvas || !canvas.getContext)
        return;
    ctx = canvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
//    document.getElementById("peakslider").disabled = false;
//    document.getElementById("fullps").disabled = false;
//    document.getElementById("phs").disabled = false;
//    document.getElementById("frqs").disabled = false;
//    document.getElementById("peakslider2").disabled = false;
//    document.getElementById("flrcps").disabled = false;
//    document.getElementById("phs2").disabled = false;
    drawGrid(ctx);
    drawAxis();
    sqtrgr();
}
function sqtrgr() {
    flag = 10;

    //---------input triangle wave----------------//

    
    ctx.beginPath();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "black";
    ctx.moveTo(0, 175);
    ctx.lineTo(520, 175);
    ctx.stroke();
    //-------------------output square wave----------//

    var Vp = 0;
    var fo = document.getElementById("fo").value;
    var phase = document.getElementById("phase").value;
    var pos = document.getElementById("pstny").value;

    var x = new Array(), y = new Array();  // x,y plotting variables
    var dt, tstart, tstop;             // time variables

    // define plot paramaters
    tstart = -tmaxs;//-0.001
    // alert(tstart);
    tstop = tmaxs;//0.001
    // alert(tstop );
    dt = (tstop - tstart) / (101 - 1);//0.00002

    //alert(dt);// time increment over N points


    // create function 
    for (i = 0; i < 101; i++) {
        x[i] = (tstart + i * dt).toPrecision(6);//-0.001 to 0.00102 at i=50 x=0
        y[i] = (Vp * Math.sin(2 * 3.1415 * fo * x[i] + phase * 3.1415 / 180)).toPrecision(6);
    }// for fo=1000  y= -0.1093 to 0.1115
    //for fo=2000 y=-0.2174 to 0.2217
    //for fo=3000 y=-0.3229 to 0.3291


//alert(x);
//alert(y);
    //document.getElementById("xx").value = x;
    //document.getElementById("yy").value = y;

    var i, x0, y0, xscale, yscale;
    var xp, yp;
    var pos = document.getElementById("pstny").value;
    x0 = axes.x0;
    // alert(x0);260.5
    y0 = axes.y0;
    // alert(y0);175.5
    xscale = axes.xscale;
    yscale = axes.yscale;

    ctx.beginPath();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "black";
    var p = y0 - parseInt(pos) * yscale;
    for (i = 0; i < 101; i++) {
        // translate actual x,y to plot xp,yp
        xp = x0 + x[i] * xscale;
        yp = y0 - Math.sign(y[i]) * yscale + p - 175;

        // draw ine to next point
        if (i == 0)
            ctx.moveTo(xp, yp);
        else
            ctx.lineTo(xp, yp);
    }
    //document.getElementById("xpx").value = xp;
    // document.getElementById("ypy").value = yp;
    ctx.stroke();
}


