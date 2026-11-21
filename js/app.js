// console.log('test')

let fistCard=null
let secondCard=null
let win=false
let reset=false



const allCards = document.querySelectorAll(".card");

allCards.forEach(card=>{
    card.addEventListener("click",hanelClick)

})

function hanelClick(){
this.classList.add("flipped")
handelMatched()
handelunmatched()

}

// function handelMatched(){
// if(this.classList.)


// }

function handelunmatched(){


    
}