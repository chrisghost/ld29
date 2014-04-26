var level = {
  groundGrp : null
, grounds : []
, bkg : null
, underWorld : false
, underworldKey : null
, hueRotateFilter : null
, initWorld : function(game) {
    this.bkg = game.add.sprite(0, 0, 'bkg')

    this.groundGrp = game.add.group()
    this.groundGrp.enableBody = true
    this.addGround(game, 0)
  }
, addGround : function(game, x) {
    var ground = this.groundGrp.create(x, game.world.height - 64, 'ground')

    //ground.scale.setTo(800/64, 1)
    ground.body.immovable = true
    ground.frame = this.getGroundFrame()

    this.grounds.push(ground)
  }
, initPlayer : function(game) {
    player.init(game)
  }
, init : function(game) {
    this.initWorld(game)
    this.initPlayer(game)

    this.underworldKey = game.input.keyboard.addKey(Phaser.Keyboard.F)
    this.underworldKey.onDown.add(this.toggleUnderworld, this)
    this.fireFilter = game.add.filter('Fire', game.width, game.height)
  }

, update : function(game, dx) {
    for(i in this.grounds)
      this.grounds[i].body.position.x -= dx

    if(this.grounds[0].body.position.x < -game.width)
      this.grounds.shift()
    if(this.grounds[this.grounds.length-1].body.position.x < 0)
      this.addGround(game, game.width)

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
