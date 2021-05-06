import 'phaser';
import { Player, Target } from './Entities';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
    this.player;
    this.score = 0;
    this.gameOn = false;
  }

  create() {
    this.gameOn = false
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
        satellite.body.collideWorldBounds = true
        satellite.scale = 1.5;
        this.satellites.add(satellite);
        this.physics.add.collider(this.satellites, this.targets, (satellite, target) => {
          satellite.destroy();
        });
        this.gameOn = true;
      },
      callbackScope: this,
      loop: true,
    });
    this.time.addEvent({
      delay: 500,
      callback() {
        const target = new Target(
          this,
          Phaser.Math.Between(0, this.game.config.width),
          this.game.config.width * 0.05,
          'target',
        );
        // target.body.collideWorldBounds = true
        this.targets.add(target);
        this.physics.add.collider(this.playerLasers, this.targets, (playerLaser, target) => {
          playerLaser.destroy();
          target.destroy();
        });
      },
      callbackScope: this,
      loop: true,
    });

    // const platforms = this.physics.add.staticGroup();

    // platforms.create(400, 0).setScale(2).refreshBody();
    // platforms.create(400, 200).setScale(2).refreshBody();

    // this.physics.add.collider(this.targets, platforms, (target) => {
    //   target.update();
    // });
    // this.physics.add.collider(this.satellites, platforms);
  }

  update() {
    this.player.update();

    if (!this.satellites.children.size && this.gameOn) {
      this.add.text(400, 300, 'Game Over', { fontSize: '40px', fill: '#fff' });
      this.player.onDestroy();
      return;
    }

    for (let i = 0; i < this.targets.getChildren().length; i++) {
      const target = this.targets.getChildren()[i];

      if (target.x < -target.displayWidth
        || target.x > this.game.config.width + target.displayWidth
        || target.y < -target.displayHeight * 4
        || target.y > this.game.config.height + target.displayHeight) {
        if (target) {
          target.destroy();
        }
      }
    }

    for (let i = 0; i < this.satellites.getChildren().length; i++) {
      const satellite = this.satellites.getChildren()[i];

      if (satellite.x < -satellite.displayWidth
        || satellite.x > this.game.config.width + satellite.displayWidth
        || satellite.y < -satellite.displayHeight * 4
        || satellite.y > this.game.config.height + satellite.displayHeight) {
        if (satellite) {
          satellite.destroy();
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