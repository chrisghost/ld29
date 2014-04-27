var stats = {
  elem : document.getElementById('stats')
, displayDashboard : function() {
    var uwP = Math.floor(level.underWorldPower)
    var str = "Gold: " + player.gold
            + "<br /> grounds : " + level.grounds.countLiving()
            + "<br /> <div style='height:20px;width:100%;background-color:red'>"
            + " <div style='height:20px;width:"+player.life+"%;background-color:green;text-align:center'>"+player.life+"</div>"
            + "</div>"

            + "<br /> <br /> <div style='height:20px;width:100%;background-color:black'>"
            + " <div style='height:20px;width:"+uwP+"%;background-color:violet;text-align:center'>"+uwP+"</div>"
            + "</div>"
    if(mobsService.bossAlive) str += "<br /> <br /> <div style='height:20px;width:100%;background-color:black'>"+ " <div style='height:20px;width:"+mobsService.boss.life+"%;background-color:orange;text-align:center'>"+mobsService.boss.life+"</div>"+ "</div>"
    this.elem.innerHTML = str
  }

}
