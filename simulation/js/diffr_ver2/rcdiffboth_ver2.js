/*  Document Name:rcintgboth_ver2.js
 Created on : 21 oct, 2018
 Author     : sukriti
 */


var flag;
var vp;
var posy1, posy2;
var phsl;
var frqfng;
var axes = {};
var vmaxs;  //in volt
var tmaxs;// = (document.getElementById("fq-knob").value) * Math.pow(10, -3);// in msec  0.001; //in sec

function posiy1chnge() {
    posy1 = document.getElementById("positiony1").value;
    if (flag == 1) {
        drawsqr();
    }
    if(flag==3){
       bthdrc();
    }
    if(flag==4){
        grndrc();
    }
}

function posiy2chnge() {
    posy2 = document.getElementById("positiony2").value;
    
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

function posix2chnge() {
    phsl = document.getElementById("positionx").value;
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

//----------------------------------------code for drawing square wave and trianle output--------------------------------------------------//
function bthdrc() {
    canvas = document.getElementById("mycanvas");
    if (null == canvas || !canvas.getContext)
        return;
    ctx = canvas.getContext("2d");
    // fill canvas
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawGrid(ctx);
    drawAxis();
    sqrtribth();
  
}

function sqrtribth(){
    
      vp = document.getElementById("amp-knob-fng").value;
    frqfng = document.getElementById("fq-knob-fng").value;
    phsl = document.getElementById("positionx").value;
    posy1 = document.getElementById("positiony1").value;
   posy2 = document.getElementById("positiony2").value;
   tmaxs= document.getElementById("fq-knob").value *10*Math.pow(10,-3);// in msec  0.001; //in sec
   var c=document.getElementById("capacitor").value;
var r=document.getElementById("resistor").value;
//---------------------------------------------------------square wave-------------------------------------------------------------------------------//

    var x = new Array(), y = new Array(),ys = new Array();  // x,y plotting variables
    var dt, tstart, tstop;             // time variables
    flag = 3;
    // define plot paramaters
    tstart = 0;//-tmaxs; //in sec
    tstop = tmaxs;
    dt = (tstop - tstart) / (101 - 1);// time increment over N points

    // create function 
    for (var i = 0; i < axes.N; i++) {
        x[i] = tstart + i * dt;
        y[i] = vp * Math.sin(2 * 3.1415 * frqfng * x[i] + phsl * 3.1415 / 180);
		ys[i] = vp*Math.sign(y[i]);
    }

    var i, x0, y0, xscale, yscale, xp, yp;

    x0 = axes.x0;//260.5
    y0 = axes.y0;//175.5
    xscale = axes.xscale;//260000
    yscale = axes.yscale1;//87.5

    ctx.beginPath();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "#0059b3";
    var p = y0 - parseInt(posy1) * yscale;
    for (i = 0; i < axes.N; i++) {

        // translate actual x,y to plot xp,yp
        xp = x0 + x[i] * xscale;
        yp = y0 - ys[i] * yscale + p - 175;

        // draw line to next point
        if (i == 0)
            ctx.moveTo(xp, yp);
        else
            ctx.lineTo(xp, yp);
    }

    ctx.stroke();
    
    //-------------------spike  wave---------------//
    
  var x1 = new Array(), y1 = new Array();  // x,y plotting variables
    var dt1, tstart1, tstop1;             // time variables
    var y4 = new Array(), y2 = new Array(), y3 = new Array();
   var j;
    // define plot paramaters
    tstart1 =0;// -tmaxs; //in sec
    tstop1 = tmaxs;
    dt1 = (tstop1 - tstart1) / (101 - 1);// time increment over N points

    // create function 
   
 for (j = 0; j < 25; j++) {
        x1[j] =(tstart1 + (j) * dt1).toPrecision(6);//-0.001 to 0.00102 at i=50 x=0
      y1[j] = (vp)*Math.exp(-j);
    }
     for (j =25; j < 50; j++) {
        x1[j] =(tstart1 + (j) * dt1).toPrecision(6);//-0.001 to 0.00102 at i=50 x=0
      y2[j] = (-vp)*Math.exp(-j+25);
    }
    for (j =50; j < 75; j++) {
        x1[j] =(tstart1 + (j) * dt1).toPrecision(6);//-0.001 to 0.00102 at i=50 x=0
      y3[j] = (vp)*Math.exp(-j+50);
    }
    for (j =75; j < 101; j++) {
        x1[j] =(tstart1 + (j) * dt1).toPrecision(6);//-0.001 to 0.00102 at i=50 x=0
      y4[j] = (-vp)*Math.exp(-j+75);
    }
    var j, x0, y0, xscale, yscale;
    var xp1, yp1,xp2,yp2,xp3,yp3,xp4,yp4;

    x0 = axes.x0;//260.5
    y0 = axes.y0;//175.5
    xscale = axes.xscale;//260000
    yscale = axes.yscale2;//87.5

    ctx.beginPath();
    ctx.lineWidth = 1.5;
     ctx.strokeStyle = "#ff6600";
    var p1 = y0 - parseInt(posy2) * yscale;
    for (j = 0; j < 25; j++) {
        // translate actual x,y to plot xp,yp
        xp1 = x0 + x1[j] * xscale ;
        yp1 = y0 - parseFloat(y1[j]) * yscale + p1 - 175;
     
        // draw ine to next point
        if (j == 0)
            ctx.moveTo(xp1, yp1);
        else
            ctx.lineTo(xp1, yp1);
         
    }
     for (j = 25; j< 50; j++) {
        // translate actual x,y to plot xp,yp
        xp2 = x0 + x1[j] * xscale ;
        yp2 = y0 - parseFloat(y2[j]) * yscale + p1 - 175;
     
        // draw ine to next point
        if (j == 0)
            ctx.moveTo(xp2, yp2);
        else
            ctx.lineTo(xp2, yp2);
         
    }
    for (j = 50; j < 75; j++) {
        // translate actual x,y to plot xp,yp
        xp3 = x0 + x1[j] * xscale ;
        yp3 = y0 - parseFloat(y3[j]) * yscale + p1 - 175;
     
        // draw ine to next point
        if (j == 0)
            ctx.moveTo(xp3, yp3);
        else
            ctx.lineTo(xp3, yp3);
         
    }
    for (j = 75; j < axes.N; j++) {
        // translate actual x,y to plot xp,yp
        xp4 = x0 + x1[j] * xscale ;
        yp4 = y0 - parseFloat(y4[j]) * yscale + p1 - 175;
     
        // draw ine to next point
        if (j == 0)
            ctx.moveTo(xp4, yp4);
        else
            ctx.lineTo(xp4, yp4);
         
    }
  
    ctx.stroke();

    
}

 