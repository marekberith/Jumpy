window.addEventListener("keydown", function () {
    if (game !== undefined && game.endofgameState === 0) {
        let key = event.keyCode;
        if (key === 32) {
            if (game.jumpy.jump === false && game.jumpy.posy + game.jumpy.movement === 250 && game.jumpy.velUp === (26 + game.jumpy.distance100)) {
                console.log('Pociatocna pozicia je:' + game.jumpy.posy + ' vyska canvasu' + canvas.height);
                game.jumpy.jump = true;
            }
        }
    }
});
window.addEventListener("click", function () {
    this.xcoordinate = event.clientX;
    this.ycoordinate = event.clientY;
    if (menu.menuActive === 1 && this.ycoordinate < 659 && this.ycoordinate > 613 && (this.xcoordinate > (34 + menu.mrgLeft)) && (this.xcoordinate < (84 + menu.mrgLeft)))
    {
        menu.menuActive = 0;
        menu.Settings();
        assets.newGame.style.display = "none";
    }
    if (menu.menuActive === 1 && this.ycoordinate < 134 && this.ycoordinate > 86 && (this.xcoordinate > 34 + menu.mrgLeft) && (this.xcoordinate < 84 + menu.mrgLeft))
    {
        menu.menuActive = 0;
        menu.Controller();
        assets.newGame.style.display = "none";
    }
    if (menu.menuActive === 1 && this.ycoordinate < 134 && this.ycoordinate > 86 && (this.xcoordinate > 1033 + menu.mrgLeft) && (this.xcoordinate < 1087 + menu.mrgLeft))
    {
        menu.menuActive = 0;
        menu.Chart();
        assets.newGame.style.display = "none";
    }
    else if (menu.menuActive === 0 && menu.settingsActive === 1)
    {
        this.xcoordinate = event.clientX;
        this.ycoordinate = event.clientY;
        if (this.xcoordinate > 1042 + menu.mrgLeft && this.xcoordinate < 1098 + menu.mrgLeft && this.ycoordinate > 611 && this.ycoordinate < 665)
        {
            menu.settingsActive = 0;
            mainMenu(menu.voiceEnabled);
        }
        else if (this.xcoordinate > 270 + menu.mrgLeft && this.xcoordinate < 408 + menu.mrgLeft && this.ycoordinate > 490 && this.ycoordinate < 550)
        {
            alert('Aktivovaná obtiažnosť ľahká');
            menu.difficulty = 1;
        }
        else if (this.xcoordinate > 430 + menu.mrgLeft && this.xcoordinate < 583 + menu.mrgLeft && this.ycoordinate > 490 && this.ycoordinate < 550)
        {
            alert('Aktivovaná obtiažnosť stredná');
            menu.difficulty = 2;
        }
        else if (this.xcoordinate > 605 + menu.mrgLeft && this.xcoordinate < 742 + menu.mrgLeft && this.ycoordinate > 490 && this.ycoordinate < 550)
        {
            alert('Aktivovaná obtiažnosť ťažká');
            menu.difficulty = 3;
        }
        else if (this.xcoordinate > 205 + menu.mrgLeft && this.xcoordinate < 254 + menu.mrgLeft && this.ycoordinate > 422 && this.ycoordinate < 468)
        {
            alert('Zvuk je stíšený');
            menu.voiceEnabled = false;
            menu.gameAudio.pause();
            menu.gameAudio.currentTime = 0;
        }
        else if (this.xcoordinate > 286 + menu.mrgLeft && this.xcoordinate < 333 + menu.mrgLeft && this.ycoordinate > 422 && this.ycoordinate < 468)
        {
            alert('Zvuk je zapnutý');
            menu.gameAudio.play();
            menu.voiceEnabled = true;
        }
    }
    else if(menu.preloadscreenActive === 1)
    {
        if(this.xcoordinate > 290 + menu.mrgLeft && this.xcoordinate < 427 + menu.mrgLeft && this.ycoordinate > 566 && this.ycoordinate < 625)
        {
            alert('Aktivovaná obtiažnosť ľahká');
            menu.difficulty = 1;
        }
        if(this.xcoordinate > 447 + menu.mrgLeft && this.xcoordinate < 605 + menu.mrgLeft && this.ycoordinate > 566 && this.ycoordinate < 625)
        {
            alert('Aktivovaná obtiažnosť stredná');
            menu.difficulty = 2;
        }
        if(this.xcoordinate > 624 + menu.mrgLeft && this.xcoordinate < 761 + menu.mrgLeft && this.ycoordinate > 566 && this.ycoordinate < 625)
        {
            alert('Aktivovaná obtiažnosť ťažká');
            menu.difficulty = 3;
        }
    }
    else if(menu.controllerActive === 1)
    {
        if (this.xcoordinate > 1042 + menu.mrgLeft && this.xcoordinate < 1098 + menu.mrgLeft && this.ycoordinate > 611 && this.ycoordinate < 665)
        {
            menu.controllerActive = 0;
            mainMenu(menu.voiceEnabled);
        }
    }
    else if(menu.chartscreenActive === 1)
    {
        if (this.xcoordinate > 1042 + menu.mrgLeft && this.xcoordinate < 1098 + menu.mrgLeft && this.ycoordinate > 611 && this.ycoordinate < 665)
        {
            menu.chartscreenActive = 0;
            mainMenu(menu.voiceEnabled);
        }
    }
});