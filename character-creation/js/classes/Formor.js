'use strict';

class Formor {

  constructor() {
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
  }

  setUp(that) {
    that.name = document.querySelector('#name-1');
    that.height = document.querySelector('#height-1');
    that.weight = document.querySelector('#weight-1');
    that.age = document.querySelector('#age-1');
    that.birthday = document.querySelector('#birthday-1');
    that.race = document.querySelector('#race-1');
    that.hairColor = document.querySelector('#hair-color-1');
    that.hairLength = document.querySelector('#hair-length-1');
    that.eyeColor = document.querySelector('#eye-color-1');

    that.infoUUID.textContent = UUIDor.createUUID();
    that.showAsBinaryButton.addEventListener('click', () => {
      if(that.infoUUID.textContent.length < 40) {
        that.infoUUID.textContent = UUIDor.hexToBin(that.infoUUID.textContent);
        that.showAsBinaryButton.textContent = 'Pokaż heksadecymalnie';
      } else {
        that.infoUUID.textContent = UUIDor.binToHex(that.infoUUID.textContent);
        that.showAsBinaryButton.textContent = 'Pokaż binarnie';
      }
      that.nameChange();
    });

    that.name.addEventListener('change', () => that.nameChange());
    that.height.addEventListener('change', () => that.heightChange());
    that.weight.addEventListener('change', () => that.weightChange());
    that.age.addEventListener('change', () => that.ageChange());
    that.birthday.addEventListener('change', () => that.birthdayChange());
    that.race.addEventListener('change', () => that.raceChange());
    that.hairColor.addEventListener('change', () => that.hairColorChange());
    that.hairLength.addEventListener('change', () => that.hairLengthChange());
    that.eyeColor.addEventListener('change', () => that.eyeColorChange());

    document.querySelector('.advanced-button').addEventListener('click', 
      () => setTimeout(
        () => that.updateFamilyTree(), 1000)
    );

    that.nameChange();
    that.heightChange();
    that.weightChange();
    that.ageChange();
    that.birthdayChange();
    that.raceChange();
    that.hairColorChange();
    that.hairLengthChange();
    that.eyeColorChange();
    that.updateFamilyTree();
  }

  updateFamilyTree() {
    const allNames = document.querySelectorAll('[id^="name-"]');
    this.infoFamilyTree.textContent = '[';
    for(let val of allNames) {
      this.infoFamilyTree.textContent += val.value + ',';
    }
    this.infoFamilyTree.textContent = this.infoFamilyTree.textContent.slice(0, this.infoFamilyTree.textContent.length - 1);
    this.infoFamilyTree.textContent += ']';
  }

  hairColorChange() {
    this.infoHairColor.textContent = this.hairColor.children[this.hairColor.value].textContent;
  }

  hairLengthChange() {
    this.infoHairLength.textContent = this.hairLength.value + ' (cm)';
  }

  eyeColorChange() {
    this.infoEyeColor.textContent = this.eyeColor.children[this.eyeColor.value].textContent;
  }

  raceChange() {
    this.infoRace.textContent = this.race.children[this.race.value].textContent;
  }

  birthdayChange() {
    this.infoBirthday.textContent = this.birthday.value.slice(5);
  }

  ageChange() {
    this.infoAge.textContent = this.age.value + ' (years)';
  }

  nameChange() {
    this.infoName.textContent = this.name.value;
    this.infoUsername.textContent = this.name.value + '-' + this.infoUUID.textContent;
  }

  heightChange() {
    this.infoHeight.textContent = this.height.value + ' (cm)';
    this.updateBMI();
  }

  weightChange() {
    this.infoWeight.textContent = this.weight.value + ' (kg)';
    this.updateBMI();
  }

  updateBMI() {
    this.infoBMI.textContent = parseInt(this.weight.value) / ((parseInt(this.height.value) / 100) ** 2);
  }

}