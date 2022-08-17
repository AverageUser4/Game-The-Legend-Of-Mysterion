'use strict';

class Cinematicor {

  abortController;

  cinematicContainer;
  imgTag;
  mediaContainer;
  textButton;
  skipButton;

  cinematicData;
  polishVoice;

  constructor() {
    this.cinematicContainer = document.querySelector('.cinematic');
    this.mediaContainer = document.querySelector('.cinematic__media-container');
    this.textButton = document.querySelector('.cinematic__text-button');
    this.skipButton = document.querySelector('.cinematic__skip-button');
    this.imgTag = document.querySelector('.cinematic__media');

    this.abortController = new AbortController();

    const voices = window.speechSynthesis.getVoices();
    for(let val of voices) {
      if(val.lang === 'pl') {
        this.polishVoice = val;
        break;
      }
    }
  }

  // data is an array of objects, eg.
  // [{mediaSrc: 'resources/castle.jpg', text: 'once upon a time...'}]
  startCinematic(cinematicData) {
    this.cinematicData = cinematicData;

    this.textButton.addEventListener('click', () => this.advanceCinematic(), { signal: this.abortController.signal });
    this.skipButton.addEventListener('click', () => this.endCinematic(), { signal: this.abortController.signal });

    this.advanceCinematic();

    this.cinematicContainer.style.display = 'block';
  }

  advanceCinematic() {
    if(this.cinematicData.length === 0) {
      this.endCinematic();
      return;
    }

    const obj = this.cinematicData.shift();
    if(!obj.text)
      throw new Error('You need to provide text property for every object in cinematicData array.');

    this.textButton.textContent = obj.text;
    if(obj.mediaSrc)
      this.imgTag.setAttribute('src', obj.mediaSrc);

    const uter = new SpeechSynthesisUtterance(obj.text);
    uter.voice = this.polishVoice;
    window.speechSynthesis.speak(uter);
  }

  endCinematic() {
    this.abortController.abort();
    this.cinematicContainer.style.display = 'none';
  }
}