class UIUpdator extends Singleton {

  levelSpan;
  experienceSpan;
  goldSpan;
  statsSpan;

  constructor() {
    super();
    
    this.levelSpan = document.querySelector('[data-header-stat="level"]');
    this.experienceSpan = document.querySelector('[data-header-stat="experience"]');
    this.goldSpan = document.querySelector('[data-header-stat="gold"]');

    this.statsSpan = document.querySelector('[data-content="statistics"]').children[0];

    gameplayStats.eventTarget.addEventListener('levelUp', () => this.onLevelUp());
    gameplayStats.eventTarget.addEventListener('statUpdate', (e) => this.onStatUpdate(e));

    this.onLevelUp(true);
    this.onStatUpdate({ whichStat: 'experience' });
    this.onStatUpdate({ whichStat: 'gold' });
  }

  onLevelUp(initial = false) {
    this.levelSpan.textContent = gameplayStats.getStat('level');
    this.onStatUpdate({ whichStat: 'experience' });

    if(!initial)
      this.statsSpan.textContent = '❗';
  }

  onStatUpdate(e) {
    if(e.whichStat === 'experience') {
      const current = gameplayStats.getStat('experience');
      const required = gameplayStats.getExperienceRequired();
      this.experienceSpan.textContent = `${current} / ${required}`;
    } 
    else if(e.whichStat === 'gold') {
      this.goldSpan.textContent = gameplayStats.getStat('gold');
    } 
    else if
      (!gameplayStats.hasAvailablePoints()) {
        this.statsSpan.textContent = '';
    }
  }

}

const uiUpdator = new UIUpdator();
