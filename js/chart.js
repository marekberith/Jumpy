class Chart
{
    constructor()
    {
        this.playersArr = new Array('5');
        for(let j = 0; j < 5; j++)
        {
            this.playersArr[j] = new Array('2');
            this.playersArr[j][0] = 0;
        }
    }
    addPlayer(score, name)
    {
        for(let j = 0; j < 5; j++)
        {
            if(score > this.playersArr[j][0])
            {
                if(j < 4)
                    this.playersArr[j+1][0] = this.playersArr[j][0];
                this.playersArr[j][0] = score;
                this.playersArr[j][1] = name;
                return j;
            }
        }
        return -21;
    }
    printPosition(position)
    {
        game.ctx.fillText(`${position + 1}`, canvas.width / 2 + 170, canvas.height / 2 + 193);
    }
}