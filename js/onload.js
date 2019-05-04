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
        mainMenu(true);
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
        assets.activateForm();
        menu.ctx.drawImage(menu.playScreen, 0, 0, canvas.width, canvas.height);
        menu.preloadScreen();
    };
    functionHandler();
};

playaGame = function()
{
    game.executeSelf();
    console.log('executed');
};
