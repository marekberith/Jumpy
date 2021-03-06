let int;                //pozn. nastaviť vstupné pole na window size, pretvoriť do funkcií v onload
class Game {
    constructor(canvas) {
        this.jumpy = new Jumpy();
        this.bck = new Background();
        this.way = new Way();
        this.component = new Component();
        this.obstacle = new Obstacle();
        this.instruction = new Instruction();
        this.gameAudio = new Audio('sound/Jumpy_main.mp3');
        this.gameOverAudio = new Audio('sound/game_over.mp3');
        this.gameMiss = new Audio('sound/miss.mp3');
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.canvas.width = 1104;		//changed from 960x540px
        this.canvas.height = 621;
        this.canvas.style.marginLeft = (window.innerWidth - canvas.width) / 2 + 'px';
        this.mrgLeft = (window.innerWidth - canvas.width) / 2;
        this.gameOverScreen = new Image(this.canvas.width, this.canvas.height);
        this.gameOverScreen.src = 'graphics/gameover.jpg';
        this.pauseButton = new Image();
        this.pauseButton.src = 'graphics/pause.png';
        this.playButton = new Image();
        this.playButton.src = 'graphics/play.png';
        this.mask = new Image();
        this.mask.src = 'graphics/mask.png';
        this.way.setWays();
        this.component.generateClouds();
        this.score = 0;
        this.numberOfLifes = 3;
        this.endofgameState = 1;
        this.gamePaused = 0;
    }

    execute()
    {
        i = 0;
        menu.gameAudio.pause();
        assets.enterName.style.display = "none";
        assets.enterName.removeAttribute('onclick');
        this.setVariables();
        this.setDifficulty(menu.difficulty);
        if(menu.voiceEnabled === true)
        {
            setTimeout(
                function(){
                    game.gameAudio.play();
                },
                60);
        }
        int = setInterval(() => this.start(), 1000/65);
    }

    start() {
        game.gamePaused = 0;
        this.endofgameState = 0;
        if(this.checkGameOver() === 1)
        {
            clearInterval(int);
            setTimeout(() => game.endofGame(), 50);
        }
        if(this.way.potionActive === true)
            this.infected();
        this.draw();
        this.way.increaseSpeed();
        if(this.gameAudio.onended)
            this.loopSound();
    }

    restart()
    {
        game.gamePaused = 0;
        this.setVariables();
        this.setDifficulty(menu.difficulty);
        assets.playAgain.style.display = "none";
        assets.backtoMenu.style.display = "none";
        assets.playAgain.removeAttribute('onclick');
        assets.backtoMenu.removeAttribute('onclick');
        if(menu.voiceEnabled === true)
            this.gameOverAudio.pause();
        this.gameOverAudio.currentTime = 0;
        this.gameAudio.currentTime = 0;
        if(menu.voiceEnabled === true)
            this.gameAudio.play();
        int = setInterval(() => this.start(), 1000/65);
    }

    pause()
    {
        clearInterval(int);
        this.gamePaused = 1;
        this.ctx.drawImage(this.mask, 0, 0, 1104, 621);
        this.ctx.drawImage(this.playButton, 995, 10, 120, 60);
    }

    loopSound()
    {
        game.gameAudio.play();
    }

    setVariables()      //this function starts only when restarting game !
    {
        this.jumpy.posx = 100;
        this.jumpy.posy = 150;
        this.jumpy.onloadposy = 150;
        this.jumpy.movement = 100;
        this.jumpy.velUp = 26;
        this.jumpy.velDown = 0;
        this.jumpy.distance100 = 0;
        this.jumpy.jump = true;
        this.jumpy.lookSet = 0;
        this.jumpy.lookSetSpeed = 10;
        this.jumpy.resistance = false;
        this.bck.lookSet = 0;
        this.way.speed = 13;
        this.way.potionSpeed = 0;
        this.way.potionSet = false;
        this.way.onloadSpeed = 13;
        this.way.potionActive = false;
        this.way.depression = false;
        this.way.endofgameState = 0;
        this.obstacle.molotovposx = canvas.width;
        this.obstacle.molotovposy = 440;
        this.obstacle.molotovEnabled = false;
        this.obstacle.activeMolotov = false;
        this.way.elixirEnabled = false;
        for(let j = 0; j < 7; j++)
        {
            for(let k = 0; k < 5; k++)
            {
                this.way.actualWay[j][k] = undefined;
            }
        }
        for(let j = 0; j < 4; j++)
        {
            for(let k = 0; k < 4; k++)
            {
                this.component.component_arr[j][k] = undefined;
            }
        }
        this.instruction.motivationSet = false;
        i = 0;
        this.way.setWays();
        this.component.generateClouds();
        this.score = 0;
        this.numberOfLifes = 3;
        this.gameAudio.currentTime = 0;
    }

    setDifficulty(difficulty)
    {
        if(difficulty === 1)
            this.way.speed = 13;
        else if(difficulty === 2)
        {
            this.way.speed = 14;
            this.way.elixirEnabled = true;
        }
        else if(difficulty === 3)
        {
            this.way.speed = 15;
            this.way.elixirEnabled = true;
            this.obstacle.molotovEnabled = true;
        }
    }

    checkGameOver()
    {
        let isDepression = 0;
        let isObstacle = 0;
        if(i % 1 !== 0.5) {
            for (let j = 0; j < 7; j++)
            {
                if (this.jumpy.resistance === false && this.way.actualWay[j][0] === 2 && Math.floor(this.way.actualWay[j][1]) < 100 &&
                    Math.floor(this.way.actualWay[j][1]) > 60 && (this.jumpy.posy + this.jumpy.movement - 100 === this.jumpy.onloadposy) &&
                    this.way.depression === false)
                {
                    isDepression = 1;
                    this.way.depression = true;
                    this.numberOfLifes--;
                    if (this.numberOfLifes === 0)
                    {
                        this.gameAudio.pause();
                        return 1;
                    }
                    if(menu.voiceEnabled === true)
                        this.gameMiss.play();
                    break;
                }
                if( this.jumpy.resistance === false && this.way.actualWay[j][3] >= 0 && this.way.actualWay[j][3] <= 4 &&   //ak je prekazka
                    (Math.floor(this.way.actualWay[j][1]) < 100 && Math.floor(this.way.actualWay[j][1]) > 60) && //a zaroven je na x-pozicii Jumpyho
                    this.jumpy.posy + this.jumpy.movement > this.jumpy.posy + 100 - 68 && this.way.obstcl === false)//a zaroven Jumpy vyssie ako prekazka
                {
                    isObstacle = 1;
                    this.way.obstcl = true;
                    this.numberOfLifes--;
                    if(this.numberOfLifes === 0)
                    {
                        if(menu.voiceEnabled === true)
                            this.gameAudio.pause();
                        return 1;
                    }
                    if(menu.voiceEnabled === true)
                        this.gameMiss.play();
                    break;
                }
                if( this.jumpy.resistance === false && this.obstacle.activeMolotov === true && this.obstacle.molotovposx > 101 && this.obstacle.molotovposx <= 135 &&
                    (this.jumpy.posy + this.jumpy.movement) > 225)
                {
                    if(menu.voiceEnabled === true)
                        this.gameAudio.pause();
                    this.numberOfLifes = 0;
                    return 1;
                }
            }
            if (isDepression === 0 && this.way.depression === true)
                this.way.depression = false;
            if (isObstacle === 0 && this.way.obstcl === true)
                this.way.obstcl = false;
        }
    }

    endofGame()
    {
        this.endofgameState = 1;
        this.score = i;
        if(menu.voiceEnabled === true)
        {
            this.gameOverAudio.currentTime = 0;
            this.gameOverAudio.play();
        }
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.ctx.drawImage(this.gameOverScreen, 0, 0, canvas.width, canvas.height);
        this.ctx.beginPath();
        this.ctx.font = "33px Arial";
        this.ctx.fillStyle = "#7b8586";
        this.ctx.fontWeight = "bold";
        this.ctx.fillText(`${this.score}`, canvas.width / 2 + 70, canvas.height / 2 + 143);
        this.ctx.closePath();
        this.position = chart.addPlayer(this.score, assets.playerName);
        chart.printPosition(this.position);
        assets.activategameoverButtons();
    }

    infected()
    {
        this.way.potionActive = false;
        if(this.way.potionType === 0)
            this.way.potionSpeed = this.way.speed * 0.25;
        else if(this.way.potionType === 1)
            this.way.potionSpeed = -(this.way.speed * 0.25);
        else if(this.way.potionType === 2)
            this.jumpy.resistance = true;
        setTimeout(() => this.disableInfection(), 3000);
    }

    disableInfection(){
        this.way.potionSpeed = 0;
        this.jumpy.resistance = false;
        this.way.potionSet = false;
    }

    draw() {
        this.drawBackground();      //mení pozadie a vykresľuje ho
        this.drawWay();             //vykresľuje cestičku, pridáva nové cestičky, jedy, prekážky
        this.drawClouds();          //vykresľuje oblaky, generuje nové, pohyb oblakov
        this.drawJumpy();           //kontroluje výskok, zmenu Jumpyho, vykresľuje Jumpyho
        this.drawPanel();           //vykresľuje spodný panel
        this.writeMotivation();
        this.drawPause();
    }

    drawPanel() {
        if(i % 10 === 0)
            this.score = i;
        this.ctx.drawImage(this.component.component_arr[3], 0, 621 - 30);
        for(let j = 0; j < this.numberOfLifes; j++)
            this.ctx.drawImage(this.component.component_arr[4], 100 + (j*24), 621 - 27, 24, 24);
        if(this.way.potionSet === true)
        {
            this.instruction.motivationSet = false;
            this.ctx.beginPath();
            this.ctx.font = "20px Arial";
            this.ctx.fillStyle = "#ffffff";
            if(this.way.potionType === 0)
            {
                this.ctx.font = "20px Arial";
                this.ctx.fillText(`Si nakazený ! 3 sekundy bežíš rýchlejšie`, this.canvas.width / 2 - 200, this.canvas.height - 5);
            }
            else if(this.way.potionType === 1)
            {
                this.ctx.font = "15px Arial";
                this.ctx.fillText(`Objavil si superschopnosť Jumpyho ! 3 sekundy bežíš pomalšie`, this.canvas.width / 2 - 266, this.canvas.height - 5);
            }
            else if(this.way.potionType === 2)
            {
                this.ctx.font = "20px Arial";
                this.ctx.fillText(`Aký silák ! 3 sekundy si nezničiteľný`, this.canvas.width / 2 - 230, this.canvas.height - 5);
            }
            this.ctx.closePath();
        }
        this.ctx.beginPath();
        this.ctx.font = "25px Arial";
        this.ctx.fillStyle = "#ffffff";
        this.ctx.fillText(`${this.score} metrov`, 900, this.canvas.height - 5);
        this.ctx.closePath();
    }

    drawPause()
    {
        this.ctx.drawImage(this.pauseButton, 995, 10, 120, 60);
    }

    drawBackground() {
        this.bck.backgroundSwitch();
        this.ctx.drawImage(this.bck.background_layer[this.bck.lookSet], 0, 0, 1104, 621);	//background
    }
    drawWay()
    {
        for (let j = 0; j < 7; j++)
        {
            this.ctx.drawImage(this.way.way_arr[this.way.actualWay[j][0]], this.way.actualWay[j][1], this.way.actualWay[j][2], 192, 132);      //vykreslovanie cesty
            if(this.way.actualWay[j][3] >= 0 && this.way.actualWay[j][3] <= 7)                      //vykreslovanie prekazok
            {
                if(this.way.actualWay[j][3] >= 5 && this.way.actualWay[j][3] <= 7)
                    this.ctx.drawImage(this.obstacle.obstacle_arr[this.way.actualWay[j][3]], this.way.actualWay[j][1], this.way.actualWay[j][2] - 53, 48, 48);
                else
                    this.ctx.drawImage(this.obstacle.obstacle_arr[this.way.actualWay[j][3]], this.way.actualWay[j][1], this.way.actualWay[j][2] - 53, 90, 68);
            }
        }
        if(this.way.actualWay[6][1] < -192)
            this.way.checkWays(Math.floor(Math.random() *(2 + 1)), this.component.potionPosX, this.component.potionActive);
        this.way.moveWays();
        if(this.way.elixirEnabled === true)
            this.way.checkPotion(this.jumpy.posx, this.jumpy.movement);
        if(this.obstacle.molotovEnabled === true)
        {
            this.obstacle.generateMolotov();
            if (this.obstacle.activeMolotov === true)
            {
                this.ctx.drawImage(this.obstacle.obstacle_arr[8], this.obstacle.molotovposx, 440, 50, 50);
            }
        }
    }

    drawJumpy()
    {
        this.jumpy.checkJump();
        this.jumpy.jumpySwitch();
        if(this.jumpy.jump === true)
            this.ctx.drawImage(this.jumpy.look[2], this.jumpy.posx, this.jumpy.posy + this.jumpy.movement, 171, 241);
        else
            this.ctx.drawImage(this.jumpy.look[this.jumpy.lookSet], this.jumpy.posx, this.jumpy.posy + this.jumpy.movement, 171, 241);
    }

    drawClouds()
    {
        for(let j = 0; j < 4; j++)
            this.ctx.drawImage(this.component.component_arr[this.component.actualComponents[j][0]], this.component.actualComponents[j][1], this.component.actualComponents[j][2], 120, 120);
        this.component.generateClouds();
        this.component.moveClouds();
    }

    writeMotivation()
    {
        if (this.way.potionSet === false) {
            if (i % 200 === 0) {
                this.instruction.motivationSet = true;
                this.instruction.activeMotivation = Math.floor(Math.random() * (8));
            }
            if (this.instruction.motivationSet === true) {
                this.ctx.beginPath();
                this.ctx.font = "20px Arial";
                this.ctx.fillStyle = "#ffffff";
                this.ctx.fillText(`${this.instruction.instruction_arr[this.instruction.activeMotivation]}`, this.canvas.width / 2 - 220, this.canvas.height - 5);
                this.ctx.closePath();
            }
        }
    }

}