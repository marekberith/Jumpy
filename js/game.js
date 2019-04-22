//let mark = 0;
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
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.canvas.width = 1104;		//changed from 960x540px
        this.canvas.height = 621;
        this.canvas.style.marginLeft = (window.innerWidth - canvas.width) / 2 + 'px';
        this.gameOverScreen = new Image(this.canvas.width, this.canvas.height);
        this.gameOverScreen.src = 'graphics/gameover.jpg';
        this.way.setWays();
        this.component.generateClouds();
        this.score = 0;
        this.numberOfLifes = 3;
    }

    start() {
       if(this.checkGameOver() === 1)
           return;
       if(this.way.potionActive === true)
            this.infected();
       this.draw();
       this.way.increaseSpeed();
       requestAnimationFrame(this.start.bind(this));
    }

    checkGameOver()
    {
        let isDepression = 0;
        if(i % 1 !== 0.5) {
            for (let j = 0; j < 7; j++)
            {
                if (this.way.actualWay[j][0] === 2 && Math.floor(this.way.actualWay[j][1]) < 100 &&
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
                    break;
                }
                if( this.way.actualWay[j][3] >= 0 && this.way.actualWay[j][3] <= 4 &&   //ak je prekazka
                    (Math.floor(this.way.actualWay[j][1]) < 100 && Math.floor(this.way.actualWay[j][1]) > 60) && //a zaroven je na x-pozicii Jumpyho
                    this.jumpy.posy + this.jumpy.movement > this.jumpy.posy + 100 - 68)//a zaroven Jumpy vyssie ako prekazka
                {
                    this.numberOfLifes--;
                    if(this.numberOfLifes === 0)
                    {
                        this.gameAudio.pause();
                        return 1;
                    }
                    break;
                }
            }
            if (isDepression === 0 && this.way.depression === true)
                this.way.depression = false;
        }
    }

    infected()
    {
        this.way.potionActive = false;
        this.way.potionSpeed = this.way.speed * 0.25;
        setTimeout(() => this.disableInfection(), 3000);
    }

    disableInfection(){
        this.way.potionSpeed = 0;
        this.way.potionSet = false;
    }

    draw() {
        this.drawBackground();      //mení pozadie a vykresľuje ho
        this.drawWay();             //vykresľuje cestičku, pridáva nové cestičky, jedy, prekážky
        this.drawClouds();          //vykresľuje oblaky, generuje nové, pohyb oblakov
        this.drawJumpy();           //kontroluje výskok, zmenu Jumpyho, vykresľuje Jumpyho
        this.drawPanel();           //vykresľuje spodný panel
        this.writeMotivation();
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
            this.ctx.font = "20px Monospace";
            this.ctx.fillStyle = "#ffffff";
            this.ctx.fillText(`Si nakazený ! 3 sekundy bežíš rýchlejšie`, this.canvas.width/2 - 200, this.canvas.height - 5);
            this.ctx.closePath();
        }
        this.ctx.beginPath();
        this.ctx.font = "25px Monospace";
        this.ctx.fillStyle = "#ffffff";
        this.ctx.fillText(`${this.score} metrov`, 900, this.canvas.height - 5);
        this.ctx.closePath();
    }

    drawBackground() {
        this.bck.backgroundSwitch();
        this.ctx.drawImage(this.bck.background_layer[this.bck.lookSet], 0, 0, 1104, 621);	//background
    }
    drawWay()
    {
        for (let j = 0; j < 7; j++) {
            this.ctx.drawImage(this.way.way_arr[this.way.actualWay[j][0]], this.way.actualWay[j][1], this.way.actualWay[j][2], 192, 132);      //vykreslovanie cesty
            if(this.way.actualWay[j][3] >= 0 && this.way.actualWay[j][3] <= 5)                      //vykreslovanie prekazok
            {
                if(this.way.actualWay[j][3] === 5)
                    this.ctx.drawImage(this.obstacle.obstacle_arr[this.way.actualWay[j][3]], this.way.actualWay[j][1], this.way.actualWay[j][2] - 53, 48, 48);
                else
                    this.ctx.drawImage(this.obstacle.obstacle_arr[this.way.actualWay[j][3]], this.way.actualWay[j][1], this.way.actualWay[j][2] - 53, 90, 68);
            }
        }
        if(this.way.actualWay[6][1] < -192)
            this.way.checkWays(this.returnNumber(), this.component.potionPosX, this.component.potionActive);
        this.way.moveWays();
        this.way.checkPotion(this.jumpy.posx, this.jumpy.movement);
    }

    drawJumpy() {
        this.jumpy.checkJump();
        this.jumpy.jumpySwitch();
        if(this.jumpy.jump === true)
            this.ctx.drawImage(this.jumpy.look[2], this.jumpy.posx, this.jumpy.posy + this.jumpy.movement, 171, 241);
        else
            this.ctx.drawImage(this.jumpy.look[this.jumpy.lookSet], this.jumpy.posx, this.jumpy.posy + this.jumpy.movement, 171, 241);
    }

    drawClouds(){
        for(let j = 0; j < 4; j++)
            this.ctx.drawImage(this.component.component_arr[this.component.actualComponents[j][0]], this.component.actualComponents[j][1], this.component.actualComponents[j][2], 120, 120);
        this.component.generateClouds();
        this.component.moveClouds();
    }

    returnNumber() {
        return Math.floor(Math.random() *(2 + 1));
    }

    writeMotivation() {
        if(this.way.potionSet === false)
        {
            if(i % 200 === 0)
            {
                this.instruction.motivationSet = true;
                this.instruction.activeMotivation = Math.floor(Math.random() * (5));
            }
            if(this.instruction.motivationSet === true)
            {
                this.ctx.beginPath();
                this.ctx.font = "20px Monospace";
                this.ctx.fillStyle = "#ffffff";
                this.ctx.fillText(`${this.instruction.instruction_arr[this.instruction.activeMotivation]}`, this.canvas.width / 2 - 200, this.canvas.height - 5);
                this.ctx.closePath();
            }
        }
    }
}