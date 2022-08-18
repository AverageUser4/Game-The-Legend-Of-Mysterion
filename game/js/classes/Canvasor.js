class Canvasor {

  canvas;
  ctx;

  constructor() {
    this.canvas = document.querySelector('.the-main__canvas');
    this.ctx = this.canvas.getContext('2d');


  }

}