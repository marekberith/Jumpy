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
                for(let q = 4; q > j; q--)
                {
                    this.playersArr[q][0] = this.playersArr[q-1][0];
                    this.playersArr[q][1] = this.playersArr[q-1][1];
                }
                this.playersArr[j][0] = score;
                this.playersArr[j][1] = name;
                return j;
            }
        }
        return -21;
    }
    printPosition(position)
    {
        if(position === -21)
            game.ctx.fillText(`${position + 1}`, canvas.width / 2 + 170, canvas.height / 2 + 193);
        game.ctx.fillText(`${position + 1}`, canvas.width / 2 + 170, canvas.height / 2 + 193);
    }
}