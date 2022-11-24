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
       drawtri();
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

//----------------------------------------code for drawing trianle output--------------------------------------------------//
function drawtri() {
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
   triwv();
     
  
}

function triwv() {

    vp = document.getElementById("amp-knob-fng").value;
    frqfng = document.getElementById("fq-knob-fng").value;
    phsl = document.getElementById("positionx").value;
    posy2 = document.getElementById("positiony2").value;
	tmaxs= document.getElementById("fq-knob").value *10*Math.pow(10,-3);// in msec  0.001; //in sec
var c=document.getElementById("capacitor").value;
var r=document.getElementById("resistor").value;

 var  r=document.getElementById("restr").value*Math.pow(10,3);
  var c= document.getElementById("captr").value*Math.pow(10,-6);
   var scalefactor= parseInt(r)*parseFloat(c);//-(1/r*c);
//---------------------------------------------------------trianle  wave-------------------------------------------------------------------------------//

    var x = new Array(), y = new Array();  // x,y plotting variables
    var dt, tstart, tstop;             // time variables
    var x2 = new Array(), y1 = new Array(), y2 = new Array();
    var i;
    flag = 2;
    // define plot paramaters
    tstart = 0;//-tmaxs; //in sec
    tstop = tmaxs;
    dt = (tstop - tstart) / (101 - 1);// time increment over N points

    // create function 
   
for (i = 0; i < axes.N; i++) {
        x[i] = (tstart + i * dt).toPrecision(6);
        var p = 2 * 3.1415 * frqfng * x[i] + (phsl+270) * 3.1415 / 180;
        var z = Math.sin(p);
        y1[i] = -(parseFloat(vp/2) * Math.asin( z)); //-Math.sign(Vp *Math.sin(2 * 3.1415 * fo * x[i] + phase * 3.1415 / 180));
		y[i] = (Math.pow(10,-3)/scalefactor)*(parseFloat(y1[i])); //- parseFloat(y2[i + 101]));
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
    for (i = 0; i < axes.N; i++) {

        // translate actual x,y to plot xp,yp
        xp = x0 + x[i] * xscale;
        yp = y0 - y[i] * yscale + p - 175;

        // draw line to next point
        if (i == 0)
            ctx.moveTo(xp, yp);
        else
            ctx.lineTo(xp, yp);
    }
  
    ctx.stroke();

}

