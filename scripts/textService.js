var textService = {
  texts : []
, announce : function(text) {
    var t = this.write({x:50, y:game.height/2}, 'white', text, "50px Monospace")
    setTimeout(function(){t.destroy()}, 1000)
  }
, title : function(text) {
    this.texts.push(this.write({x:50, y:game.height/3}, 'white', text, "50px Monospace"))
  }
, clear : function() {
    for(i in this.texts) {
      this.texts[i].destroy()
    }
  }
, write : function(position, color, text, font) {
    var ft = font || "10px Monospace"
    return game.add.text(position.x, position.y, text, { font: font, fill: "#FFFFFF", align: "center" })
  }
}
