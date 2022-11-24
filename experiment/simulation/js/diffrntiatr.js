var canvas, ctx;
var n = 0;
var axes = {};
var vmaxs = 2; //in volt
var tmaxs = 0.001; //in sec
var flag, image;

function mainswt() {

    var bttn = document.getElementById('onff').value;
    if (bttn == "Off") {
        document.getElementById("onff").value = "On";
        //document.getElementById("onff").value = "On";
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        document.getElementById("chhn1").disabled = true;
        document.getElementById("chhn2").disabled = true;
        document.getElementById("dual").disabled = true;
        document.getElementById("grnd").disabled = true;
        document.getElementById("sqr").disabled = true;
        document.getElementById("trw").disabled = true;
        document.getElementById("snw").disabled = true;
        document.getElementById("onsw").style.display = "none";
        document.getElementById("twsw").style.display = "none";
        document.getElementById("thrsw").style.display = "none";
        if (image.src.match("switchcls")) {
            image.src = "image/switchopn.png";
        }
    }
    else {
        document.getElementById("onff").value = "Off";
        // document.getElementById("onff").value = "Off";
        document.getElementById("chhn1").disabled = false;
        document.getElementById("chhn2").disabled = false;
        document.getElementById("dual").disabled = false;
        document.getElementById("grnd").disabled = false;
        document.getElementById("sqr").disabled = false;
        document.getElementById("trw").disabled = false;
        document.getElementById("snw").disabled = false;

        drawAxis();
        drawGrid(ctx);

    }

}
//-------------------------------------------------------------------controller-------------------------------------------//
function psychnge() {
    var posya = document.getElementById("posy").value;
    document.getElementById("pstny").value = posya;

}

function sliderChange() {
    var sliderVal = document.getElementById("pick-voltage-slider").value;
    document.getElementById("vp").value = sliderVal;
    // document.getElementById("pick-voltage-value").value = sliderVal;

}

function frqchnge() {
    var freq = document.getElementById("frq").value;
    document.getElementById("fo").value = freq;

}

function phschnge() {
    var phases = document.getElementById("phss").value;
    document.getElementById("phase").value = phases;

}


//-------------------------------------------------------Clear Canvas-----------------------------------------------------------------------------------//
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
//--------------------------------------------------------------------------------------------------Print------------------------------------------------//
function printf() {
    window.print();
}

//----------------------------------------------------------------------------channel one----------------------------------------------------------------//
function chnlo() {

    if (image.src.match("switchcls")) {
        image.src = "image/switchopn.png";
        if (flag == 2 || flag == 7) {   //flag=2 -------- output spike wave   //flag=7 -------- both square and spike wave
            drawsq();
        }

        if (flag == 4 || flag == 9) {   //flag=4 -------- output square wave  //flag=9 -------- both triangle and square wave
            drawtr();
        }


        if (flag == 6 || flag == 11) {  //flag=6 -------- output cosine wave  //flag=11 -------- both sine and cosine wave
            drawsncrv();
        }
//    }
//    
//    else if (image.src.match("switchcls")) {
//        image.src = "image/switchopn.png";
        if (flag == 8) {   //flag=8 -------- ground wave
            drawsq();
        }

        if (flag == 10) {   //flag=10 -------- ground wave
            drawtr();
        }


        if (flag == 12) {  //flag=12 -------- ground wave
            drawsncrv();
        }
    }

}

//----------------------------------------------------------------------------channel two----------------------------------------------------------------//
function chnlt() {

    if (image.src.match("switchopn")) {
        image.src = "image/switchcls.png";
        if (flag == 1 || flag == 7) {   //flag=1 -------- input square wave  //flag=7 -------- both square and spike wave
            drawspike();
        }

        if (flag == 3 || flag == 9) {   //flag=3 -------- input triangle wave  //flag=9 -------- both triangle and square wave
            drawsqr();
        }

        if (flag == 5 || flag == 11) {   //flag=5 -------- input sine wave  //flag=11 -------- both sine and cosine wave
            drawcscrv();
        }
    }
    else if (image.src.match("switchcls")) {
        image.src = "image/switchcls.png";
        if (flag == 1 || flag == 7) {    //flag=1 -------- input square wave  //flag=7 -------- both square and spike wave
            drawspike();
        }

        if (flag == 3 || flag == 9) {    //flag=3 -------- input triangle wave  //flag=9 -------- both triangle and square wave
            drawsqr();
        }

        if (flag == 5 || flag == 11) {   //flag=5 -------- input sine wave  //flag=11 -------- both sine and cosine wave
            drawcscrv();
        }
//    }
//    
//    else if (image.src.match("switchcls")) {
//        image.src = "image/switchcls.png";
        if (flag == 8) {    //flag=8 -------- ground wave
            drawspike();
        }

        if (flag == 10) {    //flag=10 -------- ground wave
            drawsqr();
        }

        if (flag == 12) {   //flag=12 -------- ground wave
            drawcscrv();
        }
    }
}


function bthd() {
    if (image.src.match("switchopn")) {
        image.src = "image/switchcls.png";
        if (flag == 1 || flag == 2) {   //flag=1 -------- input square wave  //flag=2 -------- output spike wave
            drawsqrspk();
        }
        if (flag == 3 || flag == 4) {   //flag=3 -------- input triangle wave  //flag=4 -------- output square wave
            drawsqtr();
        }
        if (flag == 5 || flag == 6) {   //flag=5 -------- input sine wave  //flag=6 -------- output cosine wave
            drawsncsbt();
        }
    }

    else if (image.src.match("switchcls")) {
        image.src = "image/switchcls.png";
        if (flag == 2 || flag == 1) {     //flag=2 -------- output spike wave  //flag=1 -------- input square wave
            drawsqrspk();
        }
        if (flag == 4 || flag == 3) {     //flag=4 -------- output square wave  //flag=3 -------- input triangle wave
            drawsqtr();
        }
        if (flag == 6 || flag == 5) {     //flag=6 -------- output cosine wave  //flag=5 -------- input sine wave
            drawsncsbt();
        }
//    }
//
//    else if (image.src.match("switchcls")) {
//        image.src = "image/switchcls.png";
        if (flag == 8) {  //flag=8 -------- ground wave
            drawsqrspk();
        }
        if (flag == 10) {   //flag=10 -------- ground wave
            drawsqtr();
        }
        if (flag == 12) {   //flag=12 -------- ground wave
            drawsncsbt();
        }
    }

}
function grounds() {
    if (image.src.match("switchcls")) {
        image.src = "image/switchcls.png";
        if (flag == 7) {   //flag=7 -------- both square and spike wave
            drawsqrspkg();
        }
        if (flag == 9) {    //flag=9 -------- both triangle and square wave
            drawtrgr();
        }
        if (flag == 11) {   //flag=11 -------- both sine and cosine wave
            drawsncsgr();
        }
        if (flag == 2) {    //flag=2 -------- output spike wave
            drawsqrspkg();
        }

        if (flag == 4) {    //flag=4 -------- output square wave
            drawtrgr();
        }

        if (flag == 6) {    //flag=6 -------- output cosine wave
            drawsncsgr();
        }
    }
    else if (image.src.match("switchopn")) {
        image.src = "image/switchcls.png";
        if (flag == 1) {    //flag=1 -------- input square wave
            drawsqrspkg();
        }
        if (flag == 3) {    //flag=3 -------- input triangle wave
            drawtrgr();
        }
        if (flag == 5) {    //flag=5 -------- input sine wave
            drawsncsgr();
        }
    }
}

//----------------------------- square wave ----------------------------------//

//flag=1 -------- input square wave
//flag=2 -------- output spike wave
//flag=7 -------- both square and spike wave
//flag=8 -------- ground wave

//----------------------------- triangular wave ------------------------------//

//flag=3 -------- input triangle wave
//flag=4 -------- output square wave
//flag=9 -------- both triangle and square wave
//flag=10 -------- ground wave

//----------------------------- sine wave ------------------------------------//

//flag=5 -------- input sine wave
//flag=6 -------- output cosine wave
//flag=11 -------- both sine and cosine wave
//flag=12 -------- ground wave