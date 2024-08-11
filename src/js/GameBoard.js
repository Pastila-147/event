
export default class GameBoard {
  constructor(container) {
    this.container = container;
    this.intervalId = null; 
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


  moveGoblin() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    this.intervalId = setInterval(() => {
      const activeCell = this.container.querySelector('.active');

      if (activeCell) {
        activeCell.classList.remove('active');
      }

      const index = this.getRandomCell(activeCell ? Number(activeCell.dataset.index) : -1);
      const cell = this.container.childNodes[index];
      cell.classList.add('active');
      cell.dataset.index = index;
    }, 1000);
  }

  getRandomCell(currentIndex) {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.container.childNodes.length);
    } while (newIndex === currentIndex);
    return newIndex;
  }

  stopGoblinMovement() {
    clearInterval(this.intervalId);
    const activeCell = this.container.querySelector('.active');
    if (activeCell) {
      activeCell.classList.remove('active');
    }
  }
}