'use strict';

class GameplayStats extends Singleton {

  eventTarget = new EventTarget();

  class;
  level;
  experience;
  gold;

  endurance;
  defence;
  strength;
  dexterity;
  energy;  
  speed = 7;

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
  }

  addExperience(amount) {
    console.log(`amount: ${amount}`);

    let current = this.experience + amount;
    let required = this.getExperienceRequired();

    while(current >= required) {
      current -= required;
      required = this.getExperienceRequired();
      this.levelUp();
    }

    this.overwriteStat('experience', current);
  }

  getExperienceRequired() {
    // if(debugor.debug)
    //   return this.level * 2;

    return this.level * 250;
  }

  levelUp() {
    this.level++;
    localStorage.setItem('character-level', this.level);
    this.eventTarget.dispatchEvent(new Event('levelUp'));
  }

  getPoints(which) {
    return this.level - this[which];
  }

  hasAvailablePoints() {
    if([
      'endurance',
      'defence',
      'strength',
      'dexterity',
      'energy'
    ].every((val) => this.getPoints(val) === 0))
      return false;

    return true;
  }

  getStat(which) {
    return this[which];
  }

  addToStat(which, amount = 1) {
    if(
        which !== 'gold' &&
        which !== 'experience' &&
        this[which] + amount > this.level
      )
      return false;

    this[which] += amount;
    this.storeAndDispatchEvent(which);
  }

  overwriteStat(which, newValue) {
    this[which] = newValue;
    this.storeAndDispatchEvent(which);
  }

  storeAndDispatchEvent(which) {
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