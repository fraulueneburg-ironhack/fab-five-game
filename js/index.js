window.onload = function(){
    let gameStarted = false;
    let timeMax = 5;
    let time = timeMax;
    let rounds = 1;
    let score = 0;
    let rightAnswer;

    let body = document.querySelector('body');
    let logo = document.querySelector('.logo');
    let btnStart = document.querySelector('.btn-start');
    let btnQuestion = document.querySelector('.btn-question');
    let btnDrawCard = document.querySelector('.btn-draw-card');
    let timeWrapper = document.querySelector('.time .num');
    let scoreWrapper = document.querySelector('.wins .num');
    let roundsWrapper = document.querySelector('.rounds .num');
    let cards = document.querySelectorAll('.cards .card');
    let currentCard = document.querySelector('.card.current');
    let currentCardBack = document.querySelector('.card.current .back .content');

    let fabFiveItems = document.querySelectorAll('.fab-five-items li a');
    let modal = document.querySelector('.modal');
    let modalText = document.querySelector('.modal .text');
    let btnCloseModal = document.querySelectorAll('.close');
    
    btnStart.onclick = () => { startGame(); }
    btnQuestion.onclick = () => { showInstructions(); }
    btnDrawCard.onclick = () => { drawCard(); }
    for (let i=0; i < btnCloseModal.length; i++) {
        btnCloseModal[i].onclick = () => { closeModal(); }
    }

    // START GAME

    function startGame() {
        gameStarted = true;
        // logo.onclick = () => { showInstructions(); }
        body.classList.toggle("game-started");
        btnQuestion.classList.remove("hidden");
        btnStart.innerHTML = "Resume Game";
    }
    
    function showInstructions() {
        body.classList.toggle("game-started");
    }

    function drawCard() {

        // draw a random card
        const randomCardNum = Math.floor(Math.random() * cardDeck.length);
        const chosenCard = cardDeck[randomCardNum];

        // randomize order of the two items
        let randomOneOrZero = Math.floor(Math.random()*2);
        let randomOneOrZero2;
        randomOneOrZero == 0 ? randomOneOrZero2 = 1 : randomOneOrZero2 = 0;

        // define two items + solution
        let obj1 = chosenCard.items[randomOneOrZero];
        let obj2 = chosenCard.items[randomOneOrZero2];
        rightAnswer = chosenCard.solution[0];
        rounds++;
        btnDrawCard.classList.add('hidden');

        // fill card
        currentCardBack.innerHTML = `
            <svg height="100" width="100" aria-hidden="true" style="color: ${obj1.color.hex};"><use href="#${obj1.name}"></svg>
            <svg height="100" width="100" aria-hidden="true" style="color: ${obj2.color.hex};"><use href="#${obj2.name}"></svg>
        `;

        // css shuffle animation
        for (let i=0; i < cards.length; i++) {
            cards[i].style.animation = ('');
            cards[i].style.animationPlayState = ('running');
        }

        // wait 1s (css shuffle animation), then show random card
        // check solution on click
        setTimeout(() => {
            for (let i=0; i < cards.length; i++) {
                cards[i].style.animation = ('none');
                cards[i].style.animationPlayState = ('paused');
            }
            currentCard.classList.add('flipped');
            for (let i=0; i < fabFiveItems.length; i++) {
                fabFiveItems[i].onclick = () => {
                    checkSolution(fabFiveItems[i]);
                    clearInterval(countBackwards);
                    time = timeMax;
                }
            }
        }, 1000);
        clearTimeout();

        const countBackwards = setInterval(function () {
            if (time > 0) {
                timeWrapper.innerHTML = time;
                time--;
            } else {
                timeWrapper.innerHTML = time;
                modalText.innerHTML = `<h3>Oh no! The time is up!</h3><p>Don’t worry.<br>You’ll be quicker next time.</p><button class="btn-green">Next Round</button>`
                modal.classList.remove("hidden");
                body.style.overflowY = 'hidden';
                clearInterval(countBackwards);
                time = timeMax;
            }
        }, 1000);
    };

    function checkSolution(clickedElement) {
        let clickedAnswer = clickedElement.getAttribute('ffname');

        if (clickedAnswer == rightAnswer.name) {
            const randomComplimentNum = Math.floor(Math.random() * complimentsArr.length);
            score++;
            scoreWrapper.innerHTML = `${score}`;
            modalText.innerHTML = `<h3>${complimentsArr[randomComplimentNum]}!</h3><p>That was the right answer.</p>`
        } else {
            const randomPityNum = Math.floor(Math.random() * pityArr.length);
            modalText.innerHTML = `<h3>${pityArr[randomPityNum]}</h3><p>The right answer is ${rightAnswer.shape}.</p><div class="btn-group"><button class="btn-green btn-ok close">Okay</button><button class="btn-what">Wait – what?</button></div>`
        }
        modal.classList.remove("hidden");
        body.style.overflowY = 'hidden';
    }

    function closeModal() {
        modal.classList.add("hidden");
        body.style.overflowY = '';
        currentCard.classList.remove('flipped');
        rounds < 10 ? roundsWrapper.innerHTML = `0${rounds}` : roundsWrapper.innerHTML = `${rounds}`;
        btnDrawCard.innerHTML = ('Draw new card');
        setTimeout(() => { btnDrawCard.classList.remove('hidden'); }, 450);
        time = timeMax;
        timeWrapper.innerHTML = time;
    }

    // add custom styles to body
    // const customStyle = `
    //     <style>
    //         :root {
    //             --item01-color: #ff00ff;
    //             --item02-color: #00ff00;
    //             --item03-color: #00ffff;
    //             --item04-color: #ffff00;
    //             --item05-color: #6e02c1;
    //         }
    //     </style>`;
    // body.insertAdjacentHTML("afterbegin", customStyle);
}

let colorsDefaultArr = [
    {
        name: "color01",
        alias: "red",
        hex: "#de1f26",
    },
    {
        name: "color02",
        alias: "green",
        hex: "#197f36",
    },
    {
        name: "color03",
        alias: "blue",
        hex: "#4c5aa8",
    },
    {
        name: "color04",
        alias: "white",
        hex: "#eee8e7",
    },
    {
        name: "color05",
        alias: "grey",
        hex: "#747484",
    },
]

// array of true items (5 total)
let itemDefaultArr = [
    {
        name: "item01",
        shape: "chair",
        imageSrc: "../img/item01.svg",
        color: colorsDefaultArr[0],
        originalColor: colorsDefaultArr[0],
    },
    {
        name: "item02",
        shape: "bottle",
        imageSrc: "../img/item02.svg",
        color: colorsDefaultArr[1],
        originalColor: colorsDefaultArr[1],
    },
    {
        name: "item03",
        shape: "book",
        imageSrc: "../img/item03.svg",
        color: colorsDefaultArr[2],
        originalColor: colorsDefaultArr[2],
    },
    {
        name: "item04",
        shape: "ghost",
        imageSrc: "../img/item04.svg",
        color: colorsDefaultArr[3],
        originalColor: colorsDefaultArr[3],
    },
    {
        name: "item05",
        shape: "mouse",
        imageSrc: "../img/item05.svg",
        color: colorsDefaultArr[4],
        originalColor: colorsDefaultArr[4],
    },
]

const complimentsArr = ['Woah. Very good','Excellent','Brilliant','Marvellous','Extraordinary','Terrific','Fantastic','Amazing','You genius, you','Awesome','Good job','Unbelievable','Incredible','Spectacular','Remarkable','Fabulous','Phenomenal','Sensational','Gorgeous','Impressive','Outstanding','Magnificent','Good work','Phenomenal','Superb','You superhuman, you','OMG','Wow. You’re good','Wowza','Absolutely stunning']
const pityArr = ['Oh no!','Oh nooooo!','Nope.','Too bad!','Almost. Almost.','Quel malheur!','Bummer','Oooh, that was close!','You were sooo close!','Aaaargh, next time.','Sorryyy …','So sorry …','Apologies.','Pardon.','Uh-oh.','Sad but true:']

// ----- CREATE CARD DECK -----

let cardDeck = [];

class Card {
    constructor (firstItem, secondItem, solution) {
        this.firstItem = firstItem;
        this.secondItem = secondItem;
        this.solution = solution;
    }
    createCard() {
        return {
            items: [this.firstItem, this.secondItem],
            solution: this.solution,
        };
    }
}

function createCardDeck(items,colors) {
    // create array of false items (20 total)
    // - loop through items, make a deep copy
    let falseItems = [];
    for (let i = 0; i < items.length; i++) {
        let trueItems = JSON.parse(JSON.stringify(items));
        let newItem = trueItems[i];
        for (let j = 0; j < colors.length; j++) {       // - loop through colours
            if (items[i].color !== colors[j]) {         // - create new item only if colour isn’t the original one
                let newItemFalseColor = JSON.parse(JSON.stringify(newItem));
                newItemFalseColor.color = colors[j];
                falseItems.push(newItemFalseColor);     // - push item to falseItems array
            }
        }
    }

    // first set of cards: pairs of 1 true + 1 false item
    // - loop through true items, make a deep copy
    for (let i=0; i < items.length; i++) {
        let trueItemsList = JSON.parse(JSON.stringify(items));
        let falseItemsList = JSON.parse(JSON.stringify(falseItems));
        let item01 = trueItemsList[i];
        let solution = [item01];

        // - loop through false items
        for(let j=0; j < falseItemsList.length; j++) {
            let item02 = falseItemsList[j];

            // - if unique combination (neither same item nor same color) create card + push to deck
            if (item01.shape !== item02.shape && item01.color.alias !== item02.color.alias) {
                let newCard = new Card(item01, item02, solution)
                cardDeck.push(newCard.createCard());
            }
        }
    }

    // second set of cards: pairs of 2 false items
    // - loop through false items, make a deep copy
    for (let i=0; i < falseItems.length; i++) {
        let falseItemsList = JSON.parse(JSON.stringify(falseItems));
        let item01 = falseItemsList[i];

        for (let j=0; j < falseItems.length; j++) {
            let item02 = falseItemsList[j];
            // - check for unique combination (neither same item nor same color)
            // - make sure no item has original color of other item
            if (item01.shape !== item02.shape && item01.color.alias !== item02.color.alias && item01.color.alias !== item02.originalColor.alias && item02.color.alias !== item01.originalColor.alias) {

                // find + log solution:
                // - loop through items + find the one whose shape or color is not on the card
                let solution = [];
                for(let k=0; k < items.length; k++){
                    if(items[k].shape !== item01.shape && items[k].shape !== item02.shape && items[k].color.alias !== item01.color.alias && items[k].color.alias !== item02.color.alias) {
                        solution.push(items[k]);
                    }
                }
                let newCard = new Card(item01, item02, solution)
                cardDeck.push(newCard.createCard());
            }
        }
    }

    // remove duplicate combinations (i.e. BOOK red + BOTTLE white / BOTTLE white + BOOK red)
    // (using snake case for readability)
    for(let l=0; l < cardDeck.length - 1; l++) {
        let card1_item1 = cardDeck[l].items[0];
        let card1_item2 = cardDeck[l].items[1];
        let card1_solution = cardDeck[l].solution[0];

        for (let m=cardDeck.length - 1; m > l; m--) {
            let card2_item1 = cardDeck[m].items[0];
            let card2_item2 = cardDeck[m].items[1];
            let card2_solution = cardDeck[m].solution[0];
        
            if (card1_item1.shape == card2_item2.shape && card1_item1.color.alias == card2_item2.color.alias &&
                card2_item1.shape == card1_item2.shape && card2_item1.color.alias == card1_item2.color.alias &&
                card1_solution.shape == card2_solution.shape && card1_solution.color.name == card2_solution.color.name) {
                    cardDeck.splice(m,1);
            }
        }
    }

    // console.log(`TRUE ITEMS:`);
    // console.log(items);
    // console.log(`FALSE ITEMS:`);
    // console.log(falseItems);
}

function shuffleCards(cardsArr) {
    // Fisher Yates Algorithm
    if (!cardsArr) {
        return undefined;
      } else {
        for (let i = cardsArr.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          const temp = cardsArr[i];
          cardsArr[i] = cardsArr[j];
          cardsArr[j] = temp;
        }
        return cardsArr;
      }
}

createCardDeck(itemDefaultArr,colorsDefaultArr);

// console.log(`UNSHUFFLED CARD DECK:`);
// console.log(cardDeck);
// for (let i=0; i < cardDeck.length; i++) {
//     console.log(`#${i+1}: ${cardDeck[i].items[0].shape.toUpperCase()} ${cardDeck[i].items[0].color.alias} + ${cardDeck[i].items[1].shape.toUpperCase()} ${cardDeck[i].items[1].color.alias} => ${cardDeck[i].solution[0].shape}`); // ${cardDeck[i].solution[0].shape}
// }

shuffleCards(cardDeck);

// console.log(`SHUFFLED CARD DECK:`);
// for (let i=0; i < cardDeck.length; i++) {
//     console.log(`#${i+1}: ${cardDeck[i].items[0].shape.toUpperCase()} ${cardDeck[i].items[0].color.alias} + ${cardDeck[i].items[1].shape.toUpperCase()} ${cardDeck[i].items[1].color.alias} => ${cardDeck[i].solution[0].shape}`); // ${cardDeck[i].solution[0].shape}
// }