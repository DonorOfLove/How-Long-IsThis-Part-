var bpm = document.getElementById('bpm');
var quartes = document.getElementById('quartes');
var tacts = document.getElementById("tacts");
var res = document.getElementById("second");
var debounce = function (fn, ms) {
    if (ms === void 0) { ms = 3000; }
    var timeoutId;
    return function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        clearTimeout(timeoutId);
        timeoutId = setTimeout(function () { return fn.apply(_this, args); }, ms);
    };
};
function debFunc() {
    if (bpm.value.length > 0 && quartes.value.length > 0 && tacts.value.length > 0) {
        var asf = Number(quartes.value) / (Number(bpm.value) / 60) * Number(tacts.value);
        res.innerHTML = JSON.stringify(Math.floor(asf));
    }
}
bpm.addEventListener("keyup", debounce(function () {
    debFunc();
}, 300));
quartes.addEventListener("keyup", debounce(function () {
    debFunc();
}, 300));
tacts.addEventListener("keyup", debounce(function () {
    debFunc();
}, 300));
