const gameHeight = window.screen.availHeight;
const gameWidth = window.screen.availWidth;

const opponents = 48;
const opponentsPerRow = opponents / 3;
const startPositionX = gameWidth * 0.28;
const startPositionY = 95;

class Shot {
    constructor(scene, x, y) {
        this.sprite = PIXI.Sprite.from('/assets/pewpew.png');
        scene.stage.addChild(this.sprite);
        this.sprite.position.x = x + this.sprite.height;
        this.sprite.position.y = y;
        this.sprite.rotation = Math.PI / 2;
    }
}

class PiernikoidyGame {
    activeShots = [];
    piernikoidy = [];
    score = 0;
    gameActive = false;
    rotationUp = true;
    rotation = 0.0;

    constructor(app, onWin) {
        this.app = app;
        this.gameActive = true;
        // Narysuj tlo
        let spaceBg = PIXI.Sprite.from('/assets/space.jpg');
        app.stage.addChild(spaceBg);

        let rowCounter = 0;
        for (let i = 0; i < opponents; i++) {
            const piernikoida = PIXI.Sprite.from('/assets/piernikoida.png');
            piernikoida.scale.x = 0.1;
            piernikoida.scale.y = 0.1;
            piernikoida.position.y += startPositionY;
            piernikoida.position.x += (50 * rowCounter) + startPositionX;
            if (this.piernikoidy.length < 16 && this.piernikoidy.length >= 0) {

            }
            else if (this.piernikoidy.length < 32 && this.piernikoidy.length >= 16) {
                piernikoida.position.y += 80;
            }
            else if (this.piernikoidy.length < 48 && this.piernikoidy.length >= 32) {
                piernikoida.position.y += 160;
            }
            rowCounter++;
            if (rowCounter === opponentsPerRow) {
                rowCounter = 0;
            }

            app.stage.addChild(piernikoida);
            this.piernikoidy.push(piernikoida);
        }

        let spaceship = PIXI.Sprite.from('/assets/spaceship2.png');
        spaceship.scale.x = 2;
        spaceship.scale.y = 2;
        app.stage.addChild(spaceship);

        spaceship.position.set(app.renderer.screen.width / 2, app.renderer.screen.height * 0.7);

        let speed = 0.0;

        const speedFactor = 3.4;
        const maxSpeed = 10.0;

        document.addEventListener('keydown', (event) => {
            if (this.gameActive) {
                console.log("click")
                if (event.keyCode == 37) {
                    if (speed > (-1.0 * maxSpeed)) {
                        speed -= speedFactor;
                    }
                }
                else if (event.keyCode == 39) {
                    if (speed < (maxSpeed)) {
                        speed += speedFactor;
                    }
                }
                else if (event.keyCode == 32) {
                    const newShot = new Shot(
                        app,
                        spaceship.position.x + spaceship.width / 2,
                        spaceship.position.y - spaceship.height / 2
                    );
                    this.activeShots.push(newShot);
                }
            }
        });

        app.ticker.add((delta) => {
            if (this.gameActive) {
                spaceship.position.x += speed;

                for (const shot of this.activeShots) {
                    shot.sprite.position.y -= 8;
                    for (const piernikoida of this.piernikoidy) {
                        if (
                            (shot.sprite.position.x < (piernikoida.position.x + piernikoida.width) && shot.sprite.position.x > (piernikoida.position.x - piernikoida.width))
                            &&
                            (
                                (shot.sprite.position.y < (piernikoida.position.y + piernikoida.height))
                                &&
                                (shot.sprite.position.y > piernikoida.position.y)
                            )
                        ) {
                            // trafienie


                            // app.stage.removeChild(piernikoida);
                            // app.stage.removeChild(shot.sprite);

                            const boom = PIXI.Sprite.from('/assets/boom.png');
                            boom.scale.x = 4;
                            boom.scale.y = 4;
                            app.stage.addChild(boom);
                            boom.position.x = piernikoida.position.x - piernikoida.width / 2;
                            boom.position.y = piernikoida.position.y;

                            shot.sprite.position.x = 2 * gameWidth;
                            piernikoida.position.x = 3 * gameWidth;

                            setTimeout(() => {
                                // boom.position.x = 5 * gameWidth;
                                app.stage.removeChild(boom);
                                this.score++;
                            }, 100);
                        }
                    }
                }

                if ((spaceship.position.x < (gameWidth * 0.05)) || (spaceship.position.x > (gameWidth * 0.9))) {
                    speed = 0.0;
                }

                if (this.score === opponents) {
                    this.score = 0;
                    app.stage.removeChild(spaceBg);
                    app.stage.removeChild(spaceship);
                    for (const piernikoida of this.piernikoidy) {
                        app.stage.removeChild(piernikoida);
                    }
                    for (const shot of this.activeShots) {
                        app.stage.removeChild(shot.sprite);
                    }
                    this.gameActive = false;
                    onWin();
                }


                for (const piernikoida of this.piernikoidy) {
                    if (this.rotationUp) {
                        this.rotation += 0.00001;
                    }
                    else {
                        this.rotation -= 0.00001;
                    }
                    piernikoida.rotation += this.rotation;
                }

                if (this.rotation > 0.05) {
                    this.rotationUp = false;
                }

                if (this.rotation < -0.05) {
                    this.rotationUp = true;
                }
            }
        });
    }

}

let appScene = new PIXI.Application({ width: gameWidth, height: gameHeight });
document.body.appendChild(appScene.view);

new PiernikoidyGame(appScene, ()=>{
    window.location.href = "Final/index.html";
});