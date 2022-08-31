class Statisticor extends Singleton {

  container;
  content;
  allChangable;

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
          <li class="the-main__various-list-item"> Maksymalne zmęczenie:    <span data-stat="fatigue"></span></li>

        </ul>

        <h3 class="the-main__various-header">Dostępne punkty:</h3>

        <ul class="the-main__various-list">

          <li class="the-main__various-list-item"> Punkty Wytrzymałości:    <span data-stat="endurance-points"></span></li>
          <li class="the-main__various-list-item"> Punkty Obrony:           <span data-stat="defence-points"></span></li>
          <li class="the-main__various-list-item"> Punkty Siły:             <span data-stat="strength-points"></span></li>
          <li class="the-main__various-list-item"> Punkty Zręczności:       <span data-stat="dexterity-points"></span></li>

        </ul>
      `;

    this.allChangable = this.content.querySelectorAll('[data-stat]');
  }

  update() {
    localStorage.setItem('class', 'wojownik');
    localStorage.setItem('level', '1');
    localStorage.setItem('health', '100');
    localStorage.setItem('endurance', '1');
    localStorage.setItem('defence', '1');
    localStorage.setItem('damage', '1');
    localStorage.setItem('strength', '1');
    localStorage.setItem('dexterity', '1');
    localStorage.setItem('fatigue', '1');

    for(let val of this.allChangable) {
      const which = val.getAttribute('data-stat');
      if(!which.includes('-points'))
        val.textContent = localStorage.getItem(which);
    }
  }

  insert() {
    this.update();

    this.container.textContent = '';
    this.container.appendChild(this.content);
  }

}