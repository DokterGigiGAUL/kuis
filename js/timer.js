let timerInterval = null;
let timeRemaining = 600;

function startTimer(seconds) {

    timeRemaining = seconds;

    updateTimer();

    timerInterval = setInterval(() => {

        timeRemaining--;

        updateTimer();

        if (timeRemaining <= 0) {

            clearInterval(timerInterval);

            submitQuiz();

        }

    }, 1000);

}

function updateTimer() {

    const minute = Math.floor(timeRemaining / 60);
    const second = timeRemaining % 60;

    document.getElementById("timer").textContent =
        `${String(minute).padStart(2, "0")}:${String(second).padStart(2, "0")}`;

}

function stopTimer() {

    clearInterval(timerInterval);

}

function getRemainingTime() {

    return timeRemaining;

}
