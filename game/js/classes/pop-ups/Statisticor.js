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

          <li class="the-main__various-list-item"> Klasa:                   <span data-stat="character-class"></span></li>
          <li class="the-main__various-list-item"> Poziom:                  <span data-stat="character-level"></span></li>

          <li class="the-main__various-list-item"> Życie:                   <span data-stat="character-health"></span></li>
          <li class="the-main__various-list-item"> Wytrzymałość:            <span data-stat="character-endurance"></span></li>
          <li class="the-main__various-list-item"> Obrona:                  <span data-stat="character-defence"></span></li>
          <li class="the-main__various-list-item"> Obrażenia:               <span data-stat="character-damage"></span></li>
          <li class="the-main__various-list-item"> Siła:                    <span data-stat="character-strength"></span></li>
          <li class="the-main__various-list-item"> Zręczność:               <span data-stat="character-dexterity"></span></li>
          <li class="the-main__various-list-item"> Energia:                 <span data-stat="character-energy"></span></li>

        </ul>

        <h3 class="the-main__various-header">Dostępne punkty:</h3>

        <ul class="the-main__various-list">

          <li class="the-main__various-list-item"> Punkty Wytrzymałości:    <span data-stat="points-endurance"></span></li>
          <li class="the-main__various-list-item"> Punkty Obrony:           <span data-stat="points-defence"></span></li>
          <li class="the-main__various-list-item"> Punkty Siły:             <span data-stat="points-strength"></span></li>
          <li class="the-main__various-list-item"> Punkty Zręczności:       <span data-stat="points-dexterity"></span></li>
          <li class="the-main__various-list-item"> Punkty Energii:          <span data-stat="points-energy"></span></li>

        </ul>
      `;

    this.allChangable = this.content.querySelectorAll('[data-stat]');
  }

  update() {
    for(let val of this.allChangable) {
      const which = val.getAttribute('data-stat');
        val.textContent = localStorage.getItem(which);
    }
  }

  insert() {
    this.update();

    this.container.textContent = '';
    this.container.appendChild(this.content);
  }

}