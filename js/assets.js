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
    }
    activategameoverButtons()
    {
        this.playAgain.style.display = "initial";
        this.backtoMenu.style.display = "initial";
        this.playagainAction = document.createAttribute("onclick");
        this.backtoMenuAction = document.createAttribute("onclick");
        this.playagainAction.value = "game.restart();assets.mouseClick.play();";
        this.backtoMenuAction.value = "mainMenu();assets.mouseClick.play();menu.difficulty = 1;";
        this.playAgain.setAttributeNode(this.playagainAction);
        this.backtoMenu.setAttributeNode(this.backtoMenuAction);
    }
    activatemenuButtons()
    {
        this.newGame.style.display = "initial";
        this.newgameAction = document.createAttribute("onclick");
        this.newgameAction.value = "loadGame();assets.mouseClick.play();menu.menuActive = 0;";
        this.newGame.setAttributeNode(this.newgameAction);
    }
    activateForm()
    {
        this.enterName.style.display = "initial";
        this.submitNameAction = document.createAttribute("onclick");
        this.submitNameAction.value = "assets.saveName();";
        this.submitName.setAttributeNode(this.submitNameAction);
    }
    saveName()
    {
        this.playerName = document.getElementById('nameArray').value;
        if(this.playerName.length > 0)
        {
            this.mouseClick.play();
            playaGame();
        }
        else
        {
            this.mouseClick.play();
            alert('Error');
        }
    }
}