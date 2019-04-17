class Game {
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

    start() {
        this.draw();
        requestAnimationFrame(this.start.bind(this));
    }

    draw() {
        this.drawBackground();
        this.jumpy.checkJump();
        this.jumpy.switchJumpy();
        this.drawJumpy();
        this.way.checkWays(this.returnNumber());
        this.way.moveWays();
        this.way.increaseSpeed();
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
        return Math.round(Math.random());
    }
}