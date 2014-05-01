var menuState = {
  preload: function() {
    game.load.image('bkgMenu', 'assets/bkg.png')
  }
, create:  function() {
    this.declareInputs()
    menuBkg = game.add.sprite(0, 0, 'bkgMenu')

    document.getElementById("loaderMessage").remove()

    textService.write({x:10, y:0}, "#444",
      "+ ======== Karakrian ======== +\n\n" 
      +"Controls\n" 
      +"--------\n" 
      +"S - Fire\n" 
      +"D - Jump\n" 
      +"SPACE - Start\n" 
      +"\nCreated for Ludum Dare #29\n" 
      +"by @chradr\n"
      , "49px Arial"
    )


  }
, declareInputs : function() {
    game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(function() {
      game.state.start('game')
    })

  }
, update:  function() {}
, onResume : function() {
    this.declareInputs()
  }
, shutdown: function () {
    menuBkg.destroy()
    textService.clear()

  }
, loadAssets : function() {

  }
}
