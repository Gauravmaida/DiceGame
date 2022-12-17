'use strict';
const ScoreEl0 = document.getElementById('score--0');
const ScoreEl1 = document.getElementById('score--1');
const DiceEl = document.querySelector('.dice');
const PlayerEl0 = document.querySelector('.player--0');
const PlayerEl1 = document.querySelector('.player--1');

let CurrentScore0El = document.getElementById('current--0');
let CurrentScore1El = document.getElementById('current--1');

let Playing, Score, ActivePlayer, CurrentScore;

const RollBt = document.querySelector('.btn--roll');
const NewBt = document.querySelector('.btn--new');
const HoldBt = document.querySelector('.btn--hold');
const Switch = function () {
  document.getElementById(`current--${ActivePlayer}`).textContent = 0;
  CurrentScore = 0;
  ActivePlayer = ActivePlayer === 0 ? 1 : 0;
  PlayerEl0.classList.toggle('player--active');
  PlayerEl1.classList.toggle('player--active');
};
const init = function () {
  Playing = true;
  Score = [0, 0];
  ActivePlayer = 0;
  CurrentScore = 0;
  ScoreEl0.textContent = 0;
  ScoreEl1.textContent = 0;
  CurrentScore0El.textContent = 0;
  CurrentScore1El.textContent = 0;
  DiceEl.classList.add('hidden');
  PlayerEl0.classList.remove('player--winner');
  PlayerEl1.classList.remove('player--winner');
  PlayerEl0.classList.add('player--active');
  PlayerEl1.classList.remove('player--active');
};
init();
let CurrentScore0 = 0;
let CurrentScore1 = 0;
ScoreEl0.textContent = 0;
ScoreEl1.textContent = 0;
DiceEl.classList.add('hidden');

RollBt.addEventListener('click', function () {
  if (Playing == true) {
    const Dice = Math.trunc(Math.random() * 6) + 1;
    DiceEl.classList.remove('hidden');
    DiceEl.src = `dice-${Dice}.png`;
    if (Dice !== 1) {
      CurrentScore += Dice;
      document.getElementById(`current--${ActivePlayer}`).textContent =
        CurrentScore;
    } else {
      Switch();
    }
  }
});

HoldBt.addEventListener('click', function () {
  if (Playing === true) {
    Score[ActivePlayer] += CurrentScore;
    document.getElementById(`score--${ActivePlayer}`).textContent =
      Score[ActivePlayer];
    if (Score[ActivePlayer] >= 10) {
      Playing = false;
      DiceEl.classList.add('hidden');
      document
        .querySelector(`.player--${ActivePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${ActivePlayer}`)
        .classList.remove('player--active');
    } else {
      Switch();
    }
  }
});

NewBt.addEventListener('click', init);
