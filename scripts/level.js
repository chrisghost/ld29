var level = {
  groundGrp : null
, grounds : []
, initWorld : function(game) {
    this.groundGrp = game.add.group()
    this.groundGrp.enableBody = true
    this.addGround(game, 0)
  }
, addGround : function(game, x) {
    var ground = this.groundGrp.create(x, game.world.height - 64, 'ground')

    //ground.scale.setTo(800/64, 1)
    ground.body.immovable = true

    this.grounds.push(ground)
  }
, initPlayer : function(game) {
    player.init(game)
  }
, init : function(game) {
    this.initWorld(game)
    this.initPlayer(game)
  }

, update : function(game, dx) {
    for(i in this.grounds)
      this.grounds[i].body.position.x -= dx

    if(this.grounds[0].body.position.x < -game.width)
      this.grounds.shift()
    if(this.grounds[this.grounds.length-1].body.position.x < 0)
      this.addGround(game, game.width)
  }
}
