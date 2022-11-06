const dialogi = ["*śmiech studentów*",
    "Właśnie jestem na integracji gdzieś na jakimś odludziu.",
    "Mieliśmy zwiedzać Obserwatorium w Piwnicach...",
    "...podobno mają jakieś problemy techniczne...",
    "...więc nie możemy wejść do środka.",
    "Aa tam..każdy wie co  trzeba zabrać na integrację...",
    "*Dźwięk otwierania trunku*",
    "---PARĘ GODZIN PÓŹNIEJ---",
    "Oho...*czkawka* ...chyba trochę przegięliśmy...",
    "Co oni do cholery tak długo tam naprawiają?!",
    "Chyba zaraz zwróce zawartość mojego żołądka....",
    "czy...czy ja leżę na ziemi? co to???",
    "---tajemnicza postać pojawia się między drzewami---",
    "CHOLERA! co było w tej butelce....",
    "ŁUP",
    "Ugh...*jęczenie*",
    "Zimno mi jak cholera...czy ja jestem w piwnicy?",
    "Nie pamiętam,żeby już naprawili awarię...",
    "HALO! ... hmmm... gdzie są wszyscy???",
    "Muszę się jakoś wydostać...",
    "Naciśnij START by zacząć gre"]

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
    window.location.href = "../mapa2.html";
};