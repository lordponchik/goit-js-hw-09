import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";


const refs= {
    timePickerEl: document.querySelector("input#datetime-picker"),
    startBtnEl: document.querySelector("button[data-start]"),
    daysEl: document.querySelector("span[data-days]"),
    hoursEl: document.querySelector("span[data-hours]"),
    minutesEl: document.querySelector("span[data-minutes]"),
    secondsEl: document.querySelector("span[data-seconds]"),
}

const optionsTimePicker = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if(selectedDates[0]<=Date.now()){
         refs.startBtnEl.setAttribute("disabled", "");
         alert("Please choose a date in the future")
         return;
        }
        refs.startBtnEl.removeAttribute("disabled");

      console.log(selectedDates[0]);
    },
  };

const calendar = flatpickr(refs.timePickerEl, optionsTimePicker);

refs.startBtnEl.setAttribute("disabled", "");

refs.startBtnEl.addEventListener("click", ()=>{
    refs.startBtnEl.setAttribute("disabled", "");
    renderTimer();
    const intervalId = setInterval(() => {
        renderTimer();

    }, 1000);

    
})

function renderTimer(){
    const {days, hours, minutes, seconds} = convertMs(calendar.selectedDates[0]-Date.now());

    refs.daysEl.textContent = days;
    refs.hoursEl.textContent = hours;
    refs.minutesEl.textContent = minutes;
    refs.secondsEl.textContent = seconds;
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
  

