let timerInterval = null;
let remainingTime = 0;

const timerElement = document.getElementById("timer");

function startTimer(seconds) {

    remainingTime = seconds;

    updateTimer();

    timerInterval = setInterval(() => {

        remainingTime--;

        updateTimer();

        if (remainingTime <= 0) {

            clearInterval(timerInterval);

            submitQuiz();

        }

    }, 1000);

}

function stopTimer() {

    if (timerInterval) {

        clearInterval(timerInterval);

    }

}

function updateTimer() {

    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;

    timerElement.textContent =
        `${pad(minutes)}:${pad(seconds)}`;

}

function pad(number) {

    return number.toString().padStart(2, "0");

}
