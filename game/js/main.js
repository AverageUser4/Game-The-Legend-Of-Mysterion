'use strict';

class Mainor {

  static hasInstance = false;

  levelor;

  constructor() {
    if(Mainor.hasInstance)
      throw new Error('Mainor can have only one instance.');

    Mainor.hasInstance = true;

    this.levelor = new Levelor();
    setInterval(() => this.gameLoop(), 33);  
  }

  gameLoop() {
    if(this.levelor.ready) {
      this.levelor.gameLoopIteration();
      if(this.levelor.changeMap) {
        this.levelor = new Levelor(
          this.levelor.changeMap.newMap,
          this.levelor.changeMap.difficulty,
          this.levelor.changeMap.startOnEnd,
        );
      }
    }
  }

}

const mainor = new Mainor();

