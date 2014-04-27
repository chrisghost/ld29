var lootService = {
  loots : null
, possibleLoots : [
    { sprite : 'gold',        lootChance: 50, lootChanceUnderworld: 2,  pickUp : function(that) { player.addGold(1) } }
  //, { sprite : 'speed',       lootChance: 1,  lootChanceUnderworld: 1,  pickUp : function(that) { step += 0.01 } }
  , { sprite : 'bulletplus',  lootChance: 0,  lootChanceUnderworld: 1,  pickUp : function(that) { player.weapon.nbBullets += 1 } }
  , { sprite : 'fastfire',    lootChance: 0,  lootChanceUnderworld: 1,  pickUp : function(that) { player.weapon.fireCoolDown -= 0.2 } }
  , { sprite : 'health',      lootChance: 20, lootChanceUnderworld: 0,  pickUp : function(that) { player.life = (player.life + 5 > player.maxLife) ? player.maxLife : player.life + 5 } }
  , { sprite : '',            lootChance: 1,  lootChanceUnderworld: 10, pickUp : function(that) { } }
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
    var n = Math.floor(Math.random()*this.possibleLoots.reduce(function(prev, cur){ return prev + ((level.underWorld) ? cur.lootChanceUnderworld : cur.lootChance) }, 0))
    var i = 0
    while(n >= 0) {
      if(n - ((level.underWorld) ? this.possibleLoots[i].lootChanceUnderworld : this.possibleLoots[i].lootChance) < 0)
        break
      n -= ((level.underWorld) ? this.possibleLoots[i].lootChanceUnderworld : this.possibleLoots[i].lootChance)
      i++
    }
    return this.possibleLoots[i]
  }
, loot : function(position) {
    var rLoot = this.randomLoot()
    if(rLoot.sprite == '') return
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
