'use strict';

class FormAssemblor {

  form;
  advancedButton;
  baseColorSelect;
  prependixCount = 0;

  formIdValue = 0;
  get formId() {
    return ++this.formIdValue;
  }

  constructor() {
    this.advancedButton = document.querySelector('.advanced-button');
  }

  setUp() {
    return new Promise(
      (resolve) => {
        fetch('resources/data/colors-polish.json')
        .then((response) => response.json())
        .then((data) => {
          this.baseColorSelect = document.createElement('select');

          for(let i = 0; i < data.length; i++) {
            const opt = document.createElement('option');
            opt.textContent = data[i];
            opt.value = i;
            this.baseColorSelect.appendChild(opt);
          }
      
          this.createAndAddFieldset();
          this.createAndAddFieldset(' ojca', 'ojciec');
          this.createAndAddFieldset(' matki', 'matka');
      
          this.advancedButton.addEventListener('click', () => this.applyAdvanced());
          resolve();
        });
      }
    )
  }

  applyAdvanced() {
    this.advancedButton.textContent = 'Bardziej zaawansowane...';

    // if(this.prependixCount === -1) {
    //   this.createAndAddFieldset(` dziadka ze strony ojca`, 'dziadek ze strony ojca');
    //   this.createAndAddFieldset(` babki ze strony ojca`, 'babka ze strony ojca');
    //   this.createAndAddFieldset(` dziadka ze strony matki`, 'dziadek ze strony matki');
    //   this.createAndAddFieldset(` babki ze strony matki`, 'babka ze strony matki');
    //   this.prependixCount++;
    //   return;
    // }

    /*
      prependixCount = 0:
        pra-dziadka-1
        pra-babki-1
        pra-dziadka-2
        pra-babki-2
    */

    for(let i = 1; i <= 2 ** (this.prependixCount + 1); i++) {
      this.createAndAddFieldset(
        ` ${'pra-'.repeat(this.prependixCount)}dziadka-${i}`,
        `${'pra-'.repeat(this.prependixCount)}dziadek-${i}`);
      this.createAndAddFieldset(
        ` ${'pra-'.repeat(this.prependixCount)}babki-${i}`,
        `${'pra-'.repeat(this.prependixCount)}babka-${i}`);
    }
    this.prependixCount++;
  }

  randomName() {
    const letters = 'abcdefghijklmnoprstuvwxyz';
    let name = letters.charAt(Math.floor(Math.random() * letters.length));
    name = name.toUpperCase();

    const len = Math.floor(Math.random() * 7) + 3;
    for(let i = 0; i < len; i++)
      name += letters.charAt(Math.floor(Math.random() * letters.length));
    
    return name;
  }

  // famName ' matki', ' babki (ze strony ojca)', itd.
  createAndAddFieldset(famName = '', relation = 'ty') {
    const fid = this.formId;
    const fieldset = document.createElement('fieldset');

    fieldset.appendChild(document.createElement('legend'));
    if(famName === '')
      fieldset.firstElementChild.textContent = 'Twoja postać:';
    else
      fieldset.firstElementChild.textContent = `Postać${famName}:`;
    
    fieldset.innerHTML +=
      `
        <span id="relation-${fid}" style="display:none">${relation}</span>
      `;

    fieldset.innerHTML += 
      `
        <label>
          <span>Wybierz imię${famName}:</span>
          <input required value="${this.randomName()}" id="name-${fid}" type="text" minlength="2" maxlength="64">
        </label>
      `;

    fieldset.innerHTML += 
    `
      <label>
        <span>UUID${famName}:</span>
        <input disabled value="${UUIDor.createUUID()}" id="uuid-${fid}" required type="text" minlength="2" maxlength="64">
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

    let date = '0001-';
    date += (Math.floor(Math.random() * 12) + 1).toString().padStart(2, 0);
    date += '-'
    date += (Math.floor(Math.random() * 28) + 1).toString().padStart(2, 0);

    fieldset.innerHTML +=
      `
        <label>
          <span>Wybierz datę urodzenia${famName} (rok jest ignorowany):</span>
          <input required id="birthday-${fid}" type="date" value="${date}">
        </label>
      `;

    fieldset.innerHTML +=
      `
        <label>
          <span>Wybierz rasę${famName}:</span>
          <select id="race-${fid}">
            <option value="0">europeidalna</option>
            <option value="1">afrykańska</option>
            <option value="2">azjatycka</option>
            <option value="3">australijska</option>
            <option value="4">malezyjska</option>
            <option value="5">indyjska</option>
            <option value="6">amerykańska</option>
            <option value="7">polinezyjska</option>
            <option value="8">mikronezyjska</option>
          </select>
        </label>
      `;

    fieldset.lastElementChild.children[1].children[Math.floor(Math.random() * 9)].setAttribute('selected', '');

    fieldset.innerHTML += 
      `
        <label>
          <span>Wybierz kolor włosów${famName}:</span>
        </label>
      `;
    let sel = this.baseColorSelect.cloneNode(true);
    sel.children[Math.floor(Math.random() * sel.children.length)].setAttribute('selected', '');
    fieldset.lastElementChild.appendChild(sel);
    fieldset.lastElementChild.lastElementChild.id = `hair-color-${fid}`;

    fieldset.innerHTML += 
      `
        <label>
          <span>Wybierz kolor oczu${famName}:</span>
        </label>
      `;
    sel = this.baseColorSelect.cloneNode(true);
    sel.children[Math.floor(Math.random() * sel.children.length)].setAttribute('selected', '');
    fieldset.lastElementChild.appendChild(sel);
    fieldset.lastElementChild.lastElementChild.id = `eye-color-${fid}`;

    if(!famName) {
      fieldset.innerHTML += 
      `
        <fieldset style="margin-bottom: 0">

          <legend>Wybierz klasę:</legend>

          <label>Wojownik<input value="warrior" checked name="class" type="radio"></label>
          <label>Czarodziej<input value="wizard" name="class" type="radio"></label>
          <label>Łucznik<input value="archer" name="class" type="radio"></label>

        </fieldset>
      `;
    }

    this.advancedButton.insertAdjacentElement('beforebegin', fieldset);

    const ranges = document.querySelectorAll('input[type="range"]');
    for(let val of ranges) {
      if(!fieldset.contains(val))
        continue;
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