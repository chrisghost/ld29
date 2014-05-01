var gameoverState = {
  preload: function() {
  }
, create:  function() {
    this.declareInputs()

    stats.finish()
    mobsService.killall()
    var finishTxt = (player.loose) ? "You lost in " : "You won in "
    finishTxt += moment(stats.time).format('m')+" min. "+moment(stats.time).format('s')+" sec."
    finishTxt += "\n\n Press SPACE to retry"

    textService.announce(finishTxt, false, {x: 150, y: 200})

    stats.displayDashboard()
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
}
