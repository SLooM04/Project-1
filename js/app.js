// console.log('test')

let firstCard=null
let secondCard=null
let win=false
let reset=false
let triesLeft= 5
let timeLeft= 30
let timeInterval = null
let matchPairs = 0


const frontCard = './assets/؟.png'
const cities = [
  { name: "Manama", img: "./assets/Manama.jpg" },
  { name: "Muharraq", img: "./assets/muharraq.jpg" },
  { name: "Bani-Jamra", img: "./assets/banijamra.jpg" },
  { name: "Aali", img: "./assets/aali.jpg" },
  { name: "Barbar", img: "./assets/barbar.jpg" },
  { name: "Jidhafs", img: "./assets/jidhafs.jpg" }
];

const cardPositions = []
const gameBoard= document.querySelectorAll("game-board")
const allCards = document.querySelectorAll(".card");
const startBt= document.querySelectorAll("#start")
const resetBt= document.querySelectorAll("#reset")
const tries= document.querySelectorAll("#tries")
const match= document.querySelectorAll("#matches")
const message=document.querySelectorAll('#message')

allCards.forEach(card=>{
    card.addEventListener("click",hanelClick)

})





function hanelClick(event){
this.classList.add("flipped")
console.dir(event.target.id)
// handelMatched()
// handelunmatched()

}

function handelMatched(i){
let cName= this.document.getElementsByClassName(i)[1]
let firstCard = cName
console.log(firstCard)


}

// function handelunmatched(){


    
// }

function startTimer(){
  clearInterval(timeInterval)
  timeInterval=setInterval(function(){
    timeLeft--;
    updateStats()
  }
}