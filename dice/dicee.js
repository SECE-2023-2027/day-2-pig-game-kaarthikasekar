'use strict';

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.getElementById('dice');
const btnNew = document.getElementById('btn--new');
const btnRoll = document.getElementById('btn--roll');
const btnHold = document.getElementById('btn--hold');

diceEl.style.display = 'none';

function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
}

btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.src = `dice-${dice}.png`;
    diceEl.style.display = 'block';

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      playing = false;
      document.querySelector(`#player--${activePlayer} h2`).textContent = `PLAYER ${activePlayer + 1} WINS!`;
      document.querySelector(`#player--${activePlayer} h2`).classList.add('winner');
      diceEl.style.display = 'none';
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', function () {
  scores[0] = 0;
  scores[1] = 0;
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = '0';
  score1El.textContent = '0';
  current0El.textContent = '0';
  current1El.textContent = '0';
  diceEl.style.display = 'none';

  document.querySelector('#player--0 h2').textContent = 'PLAYER 1';
  document.querySelector('#player--1 h2').textContent = 'PLAYER 2';
  document.querySelector('#player--0 h2').classList.remove('winner');
  document.querySelector('#player--1 h2').classList.remove('winner');
});
