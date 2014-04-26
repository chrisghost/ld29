var level = {
  groundGrp : null
, ground : null
, initWorld : function(game) {
    this.groundGrp = game.add.group()
    this.groundGrp.enableBody = true
    this.ground = this.groundGrp.create(0, game.world.height - 64, 'ground')
    this.ground.scale.setTo(800/64, 1)
    this.ground.body.immovable = true

  }
, initPlayer : function(game) {
    player.init(game)
  }
, init : function(game) {
    this.initWorld(game)
    this.initPlayer(game)
  }

}
