class Game {
    constructor(canvas) {
        this.jumpy = new Jumpy();
        this.bck = new Background();
        this.way = new Way();
        this.components = new Components();
        this.obstacle = new Obstacle();
        this.gameAudio = new Audio('sound/Jumpy_main.mp3');
        this.gameOverAudio = new Audio('sound/game_over.mp3');
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.canvas.width = 1104;		//changed from 960x540px
        this.canvas.height = 621;
        var x = canvas.style.marginLeft = (window.innerWidth - canvas.width) / 2 + 'px';
        this.way.setWays();
        this.score = 0;
    }

    start() {
        if(this.checkGameOver() === 1)
            return;
        this.draw();
        requestAnimationFrame(this.start.bind(this));
    }

    checkGameOver()
    {
        for( let j = 0; j < 7; j++ )
        {
            if(this.way.actualWay[j][0] === 2 && Math.floor(this.way.actualWay[j][1]) < 100 &&
                Math.floor(this.way.actualWay[j][1]) > 70 && this.jumpy.posy + this.jumpy.movement === this.jumpy.onloadposy) {
                this.gameAudio.pause();
                this.score = i;
                this.gameOverAudio.play();
                return 1;
            }
        }
        return 0;
    }

    draw() {
        this.drawBackground();
        this.jumpy.checkJump();
        this.jumpy.switchJumpy();
        this.drawJumpy();
        this.way.checkWays(this.returnNumber());
        this.way.moveWays();
        this.components.drawComponents();
        if(i % 10 === 0)
            this.score = i;
        this.drawText();
        this.way.increaseSpeed();
        //this.obstacle.generateObstacle(this.returnNumber());
    }

    drawText() {
        this.ctx.beginPath();
        this.ctx.font = "30px Arial";
        this.ctx.fillText(`${this.score}m`, 750, 50);
        this.ctx.closePath();
    }

    drawBackground() {
        this.ctx.drawImage(this.bck.background_layer[0], 0, 0, 1104, 621);	//background
        for (let j = 0; j < 7; j++) {
            this.ctx.drawImage(this.way.way_arr[this.way.actualWay[j][0]], this.way.actualWay[j][1], this.way.actualWay[j][2], 192, 132);
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