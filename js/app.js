// console.log('test')

let firstCard=null
let secondCard=null
let win=false
let reset=false

let timeLeft= 30
let timeInterval = null



const frontCard = './assets/؟.png'
const cities = [
  { name: "Manama", img: "./assets/Manama.jpg" },
  { name: "Muharraq", img: "./assets/muharraq.jpg" },
  { name: "Bani-Jamra", img: "./assets/banijamra.jpg" },
  { name: "Aali", img: "./assets/aali.jpg" },
  { name: "Barbar", img: "./assets/barbar.jpg" },
  { name: "Jidhafs", img: "./assets/jidhafs.jpg" }
  
]

const cardPositions = []
const gameBoard = document.querySelector(".game-board")

const startBt= document.querySelectorAll("#start")
const resetBt= document.querySelectorAll("#reset")
const tries= document.querySelector("#tries")
const match= document.querySelector("#matches")
const messages=document.querySelector('#message')

function renderCards() {
  gameBoard.innerHTML = ""
  cardPositions.length = 0

  const distributedCards = [...cities, ...cities]

  distributedCards.forEach((city, index) => {
    const card = document.createElement("div")
    card.classList.add("card")
    card.dataset.city = city.name
    card.dataset.index = index
  

    card.innerHTML = `
      <div class="card-front">
        <img src="${frontCard}" alt="Hidden card">
      </div>
      <div class="card-back">
        <img src="${city.img}" alt="${city.name}">
      </div>
    `;



    card.addEventListener("click", handleCardClick)
    gameBoard.appendChild(card)
    
  });
  shuffle()
}

function handleCardClick() {
  if (this.classList.contains("flipped")) return

  if (firstCard == null) {
    firstCard = this
    console.log(firstCard.dataset.city)
    this.classList.add("flipped")
  } else if (firstCard !== this) {
    secondCard = this
    console.log(secondCard.dataset.city)
    this.classList.add("flipped")
    handleMatch()
  }
}

renderCards();

function handleMatch() {
  if (firstCard.dataset.city === secondCard.dataset.city) {
   displayMatched()
  
    console.log("matched")
  }
  
  if (firstCard.dataset.city !== secondCard.dataset.city) {
    console.log("unmatched")
    displayUnMatched()
  }

  firstCard = null
  secondCard = null
}

let matches=0
 function displayMatched(){
  matches += 1
  match.textContent = "Pairs matched: " +matches+"/6"
  if(matches===6){
    messages.textContent=("You found all the pairs! Great memory.")
  }
 }

 let triesLeft= 6
function displayUnMatched(){
  console.log(triesLeft)
 triesLeft = triesLeft -1
 console.log(triesLeft)
tries.textContent = "Tries left: " + triesLeft + "/6"
if (triesLeft===0){
  messages.textContent=("Out of moves! Give it another shot")

}
}
 

function shuffle() {
  const allCards = document.querySelectorAll(".card")
  allCards.forEach((card) => {
    let rand = Math.floor(Math.random() * 12);
    card.style.order = rand;
  });
}

