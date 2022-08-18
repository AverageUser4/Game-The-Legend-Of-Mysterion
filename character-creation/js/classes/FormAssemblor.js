'use strict';

class FormAssemblor {

  form;
  baseColorSelect;

  constructor() {
    this.form = document.querySelector('.the-form');

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
  }

  // famName ' dziadka', ' babki', itd.
  createFieldset(famName = '') {
    const fieldset = document.createElement('fieldset');

    fieldset.appendChild(document.createElement('legend'));
    if(famName === '')
      fieldset.firstElementChild.textContent = 'Twoja postać:';
    else
      fieldset.firstElementChild.textContent = `Postać${famName}:`;
    
    let lab = document.createElement('label');
    lab.appendChild(document.createElement('span'));
    lab.firstElementChild.textContent = `Wybierz imię${famName}:`
    lab.appendChild(document.createElement('input'));
    lab.children[1].setAttribute('type', 'text');
    lab.children[1].setAttribute('minlength', '2');
    lab.children[1].setAttribute('maxlenght', '64');
    fieldset.appendChild(lab);

    lab = document.createElement('label');
    lab.appendChild(document.createElement('span'));
    lab.firstElementChild.textContent = `Wybierz wzrost${famName} (cm):`;
    lab.appendChild(document.createElement('input'));
    lab.children[1].setAttribute('type', 'range');
    lab.children[1].setAttribute('min', '52');
    lab.children[1].setAttribute('max', '272');
    fieldset.appendChild(lab);

    lab = document.createElement('label');
    lab.appendChild(document.createElement('span'));
    lab.firstElementChild.textContent = `Wybierz wagę${famName} (cm):`;
    lab.appendChild(document.createElement('input'));
    lab.children[1].setAttribute('type', 'range');
    lab.children[1].setAttribute('min', '5');
    lab.children[1].setAttribute('max', '570');
    fieldset.appendChild(lab);

    lab = document.createElement('label');
    lab.appendChild(document.createElement('span'));
    if(famName === '')
      lab.firstElementChild.textContent = `Wybierz wiek (lata):`;
    else
      lab.firstElementChild.textContent = `Wybierz wiek (śmierci)${famName} (lata):`;
    lab.appendChild(document.createElement('input'));
    lab.children[1].setAttribute('type', 'range');
    lab.children[1].setAttribute('min', '0');
    lab.children[1].setAttribute('max', '122');
    fieldset.appendChild(lab);

    lab = document.createElement('label');
    lab.appendChild(document.createElement('span'));
    lab.firstElementChild.textContent = `Wybierz datę urodzenia${famName} (rok jest ignorowany):`;
    lab.appendChild(document.createElement('input'));
    lab.children[1].setAttribute('type', 'date');
    fieldset.appendChild(lab);

    lab = document.createElement('label');
    lab.appendChild(document.createElement('span'));
    lab.firstElementChild.textContent = `Wybierz rasę${famName}:`;
    lab.appendChild(document.createElement('select'));
    lab.children[1].innerHTML = 
      `<option>europeidalna</option>
      <option>afrykańska</option>
      <option>azjatycka</option>
      <option>australijska</option>
      <option>malezyjska</option>
      <option>indyjska</option>
      <option>amerykańska</option>
      <option>polinezyjska</option>
      <option>mikronezyjska</option>`;
    fieldset.appendChild(lab);

    lab = document.createElement('label');
    lab.appendChild(document.createElement('span'));
    lab.firstElementChild.textContent = `Wybierz kolor włosów${famName}:`;
    lab.appendChild(this.baseColorSelect.cloneNode(true));
    fieldset.appendChild(lab);

    lab = document.createElement('label');
    lab.appendChild(document.createElement('span'));
    lab.firstElementChild.textContent = `Wybierz kolor oczu${famName}:`;
    lab.appendChild(this.baseColorSelect.cloneNode(true));
    fieldset.appendChild(lab);
  }

}