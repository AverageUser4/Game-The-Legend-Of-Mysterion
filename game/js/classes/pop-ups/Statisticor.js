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

          <li class="the-main__various-list-item"> Punkty Wytrzymałości:    <span data-stat-points="endurance"></span></li>
          <li class="the-main__various-list-item"> Punkty Obrony:           <span data-stat-points="defence"></span></li>
          <li class="the-main__various-list-item"> Punkty Siły:             <span data-stat-points="strength"></span></li>
          <li class="the-main__various-list-item"> Punkty Zręczności:       <span data-stat-points="dexterity"></span></li>
          <li class="the-main__various-list-item"> Punkty Energii:          <span data-stat-points="energy"></span></li>

        </ul>
      `;

    const allStatsBuf = this.content.querySelectorAll('[data-stat]');
    const allPointsBuf = this.content.querySelectorAll('[data-stat-points]');

    for(let val of allStatsBuf) {
      console.log(val)
      const stat = val.getAttribute('data-stat');
      this.allStats.set(stat, val);
    }

    for(let val of allPointsBuf) {
      const stat = val.getAttribute('data-stat-points');
      this.allPoints.set(stat, val);
    }

    console.log(this.allStats, this.allPoints)

    // TODO:
    gameplayStats.eventTarget.addEventListener('levelUp', () => this.onLevelUp());
    gameplayStats.eventTarget.addEventListener('statUpdate', (e) => this.onStatUpdate(e));
  }

  onStatUpdate(e) {
    console.log(e.whichStat)
    const points = gameplayStats.getPoints(e.whichStat);
    const statValue = gameplayStats.getStat(e.whichStat);

    console.log(points, statValue)
  }

  update() {
    for(let [key, val] of this.allStats) {
      console.log(val)
      const which = val.getAttribute('data-stat');
      const stat = gameplayStats.getStat(which);

      if(typeof stat === 'object')
        val.textContent = `${stat.min} - ${stat.max}`;
      else
        val.textContent = stat;
    }

    for(let [key, val] of this.allPoints) {
      const which = val.getAttribute('data-stat-points');
      const points = gameplayStats.getPoints(which);
      val.textContent = points;

      if(points > 1) {
        const button = document.createElement('button');
        button.classList.add('the-main__stat-button');
        button.setAttribute('data-stat-button', which);
        button.textContent = '+';
        button.addEventListener('click', () => gameplayStats.updateStat(which));
        val.appendChild(button);
      }
    }
  }

  insert() {
    this.update();

    this.container.textContent = '';
    this.container.appendChild(this.content);
  }

}