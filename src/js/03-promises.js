import { Notify } from 'notiflix/build/notiflix-notify-aio';
const refs = {
  formEl: document.querySelector('.form'),
  delayEl: document.querySelector("input[name='delay']"),
  stepEl: document.querySelector("input[name='step']"),
  amountEl: document.querySelector("input[name='amount']"),
};

let formDate = {};

refs.formEl.addEventListener('submit', e => {
  e.preventDefault();

  formDate.delay = Number(refs.delayEl.value);
  formDate.step = Number(refs.stepEl.value);
  formDate.amount = Number(refs.amountEl.value);

  for (let i = 1; i <= formDate.amount; i += 1) {
    createPromise(i, formDate.delay)
      .then(result => Notify.success(result))
      .catch(error => Notify.failure(error));

    formDate.delay += formDate.step;
  }
});

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
