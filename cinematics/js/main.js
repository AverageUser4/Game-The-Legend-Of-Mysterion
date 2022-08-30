'use strict';

const l = location.toString();
const params = new URLSearchParams(l.slice(l.indexOf('?')));
const which = params.get('which');

let cinematicsSrc;

switch(which) {
  default:
    cinematicsSrc = 'resources/cinematics/game-intro.json';
}

fetch(cinematicsSrc)
  .then((response) => response.json())
  .then((json) => {
    cinematicor.eventTarget.addEventListener('CinematicEnded', 
      () => window.location = '../game');
    cinematicor.startCinematic(json);
  });

