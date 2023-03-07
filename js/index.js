let items = [
    {
        name: "chair",
        color: "red",
        imagesrc: "../img/item-01.svg",
    },
    {
        name: "bottle",
        color: "green",
        imagesrc: "../img/item-02.svg",
    },
    {
        name: "book",
        color: "blue",
        imagesrc: "../img/item-03.svg",
    },
    {
        name: "ghost",
        color: "white",
        imagesrc: "../img/item-04.svg",
    },
    {
        name: "mouse",
        color: "grey",
        imagesrc: "../img/item-05.svg",
    }
]

let colors = [
    {
        name: "red",
        hex: "#de1f26",
    },
    {
        name: "green",
        hex: "#197f36",
    },
    {
        name: "blue",
        hex: "#4c5aa8",
    },
    {
        name: "white",
        hex: "#eee8e7",
    },
    {
        name: "grey",
        hex: "#747484",
    },
]

let cardDeck = []

class Card {
    constructor () {
        this.item = item;
        this.color = color;
    }
}

window.addEventListener('load', () => {
    let btnStart = document.getElementById('btn-start');
    let btnQuestionmark = document.getElementById('btn-questionsmark');

    btnStart.addEventListener('click', startGame);
    btnQuestionmark.addEventListener('click', showInstructions);
  
    function startGame() {
        alert('Ready! Steady! Gogogogo!')
    }

    function showInstructions() {
        alert('Here’s how this works')
    }
});  