var stats = {
  elem : document.getElementById('stats')
, displayDashboard : function() {
    var uwP = Math.floor(level.underWorldPower)
    this.elem.innerHTML = "Gold: " + player.gold
                        + "<br /> grounds : " + level.grounds.countLiving()
                        + "<br /> <div style='height:30px;width:100%;background-color:red'>"
                        + " <div style='height:30px;width:"+player.life+"%;background-color:green;text-align:center'>"+player.life+"</div>"
                        + "</div>"

                        + "<br /> <br /> <div style='height:30px;width:100%;background-color:black'>"
                        + " <div style='height:30px;width:"+uwP+"%;background-color:violet;text-align:center'>"+uwP+"</div>"
                        + "</div>"
  }

}
