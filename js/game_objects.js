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
		this.lookSetSpeed = 20;
	}
	checkJump()
	{
		if(this.jump === true)
		{
			if(this.movement + this.posy > 100)
				this.movement -= 10;
			else if(this.movement + this.posy <= 100)
			{
				this.movement += 10;
				this.jump = false;
			}
		}
		else if(this.jump === false)
		{
			if(this.movement + this.posy < this.onloadposy)
				this.movement += 10;
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
		this.background_layer[1].src = 'graphics/basic_layer_drk.png';
	}

}

class Way
{
	constructor()
	{
		this.way_arr = [new Image(), new Image()];
		this.way_arr[0].src = 'graphics/basicstone.jpg';
		this.way_arr[1].src = 'graphics/ground.jpg';
		this.actualWay = new Array(6);
		this.speed = 5;
		this.onloadSpeed = 5;
		for(let j = 0; j < 7; j++)
			this.actualWay[j] = new Array(3);
	}
	setWays(number)
	{
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
		for(let j = 0; j < 7; j++)
			this.actualWay[j][1] -= this.speed;
	}
	checkWays(number)
	{
		if(this.actualWay[6][1] < -192) {
			this.actualWay.pop();
			this.actualWay.splice(0,0, new Array(3));
			this.actualWay[0][0] = number;
			this.actualWay[0][1] = this.actualWay[1][1] + 192;
			this.actualWay[0][2] = canvas.height - 132;
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