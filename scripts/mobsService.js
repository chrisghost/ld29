var mobsService = {
  mobs : null
, init : function() {
    this.mobs = game.add.group()
    this.mobs.enableBody = true
}
, createMob : function(type, x, y) {
  var mob = this.mobs.create(x, y, 'mob')

  mob.body.bounce.y = 0.0
  mob.body.gravity.y = 300
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
