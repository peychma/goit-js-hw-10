import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".form");
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const delayInput = form.querySelector('[name="delay"]');
    const stateRadios = form.querySelectorAll('[name="state"]');
    const selectedState = Array.from(stateRadios).find(radio => radio.checked);
    if (!selectedState) {
      iziToast.destroy();
      iziToast.error({
        title: "Error",
        message: "Please select a state (Fulfilled/Rejected)",
      });
      return;
    }
    const delay = parseInt(delayInput.value, 10);
    iziToast.destroy();
    const promise = new Promise((resolve, reject) => {
      if (selectedState.value === "fulfilled") {
        setTimeout(() => resolve(delay), delay);
      } else {
        setTimeout(() => reject(delay), delay);
      }
    });
    promise.then(
      (delay) => {
        iziToast.success({
          title: "Success",
          message: `✅ Fulfilled promise in ${delay}ms`,
        });
      },
      (delay) => {
        iziToast.error({
          title: "Error",
          message: `❌ Rejected promise in ${delay}ms`,
        });
        }
    );
    form.reset();
  });
});