class MainScene extends Phaser.Scene {
    constructor() {
        super('MainScene');
        this.playerSpeed = 200;    // Movement speed of the player
        this.bulletSpeed = 300;    // Speed of the player's bullet
        this.enemyBulletSpeed = 150;  // Speed of the enemy's bullet
        this.score = 0;            // Initialize score
        this.lives = 3;            // Initialize lives
        this.gameOver = false;     // Track if the game is over
    }

    preload() {
        this.load.setPath("./assets/");
        this.load.image("rabbit", "rabbit.png");
        this.load.image("snake", "snake.png");
        this.load.image("panda", "panda.png");
        this.load.image("duckBrown", "duck_brown.png");
        this.load.image("enemyBullet", "shot_grey_large.png");

        this.load.audio("shoot", "shoot.mp3");
    }

    create() {
        this.player = this.physics.add.sprite(this.sys.game.config.width / 2, this.sys.game.config.height - 50, 'rabbit');
        this.player.setScale(0.3);
        this.player.setCollideWorldBounds(true);

        this.enemies = this.createEnemies();
        this.bullets = this.physics.add.group();
        this.enemyBullets = this.physics.add.group();

        this.scoreText = this.add.text(10, 10, 'Score: 0', { fontSize: '20px', fill: '#ffffff' });
        this.livesText = this.add.text(10, 40, 'Lives: ' + this.lives, { fontSize: '20px', fill: '#ffffff' });

        this.cursors = this.input.keyboard.createCursorKeys();
        this.fireKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        
        this.physics.add.collider(this.bullets, this.enemies, this.hitEnemy, null, this);
        this.physics.add.collider(this.player, this.enemyBullets, this.hitPlayer, null, this);

        this.input.on('pointerdown', () => {
            if (this.gameOver) {
                this.restartGame();
            }
        });
    }

    update() {
        if (!this.gameOver) {
            this.handlePlayerMovement();
            this.handlePlayerShooting();
            this.enemyFire();
            this.checkGameOver();
        }
    }

    createEnemies() {
        let enemies = this.physics.add.group({
            classType: Phaser.Physics.Arcade.Sprite,
            collideWorldBounds: true
        });

        for (let y = 0; y < 2; y++) {
            for (let x = 0; x < 5; x++) {
                let type = y % 2 === 0 ? 'snake' : 'panda';
                let enemy = enemies.create(160 + x * 120, 50 + y * 60, type).setScale(0.2);
                enemy.body.bounce.set(1);
                enemy.setVelocityX(Phaser.Math.Between(50, 100) * (Math.random() < 0.5 ? -1 : 1));
            }
        }
        return enemies;
    }

    checkGameOver() {
        if (this.enemies.countActive(true) === 0) {
            this.gameOverText = this.add.text(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'Game Over - Click to Restart', { fontSize: '20px', fill: '#ffffff' }).setOrigin(0.5);
            this.gameOver = true;
        }
    }

    handlePlayerMovement() {
        this.player.setVelocityX(0);
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-this.playerSpeed);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(this.playerSpeed);
        }
    }

    handlePlayerShooting() {
        if (Phaser.Input.Keyboard.JustDown(this.fireKey)) {
            let bullet = this.bullets.create(this.player.x, this.player.y, 'duckBrown');
            if (bullet) {
                bullet.setVelocityY(-this.bulletSpeed);
            }
        }
    }

    enemyFire() {
        this.enemies.children.iterate(enemy => {
            if (Phaser.Math.Between(0, 1000) > 995) {
                let bullet = this.enemyBullets.create(enemy.x, enemy.y, 'enemyBullet');
                if (bullet) {
                    bullet.setVelocityY(this.enemyBulletSpeed);
                }
            }
        });
    }

    hitEnemy(bullet, enemy) {
        bullet.destroy();
        enemy.destroy();
        this.score += 10;
        this.scoreText.setText('Score: ' + this.score);
    }

    hitPlayer(player, bullet) {
        bullet.destroy();
        this.lives -= 1;
        this.livesText.setText('Lives: ' + this.lives);
        if (this.lives <= 0) {
            this.player.setActive(false);
            this.player.setVisible(false);
            this.physics.pause();
            this.add.text(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'Game Over - Click to Restart', { fontSize: '40px', fill: '#ffffff' }).setOrigin(0.5);
            this.gameOver = true;
        }
    }

    restartGame() {
        this.scene.restart();
        this.gameOver = false;
        this.score = 0;
        this.lives = 3;
    }
}
