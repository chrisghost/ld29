var level = {
  grounds : null
, grounds : []
, bkg : null
, underWorld : false
, underworldKey : null
, hueRotateFilter : null
, initWorld : function() {
    this.bkg = game.add.sprite(0, 0, 'bkg')

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

    this.underworldKey = game.input.keyboard.addKey(Phaser.Keyboard.F)
    this.underworldKey.onDown.add(this.toggleUnderworld, this)
    this.fireFilter = game.add.filter('Fire', game.width, game.height)
  }

, update : function(dx) {
    this.grounds.forEachExists(function(e) {
      e.body.position.x -= dx

      if(e.body.position.x < -game.width)
        e.kill()
      if(!e.spawnedNext && e.body.position.x < 0) {
        e.spawnedNext = true
        this.addGround(e.body.position.x + e.body.width)

        mobsService.createMob(0, game.world.width, game.world.height - 100)
      }
    }, this)
    //for(i in this.grounds)
      //this.grounds[i].body.position.x -= dx

    this.fireFilter.update()
  }
, toggleUnderworld : function() {
    this.underWorld = !this.underWorld
    if(!this.underWorld) {
      this.bkg.filters = null
    } else {
      this.bkg.filters = [this.fireFilter]
    }
    for(i in this.grounds)
      this.grounds[i].frame = this.getGroundFrame()
  }
, getGroundFrame : function() {
    if(this.underWorld) return 1
    return 0
  }
}
