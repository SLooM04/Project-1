

let firstCard=null
let secondCard=null


let gameStarted=false


let lockBoard = false
let timeLeft = 30
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


const gameBoard = document.querySelector(".game-board")

const startBt= document.querySelector("#start")
const resetBt= document.querySelector("#reset")
const tries= document.querySelector("#tries")
const match= document.querySelector("#matches")
const messages=document.querySelector('#message')
const timer = document.querySelector("#timer")



function renderCards() {

  gameBoard.innerHTML = ""
  

  const distributedCards = [...cities, ...cities]

  distributedCards.forEach((city) => {
    const card = document.createElement("div")
    card.classList.add("card")
    card.dataset.city = city.name
  

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
  

  if (!gameStarted) return
  if (lockBoard) return

  if (this.classList.contains("flipped")) return

  if (firstCard == null) {
    firstCard = this
    
    this.classList.add("flipped")
  } else if (firstCard !== this) {
    secondCard = this
   
    this.classList.add("flipped")
    handleMatch()
  }

}

renderCards();

function handleMatch() {
  if (firstCard.dataset.city === secondCard.dataset.city) {
   displayMatched()
  
    
     firstCard = null
     secondCard = null

     
  }
  
  else{
   
    displayUnMatched()
    lockBoard=true

    setTimeout(() => {

      firstCard.classList.remove("flipped")
      secondCard.classList.remove("flipped")

      firstCard = null
      secondCard = null

      lockBoard = false

    }, 1000)

  }

}


let matches=0
 function displayMatched(){
  matches += 1
  match.textContent = "Pairs matched: " +matches+"/6"
  if(matches===6){
   messages.textContent=("You found all the pairs! Great memory.")
   clearInterval(timeInterval)
   gameStarted=false
   lockBoard=true
  }
 }

 let triesLeft= 6
function displayUnMatched(){
  
 triesLeft = triesLeft -1

tries.textContent = "Tries left: " + triesLeft + "/6"
if (triesLeft===0){
  messages.textContent=("Out of moves! Give it another shot")
   clearInterval(timeInterval)
   gameStarted=false
   lockBoard=true
}
}
 

function shuffle() {
  const allCards = document.querySelectorAll(".card")
  allCards.forEach((card) => {
    let rand = Math.floor(Math.random() * 12);
    card.style.order = rand;
  });
}




function resetGame() {

  clearInterval(timeInterval)
  gameStarted = false
  lockBoard = false

  firstCard = null
  secondCard = null

  timeLeft = 30
  matches = 0
  triesLeft = 6

  timer.textContent = "Timer: 30s"
  match.textContent = "Pairs matched: 0/6"
  tries.textContent = "Tries left: 6/6"

  messages.textContent = "Click Start to begin!"

  renderCards()

}

resetBt.addEventListener("click", resetGame)





function startTimer() {

  timeInterval = setInterval(() => {

    timeLeft--

    timer.textContent = "Timer:" + timeLeft + "s"

    if (timeLeft === 0) {
      clearInterval(timeInterval)
      gameStarted = false
      lockBoard = true
      messages.textContent = "Time is up! Game Over."

    }

  }, 1000)

}
startBt.addEventListener("click", () => {

  if (gameStarted) return

  if (timeLeft === 0 || triesLeft === 0 || matches === 6) return

  gameStarted = true

  messages.textContent = "Game Started!"

  startTimer()

})