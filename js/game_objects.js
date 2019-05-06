let i = 0;

class Jumpy {
	constructor() {
		this.posx = 100;
		this.posy = 150;
		this.onloadposy = 150;
		this.movement = 100;
		this.velUp = 26;
		this.velDown = 0;
		this.distance100 = 0;
		this.jump = true;
		this.look = [new Image(), new Image(), new Image()];
		this.look[0].src = 'graphics/Jumpy_rightlegforwards_a.png';
		this.look[1].src = 'graphics/Jumpy_leftlegforwards_a.png';
		this.look[2].src = 'graphics/Jumpy_jumping_r_a.png';
		this.lookSet = 0;
		this.lookSetSpeed = 10;
		this.resistance = false;
	}
	checkJump()
	{
		if(i % 100 === 0 && i !== 0)
			this.distance100 += 0.3;
		//console.log(this.velUp);
		if(this.jump === true)
		{
			if(this.movement + this.posy > 10)
			{
				this.movement -= this.velUp;
				this.velUp *= 0.9;
			}
			else if(this.movement + this.posy <= 10)
			{
				this.velDown = (250 - (this.movement + this.posy))/20;
				this.movement += 20*(this.velDown);
				this.jump = false;
			}
		}
		else if(this.jump === false)
		{
			if(this.movement + this.posy < this.onloadposy - 2)
			{
				this.movement += 20*(this.velDown);
			}
			else if(this.movement + this.posy >= this.onloadposy - 2)
			{
				this.movement = 100;
				this.velUp = 26 + this.distance100;
			}

		}
	}
	jumpySwitch()
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
		this.background_layer[1].src = 'graphics/basic_layer_dark.png';
		this.lookSet = 0;
	}
	backgroundSwitch()
	{
		if(i % 600 === 0 && i !== 0)
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
		this.speed = 14;
		this.potionSpeed = 0;
		this.potionSet = false;
		this.onloadSpeed = 14;
		this.potionActive = false;
		this.potionType = 0;
		this.depression = false;
		this.obstcl = false;
		this.elixirEnabled = false;
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
			this.actualWay[j][1] -= (this.speed + this.potionSpeed);
	}
	checkWays(number)
	{
		//mark++;
		this.actualWay.pop();
		this.actualWay.splice(0,0, new Array(3));
		if(number === 2 && this.actualWay[1][0] === number)
			number = Math.round(Math.random());
		if(this.actualWay[1][3] !== undefined)
			number = Math.round(Math.random());
		this.actualWay[0][0] = number;
		this.actualWay[0][1] = this.actualWay[1][1] + 192;
		this.actualWay[0][2] = canvas.height - 132;
		//console.log(this.actualWay[0][2]);
		if(this.elixirEnabled === true)
		{
			if(this.actualWay[0][0] !== 2 && this.actualWay[1][3] === undefined && this.actualWay[2][3] === undefined)
			{
				if(Math.round(Math.random()) === 1)
					if(	this.actualWay[1][3] === undefined 										//prekazka nesmie nasledovat
						&& (this.actualWay[1][0] !== 2 && this.actualWay[2][3] === undefined)	//nesmie nasledovat priepast a prekazka
						&& (this.actualWay[2][0] !== 2))
						if(this.potionSet === false)
							this.actualWay[0][3] = Math.floor(Math.random() * (8));
						else
							this.actualWay[0][3] = Math.floor(Math.random() * (5));
			}
		}
	}
	checkPotion(posy, movement)
	{
		if(this.potionSet === false)
		{
			for(let j = 0; j < 7; j++)
			{
				if (this.actualWay[j][3] >= 5 && this.actualWay[j][3] <= 7) {
					if (this.actualWay[j][1] > 88 &&	//kontrola pozicie x
						this.actualWay[j][1] < 112 &&
						(posy + movement > posy + 100 - 48))	//kontrola pozicie y
					{
						this.potionActive = true;
						this.potionSet = true;
						if(this.actualWay[j][3] === 5)
							this.potionType = 0;
						else if(this.actualWay[j][3] === 6)
							this.potionType = 1;
						else if(this.actualWay[j][3] === 7)
							this.potionType = 2;
						//console.log('hit');
					}
				}
			}
		}
	}
	increaseSpeed()
	{
		i+= 0.5;
		if(i % 200 === 0)
		{
			this.speed += this.onloadSpeed * 0.05;
		}
	}
}

class Obstacle
{
	constructor() {
		this.obstacle_arr = [new Image(), new Image(), new Image(), new Image(), new Image(), new Image(), new Image(), new Image(), new Image()];
		this.obstacle_arr[0].src = 'graphics/kamen.png';
		this.obstacle_arr[1].src = 'graphics/kamen2.png';
		this.obstacle_arr[2].src = 'graphics/kamen_sneh.png';
		this.obstacle_arr[3].src = 'graphics/kamen_sneh2.png';
		this.obstacle_arr[4].src = 'graphics/obstacle.png';
		this.obstacle_arr[5].src = 'graphics/potion.png';
		this.obstacle_arr[6].src = 'graphics/timesaver.png';
		this.obstacle_arr[7].src = 'graphics/unbeatable.png';
		this.obstacle_arr[8].src = 'graphics/fire.png';
		this.molotovposx = canvas.width;
		this.molotovposy = 440;
		this.molotovEnabled = false;
		this.activeMolotov = false;
		this.activemolotovSound = new Audio('sound/molotovsound.mp3');
	}
	generateMolotov()
	{
		if(this.activeMolotov === false && i % 200 === 0 && i !== 0)
		{
			if(menu.voiceEnabled === true)
				this.activemolotovSound.play();
			this.activeMolotov = true;
			this.molotovposx = game.canvas.width;
			this.molotovposy = 440;
		}
		if(this.activeMolotov === true)
		{
			this.molotovposx -= 25;
			if(this.molotovposx < 0)
				this.activeMolotov = false;
		}
	}
}

class Component
{
	constructor() {
		this.component_arr = [new Image(), new Image(), new Image(), new Image(), new Image()];
		this.component_arr[0].src = 'graphics/cloud.png';
		this.component_arr[1].src = 'graphics/cloud2.png';
		this.component_arr[2].src = 'graphics/cloud3.png';
		this.component_arr[3].src = 'graphics/panel.png';
		this.component_arr[4].src = 'graphics/lifeicon.png';
		this.actualComponents = [[],[]];
		for(let j = 0; j < 4; j++)
			this.actualComponents[j] = new Array(4);
	}
	moveClouds()
	{
		//console.log('OBLAK JE NA POZICII ' + this.actualComponents[0][1]);
		for(let j = 0; j < 2; j++)
		 	this.actualComponents[j][1] -= this.actualComponents[j][3];
		for(let j = 2; j < 4; j++)
			this.actualComponents[j][1] += this.actualComponents[j][3];
	}
	generateClouds()
	{
		if(this.actualComponents[0][1] === undefined || this.actualComponents[0][1] < -128)
		{
			this.actualComponents[0][0] = Math.floor(Math.random() * (3));
			this.actualComponents[0][1] = canvas.width;											//pos x;
			this.actualComponents[0][2] = Math.floor(Math.random() * (100));		//pos y;
			this.actualComponents[0][3] = Math.random();
		}
		if(this.actualComponents[1][1] === undefined || this.actualComponents[1][1] < -128)
		{
			this.actualComponents[1][0] = Math.floor(Math.random() * (3));
			this.actualComponents[1][1] = canvas.width;											//pos x;
			this.actualComponents[1][2] = Math.floor(Math.random() * (50));		//pos y;
			this.actualComponents[1][3] = Math.random();
		}
		if(this.actualComponents[2][1] === undefined || this.actualComponents[2][1] > 128 + canvas.width)
		{
			this.actualComponents[2][0] = Math.floor(Math.random() * (3));
			this.actualComponents[2][1] = 0;											//pos x;
			this.actualComponents[2][2] = Math.floor(Math.random() * (50));		//pos y;
			this.actualComponents[2][3] = Math.random();
		}
		if(this.actualComponents[3][1] === undefined || this.actualComponents[3][1] > 128 + canvas.width)
		{
			this.actualComponents[3][0] = Math.floor(Math.random() * (3));
			this.actualComponents[3][1] = 0;											//pos x;
			this.actualComponents[3][2] = Math.floor(Math.random() * (50));		//pos y;
			this.actualComponents[3][3] = Math.random();
		}
	}
}

class Instruction
{
	constructor()
	{
		this.motivationSet = false;
		this.instruction_arr = [];
		this.instruction_arr[0] = "Si príliš pomalý, pridaj trochu !";
		this.instruction_arr[1] = "Aký si lenivec, skáč poriadne !";
		this.instruction_arr[2] = "Bež tak, aby si sa nezranil !";
		this.instruction_arr[3] = "Zase budeš posledný !";
		this.instruction_arr[4] = "Keď sa neotráviš, daľej zabežíš !";
		this.instruction_arr[5] = "Keď nevládzeš, vypi modrú fľaštičku !";
		this.instruction_arr[6] = "Červený elixír ti dodá neporaziteľnosť !";
		this.instruction_arr[7] = "Takýmto behom zbytočne strácaš čas !";
	}
}