/*  Document Name:rcintgtri_ver2.js
 Created on : 21 oct, 2018
 Author     : sukriti
 */

var flag;
var vp;
var  posy2;
var phsl;
var frqfng;
var axes = {};
var vmaxs;  //in volt
var tmaxs;// = (document.getElementById("fq-knob").value )* Math.pow(10, -3);// in msec  0.001; //in sec

//----------------------------------------Channel 2------------------------------------------------------------//


function posiy2chnge() {
    posy2 = document.getElementById("positiony2").value;
    
    if (flag == 2) {
      drawspk();
    }

   
}

function posix2chnge() {
    phsl = document.getElementById("positionx").value;
    if (flag == 1) {
        drawsqr();
    }
    if (flag == 2) {
      drawspk();
    }

   
}

function ampfng() {
    vp = document.getElementById("amp-knob-fng").value;
    if (flag == 1) {
        drawsqr();
    }
    if (flag == 2) {
        drawspk();
    }

   if(flag==3){
        bthdrc();
    }
    if(flag==4){
       grndrc();
    }
}

function freqfng() {
    frqfng = document.getElementById("fq-knob-fng").value;
    if (flag == 1) {
        drawsqr();
    }
    if (flag == 2) {
       drawspk();
    }
if(flag==3){
        bthdrc();
    }
    if(flag==4){
       grndrc();
    }
   
}

//----------------------------------------code for drawing trianle output--------------------------------------------------//
function drawspk() {
    canvas = document.getElementById("mycanvas");
    if (null == canvas || !canvas.getContext)
        return;
    ctx = canvas.getContext("2d");
    // fill canvas
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    document.getElementById("chhn1").disabled = false;
        document.getElementById("chhn2").disabled = false;
        document.getElementById("dual").disabled = false;
        document.getElementById("grnd").disabled = false;
    drawGrid(ctx);
    drawAxis();
   spkwv();
     
  
}

function spkwv() {

    vp = document.getElementById("amp-knob-fng").value;
    frqfng = document.getElementById("fq-knob-fng").value;
    phsl = document.getElementById("positionx").value;
    posy2 = document.getElementById("positiony2").value;
	tmaxs= document.getElementById("fq-knob").value *10*Math.pow(10,-3);// in msec  0.001; //in sec
var c=document.getElementById("capacitor").value;
var r=document.getElementById("resistor").value;
//---------------------------------------------------------spike  wave-------------------------------------------------------------------------------//

    var x = new Array();  // x,y plotting variables
    var dt, tstart, tstop;             // time variables
    var y3 = new Array(), y1 = new Array(), y2 = new Array(), y4 = new Array();
    var i;
    flag = 2;
    // define plot paramaters
    tstart = 0;//-tmaxs; //in sec
    tstop = tmaxs;
    dt = (tstop - tstart) / (101 - 1);// time increment over N points

    // create function 
   for (i = 0; i < 25; i++) {
        x[i] =(tstart + (i) * dt).toPrecision(6);//-0.001 to 0.00102 at i=50 x=0
      y1[i] = (vp)*Math.exp(-i);
    // y1[i]=(vp)*Math.exp(-( 2 * 3.1415 * frqfng *i + phsl * 3.1415 / 180));
    }
     for (i =25; i < 50; i++) {
        x[i] =(tstart + (i) * dt).toPrecision(6);//-0.001 to 0.00102 at i=50 x=0
     y2[i] = (-vp)*Math.exp((-i+25));
       //y2[i] = (-vp)*Math.exp(-( 2 * 3.1415 * frqfng *(-(-i+25)) + phsl * 3.1415 / 180));
    }
    for (i =50; i < 75; i++) {
        x[i] =(tstart + (i) * dt).toPrecision(6);//-0.001 to 0.00102 at i=50 x=0
      y3[i] = (vp)*Math.exp((-i+50));
      // y3[i] = (vp)*Math.exp(-( 2 * 3.1415 * frqfng *(-(-i+50)) + phsl * 3.1415 / 180));
    }
    for (i =75; i < 101; i++) {
        x[i] =(tstart + (i) * dt).toPrecision(6);//-0.001 to 0.00102 at i=50 x=0
      y4[i] = (-vp)*Math.exp((-i+75));
       //y4[i] = (-vp)*Math.exp(-( 2 * 3.1415 *frqfng *(-(-i+75)) + phsl * 3.1415 / 180));
    }


    var i, x0, y0, xscale, yscale, xp, yp;

    x0 = axes.x0;//260.5
    y0 = axes.y0;//175.5
    xscale = axes.xscale;//260000
    yscale = axes.yscale;//87.5

    ctx.beginPath();
    ctx.lineWidth = 1.5;
   ctx.strokeStyle = "#ff6600";
    var p = y0 - parseInt(posy2) * yscale;
    for (i = 0; i < 25; i++) {
        // translate actual x,y to plot xp,yp
        xp = x0 + x[i] * xscale ;
        yp1 = y0 - parseFloat(y1[i]) * yscale + p - 175;
     
        // draw ine to next point
        if (i == 0)
            ctx.moveTo(xp, yp1);
        else
            ctx.lineTo(xp, yp1);
         
    }
     for (i = 25; i < 50; i++) {
        // translate actual x,y to plot xp,yp
        xp = x0 + x[i] * xscale ;
        yp2 = y0 - parseFloat(y2[i]) * yscale + p - 175;
     
        // draw ine to next point
        if (i == 0)
            ctx.moveTo(xp, yp2);
        else
            ctx.lineTo(xp, yp2);
         
    }
    for (i = 50; i < 75; i++) {
        // translate actual x,y to plot xp,yp
        xp = x0 + x[i] * xscale ;
        yp3 = y0 - parseFloat(y3[i]) * yscale + p - 175;
     
        // draw ine to next point
        if (i == 0)
            ctx.moveTo(xp, yp3);
        else
            ctx.lineTo(xp, yp3);
         
    }
    for (i = 75; i < axes.N; i++) {
        // translate actual x,y to plot xp,yp
        xp = x0 + x[i] * xscale ;
        yp4 = y0 - parseFloat(y4[i]) * yscale + p - 175;
     
        // draw ine to next point
        if (i == 0)
            ctx.moveTo(xp, yp4);
        else
            ctx.lineTo(xp, yp4);
         
    }
    
  
    ctx.stroke();

}

