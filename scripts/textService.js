var textService = {
  texts : []
, announce : function(text, destroy) {
    var des = (typeof destroy == 'undefined') ? true : destroy
    var t = this.write({x:50, y:game.height/2}, 'white', text, "50px Arial")
    if(des) setTimeout(function(){t.destroy()}, 1000)
  }
, title : function(text) {
    this.write({x:50, y:game.height/3}, 'white', text, "50px Arial")
  }
, clear : function() {
    for(i in this.texts) {
      this.texts[i].destroy()
    }
  }
, write : function(position, color, text, font) {
    var ft = font || "10px Arial"
    var col = color || "#FFFFFF"
    var el = game.add.text(position.x, position.y, text, { font: font, fill: col, align: "center" })
    this.texts.push(el)
    return el
  }
}
