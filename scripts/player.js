var bullet
var player = {
  instance : null
, jumpKey : null
, bullets : null
, fireCoolDown : 0
, weapon : { name: 'gun', fireCoolDown : 10, nbBullets: 1 }
, firing : false
, gold : 0
, init : function() {
    player.jumpKey = game.input.keyboard.addKey(Phaser.Keyboard.Q)
    player.fireKey = game.input.keyboard.addKey(Phaser.Keyboard.W)
    game.input.keyboard.addKey(Phaser.Keyboard.J).onDown.add(level.toggleUnderworld)

    player.bullets = game.add.group()
    player.bullets.enableBody = true
    player.bullets.physicsBodyType = Phaser.Physics.ARCADE
    player.bullets.createMultiple(30, 'bullet')
    player.bullets.setAll('checkWorldBounds', true)
    player.bullets.setAll('outOfBoundsKill', true)

    player.instance = game.add.sprite(32, game.world.height - 150, 'player')
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
    for(var i = 1; i <= player.weapon.nbBullets; i++) {
      bullet = player.bullets.getFirstExists(false)
      bullet.reset(player.instance.x, player.instance.y+32-i*20)
      bullet.body.velocity.x = 500
    }
  }
, loose : function() {
    var text = "GAME OVER"
    var style = { font: "65px Arial", fill: "#ff0044", align: "center" }

    var t = game.add.text(game.world.centerX-100, game.world.centerY-100, text, style)
  }
, displayDashboard : function() {
    console.log("DRAW DASHBOARD", level.underWorld)
    var graphics = game.add.graphics(0, 0)
    graphics.beginFill(0xFF3300)
    graphics.drawRect(0, 0, game.width, game.height/10)
    graphics.endFill()

    textService.write({x:200, y:0}, 'white',
        "Gold: " + player.gold+
        "\n grounds : " + level.grounds.countLiving())
  }
, addGold : function(g) {
    player.gold += g
    if(player.gold >= 1) {
      player.gold -= 1
      level.openPortal()
    }
  }
}
