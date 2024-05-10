class EnemyBullet extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'enemyBullet');
        scene.add.existing(this);
        scene.physics.world.enable(this);

        this.setVelocityY(300);
        this.setCollideWorldBounds(true);
        this.on('worldbounds', () => this.destroy());
    }

    update() {
        if (this.y > this.scene.sys.game.config.height) {
            this.setActive(false);
            this.setVisible(false);
        }
    }
}
