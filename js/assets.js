class Assets
{
    constructor()
    {
        this.playAgain = document.getElementById('playAgain');
        this.playAgain.style.left = 664 + menu.mrgLeft + 'px';
        this.backtoMenu = document.getElementById('backtoMenu');
        this.backtoMenu.style.left = 284 + menu.mrgLeft + 'px';
        this.newGame = document.getElementById('newGame');
        this.newGame.style.left = 497 + menu.mrgLeft + 'px';
        this.submitName = document.getElementById('submitName');
        this.enterName = document.getElementById('enterName');
        this.enterName.style.left = 430 + menu.mrgLeft + 'px';
        this.mouseClick = new Audio('sound/mouse-click.wav');
        this.keyPressed = 0;
    }
    actualizeAssets()
    {
        this.playAgain.style.left = 664 + menu.mrgLeft + 'px';
        this.backtoMenu.style.left = 284 + menu.mrgLeft + 'px';
        this.newGame.style.left = 497 + menu.mrgLeft + 'px';
        this.enterName.style.left = 430 + menu.mrgLeft + 'px';
    }
    activategameoverButtons()
    {
        this.playAgain.style.display = "initial";
        this.backtoMenu.style.display = "initial";
        this.playagainAction = document.createAttribute("onclick");
        this.backtoMenuAction = document.createAttribute("onclick");
        this.playagainAction.value = "game.endofgameState = 0; game.restart();assets.clickaButton();";
        this.backtoMenuAction.value = "mainMenu(menu.voiceEnabled);assets.clickaButton();menu.difficulty = 1; menu.gameAudio.currentTime = 0;";
        this.playAgain.setAttributeNode(this.playagainAction);
        this.backtoMenu.setAttributeNode(this.backtoMenuAction);
    }
    activatemenuButtons()
    {
        this.newGame.style.display = "initial";
        this.newgameAction = document.createAttribute("onclick");
        this.newgameAction.value = "loadGame();assets.clickaButton();menu.menuActive = 0;";
        this.newGame.setAttributeNode(this.newgameAction);
    }
    activateForm(value)
    {
        if(value)
        {
            this.enterName.style.display = "initial";
            this.submitNameAction = document.createAttribute("onclick");
            this.submitNameAction.value = "assets.saveName();";
            this.submitName.setAttributeNode(this.submitNameAction);
        }
        else
            this.enterName.style.display = "none";
    }
    clickaButton()
    {
        if(menu.voiceEnabled === true)
            assets.mouseClick.play();
    }
    saveName()
    {
        this.playerName = document.getElementById('nameArray').value;
        if(this.playerName.length > 0)
        {
            menu.preloadscreenActive = 0;
            this.clickaButton();
            this.activateForm(false);
            playaGame();
        }
        else
        {
            this.clickaButton();
            alert('Nezadali ste svoje meno');
        }
    }
}