var bootState = {
  preload: function () {
    this.load.image('preloaderBackground', 'assets/preloaderBackground.jpg');
    this.load.image('preloaderBar', 'assets/preloaderBar.png');
    this.load.image('splashscreen', 'assets/splashscreen.jpg');
  }
, create: function () {
    game.state.start('loader')
  }
}
