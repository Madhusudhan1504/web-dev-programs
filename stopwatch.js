let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let running = false;

const display = document.getElementById('display');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const lapsList = document.getElementById('laps');

function formatTime(ms) {
  const date = new Date(ms);
  const min = String(date.getUTCMinutes()).padStart(2, '0');
  const sec = String(date.getUTCSeconds()).padStart(2, '0');
  const msPart = String(Math.floor(date.getUTCMilliseconds() / 10)).padStart(2, '0');
  return `${min}:${sec}.${msPart}`;
}

function updateDisplay() {
  display.textContent = formatTime(elapsedTime);
}

function startTimer() {
  if (!running) {
    running = true;
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      updateDisplay();
    }, 10);
  }
}

function pauseTimer() {
  if (running) {
    running = false;
    clearInterval(timerInterval);
  }
}

function resetTimer() {
  running = false;
  clearInterval(timerInterval);
  elapsedTime = 0;
  updateDisplay();
  lapsList.innerHTML = '';
}

function addLap() {
  if (running) {
    const li = document.createElement('li');
    li.textContent = formatTime(elapsedTime);
    lapsList.appendChild(li);
  }
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', addLap);

updateDisplay(); 