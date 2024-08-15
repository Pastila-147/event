
export default class GameBoard {
  constructor(container) {
    this.container = container;
    this.intervalId = null; 
    this.gameActive = false;
    this.wasHit = false;
    this.activeCellIndex = -1;
  }

  drawField() {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < 16; i++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      fragment.appendChild(cell);
    }
    this.container.appendChild(fragment);
  }

  registerFail(failCallBack) {
    this.failCallBack = failCallBack;
  }

  registerSuccess(successCallBack) {
    this.successCallBack = successCallBack;
  }

  hit(cell) {
    if (this.gameActive) {
      this.wasHit = true;
      if (cell.classList.contains('active')) {
        cell.classList.remove('active');
        this.successCallBack();
      }
      else this.failCallBack();
    }
  }

  hidePrevious() {
    const activeCell = this.container.querySelector('.active');
    if (activeCell) {
      if(!this.wasHit){
        this.failCallBack();
      }
      activeCell.classList.remove('active');
    }
  }

  showNewCell() {
    this.activeCellIndex = this.getRandomCell(this.activeCellIndex);
    const cell = this.container.childNodes[this.activeCellIndex];
    cell.classList.add('active');
    this.wasHit = false;
    cell.dataset.index = this.activeCellIndex;
  }

  timerCallback() {
    this.hidePrevious();
    if (this.gameActive) {
      this.showNewCell();
    }
  }

  startGoblinMovement() {
    this.gameActive = true;
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    this.intervalId = setInterval(this.timerCallback.bind(this), 1000);
  }

  getRandomCell(currentIndex) {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.container.childNodes.length);
    } while (newIndex === currentIndex);
    return newIndex;
  }

  stopGoblinMovement() {
    this.gameActive = false;
    clearInterval(this.intervalId);
    const activeCell = this.container.querySelector('.active');
    if (activeCell) {
      activeCell.classList.remove('active');
    }
  }
}