var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update})

function preload() {
  game.load.image('ground', 'assets/ground.png')
  game.load.image('player', 'assets/player.png')
}

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE)
  level.init(game)
}

function update() {
  game.physics.arcade.collide(player.instance, level.groundGrp)
  player.update()
}
