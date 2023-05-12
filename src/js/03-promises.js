import { Notify } from 'notiflix/build/notiflix-notify-aio';
const refs = {
  formEl: document.querySelector('.form'),
  delayEl: document.querySelector("input[name='delay']"),
  stepEl: document.querySelector("input[name='step']"),
  amountEl: document.querySelector("input[name='amount']"),
};
let formDate = {
  [refs.delayEl.name]: Number([refs.delayEl.value]),
  [refs.stepEl.name]: Number([refs.stepEl.value]),
  [refs.amountEl.name]: Number([refs.amountEl.value]),
};

refs.formEl.addEventListener('submit', e => {
  e.preventDefault();
  formDate = {
    [refs.delayEl.name]: Number([refs.delayEl.value]),
    [refs.stepEl.name]: Number([refs.stepEl.value]),
    [refs.amountEl.name]: Number([refs.amountEl.value]),
  };
  renderPromise(formDate);
});

function renderPromise({ delay, step, amount }) {
  let updatedDelay = delay;

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, updatedDelay)
      .then(result => Notify.success(result))
      .catch(error => Notify.failure(error));

    updatedDelay += step;
  }
}
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;

      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
}
