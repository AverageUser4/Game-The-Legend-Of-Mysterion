'use strict';

const cinematicor = new Cinematicor();
const progressor = new Progressor();

if(progressor.getQuestId() === 0) {
  const xhr = new XMLHttpRequest();

  xhr.onload = () => {
    const introContent = JSON.parse(xhr.responseText);
    cinematicor.startCinematic(introContent);
    progressor.setQuestId(1);
  };

  xhr.open('GET', 'resources/cinematics/game-intro.json');
  xhr.send();
}