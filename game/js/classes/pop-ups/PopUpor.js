class PopUpor extends Singleton {

  eventTarget = new EventTarget();

  openedWith = null;

  container = document.querySelector('.the-main__various');
  closeButton = document.querySelector('.the-main__various-close-button');
  openButtons = document.querySelectorAll('[data-pop-up="1"]');

  achievements = new Achievementor(this.container);
  inventory = new Inventoror(this.container);
  messages = new Messagor(this.container);
  plot = new Plotor(this.container);
  quests = new Questor(this.container);
  statistics = new Statisticor(this.container);

  constructor() {
    super();
    
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
    this[e.target.getAttribute('data-content')].insert();
  }

  close() {
    this.openedWith = null;
    this.container.style.display = 'none';
    this.closeButton.style.display = 'none';
    this.eventTarget.dispatchEvent(new Event('popUpClose'));
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