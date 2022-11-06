const dialogi = ["Jest już prawie poranek..",
    "Gdzie oni do cholery wszyscy są???",
    "---kilka godzin później na Toruńskiej starówce---",
    "HALO!? HALOOOO (do telefonu)",
    "Szkurna mać.... dlaczego nikt nie odbiera...",
    "*przechodnie rozmawiają o zaginięciu grupy studentów*",
    "---Mijam sklep z piernikami---",
    "Chwila...chyba mi się przewidziało...",
    "*zbliża się do wystawy sklepowej*",
    "Czy...dla..czego....te pierniki ....",
    "Wyglądają jak grupka dobrych znajomych....",
    "Nie..nie..nie...to nie może być prawda.....",
    "Wracam do domu,  bo już mam schizy",
    "-DOM-",
    "Głos z telewizora:",
    "Na terenie obserwatorium znaleziono zwłoki",
    "Znaleziono również ślady krwi..." ,
    "....przy zapasach miodu i przypraw korzennych",
    " prosimy o zachowanie szczególnej ostrożnośni",
    "Niedobrze mi...CHWILA..",
    "czyli..te pierniki na wystawie...to....."
    ]

let min = 0
document.getElementById("dialog").innerHTML = dialogi[min]
element = document.getElementById("dialog")

document.addEventListener('keydown', (e) => {
    if (e.code === "Space") {
        e.preventDefault;
        element.classList.remove("typewriter")
        void element.offsetWidth;
        element.classList.add("typewriter");

        min++;
        if (min < dialogi.length)
            nextDialog(min);
    }

}, false);


function nextDialog(key) {
    document.getElementById("dialog").innerHTML = dialogi[key]
}