class Progressor {

  currentQuestId;

  constructor() {
    if(!localStorage.getItem('currentQuestId'))
      this.currentQuestId = 0;
  }

  getQuestId() {
    return this.currentQuestId;
  }

  setQuestId(id) {
    localStorage.setItem('currentQuestId', id);
    this.currentQuestId = id;
  }

}