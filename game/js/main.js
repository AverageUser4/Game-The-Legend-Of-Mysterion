'use strict';

class Mainor extends Singleton {

  levelor;
  popUpor;

  constructor() {
    super();

    this.popUpor = new PopUpor()
    this.popUpor.eventTarget.addEventListener('popUpOpen', () => this.levelor.pause());
    this.popUpor.eventTarget.addEventListener('popUpClose', () => this.levelor.unpause());

    this.levelor = new Levelor({ getFromStorage: true });
    setInterval(() => this.gameLoop(), 33);
  }

  gameLoop() {
    if(this.levelor.ready) {
      this.levelor.gameLoopIteration();
      if(this.levelor.changeMap) {
        this.levelor = new Levelor(this.levelor.changeMap);
      }
    }
  }

}

const mainor = new Mainor();