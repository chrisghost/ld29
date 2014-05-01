var level = {
  id : Math.random()
, grounds : null
, portals : null
, bkg : null
, bkgUnderworld : null
, underWorld : false
, hueRotateFilter : null
, animationRunning : false
, groundWidth : 800
, goUnderWorldAnimation : false
, goUnderWorldAnimationPos : 0
, goUnderWorldAnimationStepSize : -10
, underWorldPower : 0
, initWorld : function() {

    level.underWorld = false
    level.goUnderWorldAnimation = false
    level.goUnderWorldAnimationPos = 0
    level.goUnderWorldAnimationStepSize = -10
    level.underWorldPower = 0

    level.bkg = game.add.sprite(0, 0, 'bkg')
    level.bkgUnderworld = game.add.sprite(0, game.height, 'bkgUnderworld')

    level.portals = game.add.group()
    level.portals.enableBody = true
    level.portals.physicsBodyType = Phaser.Physics.ARCADE

    level.grounds = game.add.group()
    level.grounds.enableBody = true
    level.grounds.physicsBodyType = Phaser.Physics.ARCADE
    level.addGround(0)
  }
, addGround : function(x, py) {
    var y = py || game.height - 64
    var ground = this.grounds.create(x, y, 'ground')
    ground.spawnedNext = false
    //ground.scale.setTo(800/64, 1)
    ground.body.immovable = true
    ground.frame = this.getGroundFrame()
  }
, init : function() {
    level.initWorld()
  }

, update : function(dx) {
    if(dx > 16 || dx <= 0) dx = 16 // FIXME : remove me :)
    if(level.goUnderWorldAnimation) {
      level.goUnderWorldAnimationStep(dx)
      return
    }

    level.portals.forEachExists(function(e) {
      e.body.position.x -= dx
    })
    level.moveGrounds(dx)

    if(level.underWorld) {
       //level.fireFilter.update()
      level.underWorldPower -= dx/1000
    } else {
      level.underWorldPower -= dx/300
    }
    if(level.underWorldPower < 0) level.underWorldPower = 0
    if(level.underWorldPower > 100) level.underWorldPower = 100
  }
, moveGrounds : function(dx) {
    level.grounds.forEachAlive(function(e) {
      //console.log("from", e.body.position.x, "-=", dx, "Y = ", e.body.position.y)
      e.body.position.x -= dx

      if(!e.spawnedNext && e.body.position.x < 0 && e.body.position.y > 0) {
        e.spawnedNext = true
        var nx = e.body.position.x + e.body.width
        this.addGround(nx > 0 ? nx : 0, e.body.position.y)

        mobsService.createMobsOnNewGround(nx > 0 ? nx : 0)
      }
      if(e.body.position.x < -game.width)
        e.kill()
    }, level)
  }
, goUnderWorldAnimationStep : function(dx) {

  level.goUnderWorldAnimationPos += level.goUnderWorldAnimationStepSize
  if (Math.abs(level.goUnderWorldAnimationPos) >= game.height) {
    level.goUnderWorldAnimation = false
    level.animationRunning = false
    step = baseStep
    //level.bkg.kill()
    player.resetGravity()
    //level.addGround(0)
    player.resetPosition()

    level.grounds.forEachAlive(function(e) {
      if(e.body.position.y > 0 && e.body.position.y < game.height) e.body.position.y = game.height-64
      else e.kill()
    })

    if(!mobsService.bossAlive) {
      level.bkgUnderworld.filters = null
    } else {
      level.bkgUnderworld.filters = [level.fireFilter]
    }
  } else {
    level.bkg.position.y -= level.goUnderWorldAnimationStepSize
    level.bkgUnderworld.position.y -= level.goUnderWorldAnimationStepSize
    level.grounds.forEachAlive(function(e) {
      e.body.position.y -= level.goUnderWorldAnimationStepSize
    })
    player.resetPosition()
  }
}
, killall : function() {
  level.grounds.forEach(function(e) {
    e.kill()
  })
}
, prepareSurfaceGround : function() {
  level.addGround(0, (-64))
}
, prepareUnderworldGround : function() {
  level.addGround(0, (game.height*2-64))
}
, toggleUnderworld : function(playerInstance, portalInstance) {
    if(level.goUnderWorldAnimation) return;
    step = 0

    level.underWorld = !level.underWorld
    player.instance.body.gravity.y = 0
    level.goUnderWorldAnimation = true
    level.animationRunning = true
    if(level.underWorld) textService.announce("Going to underworld!")
    else                 textService.announce("Going back to the Surface!")
    level.goUnderWorldAnimationPos = 0
    level.goUnderWorldAnimationStepSize *= -1

    mobsService.killall()
    mobsService.bossAlive = false
    lootService.killall()
    player.killallBullets()

    if(level.underWorld) level.prepareUnderworldGround()
    else                 level.prepareSurfaceGround()

    level.portals.forEachAlive(function(e){e.kill()})
  }
, openPortal : function() {
    var portalPos = { 'x': game.width - 64, 'y': game.height - 128*2 }
    var nPortal = level.portals.create(portalPos.x, portalPos.y, 'portal')
  }
, getGroundFrame : function() {
    if(level.underWorld) return 1
    return 0
  }
}
