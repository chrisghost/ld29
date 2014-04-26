var player = {
  instance : null
, jumpKey : null
, bullets : null
, init : function(game) {
    this.jumpKey = game.input.keyboard.addKey(Phaser.Keyboard.Q)
    this.fireKey = game.input.keyboard.addKey(Phaser.Keyboard.W)

    this.bullets = game.add.group()
    this.bullets.enableBody = true

    this.instance = game.add.sprite(32, game.world.height - 150, 'player')
    game.physics.arcade.enable(this.instance)
    this.instance.body.bounce.y = 0.0
    this.instance.body.gravity.y = 300
    this.instance.body.collideWorldBounds = true

    this.jumpKey.onDown.add(this.jump, this)
    this.fireKey.onDown.add(this.fire, this)
  }
, jump : function() {
    if(this.instance.body.touching.down) {
      this.instance.body.velocity.y -= 200
    }
}
, update : function() {
  }
, fire : function() {
    var bullet = this.bullets.create(this.instance.x, this.instance.y, 'bullet')
    bullet.body.velocity.x = 500
    bullet.events.onOutOfBounds.add(function() {console.log("OUT OF BOUNDS")} , this)
    //this.bullets.push(bullet)
  }
}
