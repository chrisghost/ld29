var menuState = {
  preload: function() {
    game.load.image('bkgMenu', 'assets/bkgMenu.png')
    game.load.image('bkgMenu', 'assets/bkgMenu.png')
    game.load.spritesheet('ground', 'assets/ground.png', 800, 64, 2)
    game.load.spritesheet('player', 'assets/player.png', 22, 36, 10)
    game.load.image('bkg', 'assets/bkg.png')
    game.load.image('bkgUnderworld', 'assets/bkgUnderworld.png')
    game.load.image('bullet', 'assets/bullet.png')
    game.load.image('peaceful0', 'assets/peaceful0.png')
    game.load.image('peaceful1', 'assets/peaceful1.png')
    game.load.image('mob0', 'assets/mob.png')
    game.load.image('mob1', 'assets/mob1.png')
    game.load.image('mob2', 'assets/mob2.png')
    game.load.spritesheet('boss', 'assets/boss.png', 64, 64, 5)
    game.load.image('portal', 'assets/portal.png')

    game.load.image('gold', 'assets/gold.png')
    game.load.image('speed', 'assets/speed.png')
    game.load.image('bulletplus', 'assets/machinegun.png')
    game.load.image('fastfire', 'assets/fastfire.png')
    game.load.image('health', 'assets/health.png')
    game.load.image('fireball', 'assets/fireball.png')

    game.load.script('filter', 'scripts/filters/Fire.js')
  }
, create:  function() {
    this.declareInputs()
    menuBkg = game.add.sprite(0, 0, 'bkgMenu')

    document.getElementById("loaderMessage").remove()

    textService.write({x:10, y:0}, "#FFFFFF",
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
}
