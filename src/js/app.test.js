/** @jest-environment jsdom */
import GameBoard from './GameBoard';
import Game from './Game'; 

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
