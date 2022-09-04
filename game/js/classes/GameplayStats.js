'use strict';

class GameplayStats extends Singleton {

  eventTarget = new EventTarget();

  class;
  level;
  experience;
  gold;

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

    const stats = ['level', 'experience', 'gold', 'endurance', 'defence', 'strength', 'dexterity', 'energy'];
    for(let val of stats) {
      this[val] = localStorage.getItem(`character-${val}`);
      
      if(!this[val])
       this[val] = 1;
      else
        this[val] = Number(this[val]);
    }

    // debug
    this.level = 1000;
  }

  addExperience(amount) {
    const required = this.getExperienceRequired();

    if(this.experience + amount >= required) {
      amount = this.experience + amount - required;
      this.levelUp();
    }

    this.updateStat('experience', amount);
  }

  getExperienceRequired() {
    return this.level * 250;
  }

  levelUp() {
    this.level++;
    localStorage.setItem('level', this.level);
    this.eventTarget.dispatchEvent(new Event('levelUp'));
  }

  getPoints(which) {
    return this.level - this[which];
  }

  getStat(which) {
    return this[which];
  }

  updateStat(which, amount = 1) {
    if(
        which !== 'gold' &&
        which !== 'experience' &&
        this[which] + amount > this.level
      )
      return false;

    this[which] += amount;
    localStorage.setItem(`character-${which}`, this[which]);
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