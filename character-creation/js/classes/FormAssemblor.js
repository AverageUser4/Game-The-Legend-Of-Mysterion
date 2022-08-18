'use strict';

class FormAssemblor {

  form;
  advancedButton;
  baseColorSelect;
  prependixCount = -1;

  formIdValue = 0;
  get formId() {
    return ++this.formIdValue;
  }

  constructor() {
    this.advancedButton = document.querySelector('.advanced-button');

    fetch('resources/data/colors-polish.json')
      .then((response) => response.json())
      .then((data) => this.colorsSetUp(data));
  }

  colorsSetUp(data) {
    this.baseColorSelect = document.createElement('select');

    for(let val of data) {
      const opt = document.createElement('option');
      opt.textContent = val;
      this.baseColorSelect.appendChild(opt);
    }

    this.createAndAddFieldset();
    this.createAndAddFieldset(' ojca');
    this.createAndAddFieldset(' matki');

    this.advancedButton.addEventListener('click', () => this.applyAdvanced());
  }

  applyAdvanced() {
    this.advancedButton.textContent = 'Bardziej zaawansowane...';

    if(this.prependixCount === -1) {
      this.createAndAddFieldset(` dziadka ze strony ojca`);
      this.createAndAddFieldset(` babki ze strony ojca`);
      this.createAndAddFieldset(` dziadka ze strony matki`);
      this.createAndAddFieldset(` babki ze strony matki`);
      this.prependixCount++;
      return;
    }

    this.createAndAddFieldset(` ${'pra-'.repeat(this.prependixCount + 1)}dziadka ze strony ${'pra-'.repeat(this.prependixCount)}dziadka`);
    this.createAndAddFieldset(` ${'pra-'.repeat(this.prependixCount + 1)}babki ze strony ${'pra-'.repeat(this.prependixCount)}dziadka`);
    this.createAndAddFieldset(` ${'pra-'.repeat(this.prependixCount + 1)}dziadka ze strony ${'pra-'.repeat(this.prependixCount)}babki`);
    this.createAndAddFieldset(` ${'pra-'.repeat(this.prependixCount + 1)}babki ze strony ${'pra-'.repeat(this.prependixCount)}babki`);
    this.prependixCount++;
  }

  // famName ' matki', ' babki (ze strony ojca)', itd.
  createAndAddFieldset(famName = '') {
    const fid = this.formId;
    const fieldset = document.createElement('fieldset');

    fieldset.appendChild(document.createElement('legend'));
    if(famName === '')
      fieldset.firstElementChild.textContent = 'Twoja postać:';
    else
      fieldset.firstElementChild.textContent = `Postać${famName}:`;
    
    fieldset.innerHTML += 
      `
        <label>
          <span>Wybierz imię${famName}:</span>
          <input id="name-${fid}" required type="text" minlength="2" maxlength="64">
        </label>
      `;

    fieldset.innerHTML +=
      `
        <label>
          <span>Wybierz wzrost${famName} (cm):</span>
          <div class="range-container">
            <span></span>
            <input id="height-${fid}" type="range" min="52" max="272">
          </div>
        </label>
      `;

    fieldset.innerHTML +=
      `     
        <label>
          <span>Wybierz wagę${famName} (kg):</span>
          <div class="range-container">
            <span></span>
            <input id="weight-${fid}" type="range" min="5" max="570">
          </div>
        </label>
      `;

    fieldset.innerHTML +=
      `
        <label>
          <span>${famName === '' ? 'Wybierz wiek (lata):' : 'Wybierz wiek (śmierci)' + famName + ' (lata)'}</span>
          <div class="range-container">
            <span></span>
            <input id="age-${fid}" type="range" min="0" max="122">
          </div>
        </label>
      `;

    fieldset.innerHTML +=
    `
      <label>
        <span>Wybierz długość włosów${famName} (cm):</span>
        <div class="range-container">
          <span></span>
          <input id="hair-length-${fid}" type="range" min="0" max="563">
        </div>
      </label>
    `;

    fieldset.innerHTML +=
      `
        <label>
          <span>Wybierz datę urodzenia${famName} (rok jest ignorowany):</span>
          <input required id="birthday-${fid}" type="date" value="0001-01-01">
        </label>
      `;

    fieldset.innerHTML +=
      `
        <label>
          <span>Wybierz rasę${famName}:</span>
          <select id="race-${fid}">
            <option>europeidalna</option>
            <option>afrykańska</option>
            <option>azjatycka</option>
            <option>australijska</option>
            <option>malezyjska</option>
            <option>indyjska</option>
            <option>amerykańska</option>
            <option>polinezyjska</option>
            <option>mikronezyjska</option>
          </select>
        </label>
      `;

    fieldset.innerHTML += 
      `
        <label>
          <span>Wybierz kolor włosów${famName}:</span>
        </label>
      `;
    fieldset.lastElementChild.appendChild(this.baseColorSelect.cloneNode(true));
    fieldset.lastElementChild.lastElementChild.id = `hair-color-${fid}`;

    fieldset.innerHTML += 
      `
        <label>
          <span>Wybierz kolor oczu${famName}:</span>
        </label>
      `;
    fieldset.lastElementChild.appendChild(this.baseColorSelect.cloneNode(true));
    fieldset.lastElementChild.lastElementChild.id = `eye-color-${fid}`;

    this.advancedButton.insertAdjacentElement('beforebegin', fieldset);

    const ranges = document.querySelectorAll('input[type="range"]');
    for(let val of ranges) {
      let min = parseInt(val.getAttribute('min'));
      let max = parseInt(val.getAttribute('max'));
      val.value = Math.floor(Math.random() * (max - min)) + min;

      val.addEventListener('input', () => {
        val.previousElementSibling.textContent = val.value;
      });
      val.previousElementSibling.textContent = val.value;
    }
  }

}