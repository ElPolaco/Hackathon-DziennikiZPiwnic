let app = new PIXI.Application({
    width: window.screen.availWidth,
    height: window.screen.availHeight
});
let current = 0; //Aktualne zadanie
let task = "";
const scale = 3;
const black_pieces = [];
const white_pieces = [];
const w_pawns = [];
const b_pawns = [];
let defaultX, defaultY;
let richText = null;
document.body.appendChild(app.view);

app.loader
    .add("chessboard", "./assets/pixel chess_v1.2/boards/board_plain_04.png")
    .add("pieces", "./assets/chess/chess_pieces.json")
    .add("scroll", "./assets/scroll.png")
    .load((loader, resources) => {//Wczytywanie szachownicy i bierek
        const board = resources.chessboard.texture;

        let i = 0;
        let x;
        const names = ["Bishop", "King", "Knight", "Pawn", "Queen", "Rook"];




        names.forEach(element => {
            switch (element) {
                case "Knight":
                    x = 2.5;
                    break;
                case "Rook":
                    x = 3.5;
                    break;
                case "Bishop":
                    x = 1.5;
                    break;
            }
            if (element == "Pawn") {
                for (let j = 0; j < 8; j++) {
                    const white = createPiece(PIXI.Texture.from(`W_${element}.png`));
                    white.x = 16 * scale * (0.5 + j - 4);
                    white.y = 16 * scale * 2;
                    w_pawns.push(white);
                    const black = createPiece(PIXI.Texture.from(`B_${element}.png`));
                    black.x = 16 * scale * (0.5 + j - 4);
                    black.y = 16 * scale * -3;
                    b_pawns.push(black);
                }

            } else if (element == "King" || element == "Queen") {
                x = element == "King" ? 0.5 : -0.5;
                const white = createPiece(PIXI.Texture.from(`W_${element}.png`));
                white.x = 16 * scale * (x);
                white.y = 16 * scale * 3;
                white_pieces.push(white);

                const black = createPiece(PIXI.Texture.from(`B_${element}.png`));
                black.x = 16 * scale * (x);
                black.y = 16 * scale * -4;
                black_pieces.push(black);
                i++;

            } else {
                for (let j = 0; j < 2; j++) {
                    //0 - 'lewa' strona szachwonicy
                    //1 - 'prawa' strona szachownicy
                    const white = createPiece(PIXI.Texture.from(`W_${element}.png`));
                    white.x = (j == 0 ? -1 : 1) * 16 * scale * (x);
                    white.y = 16 * scale * 3;
                    white_pieces.push(white);

                    const black = createPiece(PIXI.Texture.from(`B_${element}.png`));
                    black.x = (j == 0 ? -1 : 1) * 16 * scale * (x);
                    black.y = 16 * scale * -4;
                    black_pieces.push(black);
                    i++;
                }
            }
        });

        const container = new PIXI.Container();
        container.x = app.screen.width / 2;
        container.y = app.screen.height / 2;
        container.pivot.set(0.5);

        const chessboard = new PIXI.Sprite(board);
        chessboard.x = 0;
        chessboard.y = 0;
        chessboard.anchor.set(0.5);

        chessboard.scale.set(scale);
        container.addChild(chessboard);

        for (i = 0; i < 8; i++) {
            container.addChild(w_pawns[i]);
            container.addChild(b_pawns[i]);
        }
        for (i = 0; i < 8; i++) {
            container.addChild(white_pieces[i]);
            container.addChild(black_pieces[i]);

        }

        app.stage.addChild(container);
        const container2 = new PIXI.Container();
        container2.x = app.screen.width / 2 + container.width;
        container2.y = app.screen.height / 2;
        const scrollTexture = resources.scroll.texture;
        const scroll = new PIXI.Sprite(scrollTexture);
        scroll.anchor.set(0.5);
        scroll.scale.set(0.5);

        const style = new PIXI.TextStyle({
            fontFamily: 'Silkscreen',
            fontSize: 31,
            fontWeight: 'bold',
            fill: ['#000'],
            wordWrap: true,
            wordWrapWidth: 250,
            lineJoin: 'round',
        });
        task = 'Aby uciec przed wladza - lud wykonal dwa kroki';
        richText = new PIXI.Text(task, style);
        richText.anchor.set(0.5);
        richText.x = 5;
        container2.addChild(scroll);
        container2.addChild(richText);
        app.stage.addChild(container2);
        console.log(black_pieces[4].x);

    });


function createPiece(texture) {
    const piece = new PIXI.Sprite(texture);
    piece.scale.set(scale);
    piece.anchor.set(0.5);
    piece.interactive = true;
    piece.buttonMode = true;
    piece.on('pointerdown', onDragStart)
        .on('pointerup', onDragEnd)
        .on('pointerupoutside', onDragEnd)
        .on('pointermove', onDragMove);
    return piece;
}

function onDragStart(event) {

    this.data = event.data;
    this.alpha = 0.5;
    this.dragging = true;
    defaultX = this.x;
    defaultY = this.y;
}

function onDragEnd() {
    this.alpha = 1;
    this.dragging = false;
    this.data = null;
    if (!checkSolution()) {
        this.x = defaultX;
        this.y = defaultY;
    }
}

function onDragMove() {
    if (this.dragging) {
        const newPosition = this.data.getLocalPosition(this.parent);
        this.x = newPosition.x;
        this.y = newPosition.y;
    }
}
function checkSolution() {
    console.log(black_pieces[4].x);

    switch (current) {
        case 0:
            if ((w_pawns[4].y < 0 && w_pawns[4].y >= -scale * 16) && (w_pawns[4].x >= 16 && w_pawns[4].x < 32)) {
                richText.text = "Brawo";
                setTimeout(loadNext, 2000);
            }
            else {
                richText.text = "Zle";
                setTimeout(() => { richText.text = task }, 1000);
                return false;
            }

            break;
        case 1:
            if ((black_pieces[4].y < -scale * 2 * 16 && black_pieces[4].y >= -3 * scale * 16) && (black_pieces[4].x >= 64 && black_pieces[4].x < 80)) {
                richText.text = "Brawo";
                setTimeout(loadNext, 2000);

            }
            else {
                richText.text = "Zle";
                setTimeout(() => { richText.text = task }, 1000);
                return false;
            }
            break;
        case 2:
            if ((w_pawns[4].y < -scale * 16 && w_pawns[4].y >= -2 * scale * 16) && (w_pawns[4].x >= 16 && w_pawns[4].x < 32)) {
                richText.text = "Brawo";
                setTimeout(loadNext, 2000);
            }
            else {
                richText.text = "Zle";
                setTimeout(() => { richText.text = task }, 1000);
                return false;
            }
            break;
        case 3:
            if ((black_pieces[4].y < -scale * 16 && black_pieces[4].y >= -2 * scale * 16) && (black_pieces[4].x >= -32 && black_pieces[4].x < 0)) {
                richText.text = "Brawo";
                setTimeout(loadNext, 2000);

            }
            else {
                richText.text = "Zle";
                setTimeout(() => { richText.text = task }, 1000);
                return false;
            }
            break;

    }
    return true;
}
function loadNext() {
    current++;
    switch (current) {
        case 1:
            task = "Lecz tym tylko sprowadzili na siebie wrogie rycerstwo...";
            richText.text = task;
            break;
        case 2:
            task = "Niemajac odwrotu - musieli przec naprzod...";
            richText.text = task;
            break;
        case 3:
            task = "Nie byli wojownikami, choc ich odwaga wystarczyla, aby wrog przeszedl obok nich...";
            richText.text = task;
            break;
        case 4:
            task = "Sukces";
            richText.text = task;
            setTimeout(() => {
                window.location.href = "../Dialog1/index.html";
            }, 500);
            break;


    }
}