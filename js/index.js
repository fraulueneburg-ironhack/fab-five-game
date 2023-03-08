let btnStart = document.getElementById('btn-start');
let btnQuestionmark = document.getElementById('btn-questionsmark');

window.addEventListener('load', () => {
    if (btnStart) { btnStart.addEventListener('click', startGame); }
    if (btnQuestionmark) { btnQuestionmark.addEventListener('click', showInstructions); }
    function startGame() { alert('Ready! Steady! Gogogogo!') }
    function showInstructions() { alert('Here’s how this works') }
});

let time = 0;
let round = 0;
let score = 0;

let colorsDefault = [
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
let itemsDefault = [
    {
        name: "item01",
        shape: "chair",
        imageSrc: "../img/item01.svg",
        color: colorsDefault[0],
        originalColor: colorsDefault[0],
    },
    {
        name: "item02",
        shape: "bottle",
        imageSrc: "../img/item02.svg",
        color: colorsDefault[1],
        originalColor: colorsDefault[1],
    },
    {
        name: "item03",
        shape: "book",
        imageSrc: "../img/item03.svg",
        color: colorsDefault[2],
        originalColor: colorsDefault[2],
    },
    {
        name: "item04",
        shape: "ghost",
        imageSrc: "../img/item04.svg",
        color: colorsDefault[3],
        originalColor: colorsDefault[3],
    },
    {
        name: "item05",
        shape: "mouse",
        imageSrc: "../img/item05.svg",
        color: colorsDefault[4],
        originalColor: colorsDefault[4],
    }
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
            item01: this.firstItem,
            item02: this.secondItem,
            solution: this.solution
        };
    }
}

function createCardDeck(items,colors) {
    // create array of false items (should be 20 total)
    // - loop through items, make a deep copy
    let falseItems = [];
    for (let i = 0; i < items.length; i++) {
        let trueItems = JSON.parse(JSON.stringify(items));
        let newItem = trueItems[i];
        for (let j = 0; j < colors.length; j++) {       // - loop through colours
            if (items[i].color !== colors[j]) {         // - if colour isn’t the original one, create new item with false colour
                let newItemFalseColor = JSON.parse(JSON.stringify(newItem));
                newItemFalseColor.color = colors[j];
                falseItems.push(newItemFalseColor);     // - push item to falseItems array
            }
        }
    }

    // first set of cards: pairs of 1 true, 1 false item
    // loop through true items, make a deep copy
    for (let i=0; i < items.length; i++) {
        let trueItemsList = JSON.parse(JSON.stringify(items));
        let falseItemsList = JSON.parse(JSON.stringify(falseItems));
        let item01 = trueItemsList[i];
        let solution = "item01";

        // loop through false items
        for(let j=0; j < falseItemsList.length; j++) {
            let item02 = falseItemsList[j];

            // if unique combination (neither same item nor same color) create card + push to deck
            if (item01.shape !== item02.shape && item01.color.alias !== item02.color.alias) {
                let newCard = new Card(item01, item02, solution)
                cardDeck.push(newCard.createCard());
            }
        }
    }

    // TO DO
    // -----
    // - avoid double entries when creating cardDeck (i.e. BOOK red + BOTTLE white / BOTTLE white + BOOK red)
    // - shuffle cards

    // second set of cards: pairs of 2 false items
    // - loop through false items, make a deep copy
    for (let i=0; i < falseItems.length; i++) {
        let falseItemsList = JSON.parse(JSON.stringify(falseItems));
        let item01 = falseItemsList[i];

        for (let j=0; j < falseItems.length; j++) {
            let item02 = falseItemsList[j];
            // - check for unique combination (neither same item nor same color)
            // - check if no item has original color of other item
            if (item01.shape !== item02.shape && item01.color.alias !== item02.color.alias && item01.color.alias !== item02.originalColor.alias && item02.color.alias !== item01.originalColor.alias) {

                // find + log solution:
                // - loop through items + find the one whose shape or color is not on the card
                let solution = [];    //= JSON.parse(JSON.stringify(items));
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
        //     let firstItem = cardDeck[l][0].name;
        //     let secondItem = cardDeck[l][1].name;

        //     for (let m=1; m < cardDeck.length - 1; m++) {
        //         let firstItem2 = cardDeck[l+m][0].name;
        //         let secondItem2 = cardDeck[l+m][1].name;

        //         if (firstItem == secondItem2 && firstItem2 == secondItem) {
        //             console.log("found dup");
        //         }
        //     }
        // }
    }

    console.log(`ITEMS:`);
    console.log(items);
    console.log(`FALSE ITEMS:`);        
    console.log(falseItems);
    console.log(`CARD DECK:`);
    console.log(cardDeck);
    console.log(`CARD DECK AS TEXT:`);
    for (let i=0; i < cardDeck.length; i++) {
        console.log(`#${i+1}: ${cardDeck[i].item01.shape.toUpperCase()} ${cardDeck[i].item01.color.alias} + ${cardDeck[i].item02.shape.toUpperCase()} ${cardDeck[i].item02.color.alias}`);
    }
}

createCardDeck(itemsDefault,colorsDefault);