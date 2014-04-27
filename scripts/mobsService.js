var mobsService = {
  mobs : null
, bossAlive : false
, boss : {life:0}
, init : function() {
    this.mobs = game.add.group()
    this.mobs.enableBody = true
    this.mobs.setAll('checkWorldBounds', true)
    this.mobs.setAll('outOfBoundsKill', true)
}
, createMobsOnNewGround : function(fromX) {
    if(this.bossAlive) return
    var toX = fromX + level.groundWidth
    for(var x = fromX; x < toX; x += 100-level.underWorldPower/10) {
      this.createMob(x - Math.floor((Math.random()-0.5)*50), game.height - 128)
    }
  }
, createMob : function(x, y) {
  var mob = this.mobs.create(x, y, 
      level.underWorld ? 'mob'+random.nextInt(2) : 'peaceful'+random.nextInt(2))

  mob.jumpCooldown = random.nextInt(150)
  mob.body.bounce.y = 0.0
  mob.body.gravity.y = 300
  mob.hitPower = 0
  if(level.underWorld) {
    mob.hitPower = 5
    //mob.filters = [level.fireFilter]
  }
}
, killed : function(bullet, mob) {
  if(mob.isBoss) return mobsService.hitBoss(bullet, mob)

  lootService.loot(mob.position)
  destroy(bullet, mob)
  if(level.underWorld) {
    level.underWorldPower += 20
    if(level.underWorldPower >= 100 && !mobsService.bossAlive) {
      mobsService.killall()
      mobsService.spawnBoss()
    }
  }
}
, hitBoss : function(bullet, boss) {
    boss.life-=5
    destroy(bullet)
    boss.body.velocity.x = 0
  }
, killall : function() {
    this.mobs.forEachAlive(function(e) {
      e.kill()
    })
  }
, spawnBoss : function() {
    this.bossAlive = true
    var boss = this.mobs.create(game.width-200, game.height/2, 'boss')
    boss.scale.setTo(3, 3)
    this.boss = boss

    boss.jumpCooldown = random.nextInt(150)
    boss.body.bounce.y = 0.0
    boss.body.gravity.y = 300
    boss.hitPower = 20
    boss.isBoss = true
    boss.life = 100
  }
, update : function(dx) {
    this.mobs.forEachAlive(function(e) {
      this.updateMob(dx, e)
    }, this)
  }
, updateMob : function(dx, mob) {
    if(mob.isBoss) {
      if(mob.life > 70) {
        if(this.mobs.countLiving() < 10 && Math.random()>0.99)
          for(var i = 0; i < 10; i++)
            this.createMob(game.width-random.nextInt(200)+100, game.height/2)
      }
    } else {
      mob.body.position.x -= dx
      if(mob.body.touching.down) {
        mob.jumpCooldown--
        if(mob.jumpCooldown <= 0) {
          mob.jumpCooldown = random.nextInt(150)
          mob.body.velocity.y -= 300
        }
      }
      if(mob.body.position.x < -100) mob.kill()
    }
  }
}
