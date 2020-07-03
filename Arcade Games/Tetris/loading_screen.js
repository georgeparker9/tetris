class loading_screen extends Phaser.Scene {
	constructor() {
		super({key: "bootGame"});
	}
	preload() {
		this.load.image('menu_background', 'Tetris/assets/images/menu_background.png');
		this.load.image('play_button', 'Tetris/assets/images/play_button.png');
	}
    create() {
		background_image = this.physics.add.staticGroup();
		background_image.create(400, 300, 'menu_background');
		start_button = this.physics.add.sprite(400, 300, 'play_button').setInteractive();
		start_button.on( 'pointerdown', startGame);
	}
	update() {
		if (gameStart == true) {
			this.scene.start('playGame');
			this.scene.stop('bootGame');
		}
	}
}

function startGame() {
	gameStart = true;
}
