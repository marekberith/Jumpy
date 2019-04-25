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
        menu.voiceEnabled = sound;
        menu.menuActive = 1;
        console.log('Voice is' + menu.voiceEnabled);
        if(menu.voiceEnabled === true && (!(menu.gameAudio.onplaying)))
            menu.gameAudio.play();
        setTimeout(function ()
        {
            menu.loadButtons();
            assets.activatemenuButtons();
        }, 60);
        window.addEventListener("click", function ()
        {
            this.xcoordinate = event.clientX;
            this.ycoordinate = event.clientY;
            //alert(`${this.xcoordinate} ${this.ycoordinate} ${menu.menuActive}`);
            if (menu.menuActive === 1 && this.ycoordinate < 659 && this.ycoordinate > 613 && this.xcoordinate > 250 && this.xcoordinate < 300)
            {
                menu.menuActive = 0;
                menu.Settings();
                assets.newGame.style.display = "none";
            }
        });
    };
    loadGame = function () {
        assets.newGame.style.display = "none";
        assets.newGame.removeAttribute('onclick');
        assets.activateForm();
        menu.ctx.drawImage(menu.playScreen, 0, 0, canvas.width, canvas.height);
        assets.activateDifficulties();
    };

    playaGame = function()
    {
        i = 0;
        menu.gameAudio.pause();
        assets.newGame.style.display = "none";
        assets.newGame.removeAttribute('onclick');
        assets.enterName.style.display = "none";
        assets.enterName.removeAttribute('onsubmit');
        assets.easy.style.display = "none";
        assets.easy.removeAttribute('onclick');
        assets.medium.style.display = "none";
        assets.medium.removeAttribute('onclick');
        assets.hard.style.display = "none";
        assets.hard.removeAttribute('onclick');
        canvas = document.getElementById('theCanvas');
        if(menu.difficulty === 1)
            game.way.speed = 100;
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
            console.log(this.position);
            chart.printPosition(this.position);
            assets.activategameoverButtons();
            // game.ctx.drawImage(assets.buttonsArr[0], canvas.width/2 - 250, canvas.height/2);
        };
    };
    functionHandler();
};


