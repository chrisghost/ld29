var player = {
  instance : null
, jumpKey : null
, init : function(game) {
    this.jumpKey = game.input.keyboard.addKey(Phaser.Keyboard.Q)
    this.instance = game.add.sprite(32, game.world.height - 150, 'player')
    game.physics.arcade.enable(this.instance)
    this.instance.body.bounce.y = 0.0
    this.instance.body.gravity.y = 300
    this.instance.body.collideWorldBounds = true
  }

, update : function() {
    if(this.jumpKey.isDown && this.instance.body.touching.down) {
      this.instance.body.velocity.y -= 200
    }
  }

}
