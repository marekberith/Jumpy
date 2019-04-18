class Game {
    constructor(canvas) {
        this.jumpy = new Jumpy();
        this.bck = new Background();
        this.way = new Way();
       // this.components = new Components();
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
                Math.floor(this.way.actualWay[j][1]) > 70 && this.jumpy.posy + this.jumpy.movement === this.jumpy.onloadposy)
            {
                this.gameAudio.pause();
                return 1;
            }
            if(this.way.actualWay[j][3] >= 0 && this.way.actualWay[j][3] <= 3 && this.way.actualWay[j][1] < 100 &&
                this.way.actualWay[j][1] > 70 && this.jumpy.posy + this.jumpy.movement === this.jumpy.onloadposy)
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
        this.jumpy.checkJump();
        this.jumpy.switchJumpy();
        this.drawJumpy();
        if(this.way.actualWay[6][1] < -192)
        {
            this.way.checkWays(this.returnNumber());
            //this.obstacle.generateObstacle(Math.round(Math.random()));
            this.drawObstacles();
        }
        this.way.moveWays();
        //this.components.drawComponents();
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

    drawObstacles() {
        //console.log('bla');
    }

    drawBackground() {
        this.ctx.drawImage(this.bck.background_layer[this.bck.lookSet], 0, 0, 1104, 621);	//background
        for (let j = 0; j < 7; j++) {
            //console.log(this.way.actualWay[j][3]);
            this.ctx.drawImage(this.way.way_arr[this.way.actualWay[j][0]], this.way.actualWay[j][1], this.way.actualWay[j][2], 192, 132);
            if(this.way.actualWay[j][3] >= 0 && this.way.actualWay[j][3] <= 3)
            {
                console.log('BLA');
                this.ctx.drawImage(this.obstacle.obstacle_arr[this.way.actualWay[j][3]], this.way.actualWay[j][1], this.way.actualWay[j][2] - 53, 90, 58);
            }
            /*if(this.way.actualWay[j][3] !== -1 && this.way.actualWay[j][3] !== undefined)
            {
                console.log(this.obstacle.obstacle_arr[this.way.actualWay[0][3]]);
                this.ctx.drawImage(this.obstacle.obstacle_arr[this.way.actualWay[0][3]], this.way.actualWay[0][1], 100, 150, 150);
            }*/
        }
    }

    drawJumpy() {
        if(this.jumpy.jump === true)
            this.ctx.drawImage(this.jumpy.look[2], this.jumpy.posx, this.jumpy.posy + this.jumpy.movement, 171, 241);
        else
            this.ctx.drawImage(this.jumpy.look[this.jumpy.lookSet], this.jumpy.posx, this.jumpy.posy + this.jumpy.movement, 171, 241);
    }

    returnNumber() {
        return Math.floor(Math.random() *(2 + 1));
    }
}