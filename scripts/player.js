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
    this.jumpKey = game.input.keyboard.addKey(Phaser.Keyboard.Q)
    this.fireKey = game.input.keyboard.addKey(Phaser.Keyboard.W)

    this.bullets = game.add.group()
    this.bullets.enableBody = true
    this.bullets.physicsBodyType = Phaser.Physics.ARCADE
    this.bullets.createMultiple(30, 'bullet')
    this.bullets.setAll('checkWorldBounds', true)
    this.bullets.setAll('outOfBoundsKill', true)

    this.instance = game.add.sprite(32, game.world.height - 150, 'player')
    game.physics.arcade.enable(this.instance)
    this.instance.body.bounce.y = 0.0
    this.instance.body.gravity.y = 300
    this.instance.body.collideWorldBounds = true

    this.jumpKey.onDown.add(this.jump, this)
    this.fireKey.onDown.add(function(){this.firing = true}, this)
    this.fireKey.onUp.add(function(){this.firing = false}, this)

    this.gold = 0
  }
, jump : function() {
    if(this.instance.body.touching.down) {
      this.instance.body.velocity.y -= 200
    }
}
, update : function() {
    this.fireCoolDown -= 1
    if(this.firing) this.fire()
  }
, pickUp : function(playerInstance, loot) {
    loot.type.pickUp(loot.type)
    destroy(loot)
  }
, fire : function() {
    if(this.fireCoolDown > 0) return;
    this.fireCoolDown = this.weapon.fireCoolDown
    for(var i = 1; i <= this.weapon.nbBullets; i++) {
      bullet = this.bullets.getFirstExists(false)
      bullet.reset(this.instance.x, this.instance.y+32-i*20)
      bullet.body.velocity.x = 500
    }
  }
, loose : function() {
    pause = true
    var text = "GAME OVER"
    var style = { font: "65px Arial", fill: "#ff0044", align: "center" }

    var t = game.add.text(game.world.centerX-100, game.world.centerY-100, text, style)
  }
, displayDashboard : function() {
    var graphics = game.add.graphics(0, 0)
    graphics.beginFill(0xFF3300)
    graphics.drawRect(0, 0, game.width, game.height/10)
    graphics.endFill()

    textService.write({x:200, y:0}, 'white', "Gold: " + this.gold+ "\n alive : " + this.bullets.countLiving())
  }
, addGold : function(g) {
    this.gold += g
    if(this.gold >= 1) {
      this.gold -= 10
      level.openPortal()
    }
  }
}
