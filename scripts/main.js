var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update})

function preload() {
  game.load.spritesheet('ground', 'assets/ground.png', 800, 64)
  game.load.image('player', 'assets/player.png')
  game.load.image('bkg', 'assets/bkg.png')
  game.load.image('bullet', 'assets/bullet.png')
  game.load.image('mob', 'assets/mob.png')

  game.load.script('filter', 'scripts/filters/Fire.js')
}

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE)
  level.init(game)
  mobsService.init(game)
  mobsService.createMob(0, game)
}

function update() {
  game.physics.arcade.collide(player.instance, level.groundGrp)
  game.physics.arcade.collide(mobsService.mobs, level.groundGrp)

  game.physics.arcade.collide(player.bullets, mobsService.mobs, destroy)
  player.update()
  level.update(game, 1)
}

// Utility to destroy an object
function destroy(a, b) {
  console.log("destroy", a, b);
  a.kill()
  b.kill()
}
