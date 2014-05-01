var game = {}
var meter = new FPSMeter()
var baseStep = 0.25
var step = 0.25
window.onload =  function() {
  game = new Phaser.Game(800, 600, Phaser.AUTO, 'gamediv')

  game.state.add('boot', bootState)
  game.state.add('loader', loaderState)
  game.state.add('menu', menuState)
  game.state.add('game', gameState)
  game.state.add('gameover', gameoverState)

  game.state.start('boot')
}

// Utility to destroy an object
function destroy(a, b) {
  if(typeof a != 'undefined') a.kill()
  if(typeof b != 'undefined') b.kill()
}
