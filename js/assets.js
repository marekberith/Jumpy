class Assets
{
    constructor()
    {
        this.playAgain = document.getElementById('playAgain');
        this.backtoMenu = document.getElementById('backtoMenu');
        this.newGame = document.getElementById('newGame');
        this.submitName = document.getElementById('submitName');
        this.enterName = document.getElementById('enterName');
        this.mouseClick = new Audio('sound/mouse-click.wav');
        this.easy = document.getElementById('easy');
        this.medium = document.getElementById('medium');
        this.hard = document.getElementById('hard');
    }
    activategameoverButtons()
    {
        this.playAgain.style.display = "initial";
        this.backtoMenu.style.display = "initial";
        this.playagainAction = document.createAttribute("onclick");
        this.backtoMenuAction = document.createAttribute("onclick");
        this.playagainAction.value = "game.restart();assets.mouseClick.play();";
        this.backtoMenuAction.value = "mainMenu();assets.mouseClick.play();";
        this.playAgain.setAttributeNode(this.playagainAction);
        this.backtoMenu.setAttributeNode(this.backtoMenuAction);
    }
    activatemenuButtons()
    {
        this.newGame.style.display = "initial";
        this.newgameAction = document.createAttribute("onclick");
        this.newgameAction.value = "loadGame();assets.mouseClick.play();";
        this.newGame.setAttributeNode(this.newgameAction);
    }
    activateForm()
    {
        this.enterName.style.display = "initial";
        this.submitNameAction = document.createAttribute("onclick");
        this.submitNameAction.value = "assets.saveName(); playaGame(); assets.mouseClick.play();";
        this.submitName.setAttributeNode(this.submitNameAction);
    }
    activateDifficulties()
    {
        this.easy.style.display = "initial";
        this.medium.style.display = "initial";
        this.hard.style.display = "initial";
        this.easyAction = document.createAttribute("onclick");
        this.mediumAction = document.createAttribute("onclick");
        this.hardAction = document.createAttribute("onclick");
        this.easyAction.value = "this.difficulty = 1";
        this.mediumAction.value = "this.difficulty = 2";
        this.hardAction.value = "this.difficulty = 3";
        this.easy.setAttributeNode(this.easyAction);
        this.medium.setAttributeNode(this.easyAction);
        this.hard.setAttributeNode(this.easyAction);
    }
    saveName()
    {
        this.playerName = document.getElementById('nameArray').value;
    }
}