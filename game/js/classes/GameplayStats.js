'use strict';

class GameplayStats extends Singleton {

  eventTarget = new EventTarget();

  class;
  level;

  get health() {
    return this.endurance * 100;
  }
  set health(x) {
    return x;
  };
  
  get damage() {
    const average = this.strength * 10;
    const min = average / 2;
    const max = average * 1.5;
    return { average, min, max };
  }
  set damage(x) { 
    return x;
  }

  endurance;
  defence;
  strength;
  dexterity;
  energy;  
  speed = 7;

  constructor() {
    super();

    this.class = localStorage.getItem('character-class');
    if(this.class === null)
     this.class = 'warrior';

    const stats = ['level', 'endurance', 'defence', 'strength', 'dexterity', 'energy'];
    for(let val of stats) {
      this[val] = localStorage.getItem(`character-${val}`);
      
      if(!this[val])
       this[val] = 1;
      else
        this[val] = Number(this[val]);
    }

    // debug
    this.level = 10;
  }

  getPoints(which) {
    return this.level - this[which];
  }
  
  levelUp() {
    this.level++;
    localStorage.setItem('level', this.level);
    this.eventTarget.dispatchEvent(new Event('levelUp'));
  }

  getStat(which) {
    return this[which];
  }

  updateStat(which) {
    if(this[which] + 1 > this.level)
      return false;

    this[which]++;
    localStorage.setItem(which, this[which]);
    const event = new Event(`statUpdate`);
    event.whichStat = which;
    this.eventTarget.dispatchEvent(event);
  }

}

const gameplayStats = new GameplayStats();

// - character-class (warrior, wizard or archer) - defines images used for player character and it's bullet
// - character-level - stuff gets multiplied by it

// - character-health - health = endurance * 100
// - character-endurance - ^
// - character-defence - gets substracted from the damage player intercepts
// - character-damage - average damage = strength * 10, min damage = damage / 2, max damage = damage * 1.5 (all rounded)
// - character-strength - ^
// - character-dexterity - does nothing
// - character-energy - fatigue points regeneration speed = energy