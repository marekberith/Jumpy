var game;
window.onload = function()
{
    canvas = document.getElementById('theCanvas');
    game = new Game(canvas);
    running_on = setTimeout(
        function(){
            game.gameAudio.play();
            game.start();
        },
        60);
};