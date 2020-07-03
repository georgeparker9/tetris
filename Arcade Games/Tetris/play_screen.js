var highScore = parseInt(localStorage.getItem('high_score')) || 0;
var newHighScore = false;
var highScoreText;

class play_screen extends Phaser.Scene {
	constructor() {
		super({key: "playGame"});
	}
	preload () {
		this.load.image('red_block', 'Tetris/assets/images/red_block1.png');
		this.load.image('orange_block', 'Tetris/assets/images/orange_block1.png');
		this.load.image('blue_block', 'Tetris/assets/images/blue_block1.png');
		this.load.image('light_blue_block', 'Tetris/assets/images/light_blue_block1.png');
		this.load.image('purple_block', 'Tetris/assets/images/purple_block1.png');
		this.load.image('green_block', 'Tetris/assets/images/green_block1.png');
		this.load.image('yellow_block', 'Tetris/assets/images/yellow_block1.png');
		this.load.image('side_barrier', 'Tetris/assets/images/side_barrier1.png');
		
		this.load.spritesheet('blocks', 'Tetris/assets/spritesheets/blocks1.png', {frameWidth: 30, frameHeight: 30});
		this.load.spritesheet('stored_blocks', 'Tetris/assets/spritesheets/stored_blocks.png', {frameWidth: 120, frameHeight: 60});
		
		this.load.audio('theme', 'Tetris/assets/sounds/tetris_theme.mp3');
		this.load.audio('clear_line', 'Tetris/assets/sounds/clear_line.mp3');
		this.load.audio('block_place', 'Tetris/assets/sounds/block_place.mp3');
	}
	
	create () {
		this.anims.create({
			key: 'yellow_block',
			frames: [ { key: 'blocks', frame: 6 } ],
		});
		this.anims.create({
			key: 'light_blue_block',
			frames: [ { key: 'blocks', frame: 2 } ],
		});
		this.anims.create({
			key: 'blue_block',
			frames: [ { key: 'blocks', frame: 0 } ],
		});
		this.anims.create({
			key: 'orange_block',
			frames: [ { key: 'blocks', frame: 3 } ],
		});
		this.anims.create({
			key: 'green_block',
			frames: [ { key: 'blocks', frame: 1 } ],
		});
		this.anims.create({
			key: 'red_block',
			frames: [ { key: 'blocks', frame: 5 } ],
		});
		this.anims.create({
			key: 'purple_block',
			frames: [ { key: 'blocks', frame: 4 } ],
		});
		
		
		this.anims.create({
			key: 'yellow_block1',
			frames: [ { key: 'stored_blocks', frame: 1 } ],
		});
		this.anims.create({
			key: 'light_blue_block1',
			frames: [ { key: 'stored_blocks', frame: 0 } ],
		});
		this.anims.create({
			key: 'blue_block1',
			frames: [ { key: 'stored_blocks', frame: 6 } ],
		});
		this.anims.create({
			key: 'orange_block1',
			frames: [ { key: 'stored_blocks', frame: 5 } ],
		});
		this.anims.create({
			key: 'green_block1',
			frames: [ { key: 'stored_blocks', frame: 4 } ],
		});
		this.anims.create({
			key: 'red_block1',
			frames: [ { key: 'stored_blocks', frame: 3 } ],
		});
		this.anims.create({
			key: 'purple_block1',
			frames: [ { key: 'stored_blocks', frame: 2 } ],
		});
		
		music = this.sound.add('theme');
		music.loop = true;
		music.play(); 
		
		line_clear = this.sound.add('clear_line');
		line_clear.volume = 2;
		block_place = this.sound.add('block_place');
		
		scoreText = this.add.text(110, 16, score, { fontSize: '32px', fill: 'White' });
		nextText = this.add.text(640, 16, 'NEXT', { fontSize: '32px', fill: 'White' });
		storedText = this.add.text(65, 70, 'STORED', { fontSize: '32px', fill: 'White' });
		
		nextBlocks = this.physics.add.sprite(675, 100, 'stored_blocks');
		randomBlock();
		nextPattern = blockPattern;
		nextBlocks.anims.play(block_type+'1');
		randomBlock();
		
		for (i = 0; i < blockX.length; i++) {
			activeBlocks[i] = this.physics.add.sprite(blockX[i], blockY[i], 'blocks');
			activeBlocks[i].setDepth(1);
		}
		
		storedBlocks = this.physics.add.sprite(115, 150, 'stored_blocks');
		storedBlocks.alpha = 0;
		
		
		
		barriers = this.physics.add.staticGroup();
		barriers.create(245, 300, 'side_barrier');
		barriers.create(555, 300, 'side_barrier');
		
		setBlocks = this.physics.add.staticGroup();
		
		spaceKey = this.input.keyboard.addKey('Space');
		cursors = this.input.keyboard.createCursorKeys();
		
	}
	update () {
		for (i = 0; i < tiles.length; i++) {
			if (tiles[i][0] == true) {
				if (score > highScore) {
					 localStorage.setItem('high_score',score);
					 highScore = parseInt(localStorage.getItem('high_score')) || 0;
					 newHighScore = true;
				}
				this.scene.start('endGame');
				this.scene.stop('playGame');
			}
		}

		if (spaceKey.isDown && spaceMoveReset == true) {
			spaceMoveReset = false;
			storeBlocks();
		}

		for (i = 0; i < activeBlocks.length; i++) {
			activeBlocks[i].anims.play(block_type, true);
		}
		
		if (cursors.left.isDown && leftMoveReset == true) {
			for (i = 0; i < activeBlocks.length; i++) {
				if (activeBlocks[i].x > 265 && leftCollisionCheck == false) {
					tileY = ((activeBlocks[i].y - 15)/30);
					tileX = ((activeBlocks[i].x - 265)/30);
					if (tiles[tileX-1][tileY] == true) {
						leftCollisionCheck = true;
					}
				}
				else {
					leftCollisionCheck = true;
				}
			}
			leftMoveReset = false;
			if (leftCollisionCheck == false) {
				for (i = 0; i < activeBlocks.length; i++) {
					activeBlocks[i].x -= 30;
				}
			}
			else {
				leftCollisionCheck = false;
			}
		}
		
		if (cursors.right.isDown && rightMoveReset == true) {
			for (i = 0; i < activeBlocks.length; i++) {
				if (activeBlocks[i].x < 535 && rightCollisionCheck == false) {
					tileY = (activeBlocks[i].y - 15)/30;
					tileX = ((activeBlocks[i].x - 265)/30);
					if (tiles[tileX+1][tileY] == true) {
						rightCollisionCheck = true;
					}
				}
				else {
					rightCollisionCheck = true;
				}
			}
			rightMoveReset = false;
			if (rightCollisionCheck == false) {
				for (i = 0; i < activeBlocks.length; i++) {
					activeBlocks[i].x += 30;
				}
			}
			else {
				rightCollisionCheck = false;
			}
		}
		
		if (cursors.down.isDown && downMoveReset == true) {
			fastFall = true;
		}
		else {
			fastFall = false;
		}
		
		if (cursors.up.isDown && upMoveReset == true) {
			upMoveReset = false;
			rotateBlock();
		}
		
		if (cursors.left.isUp && leftMoveReset == false) {
			leftMoveReset = true;
		}
		if (cursors.right.isUp && rightMoveReset == false) {
			rightMoveReset = true;
		}
		if (cursors.down.isUp && downMoveReset == false) {
			downMoveReset = true;
		}
		if (cursors.up.isUp && upMoveReset == false) {
			upMoveReset = true;
		}
		
		if (fallCounter <= fallSpeed) {
			if (fastFall) {
				fallCounter += 10;
			}
			else {
				fallCounter += 1;
			}
			
			if (fallCounter == fallSpeed) {
				downCollisionCheck = false;
				for (i = 0; i < activeBlocks.length; i++) {
					if (activeBlocks[i].y == 585 && downCollisionCheck == false) {
						setBlock();
						downMoveReset = false;
						downCollisionCheck = true;
					}
					else {
						tileY = (activeBlocks[i].y - 15)/30;
						tileX = ((activeBlocks[i].x - 265)/30);
						if (tiles[tileX][tileY + 1] == true && downCollisionCheck == false) {
							setBlock();
							downMoveReset = false;
							downCollisionCheck = true;
						}
					}
				}
				if (downCollisionCheck == false) {
					for (i = 0; i < activeBlocks.length; i++) {
						activeBlocks[i].y += 30;
					}
				}
			}
		}
		else {
			fallCounter = 0;
		}
		
		if (fallIncrease == 3600) {
			if (fallSpeed > 10) {	
			fallSpeed -= 10;
			music.rate += 0.3;
			}
			fallIncrease = 0;
		}
		else {
			fallIncrease += 1;
		}
			
		removed_lines = [];
		for (i = 0; i < tiles[0].length; i++) {
			lineCounter = 0;
			for (j = 0; j < tiles.length; j++) {
				if (tiles[j][i] == true) {
					lineCounter += 1;
				}
			}
			if (lineCounter == 10) {
				removed_lines.push(i);
			}
			
		}
		if (removed_lines.length > 0) {
			line_clear.play();
			removed_lines.sort();
			removeLine();
		}
	}
}


function rotateBlock() {
	if (blockPattern == 0) {
			nextLocationX[0] = activeBlocks[0].x;
			nextLocationY[0] = activeBlocks[0].y;
			nextLocationX[1] = activeBlocks[1].x;
			nextLocationY[1] = activeBlocks[1].y;
			nextLocationX[2] = activeBlocks[2].x;
			nextLocationY[2] = activeBlocks[2].y;
			nextLocationX[3] = activeBlocks[3].x;
			nextLocationY[3] = activeBlocks[3].y;
	}
	else if (blockPattern == 1) {
		if (blockPosition == 1 || blockPosition == 3) {
			nextLocationX[0] = activeBlocks[0].x + 60;
			nextLocationY[0] = activeBlocks[0].y - 60;
			nextLocationX[1] = activeBlocks[1].x + 30;
			nextLocationY[1] = activeBlocks[1].y - 30;
			nextLocationX[2] = activeBlocks[2].x;
			nextLocationY[2] = activeBlocks[2].y;
			nextLocationX[3] = activeBlocks[3].x - 30;
			nextLocationY[3] = activeBlocks[3].y + 30;
		}
		else if (blockPosition == 2 || blockPosition == 4) {
			nextLocationX[0] = activeBlocks[0].x - 60;
			nextLocationY[0] = activeBlocks[0].y + 60;
			nextLocationX[1] = activeBlocks[1].x - 30;
			nextLocationY[1] = activeBlocks[1].y + 30;
			nextLocationX[2] = activeBlocks[2].x;
			nextLocationY[2] = activeBlocks[2].y;
			nextLocationX[3] = activeBlocks[3].x + 30;
			nextLocationY[3] = activeBlocks[3].y - 30;
		}
	}
	else if (blockPattern == 2) {
		if (blockPosition == 1) {
			nextLocationX[0] = activeBlocks[0].x + 60;
			nextLocationY[0] = activeBlocks[0].y;
			nextLocationX[1] = activeBlocks[1].x + 30;
			nextLocationY[1] = activeBlocks[1].y - 30;
			nextLocationX[2] = activeBlocks[2].x;
			nextLocationY[2] = activeBlocks[2].y;
			nextLocationX[3] = activeBlocks[3].x - 30;
			nextLocationY[3] = activeBlocks[3].y + 30;
		}
		else if (blockPosition == 2) {
			nextLocationX[0] = activeBlocks[0].x;
			nextLocationY[0] = activeBlocks[0].y + 60;
			nextLocationX[1] = activeBlocks[1].x + 30;
			nextLocationY[1] = activeBlocks[1].y + 30;
			nextLocationX[2] = activeBlocks[2].x;
			nextLocationY[2] = activeBlocks[2].y;
			nextLocationX[3] = activeBlocks[3].x - 30;
			nextLocationY[3] = activeBlocks[3].y - 30;
		}
		else if (blockPosition == 3) {
			nextLocationX[0] = activeBlocks[0].x - 60;
			nextLocationY[0] = activeBlocks[0].y;
			nextLocationX[1] = activeBlocks[1].x - 30;
			nextLocationY[1] = activeBlocks[1].y + 30;
			nextLocationX[2] = activeBlocks[2].x;
			nextLocationY[2] = activeBlocks[2].y;
			nextLocationX[3] = activeBlocks[3].x + 30;
			nextLocationY[3] = activeBlocks[3].y - 30;
		}
		else if (blockPosition == 4) {
			nextLocationX[0] = activeBlocks[0].x;
			nextLocationY[0] = activeBlocks[0].y - 60;
			nextLocationX[1] = activeBlocks[1].x - 30;
			nextLocationY[1] = activeBlocks[1].y - 30;
			nextLocationX[2] = activeBlocks[2].x;
			nextLocationY[2] = activeBlocks[2].y;
			nextLocationX[3] = activeBlocks[3].x + 30;
			nextLocationY[3] = activeBlocks[3].y + 30;
		}
	}
	else if (blockPattern == 3) {
		if (blockPosition == 1) {
			nextLocationX[0] = activeBlocks[0].x;
			nextLocationY[0] = activeBlocks[0].y + 60;
			nextLocationX[1] = activeBlocks[1].x - 30;
			nextLocationY[1] = activeBlocks[1].y + 30;
			nextLocationX[2] = activeBlocks[2].x;
			nextLocationY[2] = activeBlocks[2].y;
			nextLocationX[3] = activeBlocks[3].x + 30;
			nextLocationY[3] = activeBlocks[3].y - 30;
		}
		else if (blockPosition == 2) {
			nextLocationX[0] = activeBlocks[0].x - 60;
			nextLocationY[0] = activeBlocks[0].y;
			nextLocationX[1] = activeBlocks[1].x - 30;
			nextLocationY[1] = activeBlocks[1].y - 30;
			nextLocationX[2] = activeBlocks[2].x;
			nextLocationY[2] = activeBlocks[2].y;
			nextLocationX[3] = activeBlocks[3].x + 30;
			nextLocationY[3] = activeBlocks[3].y + 30;
		}
		else if (blockPosition == 3) {
			nextLocationX[0] = activeBlocks[0].x;
			nextLocationY[0] = activeBlocks[0].y - 60;
			nextLocationX[1] = activeBlocks[1].x + 30;
			nextLocationY[1] = activeBlocks[1].y - 30;
			nextLocationX[2] = activeBlocks[2].x;
			nextLocationY[2] = activeBlocks[2].y;
			nextLocationX[3] = activeBlocks[3].x - 30;
			nextLocationY[3] = activeBlocks[3].y + 30;
		}
		else if (blockPosition == 4) {
			nextLocationX[0] = activeBlocks[0].x + 60;
			nextLocationY[0] = activeBlocks[0].y;
			nextLocationX[1] = activeBlocks[1].x + 30;
			nextLocationY[1] = activeBlocks[1].y + 30;
			nextLocationX[2] = activeBlocks[2].x;
			nextLocationY[2] = activeBlocks[2].y;
			nextLocationX[3] = activeBlocks[3].x - 30;
			nextLocationY[3] = activeBlocks[3].y - 30;
		}
	}
	else if (blockPattern == 4) {
		if (blockPosition == 1 || blockPosition == 3) {
			nextLocationX[0] = activeBlocks[0].x + 30;
			nextLocationY[0] = activeBlocks[0].y - 30;
			nextLocationX[1] = activeBlocks[1].x;
			nextLocationY[1] = activeBlocks[1].y;
			nextLocationX[2] = activeBlocks[2].x + 30;
			nextLocationY[2] = activeBlocks[2].y + 30;
			nextLocationX[3] = activeBlocks[3].x;
			nextLocationY[3] = activeBlocks[3].y + 60;
		}
		else if (blockPosition == 2 || blockPosition == 4) {
			nextLocationX[0] = activeBlocks[0].x - 30;
			nextLocationY[0] = activeBlocks[0].y + 30;
			nextLocationX[1] = activeBlocks[1].x;
			nextLocationY[1] = activeBlocks[1].y;
			nextLocationX[2] = activeBlocks[2].x - 30;
			nextLocationY[2] = activeBlocks[2].y - 30;
			nextLocationX[3] = activeBlocks[3].x;
			nextLocationY[3] = activeBlocks[3].y - 60;
		}
	}
	else if (blockPattern == 5) {
		if (blockPosition == 1 || blockPosition == 3) {
			nextLocationX[0] = activeBlocks[0].x - 30;
			nextLocationY[0] = activeBlocks[0].y + 30;
			nextLocationX[1] = activeBlocks[1].x;
			nextLocationY[1] = activeBlocks[1].y;
			nextLocationX[2] = activeBlocks[2].x + 30;
			nextLocationY[2] = activeBlocks[2].y + 30;
			nextLocationX[3] = activeBlocks[3].x + 60;
			nextLocationY[3] = activeBlocks[3].y;
		}
		else if (blockPosition == 2 || blockPosition == 4) {
			nextLocationX[0] = activeBlocks[0].x + 30;
			nextLocationY[0] = activeBlocks[0].y - 30;
			nextLocationX[1] = activeBlocks[1].x;
			nextLocationY[1] = activeBlocks[1].y;
			nextLocationX[2] = activeBlocks[2].x - 30;
			nextLocationY[2] = activeBlocks[2].y - 30;
			nextLocationX[3] = activeBlocks[3].x - 60;
			nextLocationY[3] = activeBlocks[3].y;
		}
	}
	else if (blockPattern == 6) {
		if (blockPosition == 1) {
			nextLocationX[0] = activeBlocks[0].x + 30;
			nextLocationY[0] = activeBlocks[0].y + 30;
			nextLocationX[1] = activeBlocks[1].x;
			nextLocationY[1] = activeBlocks[1].y;
			nextLocationX[2] = activeBlocks[2].x;
			nextLocationY[2] = activeBlocks[2].y;
			nextLocationX[3] = activeBlocks[3].x;
			nextLocationY[3] = activeBlocks[3].y;
		}
		else if (blockPosition == 2) {
			nextLocationX[0] = activeBlocks[0].x;
			nextLocationY[0] = activeBlocks[0].y;
			nextLocationX[1] = activeBlocks[1].x;
			nextLocationY[1] = activeBlocks[1].y;
			nextLocationX[2] = activeBlocks[2].x;
			nextLocationY[2] = activeBlocks[2].y;
			nextLocationX[3] = activeBlocks[3].x - 30;
			nextLocationY[3] = activeBlocks[3].y + 30;
		}
		else if (blockPosition == 3) {
			nextLocationX[0] = activeBlocks[0].x;
			nextLocationY[0] = activeBlocks[0].y;
			nextLocationX[1] = activeBlocks[1].x;
			nextLocationY[1] = activeBlocks[1].y;
			nextLocationX[2] = activeBlocks[2].x - 30;
			nextLocationY[2] = activeBlocks[2].y - 30;
			nextLocationX[3] = activeBlocks[3].x;
			nextLocationY[3] = activeBlocks[3].y;
		}
		else if (blockPosition == 4) {
			nextLocationX[0] = activeBlocks[0].x - 30;
			nextLocationY[0] = activeBlocks[0].y - 30;
			nextLocationX[1] = activeBlocks[1].x;
			nextLocationY[1] = activeBlocks[1].y;
			nextLocationX[2] = activeBlocks[2].x + 30;
			nextLocationY[2] = activeBlocks[2].y + 30;
			nextLocationX[3] = activeBlocks[3].x + 30;
			nextLocationY[3] = activeBlocks[3].y - 30;
		}
	}
	for (i = 0; i < activeBlocks.length; i++) {
			tileY = (nextLocationY[i] - 15)/30;
			tileX = ((nextLocationX[i] - 265)/30);
			if (nextLocationY[i] <= 575 && nextLocationX[i] >= 265 && nextLocationX[i] <= 535) {
				if (tiles[tileX][tileY] == false) {
					rotationCheck += 1;
				}
			}
	}
	if (rotationCheck == 4) {
		if (blockPosition == 4) {
			blockPosition = 1;
		}
		else {
			blockPosition += 1;
		}
		activeBlocks[0].x = nextLocationX[0];
		activeBlocks[0].y = nextLocationY[0];
		activeBlocks[1].x = nextLocationX[1];
		activeBlocks[1].y = nextLocationY[1];
		activeBlocks[2].x = nextLocationX[2];
		activeBlocks[2].y = nextLocationY[2];
		activeBlocks[3].x = nextLocationX[3];
		activeBlocks[3].y = nextLocationY[3];
	}
	rotationCheck = 0;
}

function setBlock() {
	for (i = 0; i < activeBlocks.length; i++) {
		tileY = (activeBlocks[i].y - 15)/30;
		tileX = ((activeBlocks[i].x - 265)/30);
		tiles[tileX][tileY] = true;
		stored_colour[tileX][tileY] = block_type;
		setBlocks.create(activeBlocks[i].x, activeBlocks[i].y, block_type);
	}
	block_place.play();
	spaceMoveReset = true;
	nextRecall = true;
	randomBlock();
	nextRecall = false;
	for (i = 0; i < activeBlocks.length; i++) {
		activeBlocks[i].x = blockX[i];
		activeBlocks[i].y = blockY[i];
	}
	nextPattern = Math.floor(Math.random()*7);
	if (nextPattern == 0) {
		nextBlocks.anims.play('yellow_block1');
	}
	else if (nextPattern == 1) {
		nextBlocks.anims.play('light_blue_block1');
	}
	else if (nextPattern == 2) {
		nextBlocks.anims.play('blue_block1');
	}
	else if (nextPattern == 3) {
		nextBlocks.anims.play('orange_block1');
	}
	else if (nextPattern == 4) {
		nextBlocks.anims.play('green_block1');
	}
	else if (nextPattern == 5) {
		nextBlocks.anims.play('red_block1');
	}
	else if (nextPattern == 6) {
		nextBlocks.anims.play('purple_block1');
	}
}

function randomBlock() {
	if (storedRecall == false && nextRecall == false) {
		blockPattern = Math.floor(Math.random()*7);
	}
	else if (nextRecall == true) {
		blockPattern = nextPattern;
	}
	else {
		blockPattern = previousStoredPattern;
	}
	blockPosition = 1;
	
	if (blockPattern == 0) {
		blockX[0] = 415;
		blockY[0] = 15;
		blockX[1] = 445;
		blockY[1] = 15;
		blockX[2] = 445;
		blockY[2] = 45;
		blockX[3] = 415;
		blockY[3] = 45;
		block_type = 'yellow_block';
	}
	else if (blockPattern == 1) {
		blockX[0] = 385;
		blockY[0] = 15;
		blockX[1] = 415;
		blockY[1] = 15;
		blockX[2] = 445;
		blockY[2] = 15;
		blockX[3] = 475;
		blockY[3] = 15;
		block_type = 'light_blue_block';
	}
	else if (blockPattern == 2) {
		blockX[0] = 385;
		blockY[0] = 15;
		blockX[1] = 385;
		blockY[1] = 45;
		blockX[2] = 415;
		blockY[2] = 45;
		blockX[3] = 445;
		blockY[3] = 45;
		block_type = 'blue_block';
	}
	else if (blockPattern == 3) {
		blockX[0] = 445;
		blockY[0] = 15;
		blockX[1] = 445;
		blockY[1] = 45;
		blockX[2] = 415;
		blockY[2] = 45;
		blockX[3] = 385;
		blockY[3] = 45;
		block_type = 'orange_block';
	}
	else if (blockPattern == 4) {
		blockX[0] = 385;
		blockY[0] = 45;
		blockX[1] = 415;
		blockY[1] = 45;
		blockX[2] = 415;
		blockY[2] = 15;
		blockX[3] = 445;
		blockY[3] = 15;
		block_type = 'green_block';
	}
	else if (blockPattern == 5) {
		blockX[0] = 445;
		blockY[0] = 45;
		blockX[1] = 415;
		blockY[1] = 45;
		blockX[2] = 415;
		blockY[2] = 15;
		blockX[3] = 385;
		blockY[3] = 15;
		block_type = 'red_block';
	}
	else if (blockPattern == 6) {
		blockX[0] = 385;
		blockY[0] = 45;
		blockX[1] = 415;
		blockY[1] = 45;
		blockX[2] = 445;
		blockY[2] = 45;
		blockX[3] = 415;
		blockY[3] = 15;
		block_type = 'purple_block';
	}
}

function removeLine() {
	console.log(removed_lines);
	console.log(removed_lines.length);
	score += removed_lines.length;
	scoreText.setText(score);
	setBlocks.clear(true, true);
	for (i = 0; i < removed_lines.length; i++) {
		for (j = 0; j < tiles.length; j++) {
			tiles[j][removed_lines[i]] = false;
		}
	}
	for (k = 0; k < removed_lines.length; k++) {
		setBlocks.clear(true, true);
		for (i = tiles[0].length; i > 0; i--) {
			for (j = 0; j < tiles.length; j++) {
				if (tiles[j][i] == true) {
					if (i < removed_lines[k]) {
					newY = ((i+1)*30)+15;
					newX = ((j)*30)+265;
					}
					else if (i > removed_lines[k]) {
					newY = ((i)*30)+15;
					newX = ((j)*30)+265;
					}
					setBlocks.create(newX, newY, stored_colour[j][i]);
					if (i < removed_lines[k]) {
						tiles[j][i] = false;
						tiles[j][i+1] = true;
						stored_colour[j][i+1] = stored_colour[j][i];
						stored_colour[j][i] = 0;
					}
				}
			}
		}
	}
}

function storeBlocks() {
	storedBlocks.anims.play(block_type+'1', true);
	if (storeFill == false) {
		storedBlocks.alpha = 1;
		storedPattern = blockPattern;
		nextRecall = true;
		randomBlock();
		nextRecall = false;
		nextPattern = Math.floor(Math.random()*7);
		if (nextPattern == 0) {
			nextBlocks.anims.play('yellow_block1');
		}
		else if (nextPattern == 1) {
			nextBlocks.anims.play('light_blue_block1');
		}
		else if (nextPattern == 2) {
			nextBlocks.anims.play('blue_block1');
		}
		else if (nextPattern == 3) {
			nextBlocks.anims.play('orange_block1');
		}
		else if (nextPattern == 4) {
			nextBlocks.anims.play('green_block1');
		}
		else if (nextPattern == 5) {
			nextBlocks.anims.play('red_block1');
		}
		else if (nextPattern == 6) {
			nextBlocks.anims.play('purple_block1');
		}
	}
	else {
		previousStoredPattern = storedPattern;
		storedPattern = blockPattern;
		storedRecall = true;
		randomBlock();
		storedRecall = false;
		
	}
	for (i = 0; i < activeBlocks.length; i++) {
		activeBlocks[i].x = blockX[i];
		activeBlocks[i].y = blockY[i];
	}
	storeFill = true;
}