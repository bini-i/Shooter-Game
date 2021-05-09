// eslint-disable-next-line import/no-unresolved
import Phaser from 'phaser';
import config from '../Config/config';

export default class LeaderboardScene extends Phaser.Scene {
  constructor() {
    super('LeaderBoard');
  }

  create() {
    // Game
    fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/J0cS5gwuXEpiiRrDlkUW/scores/')
      .then((response) => response.json())
      .then((data) => {
        const size = data.result.length;
        for (let i = 0; i < size; i += 1) {
          this.add.text(config.width * 0.38, config.height * 0.35 + (i * 30), `${i + 1}. ${data.result[i].user} : ${data.result[i].score}`, { fill: '#ffffff', font: '700 20px Roboto' });
        }
      });

    this.backButton = this.add.sprite(300, 200, 'blueButton1').setInteractive();
    this.centerButton(this.backButton, 0);

    this.backText = this.add.text(0, 0, 'Back', { fontSize: '32px', fill: '#fff' });
    this.centerButtonText(this.backText, this.backButton);

    this.backButton.on('pointerdown', () => {
      this.scene.start('Title');
    });

    this.input.on('pointerover', (event, gameObjects) => {
      gameObjects[0].setTexture('blueButton2');
    });

    this.input.on('pointerout', (event, gameObjects) => {
      gameObjects[0].setTexture('blueButton1');
    });
  }

  centerButton(gameObject, offset = 0) {
    Phaser.Display.Align.In.Center(
      gameObject,
      this.add.zone(config.width / 2, config.height / 2 - offset * 100,
        config.width, config.height),
    );
  }

    centerButtonText = (gameText, gameButton) => {
      Phaser.Display.Align.In.Center(
        gameText,
        gameButton,
      );
    }
}