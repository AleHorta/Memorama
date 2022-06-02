var img = []
var names = []
var select = []

//this is the man numbre of cards for the game, if yu whant more, you need more images
var allcards = 12

var time = document.getElementById("time")
var seg = 0, min = 0, hrs = 0, t = 0

function tick() {
    seg++
    if (seg >= 60) {
        seg = 0
        min++
        if (min >= 60) {
            min = 0
            hrs++
        }
    }
}

function add() {
    tick()
    time.textContent = (hrs > 9 ? hrs : "0" + hrs) 
        	 + ":" + (min > 9 ? min : "0" + min)
       		 + ":" + (seg > 9 ? seg : "0" + seg);
    timer()
}

function timer() {
    t = setTimeout(add, 1000);
}

function loadnames() {
    names = [
        "Swampert",
        "Lucario",
        "Dragonite",
        "Gengar",
        "Pidgeoto",
        "Umbreon"
    ]
}

function loadimg() {
    img = [
        '<img src="https://i.pinimg.com/564x/48/ed/51/48ed51aec96e9594c78aa267c516e850.jpg">',//picture of Swampert
        '<img src="https://i.pinimg.com/564x/8f/0f/76/8f0f76bc15deafffad24b626116aeddf.jpg">',//picture of Lucario
        '<img src="https://i.pinimg.com/736x/cd/57/46/cd5746c7d66e65d07e68b264a8d47af4.jpg">',//picture of Dragonite
        '<img src="https://i.pinimg.com/564x/e9/70/23/e97023a50f2c1b458d90964520cbb6a5.jpg">',//picture of Gengar
        '<img src="https://i.pinimg.com/564x/a0/0e/30/a00e30cc54a7d43b3d8507aea07c41f6.jpg">',//picture of Pidgeot
        '<img src="https://i.pinimg.com/564x/22/e4/4b/22e44b28cf49bd37a34c4ce4a29f3b07.jpg">'//picture of Umbreon
    ]
}

function loadboard() {
    loadimg()
    loadnames()
    timer()

    var board = document.getElementById("container")
    var cards = []
    select = []
    
    //generates the cards
    for (let i = 0; i < allcards; i++) {
        cards.push(`
        <article class="card-area" onclick="selectcard(${i})">
            <article id="card${i}" class="card">
                <article class="front">
                    <header id="name" class="name-card">
                        <h1>${names[0]}</h1>
                    </header>
                    <div id="back-img" class="img-card">
                        ${img[0]}
                    </div>
                </article>
                <article class="back">
                    <img src="https://i.pinimg.com/564x/05/a8/74/05a8745153016245cf80b4e92ceacc73.jpg">
                </article>
            </article>
        </article>
    `)
        //is just for have 2 cards equals
        if (i%2==1){
            img.splice(0,1)
            names.splice(0,1)
        }
    }
    //these is to put the cards in a random position
    cards.sort(()=>Math.random()-0.5)
    //add the content to the html
    board.innerHTML = cards.join(" ")
}
//just fro flip the cards 
function selectcard(i) {
    var card = document.getElementById(`card${i}`)
    var rotate = "rotateY(180deg)"
    if (card.style.transform != rotate) {
        card.style.transform = rotate
        select.push(card)
    }
    //condition to verify 2 cards
    if (select.length == 2) {
        deselect(select)
        select = []
    }
}
//function to verify if 2 cards are the same
function deselect(select) {
    setTimeout (() => {
        let card1 = select[0]
        let card2 = select[1]
        let front1 = select[0]
        let front2 = select[1]
        let rotate = "rotateY(180deg)"

        if (card1.innerHTML != card2.innerHTML) {
            card1.style = rotate
            card2.style = rotate
        } else {
            front1.style.background = "grey"
            front2.style.background = "grey"
        }
        if (end()) {
            console.log(time)
            
            clearTimeout(t) 
            seg = 0, min = 0, hrs = 0, t = 0

            Swal.fire({
                icon: 'success',
                title: 'Good job!',
                text: 'Who is the winner?',
                input: 'text',
                inputValidator: (name) => {
                  if (!name) {
                    return 'You need to write something!'
                  } else {
                    var boardt = document.getElementById("body-tab")
                    var tab = []
                        tab.push (`
                            <span>${name}</span>
                            <span>${time.innerHTML}</span>
                        `)
                    boardt.innerHTML = tab.join("")
                  }
                }
            })
        }
    }, 1000
    )
}

//function that verify if all the cars are flipped
function end() {
    for (let i=0; i<allcards; i++){
        let card = document.getElementById("card" + i)
        if (card.style.background != "grey") {
            return false
        }
    }
    return true
}