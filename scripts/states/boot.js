var bootState = {
  preload: function () {
    this.load.image('preloaderBackground', 'assets/preloaderBackground.png');
    this.load.image('preloaderBar', 'assets/preloaderBar.png');
    this.load.image('splashscreen', 'assets/splashscreen.png');
  }
, create: function () {
    game.state.start('loader')
  }
}
