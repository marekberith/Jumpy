let i = 0;

class Jumpy {
	constructor(posx, posy) {
		this.posx = 100;
		this.posy = canvas.height + 100;
		this.onloadposy = canvas.height + 100;
		this.movement = 0;
		this.jump = false;
		this.look = [new Image(), new Image(), new Image()];
		this.look[0].src = 'graphics/Jumpy_rightlegforwards_a.png';
		this.look[1].src = 'graphics/Jumpy_leftlegforwards_a.png';
		this.look[2].src = 'graphics/Jumpy_jumping_r_a.png';
		this.lookSet = 0;
		this.lookSetSpeed = 10;
	}
	checkJump()
	{
		if(this.jump === true)
		{
			if(this.movement + this.posy > 100)
				this.movement -= 15;
			else if(this.movement + this.posy <= 100)
			{
				this.movement += 15;
				this.jump = false;
			}
		}
		else if(this.jump === false)
		{
			if(this.movement + this.posy < this.onloadposy)
				this.movement += 15;
		}
	}
	switchJumpy()
	{
		if(i % this.lookSetSpeed === 0)
		{
			if (this.lookSet === 0)
				this.lookSet = 1;
			else
				this.lookSet = 0;
		}
	}
}

class Background
{
	constructor(){
		this.background_layer = [new Image(), new Image()];
		this.background_layer[0].src = 'graphics/basic_layer_lgh.png';
		this.background_layer[1].src = 'graphics/basic_layer_dark_a.png';
		this.lookSet = 0;
	}
	backgroundSwitch()
	{
		if(i % 600 === 0 && i != 0)
		{
			if (this.lookSet === 0)
				this.lookSet = 1;
			else if(this.lookSet === 1)
				this.lookSet = 0;
		}
	}
}

class Way
{
	constructor()
	{
		this.way_arr = [new Image(), new Image(), new Image()];
		this.way_arr[0].src = 'graphics/basicstone.jpg';
		this.way_arr[1].src = 'graphics/ground.jpg';
		this.way_arr[2].src = 'graphics/emptyobject.png';
		this.actualWay = new Array(6);
		this.speed = 15;
		this.onloadSpeed = 15;
		for(let j = 0; j < 7; j++)
			this.actualWay[j] = new Array(4);
	}
	setWays()
	{
		if(this.actualWay[0][0] === undefined) {
			let k = 1;
			for (let j = 0; j < 7; j++) {
				this.actualWay[j][0] = Math.round(Math.random());
				this.actualWay[j][1] = (6 - k) * 192;
				this.actualWay[j][2] = canvas.height - 132;
				k++;
			}
		}
	}
	moveWays()
	{
		for(let j = 0; j < 7; j++)
			this.actualWay[j][1] -= this.speed;
	}
	checkWays(number)
	{
		this.actualWay.pop();
		this.actualWay.splice(0,0, new Array(3));
		if((number === 2 && this.actualWay[1][0] === number))
			number = Math.round(Math.random());
		this.actualWay[0][0] = number;
		this.actualWay[0][1] = this.actualWay[1][1] + 192;
		this.actualWay[0][2] = canvas.height - 132;
		if(this.actualWay[0][0] !== 2)
		{
			if(Math.round(Math.random()) === 1)
				this.actualWay[0][3] = Math.floor(Math.random() * (4));
		}
	}
	increaseSpeed()
	{
		i+= 0.5;
		if(i % 200 === 0)
		{
			this.speed += this.onloadSpeed * 0.1;
		}
	}
}

class Obstacle
{
	constructor() {
		this.obstacle_arr = [new Image(), new Image(), new Image(), new Image()];
		this.obstacle_arr[0].src = 'graphics/kamen.png';
		this.obstacle_arr[1].src = 'graphics/kamen2.png';
		this.obstacle_arr[2].src = 'graphics/kamen_sneh.png';
		this.obstacle_arr[3].src = 'graphics/kamen_sneh2.png';
		this.actualObstacles = new Array(3);
		for(let j = 0; j < 4; j++)
			this.actualObstacles[j] = new Array(3);
	}
}

/*class Components
{
	constructor() {
		this.component_arr = [new Image()]
		this.component_arr[0].src = 'graphics/cloud.jpg';
	}
	drawComponents()
	{

	}

}*/