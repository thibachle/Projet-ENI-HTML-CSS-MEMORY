// Accéder aux éléments du DOM
const startGameEl = document.querySelector('#start-game');
const gameEl = document.querySelector('#game');
const endGameEl = document.querySelector('#end-game');

const levelOptionEl = document.querySelector('#level-option');
const memoryGameEl = document.querySelector('.memory-game');

const btnStartGame = document.querySelector('#btn-start-game');
const btnPlayAgain = document.querySelector('#btn-play-again');
const btnReload = document.querySelector('#btn-reload');

const timeEl = document.querySelector('#time');
const stepEl = document.querySelector('#step');


let level;
let lockBoard = false; // Verrouille pour empêcher d'appuyer sur
let firstCard = null;  // Contient l'élément DOM CARD lors de la première ouverture
let secondCard = null; // Contient l'élément DOM CARD lors de la deuxième ouverture
let score = 0;
let time = 0;
let step = 0;
let interval;

let sizes = {
    2: {
        row: 2,
        col: 2,
    },
    4: {
        row: 2,
        col: 4,
    },
    6: {
        row: 3,
        col: 4,
    },
};

let listCards = [
    {
        src:
            'assets/images/memory-legume/1.svg',
        name: 'pomme',
    },
    {
        src:
            'assets/images/memory-legume/2.svg',
        name: 'banane',
    },
    {
        src:
            'assets/images/memory-legume/3.svg',
        name: 'chery',
    },
    {
        src:
            'assets/images/memory-legume/4.svg',
        name: 'brocoli',
    },
    {
        src:
            'assets/images/memory-legume/5.svg',
        name: 'pigment',
    },
    {
        src:
            'assets/images/memory-legume/6.svg',
        name: 'fraise',
    },
];

let cards;

// Inverse la position des éléments dans le tableau
function shuffle(arr) {
    return arr.sort(function () {
        return 0.5 - Math.random();
    });
}

function renderCards(level) {
   // Inverse la position des éléments dans le tableau de cartes
    listCards = shuffle(listCards);

   // Couper pour obtenir le nombre d'éléments = niveau
    let cardsSlice = listCards.slice(0, level);

    // Dupliquer le tableau de cartes
    cards = [...cardsSlice, ...cardsSlice];

    // Inverse la position des éléments dans le tableau
    cards = shuffle(cards);

    // Définir la taille du plateau de jeu
    let size = sizes[level];
    memoryGameEl.style.gridTemplateColumns = `repeat(${size.col}, 100px)`;
    memoryGameEl.style.gridTemplateRows = `repeat(${size.row}, 150px)`;

   // Affichage sur l'interface
    memoryGameEl.innerHTML = '';
    for (let i = 0; i < cards.length; i++) {
        const c = cards[i];
        memoryGameEl.innerHTML += `
            <div 
                class="memory-card" 
                data-name="${c.name}"
                onclick="flipCard(this)"
            >
                <img src="${c.src}" class="front-face" alt="${c.name}">
                <img src="assets/images/question.svg" class="back-face" alt="card-back">
            </div>
        `;
    }
}
// Gérer l'événement d'ouverture de la carte
function flipCard(card) {
    if (lockBoard) {
        return;
    }
    //on ne peut donc pas cliquer deux fois sur la même carte
    if (card === firstCard) {
        return;
    }

    card.classList.toggle('flip');
    // En cliquant sur la première carte
    if (!firstCard) {
        firstCard = card;
        return;
    }
    // En cliquant sur la deuxième carte
     secondCard = card;
    checkForMatch();

    updateStep();
}

function checkForMatch() {
    // Vérifier si les NOM des 2 cartes sont le même ?
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;

    // isMatch = true => supprime les événements de clic sur ces 2 cartes
     // isMatch = false => retournez la carte face cachée
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();

    score++;
    checkWin();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1000);
}

function resetBoard() {
    lockBoard = false;
    firstCard = null;
    secondCard = null;
}

function checkWin() {
    if (score == level) {
        clearInterval(interval);

        setTimeout(() => {
            gameEl.style.display = 'none';
            endGameEl.style.display = 'flex';

            updateEndGame();
        }, 1500);
    }
}

function updateTime() {
    time++;
    timeEl.innerText = convertTime(time);
}

function convertTime(time) {
    let minute = `0${Math.floor(time / 60)}`.slice(-2);
    let second = `0${time % 60}`.slice(-2);
    return `${minute}:${second}s`;
}

function updateStep() {
    step++;
    stepEl.innerText = `${step} steps`;
}

function updateEndGame() {
    document.querySelector('.time-box p').innerText = convertTime(time);
    document.querySelector('.step-box p').innerText = `${step} steps`
}

btnStartGame.addEventListener('click', function () {

    level = Number(levelOptionEl.value);

     startGameEl.style.display = 'none';
    gameEl.style.display = 'flex';

     renderCards(level);

    interval = setInterval(updateTime, 1000);
});

btnPlayAgain.addEventListener('click', function () {
    score = 0;
    time = 0;
    step = 0;

    timeEl.innerText = convertTime(time);
    stepEl.innerText = `${step} steps`;

    interval = setInterval(updateTime, 1000);

    renderCards(level);

    endGameEl.style.display = 'none';
    gameEl.style.display = 'flex';
});

btnReload.addEventListener('click', function () {
    window.location.reload();
});