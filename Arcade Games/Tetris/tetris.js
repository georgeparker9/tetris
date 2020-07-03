
var config = {
	type: Phaser.AUTO,
    width: 800,
    height: 600,
	scene: [loading_screen, play_screen, game_over],
	physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: {y: 0}
        }
    },
};

var game = new Phaser.Game(config);

var activeBlocks = [];
var blockX = [];
var blockY = [];
var leftCollisionCheck = false;
var rightCollisionCheck = false;
var downCollisionCheck = false;
var setBlocks;
var barriers;
var cursors;
var leftMoveReset = true;
var rightMoveReset = true;
var downMoveReset = true;
var upMoveReset = true;
var fallCounter = 0;
var fastFall = false;
var tiles = new Array(10);
var stored_colour = new Array(10);
var tileX = 0;
var tileY = 0;
var blockPattern;
var blockPosition;
var rotationCheck = 0;
var nextLocationX = [];
var nextLocationY = [];
var music;
var lineCounter = 0;
var newX;
var newY;
var removed_lines = [];
var background_image;
var start_button;
var gameStart;
var score = 0;
var scoreText;
var endText;
var finalScoreText;
var endingTimer = 0;
var line_clear;
var block_place;
var spaceKey;
var storedBlocks;
var spaceMoveReset = true;
var storeFill = false;
var previousStoredPattern;
var storedPattern;
var storedRecall = false;
var nextBlocks;
var nextPattern;
var nextText;
var storedText;
var nextRecall = false;
var fallSpeed = 50;
var fallIncrease = 0;

for (i = 0; i < tiles.length; i++) {
	tiles[i] = new Array(20);
	stored_colour[i] = new Array(20);
	for (j = 0; j < 20; j++) {
		tiles[i][j] = false;
		stored_colour[i][j] = 0;
	}
}