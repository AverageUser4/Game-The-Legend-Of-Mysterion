class Achievementor extends Singleton {

  container;
  content;

  constructor(container) {
    super();
    
    this.container = container;
    this.content = document.createElement('div');
    this.content.innerHTML =
      `
        <h3 class="the-main__various-header">PRACE TRWAJĄ!</h3>
      `;
  }

  insert() {
    this.container.textContent = '';
    this.container.appendChild(this.content);
  }

}