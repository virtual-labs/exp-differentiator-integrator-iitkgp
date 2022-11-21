var vmaxs = 2; //in volt
var tmaxs = 0.001; //in sec
var flag, image;
var axes = {};
//------------------------------------------------------------------------sine wave----------------------------------------------------------------------//
function switcimage() {

    image = document.getElementById('mypic');
    image.addEventListener('click', switchimage, false);
    canvas = document.getElementById("mycanvas");
    ctx = canvas.getContext("2d");

    if (image.src.match("switchcls")) {
        image.src = "image/switchopn.png";

        clearCanvas();
        drawAxis();
        drawGrid(ctx);

        drawsncrv();

    } else {
        image.src = "image/switchcls.png";

        drawcscrv();

    }//else end 
}


function drawsncrv() {

    canvas = document.getElementById("mycanvas");
    if (null == canvas || !canvas.getContext)
        return;
    ctx = canvas.getContext("2d");
    // fill canvas
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawGrid(ctx);
    drawAxis();
    sinecrv();
}
function sinecrv() {

    clearCanvas();
    drawGrid(ctx);

    document.getElementById("onsw").style.display = "none";
    document.getElementById("twsw").style.display = "none";
    document.getElementById("thrsw").style.display = "block";

    var Vp = document.getElementById("vp").value;
    var fo = document.getElementById("fo").value;
    var phase = document.getElementById("phase").value;
    var pos = document.getElementById("pstny").value;

    flag = 5;

    var x = new Array(), y = new Array();  // x,y plotting variables
    var dt, tstart, tstop;             // time variables

    // define plot paramaters
    tstart = -tmaxs;//-0.001
    // alert(tstart);
    tstop = tmaxs;//0.001
    // alert(tstop );
    dt = (tstop - tstart) / (101 - 1);//0.00002


    // create function 
    for (i = 0; i < 101; i++) {
        x[i] = (tstart + i * dt).toPrecision(6);//-0.001 to 0.00102 at i=50 x=0
        y[i] = (Vp * Math.sin(2 * 3.1415 * fo * x[i] + phase * 3.1415 / 180)).toPrecision(6);
    }

    var i, x0, y0, xscale, yscale;
    var xp, yp;
    var pos = document.getElementById("pstny").value;

    x0 = axes.x0;
    // alert(x0);250.5
    y0 = axes.y0;
    // alert(y0);150.5
    xscale = axes.xscale;
    yscale = axes.yscale;

    ctx.beginPath();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "black";
    var p = y0 - parseInt(pos) * yscale;
    for (i = 0; i < 101; i++) {
        // translate actual x,y to plot xp,yp
        xp = x0 + x[i] * xscale;
        yp = y0 - y[i] * yscale + p - 150;

        // draw ine to next point
        if (i == 0)
            ctx.moveTo(xp, yp);
        else
            ctx.lineTo(xp, yp);
    }

    ctx.stroke();
}
//-----------------------------------------------------output wave--------------------------------------------------------------------------------------//

function drawcscrv() {

    canvas = document.getElementById("mycanvas");
    if (null == canvas || !canvas.getContext)
        return;
    ctx = canvas.getContext("2d");
    // fill canvas
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawGrid(ctx);
    drawAxis();
    coscrv();
}

function coscrv() {

    var Vp = document.getElementById("vp").value;
    var fo = document.getElementById("fo").value;
    var phase = document.getElementById("phase").value;
    var pos = document.getElementById("pstny").value;


    flag = 6;
    var x = new Array(), y = new Array();  // x,y plotting variables
    var dt, tstart, tstop;             // time variables

    // define plot paramaters
    tstart = -tmaxs;//-0.001
    // alert(tstart);
    tstop = tmaxs;//0.001
    // alert(tstop );
    dt = (tstop - tstart) / (101 - 1);//0.00002


    // create function 
    for (i = 0; i < 101; i++) {
        x[i] = (tstart + i * dt).toPrecision(6);//-0.001 to 0.00102 at i=50 x=0
        y[i] = (Vp * Math.cos(2 * 3.1415 * fo * x[i] + phase * 3.1415 / 180)).toPrecision(6);
    }

    var i, x0, y0, xscale, yscale;
    var xp, yp;
    var pos = document.getElementById("pstny").value;

    x0 = axes.x0;
    // alert(x0);250.5
    y0 = axes.y0;
    // alert(y0);150.5
    xscale = axes.xscale;
    yscale = axes.yscale;

    ctx.beginPath();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "black";
    var p = y0 - parseInt(pos) * yscale;
    for (i = 0; i < 101; i++) {
        // translate actual x,y to plot xp,yp
        xp = x0 + x[i] * xscale;
        yp = y0 - y[i] * yscale + p - 150;

        // draw ine to next point
        if (i == 0)
            ctx.moveTo(xp, yp);
        else
            ctx.lineTo(xp, yp);
    }

    ctx.stroke();
}
//-------------------------------------------------------------------for both channel-------------------------------------------------------------------//
function drawsncsbt() {
    canvas = document.getElementById("mycanvas");
    if (null == canvas || !canvas.getContext)
        return;
    ctx = canvas.getContext("2d");
    // fill canvas
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawGrid(ctx);
    drawAxis();
    sncoscrv();
}
function sncoscrv() {
    var Vp = document.getElementById("vp").value;
    var fo = document.getElementById("fo").value;
    var phase = document.getElementById("phase").value;
    var pos = document.getElementById("pstny").value;

    flag = 11;
//------------input wave----------------------------------------//
    var x = new Array(), y = new Array();  // x,y plotting variables
    var dt, tstart, tstop;             // time variables

    // define plot paramaters
    tstart = -tmaxs;//-0.001
    // alert(tstart);
    tstop = tmaxs;//0.001
    // alert(tstop );
    dt = (tstop - tstart) / (101 - 1);//0.00002


    // create function 
    for (i = 0; i < 101; i++) {
        x[i] = (tstart + i * dt).toPrecision(6);//-0.001 to 0.00102 at i=50 x=0
        y[i] = (Vp * Math.sin(2 * 3.1415 * fo * x[i] + phase * 3.1415 / 180)).toPrecision(6);
    }

    var i, x0, y0, xscale, yscale;
    var xp, yp;
    var pos = document.getElementById("pstny").value;

    x0 = axes.x0;
    // alert(x0);250.5
    y0 = axes.y0;
    // alert(y0);150.5
    xscale = axes.xscale;
    yscale = axes.yscale;

    ctx.beginPath();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "black";
    var p = y0 - parseInt(pos) * yscale;
    for (i = 0; i < 101; i++) {
        // translate actual x,y to plot xp,yp
        xp = x0 + x[i] * xscale;
        yp = y0 - y[i] * yscale + p - 150;

        // draw ine to next point
        if (i == 0)
            ctx.moveTo(xp, yp);
        else
            ctx.lineTo(xp, yp);
    }

    ctx.stroke();

    //------------------------------------output wave-----------------------------------------------------//


    var x1 = new Array(), y1 = new Array();  // x,y plotting variables
  
//
//    // define plot paramaters
//    tstart = -tmaxs;//-0.001
//    // alert(tstart);
//    tstop = tmaxs;//0.001
//    // alert(tstop );
//    dt = (tstop - tstart) / (101 - 1);//0.00002


    // create function 
    for (j = 0; j < 101; j++) {
        x1[j] = (tstart + j * dt).toPrecision(6);//-0.001 to 0.00102 at i=50 x=0
        y1[j] = (Vp * Math.cos(2 * 3.1415 * fo * x1[j] + phase * 3.1415 / 180)).toPrecision(6);
    }

    var j, x0, y0, xscale, yscale;
    var xp1, yp1;


    x0 = axes.x0;
    // alert(x0);250.5
    y0 = axes.y0;
    // alert(y0);150.5
    xscale = axes.xscale;
    yscale = axes.yscale;

    ctx.beginPath();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "black";
    var p = y0 - parseInt(pos) * yscale;
    for (j = 0; j < 101; j++) {
        // translate actual x,y to plot xp,yp
        xp1 = x0 + x1[j] * xscale;
        yp1 = y0 - y1[j] * yscale + p - 150;

        // draw ine to next point
        if (j == 0)
            ctx.moveTo(xp1, yp1);
        else
            ctx.lineTo(xp1, yp1);
    }

    ctx.stroke();

}

//-------------------------------------------------------------------for ground channel-------------------------------------------------------------------//
function drawsncsgr() {
    canvas = document.getElementById("mycanvas");
    if (null == canvas || !canvas.getContext)
        return;
    ctx = canvas.getContext("2d");
    // fill canvas
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawGrid(ctx);
    drawAxis();
    sncosgrcrv();
}
function sncosgrcrv() {
    var Vp = 0;
    var fo = document.getElementById("fo").value;
    var phase = document.getElementById("phase").value;
    var pos = document.getElementById("pstny").value;

    flag = 12;
//------------input wave----------------------------------------//
    var x = new Array(), y = new Array();  // x,y plotting variables
    var dt, tstart, tstop;             // time variables

    // define plot paramaters
    tstart = -tmaxs;//-0.001
    // alert(tstart);
    tstop = tmaxs;//0.001
    // alert(tstop );
    dt = (tstop - tstart) / (101 - 1);//0.00002


    // create function 
    for (i = 0; i < 101; i++) {
        x[i] = (tstart + i * dt).toPrecision(6);//-0.001 to 0.00102 at i=50 x=0
        y[i] = (Vp * Math.sin(2 * 3.1415 * fo * x[i] + phase * 3.1415 / 180)).toPrecision(6);
    }

    var i, x0, y0, xscale, yscale;
    var xp, yp;
    var pos = document.getElementById("pstny").value;

    x0 = axes.x0;
    // alert(x0);250.5
    y0 = axes.y0;
    // alert(y0);150.5
    xscale = axes.xscale;
    yscale = axes.yscale;

    ctx.beginPath();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "black";
    var p = y0 - parseInt(pos) * yscale;
    for (i = 0; i < 101; i++) {
        // translate actual x,y to plot xp,yp
        xp = x0 + x[i] * xscale;
        yp = y0 - y[i] * yscale + p - 150;

        // draw ine to next point
        if (i == 0)
            ctx.moveTo(xp, yp);
        else
            ctx.lineTo(xp, yp);
    }

    ctx.stroke();

    //------------------------------------output wave-----------------------------------------------------//


    var x1 = new Array(), y1 = new Array();  // x,y plotting variables
//    var dt, tstart, tstop;             // time variables
//
//    // define plot paramaters
//    tstart = -tmaxs;//-0.001
//    // alert(tstart);
//    tstop = tmaxs;//0.001
//    // alert(tstop );
//    dt = (tstop - tstart) / (101 - 1);//0.00002


    // create function 
    for (j = 0; j < 101; j++) {
        x1[j] = (tstart + j * dt).toPrecision(6);//-0.001 to 0.00102 at i=50 x=0
        y1[j] = (Vp * Math.cos(2 * 3.1415 * fo * x1[j] + phase * 3.1415 / 180)).toPrecision(6);
    }

    var j, x0, y0, xscale, yscale;
    var xp1, yp1;


    x0 = axes.x0;
    // alert(x0);250.5
    y0 = axes.y0;
    // alert(y0);150.5
    xscale = axes.xscale;
    yscale = axes.yscale;

    ctx.beginPath();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "black";
    var p = y0 - parseInt(pos) * yscale;
    for (j = 0; j < 101; j++) {
        // translate actual x,y to plot xp,yp
        xp1 = x0 + x1[j] * xscale;
        yp1 = y0 - y1[j] * yscale + p - 150;

        // draw ine to next point
        if (j == 0)
            ctx.moveTo(xp1, yp1);
        else
            ctx.lineTo(xp1, yp1);
    }

    ctx.stroke();

}