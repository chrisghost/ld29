var stats = {
  elem : document.getElementById('stats')
, startTime : moment(Date())
, time : 0
, finish : function() {
  stats.time = moment(Date()).subtract(stats.startTime)
}
, displayDashboard : function() {
    var uwP = Math.floor(level.underWorldPower)
    var str = "<div class='statsColumn'>"
            + "<div class='statsBarContainer'>"
            + "  <div class='statsBar' style='width:"+player.gold*20+"%;background-color:#969623'>Gold&nbsp;:&nbsp;"+player.gold+"&nbsp;(5&nbsp;to&nbsp;open&nbsp;a&nbsp;portal)</div>"
            + "</div>"
            + "<div class='statsBarContainer' style='background-color:red'>"
            + "  <div class='statsBar' style='width:"+player.life+"%;background-color:green'>Life&nbsp;:&nbsp;"+player.life+"%</div>"
            + "</div></div>"
            + "<div class='statsColumn'><div class='statsBarContainer'>"
            + "  <div class='statsBar' style='width:"+uwP+"%;background-color:violet;'>UnderWorld&nbsp;Power&nbsp;"+uwP+"%</div>"
            + "</div>"
    if(mobsService.bossAlive) str += "<div class='statsBarContainer'>"+ "<div class='statsBar' style='width:"+mobsService.boss.life+"%;background-color:orange;'>Boss&nbsp;Life:&nbsp;"+mobsService.boss.life+"</div>"+ "</div>"
    str += "</div>"
    this.elem.innerHTML = str
  }

}
