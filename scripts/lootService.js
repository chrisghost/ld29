var lootService = {
  loots : null
, possibleLoots : [
    { sprite : 'gold', lootChance: 10, pickUp : function(that) { player.addGold(1) } }
  , { sprite : 'speed', lootChance: 1, pickUp : function(that) { step += 0.01 } }
  , { sprite : 'bulletplus', lootChance: 1, pickUp : function(that) { player.weapon.nbBullets += 1 } }
  , { sprite : 'fastfire', lootChance: 1, pickUp : function(that) { player.weapon.fireCoolDown -= 0.2} }
  ]
, init : function() {
    this.loots = game.add.group()
    this.loots.enableBody = true
  }
, killall : function() {
    this.loots.forEachAlive(function(e) {
      e.kill()
    })
  }
, randomLoot : function() {
    var n = Math.floor(Math.random()*this.possibleLoots.reduce(function(prev, cur){ return prev + cur.lootChance }, 0))
    var i = 0
    while(n >= 0) {
      if(n - this.possibleLoots[i].lootChance < 0)
        break
      n -= this.possibleLoots[i].lootChance
      i++
    }
    return this.possibleLoots[i]
  }
, loot : function(position) {
    var rLoot = this.randomLoot()
    var loot = this.loots.create(position.x, position.y, rLoot.sprite)

    loot.type = rLoot
    loot.body.bounce.y = 0.5
    loot.body.gravity.y = 300
  }
, update : function(dx) {
    this.loots.forEachExists(function(e) {
      e.body.position.x -= dx
    })
  }
}
