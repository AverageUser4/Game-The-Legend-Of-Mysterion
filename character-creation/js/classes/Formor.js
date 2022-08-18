'use strict';

class Formor {

  constructor() {
    this.name = document.querySelector('#name-1');
    this.height = document.querySelector('#height-1');
    this.weight = document.querySelector('#weight-1');
    this.age = document.querySelector('#age-1');
    this.birthday = document.querySelector('#birthday-1');
    this.race = document.querySelector('#race-1');
    this.hairColor = document.querySelector('#hair-color-1');
    this.hairLength = document.querySelector('#hair-length-1');
    this.eyeColor = document.querySelector('#eye-color-1');

    this.infoName = document.querySelector('#info-name').children[0];
    this.infoUUID = document.querySelector('#info-uuid').children[0];
    this.infoUsername = document.querySelector('#info-username').children[0];
    this.infoHeight = document.querySelector('#info-height').children[0];
    this.infoWeight = document.querySelector('#info-weight').children[0];
    this.infoBMI = document.querySelector('#info-bmi').children[0];
    this.infoAge = document.querySelector('#info-age').children[0];
    this.infoBirthday = document.querySelector('#info-birthday').children[0];
    this.infoRace = document.querySelector('#info-race').children[0];
    this.infoHairColor = document.querySelector('#info-hair-color').children[0];
    this.infoHairLength = document.querySelector('#info-hair-length').children[0];
    this.infoEyeColor = document.querySelector('#info-eye-color').children[0];
    this.infoFamilyTree = document.querySelector('#info-family-tree').children[0];

    this.showAsBinaryButton = document.querySelector('#show-as-binary-button');

    this.infoUUID.textContent = UUIDor.createUUID();
    this.showAsBinaryButton.addEventListener('click', () => {
      if(this.infoUUID.textContent.length < 40) {
        this.infoUUID.textContent = UUIDor.hexToBin(this.infoUUID.textContent);
        this.showAsBinaryButton.textContent = 'Pokaż heksadecymalnie';
      } else {
        this.infoUUID.textContent = UUIDor.binToHex(this.infoUUID.textContent);
        this.showAsBinaryButton.textContent = 'Pokaż binarnie';
      }

      this.nameChange();
    });

    this.name.addEventListener('change', () => this.nameChange());
    this.height.addEventListener('change', () => this.heightChange());
    this.weight.addEventListener('change', () => this.weightChange());

    this.heightChange();
    this.weightChange();
  }

  nameChange() {
    this.infoName.textContent = this.name.value;
    this.infoUsername.textContent = this.name.value + '-' + this.infoUUID.textContent;
  }

  heightChange() {
    this.infoHeight.textContent = this.height.value;
    this.updateBMI();
  }

  weightChange() {
    this.infoWeight.textContent = this.weight.value;
    this.updateBMI();
  }

  updateBMI() {
    this.infoBMI.textContent = parseInt(this.weight.value) / ((parseInt(this.height.value) / 100) ** 2);
  }

}