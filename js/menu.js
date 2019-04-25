class Menu
{
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.canvas.width = 1104;		//changed from 960x540px
        this.canvas.height = 621;
        this.canvas.style.marginLeft = (window.innerWidth - canvas.width) / 2 + 'px';
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
        this.chart = new Image();
        this.chart.src = 'graphics/chart.png';
        this.home = new Image();
        this.home.src = 'graphics/home.png';
        this.difficulty = 0;
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
        this.voiceEnabled = true;
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
        this.settingsActive = 1;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.settingsScreen, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.home, this.canvas.width - 100, this.canvas.height - 75, 110, 55);
        this.ctx.drawImage(this.easy, 260, 425);
        this.ctx.drawImage(this.medium, 420, 425);
        this.ctx.drawImage(this.hard, 595, 425);
        this.ctx.drawImage(this.onvoice, 170, 330, 100, 100);
        this.ctx.drawImage(this.offvoice, 250, 330, 100, 100);
        window.addEventListener("click",function () {
            this.xcoordinate = event.clientX;
            this.ycoordinate = event.clientY;
            console.log(this.xcoordinate, this.ycoordinate);
            if(this.xcoordinate > 1258  && this.xcoordinate < 1314 && this.ycoordinate > 382 && this.ycoordinate < 436)
            {
                this.settingsActive = 0;
                mainMenu(this.voiceEnabled);
            }
            else if(this.xcoordinate > 486 && this.xcoordinate < 624 && this.ycoordinate > 490 && this.ycoordinate < 550)
            {
                this.difficulty = 1;
            }
            else if(this.xcoordinate > 646 && this.xcoordinate < 799 && this.ycoordinate > 490 && this.ycoordinate < 550)
            {
                this.difficulty = 2;
            }
            else if(this.xcoordinate > 821 && this.xcoordinate < 958 && this.ycoordinate > 490 && this.ycoordinate < 550)
            {
                this.difficulty = 3;
            }
            else if(this.xcoordinate > 421 && this.xcoordinate < 470 && this.ycoordinate > 422 && this.ycoordinate < 468)
            {
                this.voiceEnabled = false;
                console.log('Turning off sound');
                this.gameAudio.pause();
                menu.gameAudio.currentTime = 0;
            }
            else if(this.xcoordinate > 502 && this.xcoordinate < 549 && this.ycoordinate > 422 && this.ycoordinate < 468)
            {
                this.voiceEnabled = true;
            }
        });
    }
}