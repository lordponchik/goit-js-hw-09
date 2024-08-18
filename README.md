<h1 id="home">Homework :clipboard:</h1>

## goit-js-hw-09


* 🇺🇸 [English](#en)
* 🇺🇦 [Ukrainian](#uk)
* 🇷🇺 [Russian](#ru)

--- 

<h3 id="en">📚 EN 📚</h3>

# Acceptance criteria

- `goit-js-hw-09` repository created.
- In your submitted homework, there are two links for each project: One to your source files and one to your working page on `GitHub Pages`.
- During live page visits, there are no errors or warnings generated in the console.
- Project built with [parcel-project-template](https://github.com/goitacademy/parcel-project-template).
- Code formatted with `Prettier`.

## Start files

In the [src folder](./src), you will find start files with ready-made markup, styles, and added script files for each task. Copy them to your project, completely replacing the `src` folder in [parcel-project-template](https://github.com/goitacademy/parcel-project-template). To do this, download this entire repository as an archive or use the [DownGit service](https://downgit.github.io/) to download a separate folder from the repository.

## Task 1 - color switcher

Do this task in the `01-color-switcher.html` and `01-color-switcher.js` files. Check out the demo video of the switcher.

https://user-images.githubusercontent.com/17479434/127716753-fabd276f-6a7d-411b-bfa2-01c818f4ea66.mp4

In HTML, there are "Start" and "Stop" buttons.

```html
<button type="button" data-start>Start</button>
<button type="button" data-stop>Stop</button>
```

Write a script that, after clicking the "Start" button, changes the `<body>` background color once a second to a random value using an inline style. When clicking on the "Stop" button, the background color change must stop.

> ⚠️ Please note that the "Start" button can be clicked an infinite number of times. Make sure that the "Start" button is disabled while the theme change is running.

Use the `getRandomHexColor` function to generate a random color.

```js
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}
```

## Task 2 - countdown timer

Do this task in the `02-timer.html` and `02-timer.js` files. Write a timer script that counts down to a specific date. Such a timer can be used in blogs and online stores, event-logging pages, during maintenance, etc. Watch a demo video of the timer.

https://user-images.githubusercontent.com/17479434/127672390-2a51efe1-06fb-41dd-86dd-8542393d3043.mp4

### Interface elements

In HTML, there is ready-made markup for the timer, end date selection field, and a button that should trigger the timer when clicked. Add at least some decoration to the interface elements.

```html
<input type="text" id="datetime-picker" />
<button type="button" data-start>Start</button>

<div class="timer">
  <div class="field">
    <span class="value" data-days>00</span>
    <span class="label">Days</span>
  </div>
  <div class="field">
    <span class="value" data-hours>00</span>
    <span class="label">Hours</span>
  </div>
  <div class="field">
    <span class="value" data-minutes>00</span>
    <span class="label">Minutes</span>
  </div>
  <div class="field">
    <span class="value" data-seconds>00</span>
    <span class="label">Seconds</span>
  </div>
</div>
```

### `flatpickr` library

Use the [flatpickr](https://flatpickr.js.org/) library to allow cross-browser selection of the end date and time in a single UI element. In order to add the CSS code of the library to the project, you need to add one more import aside from the one described in the documentation.

```js
// Described in import flatpickr from 'flatpickr' documentation;
// Additional styles import: import 'flatpickr/dist/flatpickr.min.css';
```

The library expects to be initialized on the `input[type="text"]` element, so there is an `input#datetime-picker` field added to the HTML document.

```html
<input type="text" id="datetime-picker" />
```

An optional parameter object can be passed as the second argument to the `flatpickr(selector, options)` function. We have prepared an object for you that you need in order to complete the task. Find about the role of each property in the [Options documentation](https://flatpickr.js.org/options/) and use it in your code.

```js
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};
```

### Date selection

The `onClose()` method is called from the parameter object every time the interface element that creates `flatpickr` is closed. It should be used to handle the date selected by the user. The `selectedDates` parameter is an array of the selected dates, so the first element is taken.

- If the user selects a date from the past, show `window.alert()` with the text `"Please choose a date in the future"`.
- If the user has selected a valid date (in the future), the "Start" button becomes active.
- The "Start" button must be inactive until the user has selected a date in the future.
- When you click the "Start" button, the countdown to the selected date starts from the time of clicking.

### Countdown

When you click on the "Start" button, the script must calculate, once per second, how much time is left until the specified date and update the timer interface, showing four numbers: Days, hours, minutes, and seconds in the following format: `xx:xx:xx:xx`.

- The number of days can be more than two digits.
- The timer must stop when it reaches the end date, that is, `00:00:00:00`.

> 💡 Let's not complicate things. If the timer is running, in order to select a new date and restart it, you need to reload the page.

To calculate the values, use the ready-made function, `convertMs`, where `ms` is the difference between the end and current date in milliseconds.

```js
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

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
```

### Time formatting

The `convertMs()` function returns an object with the calculated time remaining until the end date. Note that it does not format the result. That is, if there are 4 minutes (or any other time unit) left, the function will return `4`, not `04`. In the timer interface, you need to add `0` if there are less than two digits in the number. Write an `addLeadingZero(value)` function that uses the `padStart()` method and format the value before rendering the interface.

### Notification library

> ⚠️ The following features are optional, but they will be good for additional practice.

Use the [notiflix](https://github.com/notiflix/Notiflix#readme) library to display notifications to the user instead of `window.alert()`.

## Task 3 - promise generator

Do this task in the `03-promises.html` and `03-promises.js` files. Watch a demo video of the promise generator.

https://user-images.githubusercontent.com/17479434/127932183-42232f26-4db2-4614-86bc-6bec54b1d6a4.mp4

In HTML, there is form markup; in its fields, the user will enter the first delay in milliseconds, the delay increment for each promise after the first one, and the number of promises to be created.

```html
<form class="form">
  <label>
    First delay (ms)
    <input type="number" name="delay" required />
  </label>
  <label>
    Delay step (ms)
    <input type="number" name="step" required />
  </label>
  <label>
    Amount
    <input type="number" name="amount" required />
  </label>
  <button type="submit">Create promises</button>
</form>
```

Write a script that, when submitting the form, calls the `createPromise(position, delay)` function as many times as you entered in the `amount` field. On each call, pass it the number of the promises to be created (`position`) and the delay given the first delay (`delay`) and step (`step`) entered by the user.

```js
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    // Fulfill
  } else {
    // Reject
  }
}
```

Supplement the code of the `createPromise` function so that it returns **one promise** that will be fulfilled or rejected after `delay` time. The value of the promise must be an object containing the `position` and `delay` properties with the values of these parameters. Use the initial function code to choose whether to fulfill or reject the promise.

```js
createPromise(2, 1500)
  .then(({ position, delay }) => {
    console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    console.log(`❌ Rejected promise ${position} in ${delay}ms`);
  });
```

### Notification library

> ⚠️ The following features are optional, but they will be good for additional practice.

Use the [notiflix](https://github.com/notiflix/Notiflix#readme) library to display notifications to the user instead of `console.log()`.

---
---

<h3 id="uk">📚 UK 📚 <a href="#home">⬆ Home ⬆</a></h3> 			

# Критерії прийому

- Створено репозиторій `goit-js-hw-09`.
- При здачі домашньої роботи є два посилання для кожного проекту: вихідні
 файли та робочу сторінку на `GitHub Pages`.
- При відвідуванні живої сторінки завдання, в консолі немає помилок та попереджень.
- Проект зібраний за допомогою
 [parcel-project-template](https://github.com/goitacademy/parcel-project-template).
- Код відформатовано `Prettier`.

## Стартові файли

[Скачай стартові файли](https://downgit.github.io/#/home?url=https://github.com/goitacademy/javascript-homework/tree/main/v2/09/src)
з готовою розміткою, стилями та підключеними файлами скриптів для кожного
завдання. Скопіюй їх собі в проект, повністю замінивши папку `src` у
[parcel-project-template](https://github.com/goitacademy/parcel-project-template).

## Завдання 1 - перемикач кольорів

Виконуй це завдання у файлах `01-color-switcher.html` та `01-color-switcher.js`.
Подивися демо відео роботи перемикача.

https://user-images.githubusercontent.com/17479434/127716753-fabd276f-6a7d-411b-bfa2-01c818f4ea66.mp4

<!-- Подивися
[демо відео](https://user-images.githubusercontent.com/17479434/127716753-fabd276f-6a7d-411b-bfa2-01c818f4ea66.mp4)
роботи перемикача. -->

У HTML є кнопки «Start» та «Stop».

```html
<button type="button" data-start>Start</button>
<button type="button" data-stop>Stop</button>
```

Напиши скрипт, який після натискання кнопки «Start», раз на секунду змінює колір
фону `<body>` на випадкове значення, використовуючи інлайн стиль. При натисканні на
кнопку «Stop», зміна кольору фона має зупинятися.

> ⚠️ Врахуй, на кнопку «Start» можна натиснути нескінченну кількість разів. Зроби
> так, щоб поки зміна теми запущена, кнопка «Start» була не активна
> (disabled).

Для генерації випадкового кольору використовуй функцію `getRandomHexColor`.

```js
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}
```

## Завдання 2 - таймер зворотного відліку

Виконуй це завдання у файлах `02-timer.html` та `02-timer.js`. Напиши скрипт
таймера, який веде зворотний відлік до дати. Такий таймер може
використовуватися в блогах та інтернет-магазинах, сторінках реєстрації подій,
час технічного обслуговування тощо. Подивися демо відео роботи таймера.

https://user-images.githubusercontent.com/17479434/127672390-2a51efe1-06fb-41dd-86dd-8542393d3043.mp4

<!-- Подивися
[демо відео](https://user-images.githubusercontent.com/17479434/127672390-2a51efe1-06fb-41dd-86dd-8542393d3043.mp4)
роботи таймера. -->

### Елементи інтефрейсу

У HTML є готова розмітка таймера, поля вибору кінцевої дати та кнопки, при
клік по якій таймер повинен запускатися. Додай мінімальне оформлення
елементів інтерфейсу.

```html
<input type="text" id="datetime-picker" />
<button type="button" data-start>Start</button>

<div class="timer">
  <div class="field">
    <span class="value" data-days>00</span>
    <span class="label">Days</span>
  </div>
  <div class="field">
    <span class="value" data-hours>00</span>
    <span class="label">Hours</span>
  </div>
  <div class="field">
    <span class="value" data-minutes>00</span>
    <span class="label">Minutes</span>
  </div>
  <div class="field">
    <span class="value" data-seconds>00</span>
    <span class="label">Seconds</span>
  </div>
</div>
```

### Бібліотека `flatpickr`

Використовуй бібліотеку [flatpickr](https://flatpickr.js.org/) для того щоб
дозволити користувачеві кроссбраузерно вибрати кінцеву дату та час в одному
елемент інтерфейсу. Щоб підключити CSS код бібліотеки до проекту,
необхідно додати ще один імпорт, крім того, що описаний в документації.

```js
// Описано у документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
```

Бібліотека очікує, що її ініціалізують на елементі `input[type="text"]`,
тому ми додали в HTML документ поле `input#datetime-picker`.

```html
<input type="text" id="datetime-picker" />
```

Другим аргументом функції `flatpickr(selector, options)` можна передати
необов'язковий об'єкт параметрів. Ми підготували для тебе об'єкт, який потрібен
для виконання завдання. Розберись за що відповідає кожна властивість у
[документації «Options»](https://flatpickr.js.org/options/) та використовуй його в
своєму коді.

```js
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};
```

### Вибір дати

Метод `onClose()` з об'єкта параметрів викликається щоразу під час закриття
елемента інтерфейсу який створює `flatpickr`. Саме в ньому варто обробляти
дату обрану користувачем. Параметр `selectedDates` це масив вибраних дат,
тому ми беремо перший елемент.

- Якщо користувач вибрав дату минулого, покажи `window.alert()` з текстом
  `"Please choose a date in the future"`.
- Якщо користувач вибрав валідну дату (у майбутньому), кнопка «Start» стає
 активної.
- Кнопка «Start» повинна бути не активна доти, доки користувач не вибрав
 дату у майбутньому.
- При натисканні на кнопку "Start" починається відлік часу до обраної дати з
 моменту натискання.

### Відлік часу

При натисканні на кнопку «Start» скрипт повинен обчислювати раз на секунду.
часу залишилося до вказаної дати та оновлювати інтерфейс таймера, показуючи
чотири цифри: дні, години, хвилини та секунди у форматі `xx:xx:xx:xx`.

- Кількість днів може складатися з більш як двох цифр.
- Таймер повинен зупинятися, коли дійшов до кінцевої дати, тобто
 `00:00:00:00`.

> 💡 Не ускладнюватимемо. Якщо таймер запущено, щоб вибрати нову дату
> та перезапустити його – необхідно перезавантажити сторінку.

Для підрахунку значень використовуй готову функцію `convertMs`, де `ms` - різниця
між кінцевою та поточною датою в мілісекундах.

```js
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

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
```

### Форматування часу

Функція `convertMs()` повертає об'єкт з розрахованим часом, що залишився до
кінцевої дати. Зверніть увагу, що вона не форматує результат. Тобто якщо
залишилося 4 хвилини або будь-якої іншої складової часу, то функція поверне `4`,
а не `04`. В інтерфейсі таймера необхідно додавати `0` якщо в числі менше
двох символів. Напиши функцію `addLeadingZero(value)`, яка використовує метод
метод `padStart()` і перед відображенням інтегрей форматуй значення.

### Бібліотека повідомлень

> ⚠️ Наступний функціонал не є обов'язковим при здачі завдання, але буде гарним
> Додатковою практикою.

Для відображення повідомлень користувачу замість `window.alert()` використовуй
бібліотеку [notiflix](https://github.com/notiflix/Notiflix#readme).

## Завдання 3 - генератор промісів

Виконуй це завдання у файлах `03-promises.html` та `03-promises.js`. Подивися
демо відео роботи генератора промісів.

https://user-images.githubusercontent.com/17479434/127932183-42232f26-4db2-4614-86bc-6bec54b1d6a4.mp4

<!-- Подивися
[демо відео](https://user-images.githubusercontent.com/17479434/127932183-42232f26-4db2-4614-86bc-6bec54b1d6a4.mp4)
роботи генератора промісів. -->

У HTML є розмітка форми, у поля якої користувач вводитиме першу
затримку в мілісекундах, крок збільшення затримки для кожного промісу після
першого та кількість промісів яку необхідно створити.

```html
<form class="form">
  <label>
    First delay (ms)
    <input type="number" name="delay" required />
  </label>
  <label>
    Delay step (ms)
    <input type="number" name="step" required />
  </label>
  <label>
    Amount
    <input type="number" name="amount" required />
  </label>
  <button type="submit">Create promises</button>
</form>
```

Напиши скрипт, який при сабміті форми викликає функцію
`createPromise(position, delay)` стільки разів, скільки ввели в поле `amount`. При
кожному виклику передай їй номер створюваного промісу (position) і затримку
враховуючи введену користувачем першу затримку (`delay`) та крок (`step`).

```js
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    // Fulfill
  } else {
    // Reject
  }
}
```

Доповни код функції `createPromise` так, щоб вона повертала **один проміс**,
який виконується або відхиляється через `delay` часу. Значення промісу
повинен бути об'єкт, в якому будуть властивості `position` та `delay` зі значеннями
однойменних параметрів. Використовуйте початковий код функції для вибору того, що
потрібно зробити з промісом – виконати або відхилити.

```js
createPromise(2, 1500)
  .then(({ position, delay }) => {
    console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    console.log(`❌ Rejected promise ${position} in ${delay}ms`);
  });
```

### Бібліотека повідомлень

> ⚠️ Наступний функціонал не є обов'язковим при здачі завдання, але буде гарною
> додатковою практикою.

Для відображення повідомлень користувачу замість `console.log()` використовуй
бібліотеку [notiflix](https://github.com/notiflix/Notiflix#readme).

---
---

<h3 id="ru">📚 RU 📚 <a href="#home">⬆ Home ⬆</a></h3> 

# Критерии приема

- Создан репозиторий `goit-js-hw-09`.
- При сдаче домашней работы есть две ссылки для каждого проекта: на исходные
  файлы и рабочую страницу на `GitHub Pages`.
- При посещении живой страницы задания, в консоли нету ошибок и предупреждений.
- Проект собран с помощью
  [parcel-project-template](https://github.com/goitacademy/parcel-project-template).
- Код отформатирован `Prettier`.

## Стартовые файлы

[Скачай стартовые файлы](https://downgit.github.io/#/home?url=https://github.com/goitacademy/javascript-homework/tree/main/v2/09/src)
с готовой разметкой, стилями и подключенными файлами скриптов для каждого
задания. Скопируй их себе в проект, полностью заменив папку `src` в
[parcel-project-template](https://github.com/goitacademy/parcel-project-template).

## Задание 1 - переключатель цветов

Выполняй это задание в файлах `01-color-switcher.html` и `01-color-switcher.js`.
Посмотри демо видео работы переключателя.

https://user-images.githubusercontent.com/17479434/127716753-fabd276f-6a7d-411b-bfa2-01c818f4ea66.mp4

<!-- Посмотри
[демо видео](https://user-images.githubusercontent.com/17479434/127716753-fabd276f-6a7d-411b-bfa2-01c818f4ea66.mp4)
работы переключателя. -->

В HTML есть кнопки «Start» и «Stop».

```html
<button type="button" data-start>Start</button>
<button type="button" data-stop>Stop</button>
```

Напиши скрипт, который после нажатия кнопки «Start», раз в секунду меняет цвет
фона `<body>` на случайное значение используя инлайн стиль. При нажатии на
кнопку «Stop», изменение цвета фона должно останавливаться.

> ⚠️ Учти, на кнопку «Start» можно нажать бесконечное количество раз. Сделай
> так, чтобы пока изменение темы запушено, кнопка «Start» была не активна
> (disabled).

Для генерации случайного цвета используй функцию `getRandomHexColor`.

```js
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}
```

## Задание 2 - таймер обратного отсчета

Выполняй это задание в файлах `02-timer.html` и `02-timer.js`. Напиши скрипт
таймера, который ведёт обратный отсчет до определенной даты. Такой таймер может
использоваться в блогах и интернет-магазинах, страницах регистрации событий, во
время технического обслуживания и т. д. Посмотри демо видео работы таймера.

https://user-images.githubusercontent.com/17479434/127672390-2a51efe1-06fb-41dd-86dd-8542393d3043.mp4

<!-- Посмотри
[демо видео](https://user-images.githubusercontent.com/17479434/127672390-2a51efe1-06fb-41dd-86dd-8542393d3043.mp4)
работы таймера. -->

### Элементы интефрейса

В HTML есть готовая разметка таймера, поля выбора конечной даты и кнопки, при
клике по которой таймер должен запускаться. Добавь минимальное оформление
элементов интерфейса.

```html
<input type="text" id="datetime-picker" />
<button type="button" data-start>Start</button>

<div class="timer">
  <div class="field">
    <span class="value" data-days>00</span>
    <span class="label">Days</span>
  </div>
  <div class="field">
    <span class="value" data-hours>00</span>
    <span class="label">Hours</span>
  </div>
  <div class="field">
    <span class="value" data-minutes>00</span>
    <span class="label">Minutes</span>
  </div>
  <div class="field">
    <span class="value" data-seconds>00</span>
    <span class="label">Seconds</span>
  </div>
</div>
```

### Библиотека `flatpickr`

Используй библиотеку [flatpickr](https://flatpickr.js.org/) для того чтобы
позволить пользователю кроссбраузерно выбрать конечную дату и время в одном
элементе интерфейса. Для того чтобы подключить CSS код библиотеки в проект,
необходимо добавить еще один импорт, кроме того который описан в документации.

```js
// Описан в документации
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';
```

Библиотека ожидает что её инициализируют на элементе `input[type="text"]`,
поэтому мы добавили в HTML документ поле `input#datetime-picker`.

```html
<input type="text" id="datetime-picker" />
```

Вторым аргументом функции `flatpickr(selector, options)` можно передать
необязательный объект параметров. Мы подготовили для тебя объект который нужен
для выполнения задания. Разберись за что отвечает каждое свойство в
[документации «Options»](https://flatpickr.js.org/options/) и используй его в
своем коде.

```js
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};
```

### Выбор даты

Метод `onClose()` из обьекта параметров вызывается каждый раз при закрытии
элемента интерфейса который создает `flatpickr`. Именно в нём стоит обрабатывать
дату выбранную пользователем. Параметр `selectedDates` это массив выбранных дат,
поэтому мы берем первый элемент.

- Если пользователь выбрал дату в прошлом, покажи `window.alert()` с текстом
  `"Please choose a date in the future"`.
- Если пользователь выбрал валидную дату (в будущем), кнопка «Start» становится
  активной.
- Кнопка «Start» должа быть не активна до тех пор, пока пользователь не выбрал
  дату в будущем.
- При нажатии на кнопку «Start» начинается отсчет времени до выбранной даты с
  момента нажатия.

### Отсчет времени

При нажатии на кнопку «Start» скрипт должен вычислять раз в секунду сколько
времени осталось до указанной даты и обновлять интерфейс таймера, показывая
четыре цифры: дни, часы, минуты и секунды в формате `xx:xx:xx:xx`.

- Количество дней может состоять из более чем двух цифр.
- Таймер должен останавливаться когда дошел до конечной даты, то есть
  `00:00:00:00`.

> 💡 Не будем усложнять. Если таймер запущен, для того чтобы выбрать новую дату
> и перезапустить его - необходимо перезагрузить страницу.

Для подсчета значений используй готовую функцию `convertMs`, где `ms` - разница
между конечной и текущей датой в миллисекундах.

```js
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

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
```

### Форматирование времени

Функция `convertMs()` возвращает объект с рассчитанным оставшимся временем до
конечной даты. Обрати внимание, что она не форматирует результат. То есть, если
осталось 4 минуты или любой другой составляющей времени, то функция вернет `4`,
а не `04`. В интерфейсе таймера необходимо добавлять `0` если в числе меньше
двух символов. Напиши функцию `addLeadingZero(value)`, которая использует метод
метод `padStart()` и перед отрисовкой интефрейса форматируй значение.

### Библиотека уведомлений

> ⚠️ Следующий функционал не обязателен при сдаче задания, но будет хорошей
> дополнительной практикой.

Для отображения уведомлений пользователю вместо `window.alert()` используй
библиотеку [notiflix](https://github.com/notiflix/Notiflix#readme).

## Задание 3 - генератор промисов

Выполняй это задание в файлах `03-promises.html` и `03-promises.js`. Посмотри
демо видео работы генератора промисов.

https://user-images.githubusercontent.com/17479434/127932183-42232f26-4db2-4614-86bc-6bec54b1d6a4.mp4

<!-- Посмотри
[демо видео](https://user-images.githubusercontent.com/17479434/127932183-42232f26-4db2-4614-86bc-6bec54b1d6a4.mp4)
работы генератора промисов. -->

В HTML есть разметка формы, в поля которой пользователь будет вводить первую
задержку в миллисекундах, шаг увеличения задержки для каждого промиса после
первого и количество промисов которое необходимо создать.

```html
<form class="form">
  <label>
    First delay (ms)
    <input type="number" name="delay" required />
  </label>
  <label>
    Delay step (ms)
    <input type="number" name="step" required />
  </label>
  <label>
    Amount
    <input type="number" name="amount" required />
  </label>
  <button type="submit">Create promises</button>
</form>
```

Напиши скрипт, который при сабмите формы вызывает функцию
`createPromise(position, delay)` столько раз, сколько ввели в поле `amount`. При
каждом вызове передай ей номер создаваемого промиса (`position`) и задержку
учитывая введенную пользователем первую задержку (`delay`) и шаг (`step`).

```js
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    // Fulfill
  } else {
    // Reject
  }
}
```

Дополни код функции `createPromise` так, чтобы она возвращала **один промис**,
который выполянется или отклоняется через `delay` времени. Значением промиса
должен быть объект, в котором будут свойства `position` и `delay` со значениями
одноименных параметров. Используй начальный код функции для выбора того, что
нужно сделать с промисом - выполнить или отклонить.

```js
createPromise(2, 1500)
  .then(({ position, delay }) => {
    console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    console.log(`❌ Rejected promise ${position} in ${delay}ms`);
  });
```

### Библиотека уведомлений

> ⚠️ Следующий функционал не обязателен при сдаче задания, но будет хорошей
> дополнительной практикой.

Для отображения уведомлений пользователю вместо `console.log()` используй
библиотеку [notiflix](https://github.com/notiflix/Notiflix#readme).
