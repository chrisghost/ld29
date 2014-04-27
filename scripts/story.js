var story = {
  screens : [
      "+ ====== Karakrian ====== +\n\n" 
      +"Controls\n" 
      +"--------\n" 
      +"S - Fire\n" 
      +"D - Jump\n" 
      +"SPACE - Start\n" 
      +"\nCreated for Ludum Dare #29\n" 
      +"by @chradr\n"

    , "The evil ghost Karakrian \n" 
      +"wants to destroy the world!\n" 
      +"You must kill him\nto protect the earth\n" 
      +"\n" 
      +"Press SPACE"

    , "You must find a way to\ngo in the underworld\n\n" 
      +"But be careful, there are\ndangerous ennemies\n\n"
      +"Remember, you can always\ncome back to the surface\n"
      +"\n" 
      +"Press SPACE"
    ]
, i : 0
, get : function() { return this.screens[this.i] }
, next : function() { this.i++; return this.screens.length > this.i }
}
