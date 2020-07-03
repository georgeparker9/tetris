var newHighScoreText;

class game_over extends Phaser.Scene {
	constructor() {
		super({key: "endGame"});
	}
	create() {
		endText = this.add.text(250, 100, 'GAME OVER', { fontSize: '50px', fill: 'RED' });
		finalScoreText = this.add.text(315, 200, 'Score: ' + score, { fontSize: '30px', fill: 'RED' });
		highScoreText = this.add.text(300, 250, 'High Score: ' + highScore, { fontSize: '30px', fill: 'RED' });
		if (newHighScore == true) {
			newHighScoreText = this.add.text(175, 325, 'NEW HIGH SCORE!!', { fontSize: '50px', fill: 'Blue' });
		}
	}
	update() {
		if (endingTimer == 200) {
			location.reload();
			this.scene.stop('endGame');
		}
		else {
			endingTimer += 1
		}
	}
}