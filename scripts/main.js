var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update})
var pause = false
var meter = new FPSMeter()
var step = 0.25

function preload() {
  game.load.spritesheet('ground', 'assets/ground.png', 800, 64)
  game.load.image('player', 'assets/player.png')
  game.load.image('bkg', 'assets/bkg.png')
  game.load.image('bullet', 'assets/bullet.png')
  game.load.image('mob', 'assets/mob.png')
  game.load.image('portal', 'assets/portal.png')

  game.load.image('gold', 'assets/gold.png')
  game.load.image('speed', 'assets/speed.png')
  game.load.image('machinegun', 'assets/machinegun.png')

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
var lastTime = Date.now()
function update(t) {
  meter.tick()

  var d = Date.now()
  var delta = d - lastTime
  lastTime = d
  if(!pause) {
    if(!level.animationRunning) game.physics.arcade.collide(player.instance, level.grounds)

    game.physics.arcade.overlap(player.instance, level.portals, level.toggleUnderworld)
    game.physics.arcade.collide(mobsService.mobs, level.grounds)
    game.physics.arcade.collide(lootService.loots, level.grounds)

    game.physics.arcade.collide(player.bullets, mobsService.mobs, mobsService.killed)

    game.physics.arcade.overlap(player.instance, lootService.loots, player.pickUp)

    game.physics.arcade.overlap(player.instance, mobsService.mobs, player.loose)

    var mvtDelta = Math.floor(delta*step)
    player.update(mvtDelta)
    level.update(mvtDelta)
    mobsService.update(mvtDelta)
    lootService.update(mvtDelta)

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
