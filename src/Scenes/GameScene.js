// eslint-disable-next-line import/no-unresolved
import Phaser from 'phaser';
import { Player, Target } from './Entities';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
    this.player = null;
    this.score = 0;
    this.gameOn = false;
    this.counter = 0;
  }

  create() {
    this.gameOn = false;
    this.counter = 0;
    this.add.image(400, 300, 'background');
    this.add.image(400, 300, 'moonOverlay');
    this.player = new Player(
      this,
      this.game.config.width * 0.5,
      this.game.config.height * 0.75,
      'spaceShip',
    );
    this.player.scale = 0.4;
    this.keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    this.keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    this.keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    this.keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.playerLasers = this.add.group();

    this.targets = this.add.group();
    this.satellites = this.add.group();

    this.time.addEvent({
      delay: 8000,
      callback() {
        const satellite = new Target(
          this,
          this.game.config.width * 0.5,
          this.game.config.width * 0.2,
          'satellite',
        );
        satellite.body.bounce.set(1, 1);
        satellite.body.collideWorldBounds = true;
        satellite.scale = 1.5;
        this.satellites.add(satellite);
        this.physics.add.collider(this.satellites, this.targets, (satellite) => {
          satellite.destroy();
        });
        this.gameOn = true;
      },
      callbackScope: this,
      loop: true,
    });
    this.time.addEvent({
      delay: 1000,
      callback() {
        const target = new Target(
          this,
          Phaser.Math.Between(0, this.game.config.width),
          this.game.config.width * 0.05,
          'target',
        );

        target.body.bounce.set(1, 1);
        target.body.collideWorldBounds = true;

        this.targets.add(target);
        this.physics.add.collider(this.playerLasers, this.targets, (playerLaser, target) => {
          playerLaser.destroy();
          target.destroy();
        });
      },
      callbackScope: this,
      loop: true,
    });

    const score = this.add.text(750, 20, this.counter, { fontSize: '25px', fill: '#008000' });
    this.time.addEvent({
      delay: 1000,
      callback() {
        score.setText(this.counter);
        this.counter += 1;
      },
      callbackScope: this,
      loop: true,
    });
  }

  update() {
    this.player.update();

    if (!this.satellites.children.size && this.gameOn) {
      this.add.text(400, 300, 'Game Over', { fontSize: '40px', fill: '#fff' });
      this.player.onDestroy(this.counter);
      return;
    }

    for (let i = 0; i < this.playerLasers.getChildren().length; i += 1) {
      const playerLaser = this.playerLasers.getChildren()[i];

      if (playerLaser.x < -playerLaser.displayWidth
        || playerLaser.x > this.game.config.width + playerLaser.displayWidth
        || playerLaser.y < -playerLaser.displayHeight * 4
        || playerLaser.y > this.game.config.height + playerLaser.displayHeight) {
        if (playerLaser) {
          playerLaser.destroy();
        }
      }
    }

    if (this.keyLeft.isDown) {
      this.player.moveLeft();
    } else if (this.keyRight.isDown) {
      this.player.moveRight();
    }
    if (this.keySpace.isDown) {
      this.player.setData('isShooting', true);
    } else {
      this.player.setData('timerShootTick', this.player.getData('timerShootDelay') - 1);
      this.player.setData('isShooting', false);
    }
  }
}