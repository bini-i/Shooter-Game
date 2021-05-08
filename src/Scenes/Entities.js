// eslint-disable-next-line import/no-unresolved
/* eslint-disable */
import Phaser from 'phaser';

export class Entity extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, key, type) {
    super(scene, x, y, key);
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enableBody(this, 0);
    this.setData('type', type);
    this.setData('isDead', false);
  }
}

export class PlayerLaser extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'bullet');
    this.body.velocity.y = -Phaser.Math.FloatBetween(300, 600);
  }
}
export class Player extends Entity {
  constructor(scene, x, y, key) {
    super(scene, x, y, key, 'Player');
    this.setData('speed', 400);
    this.setData('timerShootDelay', 100);
    this.setData('timerShootTick', this.getData('timerShootDelay') - 1);
  }

  moveLeft() {
    this.body.velocity.x = -this.getData('speed');
  }

  moveRight() {
    this.body.velocity.x = this.getData('speed');
  }

  update() {
    this.body.setVelocity(0, 0);

    this.x = Phaser.Math.Clamp(this.x, 0, this.scene.game.config.width);
    this.y = Phaser.Math.Clamp(this.y, 0, this.scene.game.config.height);

    if (this.getData('isShooting')) {
      if (this.getData('timerShootTick') < this.getData('timerShootDelay')) {
        this.setData('timerShootTick', this.getData('timerShootTick') + 1); // every game update, increase timerShootTick by one until we reach the value of timerShootDelay
      } else { // when the "manual timer" is triggered:
        const laser = new PlayerLaser(this.scene, this.x, this.y);
        this.scene.playerLasers.add(laser);

        this.setData('timerShootTick', 0);
      }
    }
  }

  onDestroy() {
    this.scene.time.addEvent({
      delay: 1000,
      callback() {
        this.scene.scene.start('Title');
      },
      callbackScope: this,
      loop: false,
    });
  }
}

export class Target extends Entity {
  constructor(scene, x, y, type) {
    super(scene, x, y, type);
    this.body.velocity.x = Phaser.Math.FloatBetween(-20, 20);
    this.body.velocity.y = Phaser.Math.FloatBetween(-20, 20);
  }

  update() {
    this.body.velocity.x = -this.body.velocity.x;
    this.body.velocity.y = -this.body.velocity.y;
  }
}
