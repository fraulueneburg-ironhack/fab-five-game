window.onload = function(){
    let gameStarted = false;
    let time = 5;
    let rounds = 0;
    let score = 0;
    let rightAnswer;

    let body = document.querySelector('body');
    let logo = document.querySelector('.logo');
    let btnStart = document.querySelector('.btn-start');
    let btnQuestion = document.querySelector('.btn-question');
    let btnDrawCard = document.querySelector('.btn-draw-card');
    let timeWrapper = document.querySelector('.time .num');
    let scoreWrapper = document.querySelector('.wins .num');
    let currentCard = document.querySelector('.card.current');
    let fabFiveItems = document.querySelectorAll('.fab-five-items li a');
    
    btnStart.onclick = () => { startGame(); }
    btnQuestion.onclick = () => { showInstructions(); }
    btnDrawCard.onclick = () => { drawCard(); }


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
        rounds++;
        const randomNum = Math.floor(Math.random() * cardDeck.length);
        const chosenCard = cardDeck[randomNum];
        const obj1 = chosenCard.items[0];
        const obj2 = chosenCard.items[1];
        rightAnswer = chosenCard.solution[0];

        // clear current card
        currentCard.innerHTML = "";

        // wait two seconds (shuffle animation), then show random card
        setTimeout(() => {
            currentCard.innerHTML = `
            
            <svg height="100" width="100" aria-hidden="true" style="color: ${obj1.color.hex};"><use href="#${obj1.name}"></svg>
            <svg height="100" width="100" aria-hidden="true" style="color: ${obj2.color.hex};"><use href="#${obj2.name}"></svg>
            
            `;
            // function countBackwards(e){
            //     e >= 0 ? timeWrapper.innerHTML = e-- : timeWrapper.innerHTML = 0;
            // }
            // setInterval(countBackwards(time),1000);
        }, 2000);
        clearTimeout();

        for (let i=0; i < fabFiveItems.length; i++) {
            fabFiveItems[i].onclick = () => { checkSolution(fabFiveItems[i]); }
        }
    };

    function checkSolution(clickedElement){
        let clickedAnswer = clickedElement.getAttribute('ffname');
        if (clickedAnswer == rightAnswer.name) {
            alert(`CORRECT!`);
        } else {
            alert(`No. The right answer is ${rightAnswer.shape}.`);
        }
    }
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
    // make array of false items (should be 20 total)
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

    // make first set of cards: pairs of 1 true, 1 false item
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

        // remove duplicates
        // for(let l=0; l < cardDeck.length; l++) {
        //     let firstItem;
        //     let secondItem;

        //     for (let m=1; m < cardDeck.length - 1; m++) {
        //         let firstItem2 = cardDeck[l+m][0].shape;
        //         let secondItem2 = cardDeck[l+m][1].shape;

        //         if (firstItem == secondItem2 && firstItem2 == secondItem) {
        //             console.log("found dup");
        //         }
        //     }
        // }
    }

    console.log(`TRUE ITEMS:`);
    console.log(items);
    console.log(`FALSE ITEMS:`);
    console.log(falseItems);
    console.log(`CARD DECK:`);
    console.log(cardDeck);
    console.log(`CARD DECK AS TEXT:`);
    for (let i=0; i < cardDeck.length; i++) {
        console.log(`#${i+1}: ${cardDeck[i].items[0].shape.toUpperCase()} ${cardDeck[i].items[0].color.alias} + ${cardDeck[i].items[1].shape.toUpperCase()} ${cardDeck[i].items[1].color.alias} => ${cardDeck[i].solution[0].shape}`); // ${cardDeck[i].solution[0].shape}
    }
}

createCardDeck(itemDefaultArr,colorsDefaultArr);