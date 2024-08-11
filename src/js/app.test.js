/** @jest-environment jsdom */
import GameBoard from '../js/GameBoard';

const container = document.createElement('div');
container.id = 'game-board-container';
const gameBoard = new GameBoard(container);

test('Draw field', () => {
  gameBoard.drawField();
  expect(container.querySelectorAll('.cell').length).toBe(16);
});

test('getRandomCell method', () => {
  expect(gameBoard.getRandomCell()).not.toBeGreaterThan(15);
});

test('should initiate Game correctly', () => {
  const container = document.querySelector('.area_container');
  const game = new Game(container);

  game.initiate();

  expect(GameBoard).toHaveBeenCalledTimes(1);
  expect(game.gameBoard.drawField).toHaveBeenCalledTimes(1);
  expect(game.gameBoard.moveGoblin).toHaveBeenCalledTimes(1);
  expect(document.querySelectorAll('.cell').length).toBe(16);
});

test('should register click events on cells', () => {
  const container = document.querySelector('.area_container');
  const game = new Game(container);

  game.initiate();

  const firstCell = document.querySelector('.cell');
  firstCell.dispatchEvent(new Event('click'));
  
  expect(game.missDisplay.textContent).toBe('1');
});

test('should handle active cell click and update hit count', () => {
  const container = document.querySelector('.area_container');
  const game = new Game(container);

  game.initiate();

  const firstCell = document.querySelector('.cell');
  firstCell.classList.add('active');

  firstCell.dispatchEvent(new Event('click'));
  
  expect(firstCell.classList.contains('active')).toBe(false);
  expect(game.hitDisplay.textContent).toBe('1');
});