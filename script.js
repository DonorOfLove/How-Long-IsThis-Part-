const bpm = document.getElementById('bpm');
const quartes = document.getElementById('quartes');
const tacts = document.getElementById("tacts");
const res = document.getElementById("second");
const tactsPlace = document.getElementById("tactsPlace");
const trackName = document.getElementById("track");
const list = document.getElementById('list');
const loadAnimation = document.createElement("img");
loadAnimation.src = "img/load.gif";
let sigStore = quartes.value;
const inputs = [quartes, tacts, bpm];
const debounce = (fn, ms = 3000) => {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), ms);
    };
};
trackName.addEventListener("keyup", debounce(() => {
    list.innerHTML = '';
    list.appendChild(loadAnimation);
    fetch(`https://api.getsongbpm.com/search/?api_key=90719da58353ff9ff991b71f33c07a3f&type=song&lookup=${trackName.value}`)
        .then((response) => {
        return response.json();
    })
        .then((data) => {
        list.innerHTML = '';
        console.log(data);
        for (const el of data.search) {
            const song = document.createElement('p');
            song.innerHTML = `${el.title} - ${el.artist.name}`;
            list.appendChild(song);
            song.addEventListener('click', () => findById(el.id));
        }
    });
}, 1000));
function findById(id) {
    fetch(`https://api.getsongbpm.com/song/?api_key=90719da58353ff9ff991b71f33c07a3f&id=${id}`)
        .then((response) => {
        return response.json();
    })
        .then((data) => {
        console.log(data.song);
        bpm.value = data.song.tempo;
        quartes.value = data.song.time_sig;
        calcTime();
    });
}
function calcQuartes(sig) {
    if (sig[2] == 4) {
        return sig[0];
    }
    else {
        return sig[0] / sig[2] * 4;
    }
}
function calcTime() {
    if (bpm.value.length > 0 && quartes.value.length > 0 && tacts.value.length > 0) {
        let resNum = calcQuartes(quartes.value) / (Number(bpm.value) / 60) * Number(tacts.value);
        res.innerHTML = JSON.stringify(Math.floor(resNum));
        tactsPlace.innerHTML = tacts.value;
    }
}
for (let el of inputs) {
    el.addEventListener("input", debounce(() => {
        calcTime();
    }, 500));
}
