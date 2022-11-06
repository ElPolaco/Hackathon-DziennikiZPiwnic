class Kafelek {
    constructor(i, img) {
        this.index = i;
        this.img = img;
    }
}

//Konfiguracja
let obrazek;
let kafelki = [];
let kol = 2;
let wier = 2;
let szer, wys;
let plansza = [];

function preload() {
    obrazek = loadImage("puzzle.png");
}

function setup() {
    createCanvas(720, 720);

    szer = width / kol;
    wys = height / wier;

    for (let i = 0; i < kol; i++) {
        for (let j = 0; j < wier; j++) {
            let x = i * szer;
            let y = j * wys;
            let img = createImage(szer, wys);
            img.copy(obrazek, x, y, szer, wys, 0, 0, szer, wys);
            let index = i + j * kol;
            plansza.push(index);
            let tile = new Kafelek(index, img);
            kafelki.push(tile);
        }
    }

    kafelki.pop();
    plansza.pop();
    plansza.push(-1); //jedno wolne żeby było można ruszyć

    simpleShuffle(plansza);
}

function swap(i, j, arr) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

function randomMove(arr) {
    let r1 = floor(random(kol));
    let r2 = floor(random(wier));
    move(r1, r2, arr);
}

function simpleShuffle(arr) {
    for (let i = 0; i < 1000; i++) {
        randomMove(arr);
    }
}

function mousePressed() {
    let i = floor(mouseX / szer);
    let j = floor(mouseY / wys);
    move(i, j, plansza);
}

function draw() {
    background(0);

    for (let i = 0; i < kol; i++) {
        for (let j = 0; j < wier; j++) {
            let index = i + j * kol;
            let x = i * szer;
            let y = j * wys;
            let tileIndex = plansza[index];
            if (tileIndex > -1) {
                let img = kafelki[tileIndex].img;
                image(img, x, y, szer, wys);
            }
        }
    }
    for (let i = 0; i < kol; i++) {
        for (let j = 0; j < wier; j++) {
            let x = i * szer;
            let y = j * wys;
            strokeWeight(2);
            noFill();
            rect(x, y, szer, wys);
        }
    }
    if (isSolved()) {
        console.log("KONIEC");
        window.location.href = "../piernikoidy_plansza.html";
    }
}

function isSolved() {
    for (let i = 0; i < plansza.length - 1; i++) {
        if (plansza[i] !== kafelki[i].index) {
            return false;
        }
    }
    return true;
}

function move(i, j, arr) {
    let blank = findBlank();
    let blankCol = blank % kol;
    let blankRow = floor(blank / wier);

    if (isNeighbor(i, j, blankCol, blankRow)) {
        swap(blank, i + j * kol, arr);
    }
}

function isNeighbor(i, j, x, y) {
    if (i !== x && j !== y) {
        return false;
    }
    return !!(abs(i - x) == 1 || abs(j - y) == 1);
}

function findBlank() {
    for (let i = 0; i < plansza.length; i++) {
        if (plansza[i] == -1) return i;
    }
}
