function $(s){
	return document.querySelectorAll(s);
}

var types=$("#type li");
var lis=$("#list li");
var size=64;
var box=$("#box")[0];
var height,width;
var canvas=document.createElement("canvas");
var ctx=canvas.getContext("2d");
box.appendChild(canvas);
var Dots=[];
var line;

var mv=new MusicVisualizer({
	size:size,
	visualizer:draw
});
for(var i=0;i<lis.length;i++){
	lis[i].onclick=function(){
		for(var j=0;j<lis.length;j++){
			lis[j].className='';
		}
		this.className='selected';
		// load('/media/'+this.title);
		mv.play('/media/'+this.title);

	}
}


function random(m,n){
	return Math.round(Math.random()*(n-m)+m);
}

function getDots(){
	Dots=[]
	for(var i=0;i<size;i++){
		var x=random(0,width);
		var y=random(0,height);
		var color="rgba("+random(0,255)+","+random(0,255)+","+random(0,255)+",0.5)";
		Dots.push({
			x:x,
			y:y,
			dx:random(1,4),
			color:color,
			cap:0
		});
	}
}

function resize(){
	height=box.clientHeight;
	width=box.clientWidth;
	canvas.height=height;
	canvas.width=width;
	line=ctx.createLinearGradient(0,0,0,height);
	line.addColorStop(0,"red");
	line.addColorStop(0.5,"orange");
	line.addColorStop(1,"green");
	getDots();
}
resize();

window.onresize=resize;

function draw(arr){
	ctx.clearRect(0,0,width,height);
	var w=width/size;
	var cw=w*0.6;
	var caph=cw;
	ctx.fillStyle=line;
	for(var i=0;i<size;i++){
		var o=Dots[i];
		if(draw.type=="column"){
			var h=arr[i]/256*height;
			ctx.fillRect(w*i,height-h,cw,h);
			ctx.fillRect(w*i,height-(o.cap+caph) ,cw,caph);
			o.cap--;
			if(o.cap<0){
				o.cap=0;
			}
			if(h>0 && o.cap<h+40){
				o.cap=h+40 > height-caph ? height-caph : h+40;
			}
		}else if(draw.type=="dot"){
			ctx.beginPath();
			
			var r=10+arr[i]/256*(height>width? width:height)/10;
			ctx.arc(o.x,o.y,r,0,Math.PI*2,true);
			// ctx.storkeStyle="purple";
			// ctx.stroke();
			var g=ctx.createRadialGradient(o.x,o.y,0,o.x,o.y,r);
			g.addColorStop(0,"#54F7BE");
			g.addColorStop(1,o.color);
			// ctx.shadowColor="#563250";
			// ctx.shadowOffsetX=2;
			// ctx.shadowOffsetY=2;
			// ctx.shadowBlur=1; 
			ctx.fillStyle=g;
			ctx.fill();
			o.x+=o.dx;
			o.x=o.x > width ? 0:o.x;

		}
		
	}
}
draw.type="column";

for(var i=0;i<types.length;i++){
	types[i].onclick=function(){
		for(var j=0;j<types.length;j++){
			types[j].className='';
		}
		this.className='selected';
		draw.type=this.getAttribute("data-type");
	}

}

$("#volume")[0].onchange=function(){
	mv.changeVolume(this.value/this.max)
}
$("#volume")[0].onchange();