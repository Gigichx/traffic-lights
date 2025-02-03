let timer;
let startTime;
let isGreen = false;

document.getElementById('start-button').addEventListener('click', startTrafficLight);

function startTrafficLight() {
    resetTrafficLight();
    turnOnRedLights();
}

function resetTrafficLight() {
    clearTimeout(timer);
    document.querySelectorAll('.light').forEach(light => {
        light.style.opacity = '0.3';
    });
    document.getElementById('result').textContent = '';
    isGreen = false;
}

function turnOnRedLights() {
    let delay = 0;
    for (let i = 1; i <= 3; i++) {
        delay += Math.floor(Math.random() * 1000) + 500; // Random timer between 500ms and 1500ms
        timer = setTimeout(() => {
            document.getElementById(`red-light-${i}`).style.opacity = '1';
            if (i === 3) {
                turnOnGreenLight();
            }
        }, delay);
    }
}

function turnOnGreenLight() {
    let delay = Math.floor(Math.random() * 3000) + 1000; // Random timer between 1000ms and 4000ms
    timer = setTimeout(() => {
        // Turn off all red lights when the green light is activated
        document.querySelectorAll('.red').forEach(light => {
            light.style.opacity = '0.3';
        });

        isGreen = true;
        startTime = Date.now();
        document.getElementById('green-light').style.opacity = '1';
    }, delay);
}

document.getElementById('green-light').addEventListener('click', function () {
    if (isGreen) {
        const reactionTime = (Date.now() - startTime) / 1000; // Reaction time in seconds
        document.getElementById('result').textContent = `Reaction time: ${reactionTime.toFixed(3)} seconds`;
        resetTrafficLight();
    } else {
        document.getElementById('result').textContent = 'False start!';
        resetTrafficLight();
    }
});