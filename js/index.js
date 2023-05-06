timeWrapper.innerHTML = time;

btnExamples.onclick = () => {
  showExamples();
};
btnStart.onclick = () => {
  startGame();
};
btnQuestion.onclick = () => {
  showInstructions();
};
btnDrawCard.onclick = () => {
  drawCard();
};

for (let i = 0; i < btnCloseModal.length; i++) {
  btnCloseModal[i].onclick = () => {
    closeModal();
  };
}

function startGame() {
  body.classList.toggle("game-started");
  btnQuestion.classList.remove("hidden");
  btnStart.innerHTML = "Resume Game";
}

function showInstructions() {
  btnExamples.classList.remove("hidden");
  document.querySelector(".intro-text").classList.remove("hidden");
  document.querySelector(".example-text").classList.add("hidden");
  body.classList.toggle("game-started");
}

function showExamples() {
  document.querySelector(".intro-text").classList.add("hidden");
  document.querySelector(".example-text").classList.remove("hidden");
  btnExamples.classList.add("hidden");
}

function drawCard() {
  body.classList.toggle("round-started");

  // draw a random card
  const randomCardNum = Math.floor(Math.random() * cardDeck.length);
  const chosenCard = cardDeck[randomCardNum];

  // console.log(cardDeck);
  // console.log(chosenCard);

  // randomize order of the two items
  let randomOneOrZero = Math.floor(Math.random() * 2);
  let randomOneOrZero2;
  randomOneOrZero == 0 ? (randomOneOrZero2 = 1) : (randomOneOrZero2 = 0);

  // define two items + solution
  let obj1 = chosenCard.items[randomOneOrZero];
  let obj2 = chosenCard.items[randomOneOrZero2];
  rightAnswer = chosenCard.solution[0];
  btnDrawCard.classList.add("hidden");

  // fill card
  currentCardBack.innerHTML = `
            <svg height="100" width="100" aria-hidden="true" style="color: ${
              colorMap[obj1.color]
            };"><use href="#${obj1.shape}"></svg>
            <svg height="100" width="100" aria-hidden="true" style="color: ${
              colorMap[obj2.color]
            };"><use href="#${obj2.shape}"></svg>
        `;

  btnWhat.onclick = () => {
    explainSolution();
  };

  function explainSolution() {
    modal.classList.add("modal-what");
    let explanation;
    if (
      (rightAnswer.shape == obj1.shape &&
        rightAnswer.color.alias == obj1.color.alias) ||
      (rightAnswer.shape == obj2.shape &&
        rightAnswer.color.alias == obj2.color.alias)
    ) {
      explanation = `
                    <div class="images">
                        <svg height="100" width="100" aria-hidden="true" style="color: ${
                          colorMap[rightAnswer.color]
                        };"><use href="#${rightAnswer.shape}"></svg>
                    </div>
                    <p>The ${
                      rightAnswer.shape
                    } is the right answer because it is <strong>shown in its original color</strong> on the card.<p>
                `;
    } else {
      explanation = `
                    <div class="images">
                        <svg height="100" width="100" aria-hidden="true" style="color: ${
                          colorMap[obj1.color].cssColor
                        };"><use href="#${obj1.shape}"></svg>
                        <svg height="100" width="100" aria-hidden="true" style="color: ${
                          colorMap[obj2.color].cssColor
                        };"><use href="#${obj2.shape}"></svg>→
                        <svg height="100" width="100" aria-hidden="true" style="color: ${
                          colorMap[rightAnswer.color]
                        };"><use href="#${rightAnswer.shape}"></svg>
                    </div>
                    <p><strong>None of the objects</strong> on the card are shown in their <strong>original color</strong>.</p><p>Hence, ${
                      rightAnswer.shape
                    } is the right answer because it is the only item whose <strong>shape <em>and</em> color cannot</strong> be found on the card.<p>
                `;
    }
    modalText.innerHTML = explanation;
  }

  // start css shuffle animation (1s), after 1s show random card
  // check solution on click
  // start backwards counter
  for (let i = 0; i < cards.length; i++) {
    cards[i].style.animation = "";
    cards[i].style.animationPlayState = "running";
  }
  setTimeout(() => {
    for (let i = 0; i < cards.length; i++) {
      cards[i].style.animation = "none";
      cards[i].style.animationPlayState = "paused";
    }
    currentCard.classList.add("flipped");
    for (let i = 0; i < fabFiveItems.length; i++) {
      fabFiveItems[i].onclick = () => {
        checkSolution(fabFiveItems[i]);
        clearInterval(countBackwards);
        time = timeMax;
      };
    }
  }, 1000);
  clearTimeout();

  // if time is up
  const countBackwards = setInterval(function () {
    if (time > 0) {
      timeWrapper.innerHTML = time;
      time--;
    } else {
      rounds < roundsMax
        ? (btnNextRound.innerHTML = "Next Round")
        : (btnNextRound.innerHTML = "See Score");
      randomEncouragementNum = Math.floor(
        Math.random() * encouragementsArr.length
      );
      timeWrapper.innerHTML = time;
      btnWhat.innerHTML = `See answer`;
      modalText.innerHTML = `<h3>Oh no! The time is up!</h3><p>But don’t worry.<br>${encouragementsArr[randomEncouragementNum]}</p>`;
      modal.classList.add("modal-timeup");
      modal.classList.remove("hidden");
      body.style.overflowY = "hidden";
      clearInterval(countBackwards);
      time = timeMax;
    }
  }, 1000);
}

// ----- CHECK SOLUTION -----

function checkSolution(clickedElement) {
  let clickedAnswer = clickedElement.getAttribute("ffname");

  rounds < roundsMax
    ? (btnNextRound.innerHTML = "Next Round")
    : (btnNextRound.innerHTML = "See Score");

  if (clickedAnswer == rightAnswer.shape) {
    let response;
    const randomComplimentNum = Math.floor(
      Math.random() * complimentsArr.length
    );
    score++;
    wins++;
    scoreWrapper.innerHTML = `${score}`;
    modal.classList.add("modal-right");
    if (wins == 3 && rounds != roundsMax) {
      modal.classList.add("modal-levelup");
      timeMax = timeMax - 2;
      response = `<p>That was the right answer.</p><p>Wow. You’re good at this.<br>Let’s make this a little more challenging and decrease the <strong>time limit to ${timeMax} seconds.</strong></p>`;
    } else if (wins == 8 && rounds != roundsMax) {
      modal.classList.add("modal-levelup");
      timeMax = timeMax - 2;
      response = `<p>That was exactly right.</p><p>You’re a natural.<br>Let’s make this just a little more challenging and decrease the <strong>time limit to ${timeMax} seconds.</strong></p>`;
    } else if (wins == 15 && rounds != roundsMax) {
      modal.classList.add("modal-levelup");
      timeMax = timeMax - 1;
      response = `<p>Really impressive.</p><p>Your brain is unstoppable!<br>To keep things interesting, let’s level up one last time and decrease the <strong>time limit to ${timeMax} seconds.</strong></p>`;
    } else {
      btnWhat.innerHTML = `See why`;
      response = `<p>That was the right answer.</p>`;
    }
    modalText.innerHTML =
      `<h3>${complimentsArr[randomComplimentNum]}!</h3>` + response;
  } else {
    modal.classList.add("modal-wrong");
    const randomPityNum = Math.floor(Math.random() * pityArr.length);
    modalText.innerHTML = `<h3>${pityArr[randomPityNum]}</h3><p>The right answer is ${rightAnswer.shape}.</p>`;
    btnWhat.innerHTML = `Wait – what?`;
  }
  modal.classList.remove("hidden");
  body.style.overflowY = "hidden";
}

// ----- CLOSE MODAL -----

function closeModal() {
  body.style.overflowY = "";
  modal.className = "modal hidden";

  // remove click event from items
  for (let i = 0; i < fabFiveItems.length; i++) {
    fabFiveItems[i].onclick = () => {};
  }

  // reset card
  currentCard.classList.remove("flipped");
  setTimeout(() => {
    btnDrawCard.classList.remove("hidden");
  }, 450);

  // if not/if gameover
  if (!gameover) {
    body.classList.toggle("round-started");
    rounds == roundsMax - 1
      ? (btnDrawCard.innerHTML = "Draw final card")
      : (btnDrawCard.innerHTML = "Draw new card");
    rounds++;
  } else {
    // open gameover modal after close
    modal.className = "modal modal-gameover";
    const randomComplimentNum = Math.floor(
      Math.random() * complimentsArr.length
    );
    let textVeryGood = `<h3>${complimentsArr[randomComplimentNum]}!</h3><p>That was one of a kind!<br>You won <span class="highlighted">${wins} out of ${rounds} rounds.</strong></p><small>Give yourself a pat on the back. You may also want to take a screenshot of this so you can brag about it at your highschool reunion. (Take that, fifth grade math teacher!)</<small>`;
    let textGood = `<h3>Congratulations!</h3><p>You won <span class="highlighted">${wins} out of ${rounds} rounds.</span><br>Want to play again and try to top this score?</p>`;
    wins >= roundsMax * 0.72
      ? (modalText.innerHTML = textVeryGood)
      : (modalText.innerHTML = textGood);

    // reset game
    btnStart.innerHTML = "Start Game";
    timeMax = timeMaxInitial;
    rounds = 0;
    wins = 0;
    score = 0;
    scoreWrapper.innerHTML = `${score}`;
    btnDrawCard.innerHTML = "Draw card";
    gameover = false;
  }

  // reset time
  time = timeMax;
  timeWrapper.innerHTML = time;

  // update rounds
  if (rounds == roundsMax) {
    roundsWrapper.innerHTML = `FINAL ROUND!`;
    gameover = true;
  } else if (rounds >= 10) {
    roundsWrapper.innerHTML = `Round ${rounds}`;
  } else {
    roundsWrapper.innerHTML = `Round 0${rounds}`;
  }
}

let cardDeck = [];
class Card {
  constructor(firstItem, secondItem, solution) {
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

function createFalseItems(items, colors) {
  let falseItems = [];
  for (let i = 0; i < items.length; i++) {
    let trueItems = JSON.parse(JSON.stringify(items));
    let newItem = trueItems[i];
    for (let j = 0; j < colors.length; j++) {
      if (items[i].color !== colors[j]) {
        let newItemFalseColor = JSON.parse(JSON.stringify(newItem));
        newItemFalseColor.color = colors[j];
        falseItems.push(newItemFalseColor);
      }
    }
  }
  return falseItems;
}

function createFalseFalseItemCardCombinations(items, falseItems) {
  for (let i = 0; i < falseItems.length; i++) {
    let falseItemsList = JSON.parse(JSON.stringify(falseItems));
    let chair = falseItemsList[i];

    for (let j = 0; j < falseItems.length; j++) {
      let bottle = falseItemsList[j];

      const uniqueCombination =
        chair.shape !== bottle.shape &&
        chair.color.alias !== bottle.color.alias &&
        chair.color.alias !== bottle.originalColor.alias &&
        bottle.color.alias !== chair.originalColor.alias;

      if (uniqueCombination) {
        let solution = [];

        for (let k = 0; k < items.length; k++) {
          if (
            items[k].shape !== chair.shape &&
            items[k].shape !== bottle.shape &&
            items[k].color.alias !== chair.color.alias &&
            items[k].color.alias !== bottle.color.alias
          ) {
            solution.push(items[k]);
          }
        }
        let newCard = new Card(chair, bottle, solution);
        cardDeck.push(newCard.createCard());
      }
    }
  }
}

function createFalseTrueItemCardCombinations(items, falseItems) {
  for (let i = 0; i < items.length; i++) {
    let trueItemsList = JSON.parse(JSON.stringify(items));
    let falseItemsList = JSON.parse(JSON.stringify(falseItems));
    let chair = trueItemsList[i];
    let solution = [chair];

    // - loop through false items
    for (let j = 0; j < falseItemsList.length; j++) {
      let bottle = falseItemsList[j];

      // - if unique combination (neither same item nor same color) create card + push to deck
      const uniqueCombination =
        chair.shape !== bottle.shape &&
        chair.color.alias !== bottle.color.alias;

      if (uniqueCombination) {
        let newCard = new Card(chair, bottle, solution);
        cardDeck.push(newCard.createCard());
      }
    }
  }
}

function removeDuplicates() {
  for (let l = 0; l < cardDeck.length - 1; l++) {
    let card1_item1 = cardDeck[l].items[0];
    let card1_item2 = cardDeck[l].items[1];
    let card1_solution = cardDeck[l].solution[0];

    for (let m = cardDeck.length - 1; m > l; m--) {
      let card2_item1 = cardDeck[m].items[0];
      let card2_item2 = cardDeck[m].items[1];
      let card2_solution = cardDeck[m].solution[0];

      if (
        card1_item1.shape == card2_item2.shape &&
        card1_item1.color.alias == card2_item2.color.alias &&
        card2_item1.shape == card1_item2.shape &&
        card2_item1.color.alias == card1_item2.color.alias &&
        card1_solution.shape == card2_solution.shape &&
        card1_solution.color.alias == card2_solution.color.alias
      ) {
        cardDeck.splice(m, 1);
      }
    }
  }
}

function createCardDeck(items, colors) {
  const falseItems = createFalseItems(items, colors);

  createFalseTrueItemCardCombinations(items, falseItems);
  createFalseFalseItemCardCombinations(items, falseItems);
  removeDuplicates();
  console.log(cardDeck.length);
}

if (prefersDarkScheme.matches) {
  cardDeck = [];
  document.documentElement.classList.add("dark-theme");
  createCardDeck(itemsDarkArr, colorsDarkArr);
} else {
  cardDeck = [];
  document.documentElement.classList.add("light-theme");
  createCardDeck(itemsLightArr, colorsLightArr);
}

btnColorMode.addEventListener("click", function () {
  if (document.documentElement.classList.contains("dark-theme")) {
    cardDeck = [];
    createCardDeck(itemsLightArr, colorsLightArr);
    document.documentElement.classList.add("light-theme");
    document.documentElement.classList.remove("dark-theme");
  } else {
    cardDeck = [];
    createCardDeck(itemsDarkArr, colorsDarkArr);
    document.documentElement.classList.add("dark-theme");
    document.documentElement.classList.remove("light-theme");
  }
});

function shuffleCards(cardsArr) {
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

shuffleCards(cardDeck);
