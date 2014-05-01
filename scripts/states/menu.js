var menuState = {
  create:  function() {
    this.declareInputs()
    menuBkg = game.add.sprite(0, 0, 'bkgMenu')
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
