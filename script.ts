const bpm=document.getElementById('bpm') as HTMLInputElement
const quartes=document.getElementById('quartes') as HTMLInputElement
const tacts=document.getElementById("tacts") as HTMLInputElement
const res=document.getElementById("second") as HTMLInputElement

const debounce = (fn: Function, ms = 3000) => {
    let timeoutId: ReturnType<typeof setTimeout>;

    return function (this: any, ...args: any[]) {
        clearTimeout(timeoutId);

        timeoutId = setTimeout(() => fn.apply(this, args), ms);
    };
};

function debFunc() {

    if (bpm.value.length>0&&quartes.value.length>0&&tacts.value.length>0){
        let asf:number=Number(quartes.value)/(Number(bpm.value)/60)*Number(tacts.value)
        res.innerHTML=JSON.stringify(Math.floor(asf))
    }
}
bpm.addEventListener(
    "keyup",
    debounce(() => {
     debFunc()
    }, 300)
);
quartes.addEventListener(
    "keyup",
    debounce(() => {
        debFunc()
    }, 300)
);

tacts.addEventListener(
    "keyup",
    debounce(() => {
        debFunc()
    }, 300)
);


