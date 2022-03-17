const bpm = document.getElementById('bpm');
const quartes = document.getElementById('quartes');
const tacts = document.getElementById("tacts");
const res = document.getElementById("second");
const tactsPlace = document.getElementById("tactsPlace");
const trackName = document.getElementById("track");
const inputs = [quartes, tacts, bpm];
const debounce = (fn, ms = 3000) => {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), ms);
    };
};
fetch(`https://api.getsongbpm.com/search/?api_key=90719da58353ff9ff991b71f33c07a3f&type=lookup:green+day`)
    .then((response) => {
    return response.json();
})
    .then((data) => {
    console.log(data);
});
function calcTime() {
    if (bpm.value.length > 0 && quartes.value.length > 0 && tacts.value.length > 0) {
        let asf = Number(quartes.value) / (Number(bpm.value) / 60) * Number(tacts.value);
        res.innerHTML = JSON.stringify(Math.floor(asf));
        tactsPlace.innerHTML = tacts.value;
    }
}
for (let el of inputs) {
    el.addEventListener("keyup", debounce(() => {
        calcTime();
    }, 500));
}
//# sourceMappingURL=script.js.map