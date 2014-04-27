var mobsService = {
  mobs : null
, fireballs : null
, bossAlive : false
, boss : {life:0}
, init : function() {
    this.mobs = game.add.group()
    this.mobs.enableBody = true
    this.mobs.setAll('checkWorldBounds', true)
    this.mobs.setAll('outOfBoundsKill', true)

    this.fireballs = game.add.group()
    this.fireballs.enableBody = true
    this.fireballs.setAll('checkWorldBounds', true)
    this.fireballs.setAll('outOfBoundsKill', true)
}
, createMobsOnNewGround : function(fromX) {
    if(this.bossAlive) return
    var toX = fromX + level.groundWidth
    for(var x = fromX; x < toX; x += 100-level.underWorldPower/10) {
      this.createMob(x - Math.floor((Math.random()-0.5)*50), game.height - 128)
    }
  }
, createMob : function(x, y) {
  var type = 'peaceful'+random.nextInt(2)
  if(level.underWorld) {
    var n = random.nextInt(Math.ceil(level.underWorldPower))
    n = n > 6 ? 1 :
          n > 3 ? 2 : 0
    type = 'mob'+n
  }
  var mob = this.mobs.create(x, y, type)

  mob.isJumper = false
  if(type != 'mob2' && type != 'peaceful1') mob.isJumper = true
  mob.jumpCooldown = random.nextInt(150)
  mob.type = type
  mob.body.bounce.y = 0.0
  mob.body.gravity.y = 300
  mob.hitPower = 0
  mob.attackCoolDown = 100+random.nextInt(200)
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
    level.underWorldPower += 10//0.5
    if(level.underWorldPower >= 100 && !mobsService.bossAlive) {
      mobsService.killall()
      mobsService.spawnBoss()
    }
  }
}
, hitBoss : function(bullet, boss) {
    boss.life-=100
    destroy(bullet)
    boss.body.velocity.x = 0
    if(boss.life < 0 ) player.win()
  }
, killall : function() {
    this.mobs.forEachAlive(function(e) {
      e.kill()
    })
  }
, spawnBoss : function() {
    textService.announce("You have summoned\nKarakrian !")

    this.bossAlive = true
    var boss = this.mobs.create(game.width-200, game.height/2, 'boss')
    boss.scale.setTo(3, 3)
    this.boss = boss

    boss.animations.add('boss')
    boss.animations.play('boss', 5, true)

    boss.jumpCooldown = random.nextInt(150)
    boss.body.bounce.y = 0.0
    boss.body.gravity.y = 300
    boss.hitPower = 20
    boss.isBoss = true
    boss.life = 100
    boss.attackCoolDown = 20
  }
, update : function(dx) {
    this.mobs.forEachAlive(function(e) {
      this.updateMob(dx, e)
    }, this)
  }
, updateMob : function(dx, mob) {
    if(mob.isBoss) {
      mob.attackCoolDown--
      if(mob.attackCoolDown <= 0) {
        if(mob.life > 70) {
          if(this.mobs.countLiving() < 10) {
            for(var i = 0; i < 10; i++)
              this.createMob(game.width-random.nextInt(200)+100, game.height/2)
            mob.attackCoolDown = 250
          }
        } else if(mob.life > 50) {
          for(var i = mob.body.position.y; i < mob.body.position.y+mob.body.height; i += 40) {
            this.launchFireball(mob, i)
          }
          mob.attackCoolDown = 150
        } else if(mob.life > 30) {
            for(var i = 0; i < 20; i++)
              this.createMob(game.width-random.nextInt(500)+100, game.height/2)
            mob.attackCoolDown = 200
        } else {
            for(var i = mob.body.position.y; i < mob.body.position.y+mob.body.height; i += 40) {
              this.launchFireball(mob, i)
            }
            mob.attackCoolDown = 150

            for(var i = 0; i < 15; i++)
              this.createMob(game.width-random.nextInt(500)+100, game.height/2)
            mob.attackCoolDown = 200
        }
      }
    } else {
      mob.body.position.x -= dx
      if(mob.body.touching.down && mob.isJumper) {
        mob.jumpCooldown--
        if(mob.jumpCooldown <= 0) {
          mob.jumpCooldown = random.nextInt(150)
          mob.body.velocity.y -= 300
        }
      } else if(mob.type == 'mob2') {
        mob.body.position.x -= dx
      }
      mob.attackCoolDown--
      if(mob.attackCoolDown <= 0) {
        if(mob.type == 'mob1') {
          mob.attackCoolDown = 500
          this.launchFireball(mob, mob.body.position.y-mob.body.height/2)
        }
      }
      if(mob.body.position.x < -100) mob.kill()
    }
  }
, launchFireball : function(mob, i) {
    var fireball = mobsService.fireballs.getFirstExists(false)
    if(fireball == null) fireball = mobsService.fireballs.create(0, 0, 'fireball')
    fireball.reset(mob.body.position.x, i)
    fireball.body.velocity.x = -random.nextInt(300)-300
    fireball.hitPower = 10
  }
}
