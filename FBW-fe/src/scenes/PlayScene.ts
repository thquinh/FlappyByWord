class PlayScene extends Phaser.Scene {
	player: Phaser.Physics.Arcade.Sprite;
	cursors: any;
	staticBackgr: Phaser.GameObjects.Sprite
	background: Phaser.GameObjects.TileSprite[] = [];
	lancelot: Phaser.GameObjects.Sprite;
	ready: boolean = false;
	bottom: integer;
	gameover: Phaser.Sound.BaseSound;

	constructor() {
		super({
			key: 'PlayScene'
		});
	}

	preload() {
		this.load.audio('gameover', [
			'/assets/audio/gameover.ogg',
			'/assets/audio/gameover.mp3'
		]);
		this.load.image('bg', '/assets/image/pink.png');
		this.load.image('bg1', '/assets/image/bg1.png')
		this.load.image('bg2', '/assets/image/bg2.png');
		this.load.image('bg3', '/assets/image/bg3.png');
		this.load.image('bg4', '/assets/image/bg4.png');
		this.load.image('bg5', '/assets/image/bg5.png');
		this.load.spritesheet('player', '/assets/sprites/player.png', { frameWidth: 100, frameHeight: 100 });
	}

	create() {
		this.cursors = this.input.keyboard.createCursorKeys();
		this.staticBackgr = this.add.sprite(960, 540, 'bg');
		this.background.push(this.add.tileSprite(960, 540, 1920, 1080, 'bg1'));
		this.background.push(this.add.tileSprite(960, 540, 1920, 1080, 'bg2'));
		this.background.push(this.add.tileSprite(960, 540, 1920, 1080, 'bg3'));
		this.background.push(this.add.tileSprite(960, 540, 1920, 1080, 'bg4'));
		this.background.push(this.add.tileSprite(960, 540, 1920, 1080, 'bg5'));


		this.player = this.physics.add.sprite(400, 200, 'player');

		this.player.setBounce(0, 1);
		this.player.setCollideWorldBounds(true);

		this.anims.create({
			key: 'turn',
			frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
			frameRate: 10,
			repeat: -1
		});

		this.anims.create({
			key: 'down',
			frames: this.anims.generateFrameNumbers('player', { start: 4, end: 7 }),
			frameRate: 10
		});

		this.anims.create({
			key: 'up',
			frames: this.anims.generateFrameNumbers('player', { start: 8, end: 11 }),
			frameRate: 10,
			repeat: -1
		});

		this.bottom = this.physics.world.bounds.bottom;
		this.gameover = this.sound.add('gameover');
		// var music = this.sound.add('gameover');
		// music.play();
	}

	update() {
		this.background.forEach((bg, i) => {
			bg.tilePositionX += i * 1;
		})
		if (this.cursors.space.isDown) {
			this.ready = true;
			this.player.setVelocityY(-200);
			this.player.play('up', true);
		}
		else if (!this.ready) {
			this.player.setVelocityY(0);
			this.player.play('turn', true);
		}
		else {
			this.player.setVelocityY(400);
			this.player.play('down', true);
			if (this.player.getBottomLeft().y === this.bottom) {
				this.gameover.play();
				alert('Game over');
			}
		}
	}
}

export default PlayScene;