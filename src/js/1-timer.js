import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

document.addEventListener("DOMContentLoaded", function () {
    const datePicker = document.getElementById("datetime-picker");
    const startButton = document.querySelector("[data-start]");
    const timerContainer = document.querySelector(".timer");
    let userSelectedDate;
    let countdownInterval;

    const options = {
        enableTime: true,
        time_24hr: true,
        defaultDate: new Date(),
        minuteIncrement: 1,
        onClose(selectedDates) {
            userSelectedDate = selectedDates[0];
            validateSelectedDate();
        },
    };

    function validateSelectedDate() {
        const currentDate = new Date();
        const isDateValid = userSelectedDate >= currentDate;
        startButton.disabled = !isDateValid;
        if (!isDateValid) {
            iziToast.error({
                title: 'Error',
                message: 'Please choose a date in the future',
            });
        }
    }

    function startCountdown() {
        countdownInterval = setInterval(updateTimer, 1000);
    }

    function updateTimer() {
        const currentDate = new Date();
        const timeDifference = Math.max(userSelectedDate - currentDate, 0);
        if (timeDifference === 0) {
            clearInterval(countdownInterval);
            startButton.disabled = true;
        }

        const { days, hours, minutes, seconds } = convertMs(timeDifference);
        updateTimerDisplay({ days, hours, minutes, seconds });
    }

    flatpickr(datePicker, options);

    function convertMs(ms) {
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;
        const days = Math.floor(ms / day);
        const hours = Math.floor((ms % day) / hour);
        const minutes = Math.floor(((ms % day) % hour) / minute);
        const seconds = Math.floor((((ms % day) % hour) % minute) / second);
        return { days, hours, minutes, seconds };
    }

    function updateTimerDisplay({ days, hours, minutes, seconds }) {
        const formatTimeUnit = (timeUnit) => (timeUnit < 10 ? `0${timeUnit}` : timeUnit);
        timerContainer.querySelector("[data-days]").textContent = formatTimeUnit(days);
        timerContainer.querySelector("[data-hours]").textContent = formatTimeUnit(hours);
        timerContainer.querySelector("[data-minutes]").textContent = formatTimeUnit(minutes);
        timerContainer.querySelector("[data-seconds]").textContent = formatTimeUnit(seconds);
    }

    startButton.addEventListener("click", function () {
        startCountdown();
        startButton.disabled = true;
    });
});
