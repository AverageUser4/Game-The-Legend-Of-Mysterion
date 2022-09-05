class Positionor extends Singleton {

  x;
  map;
  difficulty;

  constructor() {
    super();

    this.x = Number(localStorage.getItem('position-x'));
    if(!Number.isInteger(this.x))
      this.setInfo('x', 0);

    this.map = localStorage.getItem('position-map');
    if(this.map === null)
      this.setInfo('map', 'tutorial');

    this.difficulty = Number(localStorage.getItem('position-difficulty'));
    if(!Number.isInteger(this.difficulty))
      this.setInfo('difficulty', 0);
  }

  getInfo(which) {
    return this[which];
  }

  setInfo(which, value) {
    this[which] = value;
    localStorage.setItem(`position-${which}`, this[which]);
  }

}

const positionor = new Positionor();