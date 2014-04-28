var bullet
var player = {
  instance : null
, jumpKey : null
, bullets : null
, fireCoolDown : 0
, weapon : { name: 'gun', fireCoolDown : 40, nbBullets: 2 }
, firing : false
, gold : 0
, life : 100
, maxLife : 100
, init : function() {
    player.jumpKey = game.input.keyboard.addKey(Phaser.Keyboard.D)
    player.fireKey = game.input.keyboard.addKey(Phaser.Keyboard.S)

    player.bullets = game.add.group()
    player.bullets.enableBody = true
    player.bullets.physicsBodyType = Phaser.Physics.ARCADE
    player.bullets.createMultiple(30, 'bullet')
    player.bullets.setAll('checkWorldBounds', true)
    player.bullets.setAll('outOfBoundsKill', true)

    player.instance = game.add.sprite(32, game.world.height - 150, 'player');
    player.instance.animations.add('player');
    player.instance.animations.play('player', 20, true);

    game.physics.arcade.enable(player.instance)
    player.instance.physicsBodyType = Phaser.Physics.ARCADE
    player.instance.body.bounce.y = 0.0
    player.instance.body.collideWorldBounds = true
    player.resetGravity()

    player.jumpKey.onDown.add(player.jump, player)
    player.fireKey.onDown.add(function(){player.firing = true}, player)
    player.fireKey.onUp.add(function(){player.firing = false}, player)

    player.gold = 0
  }
, resetPosition : function() {
    player.instance.body.position = { x: 32, y: game.world.height-120 }
  }
, resetGravity : function() {
    player.instance.body.gravity.y = 700
  }
, killallBullets : function() {
    player.bullets.forEachAlive(function(e) {
      e.kill()
    })
  }
, jump : function() {
    if(player.instance.body.touching.down) {
      player.instance.body.velocity.y -= 500
    }
}
, update : function() {
    player.fireCoolDown -= 1
    if(player.firing) player.fire()
  }
, pickUp : function(playerInstance, loot) {
    loot.type.pickUp(loot.type)
    destroy(loot)
  }
, fire : function() {
    if(player.fireCoolDown > 0) return;
    player.fireCoolDown = player.weapon.fireCoolDown
    for(var i = 0; i < player.weapon.nbBullets; i++) {
      bullet = player.bullets.getFirstExists(false)
      if(bullet == null) bullet = player.bullets.create(0, 0, 'bullet')
      bullet.reset(player.instance.x, player.instance.y)

      if(i!=0) bullet.rotation = (Math.PI/player.weapon.nbBullets)*i-Math.PI/2
      //bullet.body.rotation = (Math.PI*2/player.weapon.nbBullets)*i

      bullet.body.velocity.x = Math.cos(bullet.rotation)*500
      bullet.body.velocity.y = Math.sin(bullet.rotation)*500
    }
  }
, hit : function(p, mob) {
  player.life -= mob.hitPower
  player.weapon.nbBullets--
  if(player.weapon.nbBullets < 1) player.weapon.nbBullets = 1
  player.weapon.fireCoolDown += 10
  if(player.weapon.fireCoolDown > 50) player.weapon.fireCoolDown = 50
  mob.kill()
  if(player.life <= 0) player.loose()
}
, win : function() {
    stats.finish()
    mobsService.killall()
    var finishTxt = "You won in "+moment(stats.time).format('m')+" min. "+moment(stats.time).format('s')+" sec."
    textService.announce(finishTxt, false)
    gamerunnning = false
  }
, loose : function() {
    stats.finish()
    var finishTxt = "You lost in "+moment(stats.time).format('m')+" min. "+moment(stats.time).format('s')+" sec."
    textService.announce(finishTxt, false)
    gamerunnning = false
  }
, addGold : function(g) {
    player.gold += g
    if(player.gold >= 5) {
      player.gold -= 5
      level.openPortal()
    }
  }
}
