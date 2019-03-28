console.log('Marek Berith is right now testing');
var date = new Date();
console.log("The date and time you've loaded the website: " + date);
var user = {
	name : 'Marek Berith',
	rights : 1,
	color : 'blue'
};
if(user.rights == 1){
	console.log(user.name + ' is the owner of this site');
}
else{
	console.log(user.name + "isn't the owner of this site");
}
var canvas = document.getElementById('theCanvas');
var ctx = canvas.getContext('2d');
canvas.width  = 960;
canvas.height = 540;
var x = canvas.style.marginLeft = (window.innerWidth - canvas.width)/2 + 'px';
ctx.fillStyle = 'rgba(255, 255, 0, 0.5';
ctx.fillRect(500, 100, 100, 100);
ctx.fillStyle = '#3ABEDB';
ctx.fillRect(380, 100, 100, 100);
//Kreslim ciaru
ctx.beginPath();
//kde chceme zacat ciaru
ctx.moveTo(50, 300);
ctx.lineTo(200, 100);
ctx.lineTo(300, 100);
ctx.strokeStyle = "blue";
ctx.stroke();
ctx.beginPath();
ctx.arc((canvas.width)/2, (canvas.height)/2, 50, 0, 2 * Math.PI);
ctx.stroke();
