class TitleScene extends Phaser.Scene {
    constructor() {
        super({ key: 'TitleScene' });
    }

    preload() {
        // Ensure the path is correct for the assets
        this.load.image('startButton', 'assets/text_go.png');  // Adjust the path as necessary
    }

    create() {
        // Add the title text to the scene
        this.add.text(this.cameras.main.width / 2, 150, 'Gallery Shooter Game', {
            font: '40px Arial',
            fill: '#ffffff'
        }).setOrigin(0.5);

        // Display control instructions
        this.add.text(this.cameras.main.width / 2, 200, 'Controls:\nArrow Keys to move\nSpace to shoot', {
            font: '20px Arial',
            fill: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);

        // Create the start button
        let startButton = this.add.image(this.cameras.main.width / 2, 350, 'startButton').setInteractive();
        startButton.on('pointerdown', () => {
            // Start the MainScene when the 'startButton' is clicked
            this.scene.start('MainScene');
        });

        // Center the button
        startButton.setOrigin(0.5);

        // Optional: Add some hover effects to indicate interactivity
        startButton.on('pointerover', () => {
            startButton.setScale(1.1);  // Scale up when hovered
        });

        startButton.on('pointerout', () => {
            startButton.setScale(1);  // Scale down when not hovered
        });
    }
}


