var level = {
  grounds : null
, portals : null
, bkg : null
, underWorld : false
, hueRotateFilter : null
, animationRunning : false
, groundWidth : 800
, goUnderWorldAnimation : false
, initWorld : function() {
    this.bkg = game.add.sprite(0, 0, 'bkg')

    this.portals = game.add.group()
    this.portals.enableBody = true
    this.portals.physicsBodyType = Phaser.Physics.ARCADE

    this.grounds = game.add.group()
    this.grounds.enableBody = true
    this.grounds.physicsBodyType = Phaser.Physics.ARCADE
    this.addGround(0)
  }
, addGround : function(x) {
    var ground = this.grounds.create(x, game.world.height - 64, 'ground')
    ground.spawnedNext = false
    //ground.scale.setTo(800/64, 1)
    ground.body.immovable = true
    ground.frame = this.getGroundFrame()
  }
, init : function() {
    this.initWorld()

    this.fireFilter = game.add.filter('Fire', game.width, game.height)
  }

, update : function(dx) {
    if(this.goUnderWorldAnimation) {
      this.goUnderWorldAnimationStep()
      return
    }
    this.portals.forEachExists(function(e) {
      e.body.position.x -= dx
    })
    this.grounds.forEachExists(function(e) {
      e.body.position.x -= dx

      if(e.body.position.x < -game.width)
        e.kill()
      if(!e.spawnedNext && e.body.position.x < 0) {
        e.spawnedNext = true
        this.addGround(e.body.position.x + e.body.width)

        mobsService.createMobsOnNewGround(e.body.position.x + e.body.width)
      }
    }, this)
    //for(i in this.grounds)
      //this.grounds[i].body.position.x -= dx

    //this.fireFilter.update()
  }
, goUnderWorldAnimationStep : function() {
  this.bkg.position.y -= 1
  this.grounds.forEach(function(e) {
    e.body.position.y -= 1
  })
}
, toggleUnderworld : function() {
    if(level.goUnderWorldAnimation) return;
    step = 0
    level.underWorld = !level.underWorld
    player.instance.body.gravity.y = 0
    level.goUnderWorldAnimation = true
    level.animationRunning = true
    textService.announce("Going to underworld!")

    /*
    if(!this.underWorld) {
      this.bkg.filters = null
    } else {
      this.bkg.filters = [this.fireFilter]
    }
    */
  }
, openPortal : function() {
  var portalPos = { 'x': game.width - 64, 'y': game.height - 128 }
  this.portals.create(portalPos.x, portalPos.y, 'portal')
}
, getGroundFrame : function() {
    if(this.underWorld) return 1
    return 0
  }
}
