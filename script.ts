const bpm=document.getElementById('bpm') as HTMLInputElement
const quartes=document.getElementById('quartes') as HTMLInputElement
const tacts=document.getElementById("tacts") as HTMLInputElement
const res=document.getElementById("second") as HTMLInputElement
const tactsPlace=document.getElementById("tactsPlace") as HTMLElement
const trackName=document.getElementById("track") as HTMLInputElement
const list = document.getElementById('<list>')
const inputs:HTMLInputElement[]= [quartes,tacts,bpm]

const debounce = (fn: Function, ms = 3000) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return function (this: any, ...args: any[]) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), ms);
    };
};

trackName.addEventListener("keyup", debounce(()=>{fetch(`https://api.getsongbpm.com/search/?api_key=90719da58353ff9ff991b71f33c07a3f&type=song&lookup=${trackName.value}`)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log(data)
for (const el of data.search){
    const song=document.createElement('option')
    song.innerHTML=`${el.title} - ${el.artist.name}`

    list.appendChild(song)
    song.addEventListener('mousemove',()=>{
        console.log('s')})
}
        console.log(data.search);
    });
},1000))

function calcTime() {
    if (bpm.value.length>0&&quartes.value.length>0&&tacts.value.length>0){
        let asf:number=Number(quartes.value)/(Number(bpm.value)/60)*Number(tacts.value)
        res.innerHTML=JSON.stringify(Math.floor(asf))
        tactsPlace.innerHTML=tacts.value
    }
}
for (let el of inputs){
   el.addEventListener(
       "keyup",
       debounce(() => {
           calcTime()
       }, 500)
   );
}


