import Phaser from 'phaser';
import config from '../Config/config';

export default class InputNameScene extends Phaser.Scene {
  constructor() {
    super('InputName');
  }

  preload() {
    this.load.html('inputName', 'assets/inputName.html');
  }

  create() {
    this.add.dom(config.width * 0.5, 200).createFromCache('inputName');

    this.gameButton = this.add.sprite(100, 200, 'blueButton1').setInteractive();
    this.centerButton(this.gameButton, 0);

    this.gameText = this.add.text(0, 0, 'Start', { fontSize: '32px', fill: '#fff' });
    this.centerButtonText(this.gameText, this.gameButton);

    this.gameButton.on('pointerdown', () => {
      config.name = document.getElementById('name').value;
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