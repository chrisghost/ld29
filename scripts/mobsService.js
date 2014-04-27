var mobsService = {
  mobs : null
, init : function() {
    this.mobs = game.add.group()
    this.mobs.enableBody = true
    this.mobs.setAll('checkWorldBounds', true)
    this.mobs.setAll('outOfBoundsKill', true)
}
, createMobsOnNewGround : function(fromX) {
    var toX = fromX + level.groundWidth
    for(var x = fromX; x < toX; x += 100) {
      this.createMob(x - Math.floor((Math.random()-0.5)*50), game.height - 128)
    }
  }
, createMob : function(x, y) {
  var mob = this.mobs.create(x, y, 'mob'+random.nextInt(2))

  mob.jumpCooldown = random.nextInt(150)
  mob.body.bounce.y = 0.0
  mob.body.gravity.y = 300
  mob.hitPower = 1
  if(level.underWorld) {
    mob.hitPower = 5
    //mob.filters = [level.fireFilter]
  }
}
, killed : function(bullet, mob) {
  lootService.loot(mob.position)
  destroy(bullet, mob)
  if(level.underWorld) level.underWorldPower += 1
}
, killall : function() {
    this.mobs.forEachAlive(function(e) {
      e.kill()
    })
  }
, update : function(dx) {
    this.mobs.forEachExists(function(e) {
      e.body.position.x -= dx
      this.updateMob(e)
    }, this)
  }
, updateMob : function(mob) {
    if(mob.body.touching.down) {
      mob.jumpCooldown--
      if(mob.jumpCooldown <= 0) {
        mob.jumpCooldown = random.nextInt(150)
        mob.body.velocity.y -= 300
      }
    }
  }
}
