var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update})
var pause = false
var meter = new FPSMeter()
var step = 5

function preload() {
  game.load.spritesheet('ground', 'assets/ground.png', 800, 64)
  game.load.image('player', 'assets/player.png')
  game.load.image('bkg', 'assets/bkg.png')
  game.load.image('bullet', 'assets/bullet.png')
  game.load.image('mob', 'assets/mob.png')
  game.load.image('gold', 'assets/gold.png')

  game.load.script('filter', 'scripts/filters/Fire.js')
}

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE)
  level.init()
  mobsService.init()
  lootService.init()
  player.init()

}

var textTimer = 0
function update() {
  meter.tick()
  if(!pause) {
    game.physics.arcade.collide(player.instance, level.grounds)
    game.physics.arcade.collide(mobsService.mobs, level.grounds)
    game.physics.arcade.collide(lootService.loots, level.grounds)

    game.physics.arcade.collide(player.bullets, mobsService.mobs, mobsService.killed)

    game.physics.arcade.overlap(player.instance, lootService.loots, player.pickUp)

    game.physics.arcade.overlap(player.instance, mobsService.mobs, player.loose)

    player.update()
    level.update(step)
    mobsService.update(step)
    lootService.update(step)

    textTimer++
    if(textTimer > 20) {
      player.displayDashboard()
      textTimer = 0
    }
  }
}

// Utility to destroy an object
function destroy(a, b) {
  if(typeof a != 'undefined') a.kill()
  if(typeof b != 'undefined') b.kill()
}
