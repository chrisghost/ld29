var bullet
var player = {
  instance : null
, jumpKey : null
, bullets : null
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
    this.fireKey.onDown.add(this.fire, this)

    this.gold = 0
  }
, jump : function() {
    if(this.instance.body.touching.down) {
      this.instance.body.velocity.y -= 200
    }
}
, update : function() {
  }
, pickUp : function(playerInstance, loot) {
    if(loot.lootType == 'gold') player.gold += 1
    destroy(loot)
  }
, fire : function() {
    bullet = this.bullets.getFirstExists(false)
    bullet.reset(this.instance.x, this.instance.y)
    bullet.body.velocity.x = 500
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

    game.add.text(200, 0, 
      "Gold: " + this.gold+ "\n alive : " + this.bullets.countLiving(),
      { font: "20px Arial", fill: "#FFFFFF", align: "right" }
    )

  }
}
