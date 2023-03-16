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
         drawtri();
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
           drawtri();
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
           drawtri();
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
           drawtri();
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
        yp = y0 -ys[i] * yscale + p - 175;

        // draw line to next point
        if (i == 0)
            ctx.moveTo(xp, yp);
        else
            ctx.lineTo(xp, yp);
    }

    ctx.stroke();
    
    //-------------------triangle wave---------------//
    
  
    var dt1, tstart1, tstop1;             // time variables
    var x2 = new Array(), y2 = new Array(), y3 = new Array();
   var j;
   
    var  r=document.getElementById("restr").value*Math.pow(10,3);
	var c= document.getElementById("captr").value*Math.pow(10,-6);
    var scalefactor= parseInt(r)*parseFloat(c);//-(1/r*c);
	
    // define plot paramaters
    tstart1 = 0;//-tmaxs; //in sec
    tstop1 = tmaxs;
    dt1 = (tstop1 - tstart1) / (101 - 1);// time increment over N points

    // create function 
   
for (j = 0; j < axes.N; j++) {
        x2[j] = (tstart + j * dt).toPrecision(6);
        var p = 2 * 3.1415 * frqfng * x2[j] + (phsl+270) * 3.1415 / 180;
        var z = Math.sin(p);
        y2[j] = -(parseFloat(vp/2) * Math.asin( z)); //-Math.sign(Vp *Math.sin(2 * 3.1415 * fo * x[i] + phase * 3.1415 / 180));
		y3[j] = (Math.pow(10,-3)/scalefactor)*(parseFloat(y2[j])); //- parseFloat(y2[i + 101]));
    }

	
    var j, x0, y0, xscale, yscale, xp1, yp1;

    x0 = axes.x0;//260.5
    y0 = axes.y0;//175.5
    xscale = axes.xscale;//260000
    yscale = axes.yscale2;//87.5

    ctx.beginPath();
    ctx.lineWidth = 1.5;
   ctx.strokeStyle = "#ff6600";
    var p1 = y0 - parseInt(posy2) * yscale;
    for (j = 0; j < axes.N; j++) {

        // translate actual x,y to plot xp,yp
        xp1 = x0 + x2[j] * xscale;
        yp1 = y0 - (y3[j]) * yscale + p1 - 175;

        // draw line to next point
        if (j == 0)
            ctx.moveTo(xp1, yp1);
        else
            ctx.lineTo(xp1, yp1);
    }
  
    ctx.stroke();

    
}

 