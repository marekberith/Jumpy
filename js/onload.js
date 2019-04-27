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
        if (i > 0)
        {
            console.log('mazem');
            this.backtoMenu.style.display = "none";
            this.backtoMenu.removeAttribute('onclick');
            this.playAgain.style.display = "none";
            this.playAgain.removeAttribute('onclick');
            game.gameOverAudio.pause();
        }
        console.log(menu.mrgLeft);
        menu.voiceEnabled = sound;
        menu.menuActive = 1;
        if(menu.voiceEnabled === true && (!(menu.gameAudio.onplaying)))
            menu.gameAudio.play();
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

    playaGame = function()
    {
        i = 0;
        menu.gameAudio.pause();
        assets.enterName.style.display = "none";
        assets.enterName.removeAttribute('onclick');
        canvas = document.getElementById('theCanvas');
        game.setVariables();
        game.setDifficulty(menu.difficulty);
        running_on = setTimeout(
            function(){
                game.gameAudio.play();
            },
            60);
        game.start();
        game.gameAudio.onpause = function () {
            game.score = i;
            game.gameOverAudio.play();
            game.ctx.clearRect(0, 0, canvas.width, canvas.height);
            game.ctx.drawImage(game.gameOverScreen, 0, 0, canvas.width, canvas.height);
            game.ctx.beginPath();
            game.ctx.font = "33px Monospace";
            game.ctx.fillStyle = "#7b8586";
            game.ctx.fontWeight = "bold";
            game.ctx.fillText(`${game.score}`, canvas.width / 2 + 70, canvas.height / 2 + 143);
            game.ctx.closePath();
            this.position = chart.addPlayer(game.score, assets.playerName);
            chart.printPosition(this.position);
            assets.activategameoverButtons();
        };
    };
    functionHandler();
};


