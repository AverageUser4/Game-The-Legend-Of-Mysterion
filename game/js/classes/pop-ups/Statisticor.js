class Statisticor extends Singleton {

  container;
  content;
  allStats = new Map();
  allPoints = new Map();

  constructor(container) {
    super();
    
    this.container = container;
    this.content = document.createElement('div');
    this.content.innerHTML =
      `
        <h3 class="the-main__various-header">Statystyki</h3>

        <ul class="the-main__various-list">

          <li class="the-main__various-list-item"> Klasa:                   <span data-stat="class"></span></li>
          <li class="the-main__various-list-item"> Poziom:                  <span data-stat="level"></span></li>
          <li class="the-main__various-list-item"> Doświadczenie:           <span data-stat="experience"></span></li>
          <li class="the-main__various-list-item"> Złoto:                   <span data-stat="gold"></span></li>

          <li class="the-main__various-list-item"> Życie:                   <span data-stat="health"></span></li>
          <li class="the-main__various-list-item"> Wytrzymałość:            <span data-stat="endurance"></span></li>
          <li class="the-main__various-list-item"> Obrona:                  <span data-stat="defence"></span></li>
          <li class="the-main__various-list-item"> Obrażenia:               <span data-stat="damage"></span></li>
          <li class="the-main__various-list-item"> Siła:                    <span data-stat="strength"></span></li>
          <li class="the-main__various-list-item"> Zręczność:               <span data-stat="dexterity"></span></li>
          <li class="the-main__various-list-item"> Energia:                 <span data-stat="energy"></span></li>

        </ul>

        <h3 class="the-main__various-header">Dostępne punkty:</h3>

        <ul class="the-main__various-list">

          <li class="the-main__various-list-item">
            Punkty Wytrzymałości:    
            <span data-stat-points="endurance"></span>
            <button class="the-main__stat-button" data-stat-button="endurance">+</button>
          </li>

          <li class="the-main__various-list-item">
            Punkty Obrony:    
            <span data-stat-points="defence"></span>
            <button class="the-main__stat-button" data-stat-button="defence">+</button>
          </li>

          <li class="the-main__various-list-item">
            Punkty Siły:    
            <span data-stat-points="strength"></span>
            <button class="the-main__stat-button" data-stat-button="strength">+</button>
          </li>

          <li class="the-main__various-list-item">
            Punkty Zręczności:    
            <span data-stat-points="dexterity"></span>
            <button class="the-main__stat-button" data-stat-button="dexterity">+</button>
          </li>

          <li class="the-main__various-list-item">
            Punkty Energii:    
            <span data-stat-points="energy"></span>
            <button class="the-main__stat-button" data-stat-button="energy">+</button>
          </li>

        </ul>
      `;

    const allStatsBuf = this.content.querySelectorAll('[data-stat]');
    const allPointsBuf = this.content.querySelectorAll('[data-stat-points]');

    for(let val of allStatsBuf) {
      const stat = val.getAttribute('data-stat');
      this.allStats.set(stat, val);
    }

    for(let val of allPointsBuf) {
      const stat = val.getAttribute('data-stat-points');
      this.allPoints.set(stat, val);
    }

    gameplayStats.eventTarget.addEventListener('levelUp', () => this.onLevelUp());
    gameplayStats.eventTarget.addEventListener('statUpdate', (e) => this.onStatUpdate(e));
  }

  update() {
    // get stats and points and insert them into html
    // run everytime the window with stats gets open
    for(let [key, val] of this.allStats) {
      const which = val.getAttribute('data-stat');
      const stat = gameplayStats.getStat(which);

      if(which === 'damage')
        val.textContent = `${stat.min} - ${stat.max}`;
      else if(which === 'class') {
        let polishName = 'wojownik';

        if(stat === 'wizard')
          polishName = 'czarodziej';
        else if(stat === 'archer')
          polishName = 'łucznik';

        val.textContent = polishName;
      } 
      else if(which === 'experience') {
        const current = gameplayStats.getStat('experience');
        const required = gameplayStats.getExperienceRequired();

        val.textContent = `${current} / ${required}`;
      }
      else
        val.textContent = stat;
    }

    for(let [key, val] of this.allPoints) {
        const which = val.getAttribute('data-stat-points');
        const points = gameplayStats.getPoints(which);
        val.textContent = points;
        val.nextElementSibling.addEventListener('click', () => gameplayStats.updateStat(which));
    }
  }

  insert() {
    this.update();

    this.container.textContent = '';
    this.container.appendChild(this.content);
  }

  onStatUpdate(e) {
    const statValue = gameplayStats.getStat(e.whichStat);
    const points = gameplayStats.getPoints(e.whichStat);

    this.allStats.get(e.whichStat).textContent = statValue;

    if(e.whichStat !== 'gold' && e.whichStat !== 'experience')
      this.allPoints.get(e.whichStat).textContent = points;

    if(e.whichStat === 'strength') {
      const dmg = gameplayStats.getStat('damage');
      this.allStats.get('damage').textContent = `${dmg.min} - ${dmg.max}`;
    } else if(e.whichStat === 'endurance') {
      this.allStats.get('health').textContent = gameplayStats.getStat('health');
    }
  }

}