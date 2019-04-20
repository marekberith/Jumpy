class Game {
    constructor(canvas) {
        this.jumpy = new Jumpy();
        this.bck = new Background();
        this.way = new Way();
        this.component = new Component();
        this.obstacle = new Obstacle();
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
    }

    start() {
       if(this.checkGameOver() === 1) {
            return;
        }
        this.draw();
        requestAnimationFrame(this.start.bind(this));
    }

    checkGameOver()
    {
        for( let j = 0; j < 7; j++ )
        {
            if(this.way.actualWay[j][0] === 2 && Math.floor(this.way.actualWay[j][1]) < 100 &&
                Math.floor(this.way.actualWay[j][1]) > 60 && this.jumpy.posy + this.jumpy.movement - 100 === this.jumpy.onloadposy)
            {
                this.gameAudio.pause();
                return 1;
            }
            if( this.way.actualWay[j][3] >= 0 && this.way.actualWay[j][3] <= 4 &&   //ak je prekazka
                this.way.actualWay[j][1] > 95 && this.way.actualWay[j][1] < 105 && //a zaroven je na x-pozicii Jumpyho
                this.jumpy.posy + this.jumpy.movement > this.jumpy.posy + 100 - 68)  //a zaroven Jumpy vyssie ako prekazka???
            {
                this.gameAudio.pause();
                return 1;
            }
        }
        return 0;
    }

    draw() {
       // console.log(i);
        this.bck.backgroundSwitch();
        this.drawBackground();
        this.drawClouds();
        this.jumpy.checkJump();
        this.jumpy.jumpySwitch();
        this.drawJumpy();
        if(this.way.actualWay[6][1] < -192)
            this.way.checkWays(this.returnNumber());
        this.way.moveWays();
        this.component.generateClouds();
        this.component.generatePotion();
        this.component.movePotion();
        this.component.moveClouds();
        if(i % 10 === 0)
            this.score = i;
        this.drawText();
        this.way.increaseSpeed();
    }

    drawText() {
        this.ctx.beginPath();
        this.ctx.font = "30px Arial";
        this.ctx.fillText(`${this.score}m`, 750, 50);
        this.ctx.closePath();
    }

    drawBackground() {
        this.ctx.drawImage(this.bck.background_layer[this.bck.lookSet], 0, 0, 1104, 621);	//background
        for (let j = 0; j < 7; j++) {
            this.ctx.drawImage(this.way.way_arr[this.way.actualWay[j][0]], this.way.actualWay[j][1], this.way.actualWay[j][2], 192, 132);      //vykreslovanie cesty
            if(this.way.actualWay[j][3] >= 0 && this.way.actualWay[j][3] <= 4)                      //vykreslovanie prekazok
            {
                this.ctx.drawImage(this.obstacle.obstacle_arr[this.way.actualWay[j][3]], this.way.actualWay[j][1], this.way.actualWay[j][2] - 53, 90, 68);
            }
            if(this.component.actualWay[j][3] === "potion")
            {
                console.log('POTION found');
                this.ctx.drawImage(this.component.component_arr[3], this.component.actualWay[j][1], this.component.actualWay[j][2] - 53, 90, 68);
            }
        }
    }

    drawJumpy() {
        if(this.jumpy.jump === true)
            this.ctx.drawImage(this.jumpy.look[2], this.jumpy.posx, this.jumpy.posy + this.jumpy.movement, 171, 241);
        else
            this.ctx.drawImage(this.jumpy.look[this.jumpy.lookSet], this.jumpy.posx, this.jumpy.posy + this.jumpy.movement, 171, 241);
    }

    drawClouds(){
        for(let j = 0; j < 4; j++)
        {
            this.ctx.drawImage(this.component.component_arr[this.component.actualComponents[j][0]], this.component.actualComponents[j][1], this.component.actualComponents[j][2], 120, 120);
        }
    }

    returnNumber() {
        return Math.floor(Math.random() *(2 + 1));
    }
}