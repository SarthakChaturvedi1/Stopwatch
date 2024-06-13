/* scripts.js */

let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let paused = false;
let laps = [];

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsList = document.getElementById('laps');

startButton.addEventListener('click', startStopwatch);
pauseButton.addEventListener('click', pauseStopwatch);
resetButton.addEventListener('click', resetStopwatch);
lapButton.addEventListener('click', recordLap);

function startStopwatch() {
    if (!running) {
        startTime = new Date().getTime();
        tInterval = setInterval(getShowTime, 1);
        paused = false;
        running = true;
    }
}

function pauseStopwatch() {
    if (!paused && running) {
        clearInterval(tInterval);
        paused = true;
    } else if (paused) {
        startStopwatch();
    }
}

function resetStopwatch() {
    clearInterval(tInterval);
    running = false;
    paused = false;
    difference = 0;
    display.innerHTML = "00:00:00";
    laps = [];
    updateLaps();
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((difference % 1000) / 10);

    display.innerHTML = (hours < 10 ? "0" : "") + hours + ":" +
                        (minutes < 10 ? "0" : "") + minutes + ":" +
                        (seconds < 10 ? "0" : "") + seconds + ":" +
                        (milliseconds < 10 ? "0" : "") + milliseconds;
}

function recordLap() {
    if (running) {
        const lapTime = display.innerHTML;
        laps.push(lapTime);
        updateLaps();
    }
}

function updateLaps() {
    lapsList.innerHTML = "";
    laps.forEach((lap, index) => {
        const li = document.createElement('li');
        li.textContent = `Lap ${index + 1}: ${lap}`;
        lapsList.appendChild(li);
    });
}
