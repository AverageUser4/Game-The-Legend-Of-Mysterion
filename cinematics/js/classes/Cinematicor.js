'use strict';

class Cinematicor extends Singleton {

  cinematicContainer = document.querySelector('.cinematic');
  mediaContainer = document.querySelector('.cinematic__media-container');
  textButton = document.querySelector('.cinematic__text-button');
  skipButton = document.querySelector('.cinematic__skip-button');
  imgTag = document.querySelector('.cinematic__media');

  cinematicData;
  polishVoice;

  abortController = new AbortController();
  eventTarget = new Image();

  constructor() {
    super();

    this.setVoiceLanguage();
    speechSynthesis.addEventListener('voiceschanged', () => this.setVoiceLanguage());
  }

  setVoiceLanguage() {
    const voices = window.speechSynthesis.getVoices();
    for(let val of voices) {
      if(val.lang === 'pl' || val.lang === 'pl-PL') {
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
    this.mediaContainer.addEventListener('click', () => this.advanceCinematic(), { signal: this.abortController.signal });
    this.skipButton.addEventListener('click', () => this.endCinematic(), { signal: this.abortController.signal });
    window.addEventListener('keydown', (e) => {
      if(e.key === 'Escape')
        this.endCinematic()
      else if(e.key === ' ')
        this.advanceCinematic();
    }, { signal: this.abortController.signal });

    this.advanceCinematic();

    document.body.style.overflow = 'hidden';
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
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(uter);
  }

  endCinematic() {
    window.speechSynthesis.cancel();
    this.abortController.abort();
    document.body.style.overflow = 'auto';
    this.cinematicContainer.style.display = 'none';

    this.eventTarget.dispatchEvent(new Event('CinematicEnded'));
  }
}

const cinematicor = new Cinematicor();
