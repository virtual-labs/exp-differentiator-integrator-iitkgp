
//window.onload = function () {
//    draggable('oscilloscope');
//};
//
//var dragObj = null;
//function draggable(id)
//{
//    var obj = document.getElementById(id);
//    obj.style.position = "absolute";
//    obj.onmousedown = function () {
//        dragObj = obj;
//    }
//}
//
//document.onmouseup = function (e) {
//    dragObj = null;
//};
//
//document.onmousemove = function (e) {
//    var x = e.pageX;
//    var y = e.pageY;
//
//    if (dragObj == null)
//        return;
//
//    dragObj.style.left = x + "px";
//    dragObj.style.top = y + "px";
//};
var canvas, ctx;
var n = 0;
var cs, rs, vlt, freq;
var axes = {};
var vmaxs = 2; //in volt
var tmaxs = 0.001; //in sec
var flag, image;
function rechnge() {
    rs = document.getElementById("res1").value;
    document.getElementById("r2").value = rs;
}
function vltchng() {
    vlt = document.getElementById("volt").value;
    document.getElementById("v1").value = vlt;
}
function frqchng() {
    freq = document.getElementById("freq").value;
    document.getElementById("f1").value = freq;
}
function capchng() {
    cs = document.getElementById("caps").value;
    document.getElementById("c2").value = cs;
}
function mainswt() {
    var bttn = document.getElementById('onff').value;
    if (bttn == "Off") {
        document.getElementById("onff").value = "On";
        ctx.clearRect(0, 0, canvas.width, canvas.height);
//        document.getElementById("c2").value = "";
//        document.getElementById("caps").value = "";
//        document.getElementById("freq").value = "";
//        document.getElementById("f1").value = "";
//        document.getElementById("volt").value = "";
//        document.getElementById("v1").value = "";
        document.getElementById("res1").value = "";
        document.getElementById("r2").value = "";
        document.getElementById("r2").style.borderColor = "";
        document.getElementById("chhn1").disabled = true;
        document.getElementById("chhn2").disabled = true;
        document.getElementById("dual").disabled = true;
        document.getElementById("grnd").disabled = true;
        document.getElementById("swtchonf").disabled = true;
        if (image.src.match("switchcls")) {
            image.src = "image/switchopn.png";
        }
    }
    else {
        document.getElementById("onff").value = "Off";
        document.getElementById("chhn1").disabled = false;
        document.getElementById("chhn2").disabled = false;
        document.getElementById("dual").disabled = false;
        document.getElementById("grnd").disabled = false;
        document.getElementById("swtchonf").disabled = false;
        drawAxis();
        drawGrid(ctx);
        drawsq();

    }
}
function changeImages() {

    image = document.getElementById('myImage');
    image.addEventListener('click', changeImages, false);
    canvas = document.getElementById("mycanvas");
    ctx = canvas.getContext("2d");

    if (image.src.match("switchcls")) {
        image.src = "image/switchopn.png";

        clearCanvas();
        drawAxis();
        drawGrid(ctx);
        drawsq();

    } else {
        image.src = "image/switchcls.png";

        drawtr();
        // trim();

    }//else end
}
//--------------------------------------------------------------------channel one------------------------------------------------------------------------//
function drawsq() {
    canvas = document.getElementById("mycanvas");
    if (null == canvas || !canvas.getContext)
        return;
    ctx = canvas.getContext("2d");
    // fill canvas
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawGrid(ctx);
    drawAxis();
    square();
}
function psychnge() {
    var posya = document.getElementById("posy").value;
    document.getElementById("pstny").value = posya;
    if (flag == 1) {
        drawsq();
    }
    if (flag == 2) {
        drawtr();
    }
}

function sliderChange() {
    var sliderVal = document.getElementById("pick-voltage-slider").value;
    document.getElementById("vp").value = sliderVal;
    // document.getElementById("pick-voltage-value").value = sliderVal;
    if (flag == 1) {
        drawsq();
    }
    if (flag == 2) {
        drawtr();
    }
}

function frqchnge() {
    var freq = document.getElementById("frq").value;
    document.getElementById("fo").value = freq;
    if (flag == 1) {
        drawsq();
    }
    if (flag == 2) {
        drawtr();
    }
}

function phschnge() {
    var phases = document.getElementById("phss").value;
    document.getElementById("phase").value = phases;
    if (flag == 1) {
        drawsq();
    }
    if (flag == 2) {
        drawtr();
    }
}

//-------------------------------------------------------------------------------Input wave------------------------------------------------------------//
function square() {


    var Vp = document.getElementById("vp").value;
    var fo = document.getElementById("fo").value;
    var phase = document.getElementById("phase").value;
    var pos = document.getElementById("pstny").value;

    var x = new Array(), y = new Array();  // x,y plotting variables
    var dt, tstart, tstop;             // time variables
    flag = 1;
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


function chnlo() {
    if (image.src.match("switchcls")) {
        image.src = "image/switchopn.png";
        drawsq();
    }
}
//-------------------------------------------------------------channel two---------------------------------------------------------------------------//

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
//------------------------------------------------------------output wave----------------------------------------------------------------------------//
function trif() {

    //drawGrid(ctx);

    ctx.lineWidth = 2;
    ctx.font = "20px Georgia";
    //  ctx.fillText("Output wave:", 40, 110);
    ctx.strokeStyle = "black";
    flag = 2;
    var t = document.getElementById("r2").value;
    if (t == 5100) {

        ctx.beginPath();
        ctx.moveTo(0, 128);
        ctx.lineTo(130, 220);
        ctx.lineTo(265, 128);
        ctx.lineTo(395, 220);
        ctx.lineTo(520, 128);


        ctx.stroke();
    }


    var z = document.getElementById("r2").value;
    if (z == 910) {
        ctx.beginPath();
        ctx.moveTo(0, 88);
        for (var j = 130; j < 520; j += 265) {
            ctx.lineTo(j, 263);
            ctx.lineTo(j + 135, 88);
            //  ctx.lineTo(395, 263);
            // ctx.lineTo(520, 88);
        }
        ctx.stroke();

    }
//      var image = document.getElementById('myImage');
//    image.addEventListener('click', changeImages, false);
    var inpvl = document.getElementById("r2");
    if (inpvl.value == 910 || inpvl.value == 5100) {
        inpvl.style.borderColor = "";

    }
    else if (image.src.match("switchcls")) {
        image.src = "image/switchopn.png";

        inpvl.style.borderColor = "red";
        alert("Please put correct resistance value");
    }
}
function chnlt() {
    if (image.src.match("switchopn")) {
        image.src = "image/switchcls.png";
        drawtr();
    }

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

    flag = 3;
    //--------input square wave----------//

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

    //----------output triangle wave----------------//

    var t = document.getElementById("r2").value;
    if (t == 5100) {

        ctx.beginPath();
        ctx.moveTo(0, 128);
        ctx.lineTo(130, 220);
        ctx.lineTo(265, 128);
        ctx.lineTo(395, 220);
        ctx.lineTo(520, 128);


        ctx.stroke();
    }


    var z = document.getElementById("r2").value;
    if (z == 910) {
        ctx.beginPath();
        ctx.moveTo(0, 88);
        for (var j = 130; j < 520; j += 265) {
            ctx.lineTo(j, 263);
            ctx.lineTo(j + 135, 88);
            //  ctx.lineTo(395, 263);
            // ctx.lineTo(520, 88);
        }
        ctx.stroke();

    }
}


function bthd() {
    //if (image.src.match("switchopn")) {
    //   image.src = "image/switchcls.png"; 
    drawsqtr();
    //  }
}


//--------------------------------------------Ground channel---------------------------------------------------------------------------------------------//

function drawgr() {
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
    flag = 4;
    //--------input square wave----------//

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

    //----------output triangle wave----------------//

    var t = document.getElementById("r2").value;
    if (t == 5100) {

        ctx.beginPath();
        ctx.moveTo(0, 175);
        ctx.lineTo(520, 175);
        ctx.stroke();
    }


    var z = document.getElementById("r2").value;
    if (z == 910) {
        ctx.beginPath();
        ctx.beginPath();
        ctx.moveTo(0, 175);
        ctx.lineTo(520, 175);
        ctx.stroke();
    }

}

function grnds() {
    drawgr();
}

//------------------------------------------------------------------Oscilloscope-----------------------------------------------------------------------//
function osclocp() {
    document.getElementById("hide").style.display = "block";
    document.getElementById("close").style.display = "block";
}

function ok() {
    document.getElementById("hide").style.display = "none";
    document.getElementById("close").style.display = "none";
}

//--------------------------------------------------------------------clear canvas---------------------------------------------------------------------//
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var w = canvas.width;
    // canvas.width = 1;
    canvas.width = w;
}
//---------------------------------------------------------Drawing Axis--------------------------------------------------------------------------------//          
function drawAxis() {

    canvas = document.getElementById("mycanvas");
    ctx = canvas.getContext("2d");

    axes.x0 = .5 + .5 * canvas.width;
    // alert(axes.x0 );
    axes.y0 = .5 + .5 * canvas.height;
    // alert( axes.y0 );
    // axes.scale = 50;
    axes.xscale = (canvas.width) / (2 * tmaxs); 	// x pix per s//260000
    axes.yscale = (canvas.height) / (2 * vmaxs);    // y pix per V //43.75
    axes.N = 101;
    //alert(axes.xscale );
//alert(axes.yscale );
//alert(axes.N );
    axes.doNegativeX = true;
    ctx.lineWidth = 0.5;
    ctx.lineWidth = ticklinewidth;
    ctx.strokeStyle = tickcolor;
    drawHorizontalAxis();
    drawVerticalAxis();
    drawVerticalAxisTicks();
    drawHorizontalAxisTicks();
    //  label();
}
function drawGrid(ctx) {
    var w = ctx.canvas.width;
    var h = ctx.canvas.height;
    for (var x = 0; x < w; x += 43.5) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
    }
    for (var y = 0; y < h; y += 44) {
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
    }
    ctx.strokeStyle = "Gainsboro";
    ctx.stroke();
}
var axismargin = 30,
        axisorigin = {x: 0, y: 310 - 10},
axistop = axismargin - 30,
        axisright = 520,
        horzntickspcng = 30,
        vrtcltickspcng = 30,
        axiswidth = axisright,
        axisheight = axisorigin.y,
        numofvrtcltick = axisheight / vrtcltickspcng,
        numofhorzntick = axiswidth / horzntickspcng,
        tickwidth = 10,
        ticklinewidth = 0.5,
        tickcolor = 'black',
        axislinewidth = 1.0,
        axiscolor = 'lightgray';
//------------------------------------------------------Horizontal Axis----------------------------------------------------------------------------------//
function drawHorizontalAxis() {
//    ctx.beginPath();
//    ctx.moveTo(axisorigin.x, axisorigin.y-130);
//    ctx.lineTo(axisright, axisorigin.y-130);
//    ctx.stroke();
    var y0 = axes.y0, w = ctx.canvas.width;
//
    ctx.beginPath();
    ctx.strokeStyle = "rgb(128,128,128)";
    ctx.moveTo(0, y0);
    ctx.lineTo(w, y0);  // X axis
    ctx.stroke();
}
////------------------------------------------------------Vertical Axis------------------------------------------------------------------------------------//          
function drawVerticalAxis() {
//    ctx.beginPath();
//    ctx.moveTo(axisorigin.x+270, axisorigin.y+100);
//    ctx.lineTo(axisorigin.x+270, axistop);
//    ctx.stroke();
    var x0 = axes.x0, h = ctx.canvas.height;
    ctx.beginPath();
    ctx.strokeStyle = "rgb(128,128,128)";
    ctx.moveTo(x0, 0);
    ctx.lineTo(x0, h);  // Y axis
    ctx.stroke();
}
//-------------------------------------------------------Vertical Ticks--------------------------------------------------------------------------------//         
function drawVerticalAxisTicks() {
    var deltaX;
    for (var i = 1; i < numofvrtcltick; ++i) {
        ctx.beginPath();
        if (i % 5 === 0)
            deltaX = tickwidth / 2;
        else
            deltaX = tickwidth / 2;
        ctx.moveTo(axisorigin.x += 180 - deltaX,
                axisorigin.y + 120 - i * vrtcltickspcng);
        ctx.lineTo(axisorigin.x + 180 + deltaX,
                axisorigin.y + 120 - i * vrtcltickspcng);
        ctx.stroke();
    }
}
//-------------------------------------------------------Horizontal Ticks----------------------------------------------------------------------------------//     
function drawHorizontalAxisTicks() {
    var deltaY;
    for (var i = 1; i < numofhorzntick; ++i) {
        ctx.beginPath();
        if (i % 5 === 0)
            deltaY = tickwidth / 2;
        else
            deltaY = tickwidth / 2;
        ctx.moveTo(axisorigin.x + i * horzntickspcng,
                axisorigin.y - 30 - deltaY);
        ctx.lineTo(axisorigin.x + i * horzntickspcng,
                axisorigin.y - 30 + deltaY);
        ctx.stroke();
    }
}
//---------------------------------Print------------------------------------------------//
function printf() {
    window.print();
}