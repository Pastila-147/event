import GameBoard from './GameBoard';
import Game from './Game';

const gameContainer = document.getElementById('gameContainer');
const game = new Game(gameContainer);
game.initiate();