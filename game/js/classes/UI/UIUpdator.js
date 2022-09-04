class UIUpdator extends Singleton {

  constructor() {
    super();
    
    this.levelSpan = document.querySelector('[data-header-stat="level"]');
    this.experienceSpan = document.querySelector('[data-header-stat="experience"]');
    this.goldSpan = document.querySelector('[data-header-stat="gold"]');

    gameplayStats.eventTarget.addEventListener('levelUp', () => this.onLevelUp());
    gameplayStats.eventTarget.addEventListener('statUpdate', (e) => this.onStatUpdate(e));

    this.onLevelUp();
    this.onStatUpdate({ whichStat: 'experience' });
    this.onStatUpdate({ whichStat: 'gold' });
  }

  onLevelUp() {
    this.levelSpan.textContent = gameplayStats.getStat('level');
  }

  onStatUpdate(e) {
    if(e.whichStat === 'experience') {
      const current = gameplayStats.getStat('experience');
      const required = gameplayStats.getExperienceRequired();
      this.experienceSpan.textContent = `${current} / ${required}`;
    } else if(e.whichStat === 'gold') {
      this.goldSpan.textContent = gameplayStats.getStat('gold');
    }
  }

}

const uiUpdator = new UIUpdator();