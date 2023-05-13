import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  timePickerEl: document.querySelector('input#datetime-picker'),
  startBtnEl: document.querySelector('button[data-start]'),
  resetBtnEl: document.querySelector('button[data-reset]'),
  daysEl: document.querySelector('span[data-days]'),
  hoursEl: document.querySelector('span[data-hours]'),
  minutesEl: document.querySelector('span[data-minutes]'),
  secondsEl: document.querySelector('span[data-seconds]'),
};
let userTime = null;
const optionsTimePicker = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    userTime = selectedDates[0];
    if (userTime < Date.now()) {
      accessBtnStart(false);
      Notify.warning('Please choose a date in the future');
      return;
    }
    accessBtnStart(true);
  },
};

flatpickr(refs.timePickerEl, optionsTimePicker);

const timeLocalEl = document.querySelector("input[type='datetime-local']");
let intervalId = null;

refs.resetBtnEl.setAttribute('disabled', '');
accessBtnStart(false);

refs.startBtnEl.addEventListener('click', startInterval);
refs.resetBtnEl.addEventListener('click', () => {
  clearInterval(intervalId);
  userTime = Date.now();
  renderTimerElement();
  timeLocalEl.removeAttribute('disabled');
  refs.resetBtnEl.setAttribute('disabled', '');
});

function startInterval() {
  if (userTime < Date.now()) {
    accessBtnStart(false);
    Notify.warning('Please choose a date in the future');
    return;
  }
  accessBtnStart(false);

  refs.resetBtnEl.removeAttribute('disabled');
  timeLocalEl.setAttribute('disabled', '');

  intervalId = setInterval(() => {
    renderAnimLastSeconds();
    renderTimerElement();
  }, 1000);
}
function accessBtnStart(value) {
  if (!value) {
    refs.startBtnEl.setAttribute('disabled', '');
    return;
  }
  refs.startBtnEl.removeAttribute('disabled');
}

function renderTimerElement() {
  const { days, hours, minutes, seconds } = convertMs(userTime - Date.now());
  const checkTimeUpToMinutes =
    days === 0 && hours === 0 && minutes === 0 && seconds === 0;

  refs.daysEl.textContent = addLeadingZero(days);
  refs.hoursEl.textContent = addLeadingZero(hours);
  refs.minutesEl.textContent = addLeadingZero(minutes);
  refs.secondsEl.textContent = addLeadingZero(seconds);

  if (checkTimeUpToMinutes) {
    timeLocalEl.removeAttribute('disabled');
    refs.resetBtnEl.setAttribute('disabled', '');
    clearInterval(intervalId);
  }
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
function renderAnimLastSeconds() {
  const { days, hours, minutes, seconds } = convertMs(userTime - Date.now());
  const checkTimeUpToMinutes = days === 0 && hours === 0 && minutes === 0;

  if (checkTimeUpToMinutes && seconds <= 10) {
    animLastSeconds();
  }
}
function animLastSeconds() {
  const anim = [{ color: 'inherit' }, { color: 'red' }];
  const timing = {
    duration: 250,
    iterations: 1,
  };
  refs.secondsEl.animate(anim, timing);
}
