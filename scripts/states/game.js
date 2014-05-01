var gameState = {
  preload: function() {
  }
, textTimer : 0
, lastTime : null
, create:  function() {
    this.declareInputs()
    level.init()
    mobsService.init()
    lootService.init()
    player.init()

    textService.announce("Surface (peaceful)")
    this.lastTime = Date.now()

    //game.onPause.add(onPause, this)
    game.onResume.add(this.onResume, this)
    game.physics.startSystem(Phaser.Physics.ARCADE)
    //level.fireFilter = game.add.filter('Fire', game.width, game.height)
  }
, declareInputs : function() {
    player.jumpKey = game.input.keyboard.addKey(Phaser.Keyboard.D)
    player.fireKey = game.input.keyboard.addKey(Phaser.Keyboard.S)

    player.jumpKey.onDown.add(player.jump, player)
    player.fireKey.onDown.add(function(){player.firing = true}, player)
    player.fireKey.onUp.add(function(){player.firing = false}, player)

  }
, update:  function() {
    meter.tick()

    var d = Date.now()
    var delta = d - this.lastTime
    this.lastTime = d

    //level.fireFilter.update()
      //if(!level.animationRunning)
    game.physics.arcade.collide(player.instance, level.grounds)

    game.physics.arcade.overlap(player.instance, mobsService.fireballs, player.hit)
    game.physics.arcade.overlap(player.bullets, mobsService.fireballs, function(bullet, fb) { bullet.kill() })

    game.physics.arcade.overlap(player.instance, level.portals, level.toggleUnderworld)
    game.physics.arcade.collide(mobsService.mobs, level.grounds)
    game.physics.arcade.collide(lootService.loots, level.grounds)

    game.physics.arcade.collide(player.bullets, mobsService.mobs, mobsService.killed)

    game.physics.arcade.overlap(player.instance, lootService.loots, player.pickUp)

    game.physics.arcade.overlap(player.instance, mobsService.mobs, player.hit)

    var mvtDelta = Math.floor(delta*step)
    player.update(mvtDelta)
    level.update(mvtDelta)
    mobsService.update(mvtDelta)
    lootService.update(mvtDelta)

    this.textTimer++
    if(this.textTimer > 20) {
      stats.displayDashboard()
      this.textTimer = 0
    }

    if(player.loose || player.win)
      game.state.start('gameover')

  }
, onResume : function() {
    this.declareInputs()
  }
}
