class Menu
{
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.canvas.width = 1104;		//changed from 960x540px
        this.canvas.height = 621;
        this.canvas.style.marginLeft = (window.innerWidth - canvas.width) / 2 + 'px';
        this.mrgLeft = (window.innerWidth - canvas.width) / 2;
        this.loadonScreen = new Image();
        this.loadonScreen.src = 'graphics/main_menu.jpg';
        this.playScreen = new Image();
        this.playScreen.src = 'graphics/novahra.jpg';
        this.gameAudio = new Audio('sound/Jumpy_main.mp3');
        this.settings = new Image();
        this.settings.src = 'graphics/settings_manage.png';
        this.settingsScreen = new Image();
        this.settingsScreen.src = 'graphics/nastavenia.jpg';
        this.controller = new Image();
        this.controller.src = 'graphics/controller.png';
        this.controllerScreen = new Image();
        this.controllerScreen.src = 'graphics/ovládanie.jpg';
        this.chart = new Image();
        this.chart.src = 'graphics/chart.png';
        this.chartScreen = new Image();
        this.chartScreen.src = 'graphics/rebricek.jpg';
        this.home = new Image();
        this.home.src = 'graphics/home.png';
        this.difficulty = 1;
        this.easy = new Image();
        this.easy.src = 'graphics/buttonlahka.png';
        this.medium = new Image();
        this.medium.src = 'graphics/buttonstredna.png';
        this.hard = new Image();
        this.hard.src = 'graphics/buttontazka.png';
        this.onvoice = new Image();
        this.onvoice.src = 'graphics/soundon.png';
        this.offvoice = new Image();
        this.offvoice.src = 'graphics/soundoff.png';
        this.menuActive = 0;
        this.settingsActive = 0;
        this.preloadscreenActive = 0;
        this.controllerActive = 0;
        this.chartscreenActive = 0;
        this.voiceEnabled = true;
    }
    checkifPlayed()
    {
        if (i > 0)
        {
            assets.backtoMenu.style.display = "none";
            assets.backtoMenu.removeAttribute('onclick');
            assets.playAgain.style.display = "none";
            assets.playAgain.removeAttribute('onclick');
            game.gameOverAudio.pause();
        }
    }
    playSound()
    {
        if(this.voiceEnabled === true)
            this.gameAudio.play();
    }
    loadButtons()
    {
        this.ctx.clearRect(0,0, canvas.width, canvas.height);
        this.ctx.drawImage(menu.loadonScreen, 0, 0, canvas.width, canvas.height);
        this.ctx.drawImage(menu.settings, 0,canvas.height - 100, 100, 100);
        this.ctx.drawImage(menu.controller, 0, 20, 100, 50);
        this.ctx.drawImage(menu.chart, canvas.width - 110, 20, 110, 55);
    }
    Settings()
    {
        this.menuActive = 0;
        this.preloadscreenActive = 0;
        this.controllerActive = 0;
        this.chartscreenActive = 0;
        this.settingsActive = 1;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.settingsScreen, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.home, this.canvas.width - 100, this.canvas.height - 75, 110, 55);
        this.ctx.drawImage(this.easy, 260, 425);
        this.ctx.drawImage(this.medium, 420, 425);
        this.ctx.drawImage(this.hard, 595, 425);
        this.ctx.drawImage(this.onvoice, 170, 330, 100, 100);
        this.ctx.drawImage(this.offvoice, 250, 330, 100, 100);
    }
    Controller()
    {
        this.menuActive = 0;
        this.settingsActive = 0;
        this.preloadscreenActive = 0;
        this.chartscreenActive = 0;
        this.controllerActive = 1;
        this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.controllerScreen, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.home, this.canvas.width - 100, this.canvas.height - 75, 110, 55);
    }
    preloadScreen()
    {
        this.ctx.drawImage(this.playScreen, 0, 0, this.canvas.width, this.canvas.height);
        this.menuActive = 0;
        this.controllerActive = 0;
        this.settingsActive = 0;
        this.chartscreenActive = 0;
        this.preloadscreenActive = 1;
        this.ctx.drawImage(this.easy, 280, 500);
        this.ctx.drawImage(this.medium, 440, 500);
        this.ctx.drawImage(this.hard, 615, 500);
    }
    Chart()
    {
        this.menuActive = 0;
        this.preloadscreenActive = 0;
        this.controllerActive = 0;
        this.settingsActive = 0;
        this.chartscreenActive = 1;
        this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.chartScreen, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.home, this.canvas.width - 100, this.canvas.height - 75, 110, 55);
        this.ctx.beginPath();
        this.ctx.font = "30px Monospace";
        this.ctx.color = "#000000";
        for(i = 0; i < 5; i++)
        {
            if(chart.playersArr[i][1] === undefined)
                this.ctx.fillText(`Na ${i + 1}. mieste sa nenachádza žiaden hráč`, menu.mrgLeft + 15, 350 + i*40);
            else
                this.ctx.fillText(`${i + 1}. Hráč: ${chart.playersArr[i][1]} ${chart.playersArr[i][0]}`, menu.mrgLeft + 130, 350 + i*40);
        }
        this.ctx.closePath();
    }
}