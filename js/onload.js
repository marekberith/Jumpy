var game;
window.onload = function()
{
    functionHandler = function()
    {
        canvas = document.getElementById('theCanvas');
        menu = new Menu(canvas);
        chart = new Chart();
        assets = new Assets();
        game = new Game(canvas);
        setTimeout(function () 
        {
            mainMenu(true);
        }, 60);
    };
    mainMenu = function(sound) {
        menu.menuActive = 1;
        menu.checkifPlayed();
        menu.voiceEnabled = sound;
        if(menu.voiceEnabled === true)
            menu.playSound();
        setTimeout(function ()
        {
            menu.loadButtons();
            assets.activatemenuButtons();
        }, 60);
    };
    loadGame = function () {
        menu.preloadscreenActive = 1;
        assets.newGame.style.display = "none";
        assets.newGame.removeAttribute('onclick');
        assets.activateForm(true);
        menu.preloadScreen();
    };
    playaGame = function(){
        game.execute();
    };
    functionHandler();
};
