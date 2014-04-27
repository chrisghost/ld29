var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update})
var meter = new FPSMeter()
var baseStep = 0.25
var step = 0.25
var gamerunnning = false

function preload() {
  game.load.spritesheet('ground', 'assets/ground.png', 800, 64, 2)
  game.load.spritesheet('player', 'assets/player.png', 22, 36, 10)
  game.load.image('bkg', 'assets/bkg.png')
  game.load.image('bullet', 'assets/bullet.png')
  game.load.image('peaceful0', 'assets/peaceful0.png')
  game.load.image('peaceful1', 'assets/peaceful1.png')
  game.load.image('mob0', 'assets/mob.png')
  game.load.image('mob1', 'assets/mob1.png')
  game.load.spritesheet('boss', 'assets/boss.png', 320, 64, 1)
  game.load.image('portal', 'assets/portal.png')

  game.load.image('gold', 'assets/gold.png')
  game.load.image('speed', 'assets/speed.png')
  game.load.image('bulletplus', 'assets/machinegun.png')
  game.load.image('fastfire', 'assets/fastfire.png')
  game.load.image('health', 'assets/health.png')
  game.load.image('fireball', 'assets/fireball.png')

  game.load.script('filter', 'scripts/filters/Fire.js')
}

function create() {


  game.onPause.add(onPause, this)
  game.onResume.add(onResume, this)
  game.physics.startSystem(Phaser.Physics.ARCADE)
  game.input.keyboard.addKey(Phaser.Keyboard.P).onDown.add(function() {
    if(gamerunnning == false) launchGame()
  })
  textService.title(
      "Ludum Dare 29\n"+
      "The Underworld Adventure\n"+
      "Controls: W - Fire\n"+
      "          P - Launch\n"
  )
}

function launchGame() {
  textService.clear()
  level.init()
  mobsService.init()
  lootService.init()
  player.init()
  gamerunnning = true
}

var textTimer = 0
var lastTime = Date.now()
function update(t) {
  meter.tick()

  var d = Date.now()
  var delta = d - lastTime
  lastTime = d
    //if(!level.animationRunning)
  game.physics.arcade.collide(player.instance, level.grounds)

  if(mobsService.bossAlive) {
    game.physics.arcade.overlap(player.instance, mobsService.fireballs, player.hit)
    game.physics.arcade.overlap(player.bullets, mobsService.fireballs, function(bullet, fb) { bullet.kill() })
  }

  game.physics.arcade.overlap(player.instance, level.portals, level.toggleUnderworld)
  game.physics.arcade.collide(mobsService.mobs, level.grounds)
  game.physics.arcade.collide(lootService.loots, level.grounds)

  game.physics.arcade.collide(player.bullets, mobsService.mobs, mobsService.killed)

  game.physics.arcade.overlap(player.instance, lootService.loots, player.pickUp)

  game.physics.arcade.overlap(player.instance, mobsService.mobs, player.hit)

  if(gamerunnning) {
    var mvtDelta = Math.floor(delta*step)
    player.update(mvtDelta)
    level.update(mvtDelta)
    mobsService.update(mvtDelta)
    lootService.update(mvtDelta)

    textTimer++
    if(textTimer > 20) {
      stats.displayDashboard()
      textTimer = 0
    }
  }
}

function onPause() {
}

function onResume() {
  //lastTime = Date.now()
}

// Utility to destroy an object
function destroy(a, b) {
  if(typeof a != 'undefined') a.kill()
  if(typeof b != 'undefined') b.kill()
}
