var bullet
var player = {
  instance : null
, jumpKey : null
, bullets : null
, fireCoolDown : 0
, weapon : {}
, firing : false
, gold : 0
, life : 100
, maxLife : 100
, loose : false
, win : false
, doubleJump : true
, init : function() {
    this.win = false
    this.loose = false
    this.doubleJump = true
    this.life = this.maxLife
    this.gold = 0
    this.weapon = { name: 'gun', fireCoolDown : 30, nbBullets: 1 }

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

    player.gold = 0
  }
, resetPosition : function() {
    player.instance.body.position = { x: 32, y: game.world.height-120 }
  }
, resetGravity : function() {
    player.instance.body.gravity.y = 1000
  }
, killallBullets : function() {
    player.bullets.forEachAlive(function(e) {
      e.kill()
    })
  }
, jump : function() {
    if(!player.instance.body.touching.down && !player.doubleJump) return;
    if(!player.instance.body.touching.down && player.doubleJump) player.doubleJump = false

    player.instance.body.velocity.y = -500
}
, update : function() {
    player.fireCoolDown -= 1
    if(player.firing) player.fire()

    if(!player.doubleJump && player.instance.body.touching.down) player.doubleJump = true
  }
, pickUp : function(playerInstance, loot) {
    loot.type.pickUp(loot.type)
    destroy(loot)
  }
, fire : function() {
    if(player.fireCoolDown > 0) return;
    player.fireCoolDown = player.weapon.fireCoolDown
    this._fire(player.weapon)
  }
, _fire : function(weapon) {
    for(var i = 0; i < weapon.nbBullets; i++) {
      bullet = player.bullets.getFirstExists(false)
      if(bullet == null) bullet = player.bullets.create(0, 0, 'bullet')
      bullet.reset(player.instance.x, player.instance.y)

      if(i!=0) bullet.rotation = (Math.PI/weapon.nbBullets)*i-Math.PI/2
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
    if(player.weapon.fireCoolDown > 40) player.weapon.fireCoolDown = 40
      mob.kill()
    if(player.life <= 0) player.loose = true
  }
, addGold : function(g) {
    player.gold += g
    if(player.gold >= 5) {
      player.gold -= 5
      level.openPortal()
    }
  }
}
