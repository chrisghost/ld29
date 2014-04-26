var lootService = {
  loots : null
, init : function() {
    this.loots = game.add.group()
    this.loots.enableBody = true
  }
, loot : function(position) {
    var loot = this.loots.create(position.x, position.y, 'gold')

    loot.lootType = 'gold'
    loot.body.bounce.y = 0.5
    loot.body.gravity.y = 300
  }
, update : function(dx) {
    this.loots.forEachExists(function(e) {
      e.body.position.x -= dx
    })
  }
}
