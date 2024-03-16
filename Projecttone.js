document.addEventListener("DOMContentLoaded", function() {

let saveEl = document.getElementById("save-el");
let countEl = document.getElementById("count-el");
let count = 0;

function increment(){

    count += 1;
    countEl.innerText = count;
    
}

function save(){

let countStr = count + " - ";
saveEl.innerText += countStr;


countEl.innerText = 0 ;
count = 0;

}

document.getElementById("increment-btn").addEventListener("click",increment);
document.getElementById("save-btn").addEventListener("click",save);

});
