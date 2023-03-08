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

let colors = [
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

let items = [
    {
        name: "item01",
        alias: "chair",
        imageSrc: "../img/item01.svg",
        color: colors[0],
        originalColor: true,
    },
    {
        name: "item02",
        alias: "bottle",
        imageSrc: "../img/item02.svg",
        color: colors[1],
        originalColor: true,
    },
    {
        name: "item03",
        alias: "book",
        imageSrc: "../img/item03.svg",
        color: colors[2],
        originalColor: true,
    },
    {
        name: "item04",
        alias: "ghost",
        imageSrc: "../img/item04.svg",
        color: colors[3],
        originalColor: true,
    },
    {
        name: "item05",
        alias: "mouse",
        imageSrc: "../img/item05.svg",
        color: colors[4],
        originalColor: true,
    }
]


// create array of false items (should be 20 cards)
// loop through items, make a deep copy
let falseItems = [];

for (let i = 0; i < items.length; i++) {
    let trueItems = JSON.parse(JSON.stringify(items));
    let newItem = trueItems[i];
    for (let j = 0; j < colors.length; j++) {       /*loop through colours*/
        if (items[i].color !== colors[j]) {         /*if colour isn’t the original one, create new item with false colour*/
            let newItemFalseColor = JSON.parse(JSON.stringify(newItem));
            newItemFalseColor.color = colors[j];
            newItemFalseColor.originalColor = false;
            falseItems.push(newItemFalseColor);     /*push item to falseItems array*/
        }
    }
}


// create card deck

let cardDeck = [];

class Card {
    constructor (firstItem, secondItem, solution) {
        this.firstItem = firstItem;
        this.secondItem = secondItem;
        this.solution = solution;
    }
    createCard() {
        return {item01: this.firstItem, item02: this.secondItem, solution: this.solution};
    }
}

// first set of cards: combinations of 1 true, 1 false item
// loop through true items, make a deep copy
for (let i=0; i < items.length; i++) {
    let trueItemsList = JSON.parse(JSON.stringify(items));
    let falseItemsList = JSON.parse(JSON.stringify(falseItems));
    let item01 = trueItemsList[i];

    // loop through false items
    for(let j=0; j < falseItemsList.length; j++) {
        let item02 = falseItemsList[j];

        // if unique combination (neither same item nor same color) create a card + push to deck
        if (item01.name !== item02.name && item01.color.name !== item02.color.name) {
            let newCard = new Card(item01, item02, item01.name)
            cardDeck.push(newCard.createCard());
        }
    }
}

// second set of cards: combinations of 2 false items
for (let i=0; i < falseItems.length; i++) {
    let falseItemsList = JSON.parse(JSON.stringify(falseItems));
    let item01 = falseItemsList[i];

    for (let j=0; j < falseItems.length; j++) {
        let item02 = falseItemsList[j];
        if (item01.name !== item02.name) {
            let solution="s";
            // for(let k =0; k < items.length; k++){

            // };
            
            let newCard = new Card(item01, item02, solution)
            cardDeck.push(newCard.createCard());
        }
    }
}


console.log(items);
console.log(falseItems);
console.log(cardDeck);


// QUESTIONS:
// - I can use the same variable names in different for loops, right? RIGHT?
// - 