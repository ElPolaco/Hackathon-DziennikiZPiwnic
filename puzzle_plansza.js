const gameHeight = window.screen.availHeight;
const gameWidth = window.screen.availWidth;

let appScene = new PIXI.Application({ width: gameWidth, height: gameHeight });
document.body.appendChild(appScene.view);

const playerSpeed = 10;
class Player {
    x = gameWidth / 2;
    y = gameHeight / 2;

    constructor(scene) {
        this.scene = scene;
        this.sprite = PIXI.Sprite.from('/player/p1.png');
        scene.stage.addChild(this.sprite);
        this.sprite.position.x = this.x;
        this.sprite.position.y = this.y;
        this.sprite.scale.x = 4;
        this.sprite.scale.y = 4;
    }

    restoreAfterMovement() {
        this.sprite.position.x = this.x;
        this.sprite.position.y = this.y;
        this.sprite.scale.x = 4;
        this.sprite.scale.y = 4;
    }

    moveLeft() {
        this.scene.stage.removeChild(this.sprite);
        this.sprite = PIXI.Sprite.from('/player/p4.png');
        this.scene.stage.addChild(this.sprite);
        this.restoreAfterMovement();
        this.x -= playerSpeed;
        this.sprite.position.x -= playerSpeed;
    }

    moveRight() {
        this.scene.stage.removeChild(this.sprite);
        this.sprite = PIXI.Sprite.from('/player/p3.png');
        this.scene.stage.addChild(this.sprite);
        this.restoreAfterMovement();
        this.x += playerSpeed;
        this.sprite.position.x += playerSpeed;
    }

    moveUp() {
        this.scene.stage.removeChild(this.sprite);
        this.sprite = PIXI.Sprite.from('/player/p2.png');
        this.scene.stage.addChild(this.sprite);
        this.restoreAfterMovement();
        this.y -= playerSpeed;
        this.sprite.position.y -= playerSpeed;
    }

    moveDown() {
        this.scene.stage.removeChild(this.sprite);
        this.sprite = PIXI.Sprite.from('/player/p1.png');
        this.scene.stage.addChild(this.sprite);
        this.restoreAfterMovement();
        this.y += playerSpeed;
        this.sprite.position.y += playerSpeed;
    }
}


let bg = PIXI.Sprite.from('/assets/plansza.jpg');
appScene.stage.addChild(bg);

const player = new Player(appScene);

let playerActive = true;
document.addEventListener('keydown', (event) => {
    if (playerActive) {
        if (event.keyCode == 37) {
            player.moveLeft();
        }
        else if (event.keyCode == 39) {
            player.moveRight();
        }
        else if (event.keyCode == 38) {
            player.moveUp();
        }
        else if (event.keyCode == 40) {
            player.moveDown();
        }
    }
});

const puzzel = PIXI.Sprite.from('/assets/puzzel.png');
puzzel.scale.x = 0.3;
puzzel.scale.y = 0.3;
puzzel.position.y = gameHeight * 0.2;
puzzel.position.x = gameWidth * 0.8;

appScene.stage.addChild(puzzel);

appScene.ticker.add((delta) => {
    const distanceToTelescope = Math.sqrt(Math.pow((puzzel.position.x - player.sprite.position.x), 2)
        +
        Math.pow((puzzel.position.y - player.sprite.position.y), 2)
    );
    if (distanceToTelescope < 200) {
        window.location.href = "PuzzleKopernik/index.html";
    }

});



