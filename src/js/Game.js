import GameBoard from './GameBoard';

export default class Game {
  constructor(container) {
    this.hitCount = 0;     
    this.missCount = 0;     
    this.totalCount = 0; 
    this.gameBoard = new GameBoard(container);   
  }

  handleCellClick() {    
    const cells = document.querySelectorAll('.cell');
    this.hitDisplay = document.querySelector('.hit');    
    this.missDisplay = document.querySelector('.miss');  

    for (let i = 0; i < cells.length; i += 1) {
      cells[i].addEventListener('click', () => {
        this.gameBoard.hit(cells[i]);      
      });
    }
  }
  
  onSuccess() {
    this.hitDisplay.textContent = +this.hitDisplay.textContent + 1;
    this.result(); 
  }

  onFail() {
    this.missDisplay.textContent = +this.missDisplay.textContent + 1;
    this.result(); 
  }

  result() {          
    const gameArea = document.querySelector('.game-board-container'); 
    this.hitDisplay = document.querySelector('.hit');
    this.missDisplay = document.querySelector('.miss');
  
    if (+this.hitDisplay.textContent === 5) {
      this.gameBoard.stopGoblinMovement();
      const winNote = '<div class="result"> <p> Выигрыш!</p></div>'; 
      gameArea.insertAdjacentHTML('afterend', winNote);
                 
    } else if (+this.missDisplay.textContent === 5) {
      this.gameBoard.stopGoblinMovement();
      const looseNote = '<div class="result"> <p> Проигрыш!</p></div>'; 
      gameArea.insertAdjacentHTML('afterend', looseNote);     
    }
  }

  initiate() {                
    this.gameBoard.drawField();
    this.gameBoard.registerSuccess(this.onSuccess.bind(this));
    this.gameBoard.registerFail(this.onFail.bind(this));
    this.gameBoard.startGoblinMovement();
    this.missDisplay = document.querySelector('.miss');
    this.handleCellClick(); 
    // this.timer = setInterval(() => {
    //   this.missDisplay.textContent = +this.missDisplay.textContent + this.totalCount; 
    //   if (this.totalCount !== 1) {
    //     setTimeout(() => { this.totalCount = 1; }, 1000);
    //   }
    //   this.result();    
    // }, 1000);
  }
}