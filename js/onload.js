var game;
window.onload = function()
{
    canvas = document.getElementById('theCanvas');
    game = new Game(canvas);
    running_on = setTimeout(
        function(){
            game.gameAudio.play();
        },
        60);
    game.start();
    game.gameAudio.onpause = function () {
        game.score = i;
        game.gameOverAudio.play();
       /* game.ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.ctx.drawImage(game.gameOverScreen,0, 0, canvas.width, canvas.height);
        game.ctx.beginPath();
        game.ctx.font = "33px Arial";
        game.ctx.fillStyle = "#7b8586";
        game.ctx.fontWeight = "bold";
        game.ctx.fillText(`${game.score}`, canvas.width/2 + 70, canvas.height/2 + 143);
        game.ctx.closePath();*/
        //document.getElementById('').style.hidden = "";
    }
};