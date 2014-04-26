var mobsService = {
  mobs : null
, init : function() {
    this.mobs = game.add.group()
    this.mobs.enableBody = true
}
, createMob : function(type) {
  var mob = this.mobs.create(game.width/2, game.height/2, 'mob')

  mob.body.bounce.y = 0.0
  mob.body.gravity.y = 300

  game.physics.arcade.enable(mob)
}
, killed : function(bullet, mob) {
  lootService.loot(mob.position)
  destroy(bullet, mob)
}
, update : function(dx) {
    this.mobs.forEachExists(function(e) {
      e.body.position.x -= dx
    })
  }
}
