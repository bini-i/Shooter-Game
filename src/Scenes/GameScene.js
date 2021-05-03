import 'phaser';
import {Player, Target} from "./Entities";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
    this.player
    this.score = 0;
    this.gameOver = false;
    this.cursors
  }

  create() {
    
    this.add.image(400, 300, 'background');
    this.add.image(400, 300, 'moonOverlay');
    this.player = new Player(
        this,
        this.game.config.width * 0.5,
        this.game.config.height * 0.5,
        "spaceShip"
        ); 
    this.player.scale = 0.4
    this.keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    this.keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    this.keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    this.keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.playerLasers = this.add.group();
    this.targets = this.add.group();

    this.time.addEvent({
      delay: 100,
      callback: function() {
        let target = new Target(
          this,
          Phaser.Math.Between(0, this.game.config.width),
          0
        );
        this.targets.add(target);
      },
      callbackScope: this,
      loop: true
    });

    
  }

  update() {
    this.player.update();

    if (this.keyUp.isDown) {
      this.player.moveUp();
    }
    else if (this.keyDown.isDown) {
      this.player.moveDown();
    }

    if (this.keyLeft.isDown) {
      this.player.moveLeft();
    }
    else if (this.keyRight.isDown) {
      this.player.moveRight();
    }
    if (this.keySpace.isDown) {
      this.player.setData("isShooting", true);
    }
    else {
      this.player.setData("timerShootTick", this.player.getData("timerShootDelay") - 1);
      this.player.setData("isShooting", false);
    }
  }
}