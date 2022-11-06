const dialogi = ["Znalazłem pierwszy klucz", "Wydaje mi się że na podłodze są ślady krwii"]

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

document.getElementById("guzik").onclick = () => {
    window.location.href = "../puzzle_plansza.html";
};