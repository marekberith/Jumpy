window.addEventListener("keydown", function () {
        let key = event.keyCode;
        if (key === 32) {
            if(game.jumpy.jump === false && game.jumpy.posy + game.jumpy.movement === 250)
            {
                console.log('Pociatocna pozicia je:' + game.jumpy.posy + ' vyska canvasu' + canvas.height);
                game.jumpy.jump = true;
                //console.log(game.jumpy.posy);
                //console.log('Space');
            }
        }
        if(key === 82)
        {
        }
});