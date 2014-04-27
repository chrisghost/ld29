var textService = {
  announce : function(text) {
    this.write({x:50, y:game.height/2}, 'white', text, "50px Monospace")
  }
, write : function(position, color, text, font) {
    var ft = font || "20px Monospace"
    game.add.text(position.x, position.y,
      text, { font: font, fill: "#FFFFFF", align: "center" }
    )
  }
}
