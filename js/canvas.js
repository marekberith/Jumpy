let keySet = 0;
let i = 0;

class Jumpy {
	constructor(posx, posy) {
		this.posx = 100;
		this.posy = canvas.height + 98;
		this.look = [new Image(), new Image(), new Image()];
		this.look[0].src = 'graphics/Jumpy_rightlegforwards_a.png';
		this.look[1].src = 'graphics/Jumpy_leftlegforwards_a.png';
		this.look[2].src = 'graphics/Jumpy_jumping_r_a.png';
	}
}

class Background
{
	constructor(){
		this.background_layer = [new Image(), new Image()];
		this.background_layer[0].src = 'graphics/basic_layer_lgh.png';
		this.background_layer[1].src = 'graphics/basic_layer_drk.png';
	}

}

class Way
{
	constructor()
	{
		this.way_arr = [new Image(), new Image()];
		this.way_arr[0].src = 'graphics/basicstone.jpg';
		this.way_arr[1].src = 'graphics/ground_grass_s.png';
		this.actualWay = new Array(6);
		this.speed = 2;
		for(let j = 0; j < 7; j++)
			this.actualWay[j] = new Array(3);
	}
	setWays(number)
	{
		//this.way_arr[number].posx = i * 192;
		//this.way_arr[number].posy = canvas.height - 132;
		if(this.actualWay[0][0] === undefined) {
			let k = 1;
			for (let j = 0; j < 7; j++) {
				this.actualWay[j][0] = number;
				this.actualWay[j][1] = (6 - k) * 192;
				this.actualWay[j][2] = canvas.height - 132;
				k++;
			}
		}
	}
	moveWays()
	{
		//console.log(this.actualWay[5][1]);
		for(let j = 0; j < 7; j++)
		{
			this.actualWay[j][1] -= this.speed;
		}
	}
	checkWays(number)
	{
		if(this.actualWay[6][1] < -192) {
			this.actualWay.pop();
			console.log(this.actualWay.length);
			this.actualWay.splice(0,0, new Array(3));
			console.log(this.actualWay.length);
			this.actualWay[0][0] = number;
			this.actualWay[0][1] = this.actualWay[1][1] + 192;
			this.actualWay[0][2] = canvas.height - 132;
		}
	}
}

class Game{
	constructor(canvas) {
		this.jumpy = new Jumpy();
		this.bck = new Background();
		this.way = new Way();
		this.canvas = canvas;
		this.ctx = canvas.getContext('2d');
		this.canvas.width = 1104;		//changed from 960x540px
		this.canvas.height = 621;
		var x = canvas.style.marginLeft = (window.innerWidth - canvas.width) / 2 + 'px';
		this.number = this.returnNumber();
		this.way.setWays(this.number);
	}
	start()
	{
		this.draw();
		requestAnimationFrame(this.start.bind(this));
		//console.log(keySet);
	}
	draw()
	{
		this.drawBackground();				//vykreslujem cesticku a pozadie --> v tejto funkcii je problem, nestihne sa nacitat obrazok cesticky
		this.drawJumpy();					//vykreslujem Jumpyho
		this.way.checkWays(this.returnNumber());
		this.way.moveWays();
		i++;
		this.way.speed *= 1.001;
	}
	drawBackground(number)
	{
		this.ctx.drawImage(this.bck.background_layer[0], 0, 0, 1104, 621);	//background
		for(let j = 0; j < 7; j++)
		{
			//console.log(this.way.actualWay[j][1], this.way.actualWay[j][2]);
			this.ctx.drawImage(this.way.way_arr[this.way.actualWay[j][0]], this.way.actualWay[j][1], this.way.actualWay[j][2], 192, 132);
		}
	}
	drawJumpy()
	{
		this.ctx.drawImage(this.jumpy.look[0], this.jumpy.posx, this.jumpy.posy, 171, 241);	//jumpy
	}
	returnNumber()
	{
		return Math.round(Math.random());
	}

	/*jumpyUp(event)
	{
		let key = event.keyCode;
		if( key === 32 )
		{
			console.log('Space');
			keySet = 1;
			this.jumpy += 20;
			//clearInterval(this.running_on);
		}
		console.log(key);
	}*/
}
	checkKeyPress = window.addEventListener("keydown",function(){
		let key = event.keyCode;
		if( key === 32 )
		{
			console.log('Space');
			keySet = 1;
			console.log(this.jumpy.posy);
			this.jumpy.posy += 20;
			clearInterval(this.running_on);
		}
		console.log(key);
	})
/*function getKeyPress(event)
{
	this.keySet = event.key;
	if (this.keySet == 32)
		this.keyPressed = 1;
}*/

window.onload = function()						//tu si nacitavam canvas, spustam funkciu game.start
{
	canvas = document.getElementById('theCanvas');
	var game = new Game(canvas);
	running_on = setTimeout(					//kebyze nespustim game.start cez setTimeout, nestihne sa nacitat Game
		function(){
					game.start();
		},
		60);
}
