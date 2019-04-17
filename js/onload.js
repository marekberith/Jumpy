var game;
window.onload = function()						//tu si nacitavam canvas, spustam funkciu game.start
{
    canvas = document.getElementById('theCanvas');
    game = new Game(canvas);
    running_on = setTimeout(					//kebyze nespustim game.start cez setTimeout, nestihne sa nacitat Game
        function(){
            game.start();
        },
        60);
}