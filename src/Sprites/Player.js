class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        scene.add.existing(this); // Add to the scene
        scene.physics.world.enable(this); // Enable physics
        this.setCollideWorldBounds(true); // Prevent it from going out of bounds

        // Set up the cursor keys
        this.cursors = scene.input.keyboard.createCursorKeys();
    }

    update() {
        this.body.setVelocityX(0); // Stop horizontal movement by default

        if (this.cursors.left.isDown) {
            this.body.setVelocityX(-200); // Move left
        } else if (this.cursors.right.isDown) {
            this.body.setVelocityX(200); // Move right
        }
    }
}
