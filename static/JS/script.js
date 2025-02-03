let timer, interval;
let startTime;
let isGreen = false;

const startButton = document.querySelector('.start-button');
const reactionButton = document.querySelector('.reaction-button');
const resultDiv = document.querySelector('#result');
const timerDiv = document.querySelector('#timer');

startButton.addEventListener('click', startTrafficLight);
reactionButton.addEventListener('click', checkReaction);

function startTrafficLight() {
    resetTrafficLight();
    turnOnRedLights();
    startButton.textContent = "Start";
}

function resetTrafficLight() {
    clearTimeout(timer);
    clearInterval(interval);
    document.querySelectorAll('.light').forEach(light => light.style.opacity = '0.3');
    resultDiv.textContent = '';
    timerDiv.textContent = 'Time: 0.000 s';
    isGreen = false;
    reactionButton.style.display = 'none';
}

function turnOnRedLights() {
    let delay = 0;
    document.querySelectorAll("[data-light^='red']").forEach((light, index) => {
        delay += Math.floor(Math.random() * 1000) + 500;
        setTimeout(() => {
            light.style.opacity = '1';
            if (index === 2) turnOnGreenLight();
        }, delay);
    });
}

function turnOnGreenLight() {
    let delay = Math.floor(Math.random() * 3000) + 1000;
    setTimeout(() => {
        document.querySelectorAll("[data-light^='red']").forEach(light => light.style.opacity = '0.3');
        isGreen = true;
        startTime = Date.now();
        document.querySelector("[data-light='green']").style.opacity = '1';
        reactionButton.style.display = 'block';
        startTimer();
    }, delay);
}

function startTimer() {
    interval = setInterval(() => {
        if (isGreen) {
            let elapsedTime = (Date.now() - startTime) / 1000;
            timerDiv.textContent = `Time: ${elapsedTime.toFixed(3)} s`;
        }
    }, 10);
}

function checkReaction() {
    if (isGreen) {
        clearInterval(interval);
        const reactionTime = (Date.now() - startTime) / 1000;
        timerDiv.textContent = `Final Time: ${reactionTime.toFixed(3)} s`;
        resultDiv.textContent = `Reaction time: ${reactionTime.toFixed(3)} s`;
        startButton.textContent = "Retry";
        reactionButton.style.display = 'none';
    } else {
        clearInterval(interval);
        resultDiv.textContent = 'False start! Wait for green!';
        startButton.textContent = "Retry";
        reactionButton.style.display = 'none';
    }
}