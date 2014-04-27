var stats = {
  elem : document.getElementById('stats')
, displayDashboard : function() {
    this.elem.innerHTML = "Gold: " + player.gold+
                          "<br /> underpower : " + level.underWorldPower+
                          "<br /> grounds : " + level.grounds.countLiving()
  }

}
