const utworz = document.getElementById("SaveAs");
const zapis = document.getElementById("Save");
const wczytaj =document.getElementById("Load");
const clear = document.getElementById("Clear");
const poleTekstowe = document.getElementById("poleTekstowe");
const powrot = document.getElementById("pokazOstatnie")
const newPlik = document.getElementById("nowyPlik");
let fileHandler;

utworz.addEventListener("click", () =>{
    const link =document.createElement("a")
    const content = poleTekstowe.value
    const file = new Blob([content], {type: 'text/plain'})
    link.href = URL.createObjectURL(file);
    let nazwa = prompt("Jak chcesz nazwać plik?", "document")
    if(nazwa != null){
        link.download = `${nazwa}.txt`
        link.click()
        URL.revokeObjectURL(link.href)
    }
})

wczytaj.addEventListener("click", async () =>{
    [fileHandler] = await window.showOpenFilePicker({
        types: [
            {
                description: 'Tylko pliki tekstowe (nawet te z kodem)',
                accept: {
                    "text/plain": [".txt", ".html", ".css", ".js", '.py', '.cpp', '.cs', '.php', '.json'],
                }
            },
        ],
        excludeAcceptAllOption: true,
        multiple: false
    });
    let fileData = await fileHandler.getFile();
    let text = await fileData.text();
    poleTekstowe.value = text;
})

zapis.addEventListener("click", async () =>{
    let stream = await fileHandler.createWritable();
    await stream.write(poleTekstowe.value)
    await stream.close()
    const link =document.createElement("a")
    const content = localStorage.getItem("debiluNieUsunZnowu")
    const file = new Blob([content], {type: 'text/plain'})
    link.href = URL.createObjectURL(file);
    let nazwa = fileHandler.name;
    if(nazwa != null){
        link.download = `${nazwa} - kopia.txt`
        link.click()
        URL.revokeObjectURL(link.href)
    }
})

clear.addEventListener("click", () => {
    localStorage.setItem("debiluNieUsunZnowu", poleTekstowe.value)
    poleTekstowe.value = "";
    localStorage.setItem("zawartosc", "")
})

poleTekstowe.addEventListener("input", () =>{
    localStorage.setItem("zawartosc", poleTekstowe.value)
})

window.addEventListener("load", () => {
    if(localStorage.getItem("zawartosc") != null){
        poleTekstowe.value += localStorage.getItem("zawartosc")
    }
})

const media = window.matchMedia("(max-width: 1000px")

window.addEventListener("visibilitychange", () => {
    const tytul = document.getElementById("webTitle")
    const ikonaStrony = document.getElementById("webIcon")
    const audio = document.getElementById("audio");
    if (document.hidden){
        if(!media.matches){
            audio.play()
            // Pls let me have this song. I think is copyrighted
            audio.volume = 0.2;            
        }
        tytul.textContent = "Brakuje mi Ciebie"
        ikonaStrony.href = "https://raw.githubusercontent.com/2009t-rex/Obrazy/refs/heads/main/DoomIcon/DoomFPR.webp"
    }
    else{
        audio.volume = 1.0;
        audio.pause()
        tytul.textContent = "Notanik"
        ikonaStrony.href = "https://raw.githubusercontent.com/2009t-rex/Obrazy/refs/heads/main/DoomIcon/DoomF.webp"
    }
})

powrot.addEventListener("click", () => {
    poleTekstowe.value = localStorage.getItem("debiluNieUsunZnowu")
})

newPlik.addEventListener("click", () => {
    localStorage.setItem("debiluNieUsunZnowu", poleTekstowe.value)
    poleTekstowe.value = ""
    fileHandler = ""
})
