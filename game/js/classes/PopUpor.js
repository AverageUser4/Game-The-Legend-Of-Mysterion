class PopUpor {

  hasInstance = false;

  eventTarget = new EventTarget();

  openedWith = null;

  container = document.querySelector('.the-main__various');
  closeButton = document.querySelector('.the-main__various-close-button');
  openButtons = document.querySelectorAll('[data-pop-up="1"]');

  constructor() {
    if(PopUpor.hasInstance)
      throw new Error('This object can have only one instance.');

    PopUpor.hasInstance = true;

    for(let val of this.openButtons)
      val.addEventListener('click', (e) => this.open(e));

    this.closeButton.addEventListener('click', () => this.close());
  }

  open(e) {
    if(e.button !== 0)
      return;

    if(!this.openedWith) {
      this.openedWith = e.target;

      this.container.style.display = 'block';
      this.closeButton.style.display = 'block';
  
      this.eventTarget.dispatchEvent(new Event('popUpOpen'));
      this.chooseContent(e);
    } else if(this.openedWith === e.target) {
      this.close();
    } else {
      this.openedWith = e.target;
      this.chooseContent(e);
    }

  }

  chooseContent(e) {
    this.container.textContent = '';

    let funName = e.target.getAttribute('data-content');
    funName = funName.slice(0, 1).toUpperCase() + funName.slice(1);
    funName = 'insert' + funName;

    this[funName]();
  }

  close() {
    this.openedWith = null;
    this.container.style.display = 'none';
    this.closeButton.style.display = 'none';
    this.eventTarget.dispatchEvent(new Event('popUpClose'));
  }

  insertStatistics() {
    console.log('pies')

    this.container.innerHTML =
      `
      <div class="the-main__various-content-container">

        <h3 class="the-main__various-header">Statystyki</h3>

        <ul class="the-main__various-list">

          <li class="the-main__various-list-item">Klasa: Wojownik</li>
          <li class="the-main__various-list-item">Życie: 6000</li>
          <li class="the-main__various-list-item">Maksymalne zmęczenie: 2000</li>
          <li class="the-main__various-list-item">Obrażenia: 100-250</li>
          <li class="the-main__various-list-item">Siła: 5</li>
          <li class="the-main__various-list-item">Obrona: 5</li>
          <li class="the-main__various-list-item">Wytrzymałość: 5</li>
          <li class="the-main__various-list-item">Zręczność: 5</li>

        </ul>

        <h3 class="the-main__various-header">Dostępne punkty:</h3>

        <ul class="the-main__various-list">

          <li class="the-main__various-list-item">Punkty życia: 1</li>
          <li class="the-main__various-list-item">Punkty Obrażeń: 1</li>
          <li class="the-main__various-list-item">Punkty Siły: 1</li>
          <li class="the-main__various-list-item">Punkty Obrony: 1</li>
          <li class="the-main__various-list-item">Punkty Wytrzymałości: 1</li>
          <li class="the-main__various-list-item">Punkty Zręczności: 1</li>

        </ul>

      </div>`;
  }

  insertInventory() {

  }

  insertAchievements() {

  }

  insertQuests() {

  }

  insertMessages() {

  }

  insertPlot() {

  }

}

/*
  - może każdym oknem powinien zajmować się osobny obiekt a nie metoda

  - statistics:
    - character stats like strength, damage, etc.

  - inventory:
    - potions, maybe something else

  - achievements:
    - killed pregnant / gravid
    - x out of y (when y is reached double it)

  - quests:
    - there will be cool quests for sure

  - messages:
    - the best, most immersive way to contact with npcs

  - plot:
    - links to cinematics
*/