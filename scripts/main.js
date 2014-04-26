var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update})

function preload() {
  game.load.spritesheet('ground', 'assets/ground.png', 800, 64)
  game.load.image('player', 'assets/player.png')
  game.load.image('bkg', 'assets/bkg.png')

  game.load.script('filter', 'scripts/filters/Fire.js')
}

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE)
  level.init(game)
}

function update() {
  game.physics.arcade.collide(player.instance, level.groundGrp)
  player.update()
  level.update(game, 1)
}
