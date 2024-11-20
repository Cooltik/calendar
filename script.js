// const userId = "123"; // Уникальный идентификатор пользователя
// const API_URL = 'https://calendar-66ly.onrender.com';


// // Месяцы на русском языке
// const monthNames = [
//   "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
//   "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
// ];

// // Дни недели на русском языке с субботой и воскресеньем в конце
// const dayNames = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

// document.addEventListener("DOMContentLoaded", async () => {
//   const calendar = document.getElementById("calendar");
//   const monthNameEl = document.getElementById("month-name");
//   const weekdaysEl = document.getElementById("weekdays");

//   const today = new Date();
//   const currentMonth = today.getMonth();
//   const currentYear = today.getFullYear();
//   const monthStart = new Date(currentYear, currentMonth, 1);
//   const monthEnd = new Date(currentYear, currentMonth + 1, 0);

//   monthNameEl.textContent = `${monthNames[currentMonth]} ${currentYear}`;

//   // Создаем заголовок для дней недели с субботой и воскресеньем в конце
//   dayNames.forEach(day => {
//     const dayNameEl = document.createElement("div");
//     dayNameEl.textContent = day;
//     weekdaysEl.appendChild(dayNameEl);
//   });

//   // Получаем отработанные дни из базы данных
//   const workdays = await fetchWorkdays();

//   // Определяем первый день месяца и количество дней в месяце
//   const firstDayOfMonth = monthStart.getDay(); // День недели для 1 числа месяца
//   const daysInMonth = monthEnd.getDate(); // Общее количество дней в месяце

//   // Заполняем пустые ячейки до первого дня месяца
//   // Для того чтобы суббота и воскресенье были в конце, мы корректируем позицию первого дня месяца
//   let shiftFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1; // Перемещаем воскресенье в конец
//   for (let i = 0; i < shiftFirstDay; i++) {
//     const emptyDay = document.createElement("div");
//     emptyDay.classList.add("empty");
//     calendar.appendChild(emptyDay);
//   }

//   // Отображаем дни месяца
//   for (let day = 1; day <= daysInMonth; day++) {
//     const date = new Date(currentYear, currentMonth, day);
//     const formattedDate = date.toISOString().split("T")[0];
//     const dayElement = document.createElement("div");
//     dayElement.classList.add("day");
//     dayElement.textContent = day;

//     // Подсветка выходных дней (суббота и воскресенье)
//     if (date.getDay() === 6 || date.getDay() === 0) {
//       dayElement.classList.add("weekend");
//     }

//     // Подсветка отработанных дней
//     if (workdays.includes(formattedDate)) {
//       dayElement.classList.add("highlight");
//     }

//     dayElement.addEventListener("click", () => toggleWorkday(date, dayElement));

//     calendar.appendChild(dayElement);
//   }
// });

// // Функция для получения отработанных дней
// async function fetchWorkdays() {
//   try {
//     const response = await fetch(`${API_URL}/workdays/${userId}`);
//     const data = await response.json();
//     return data.map(day => new Date(day.date).toISOString().split("T")[0]);
//   } catch (error) {
//     console.error("Error fetching workdays:", error);
//     return [];
//   }
// }

// // Функция для отметки дня
// async function toggleWorkday(date, dayElement) {
//   const formattedDate = date.toISOString().split("T")[0];
  

//   if (dayElement.classList.contains("highlight")) {
//     // Удаление отработанного дня из базы данных
//     try {
//       const response = await fetch(`${API_URL}/workday`, {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({ date, userId })
//       });
//       if (response.ok) {
//         dayElement.classList.remove("highlight");
//       } else {
//         console.error("Error removing workday:", await response.json());
//       }
//     } catch (error) {
//       console.error("Error removing workday:", error);
//     }
//   } else {
//     // Добавление отработанного дня в базу данных
//     try {
//       const response = await fetch(`${API_URL}/workday`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({ date, userId })
//       });
//       if (response.ok) {
//         dayElement.classList.add("highlight");
//       } else {
//         console.error("Error adding workday:", await response.json());
//       }
//     } catch (error) {
//       console.error("Error adding workday:", error);
//     }
//   }
// }



// // Использование date-fns через глобальный объект
// const { format, parseISO, isWeekend, getDay, startOfMonth, endOfMonth } = dateFns;

// const userId = "123"; // Уникальный идентификатор пользователя
// const API_URL = 'https://calendar-66ly.onrender.com';

// // Месяцы на русском языке
// const monthNames = [
//   "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
//   "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
// ];

// // Дни недели на русском языке с субботой и воскресеньем в конце
// const dayNames = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

// document.addEventListener("DOMContentLoaded", async () => {
//   const calendar = document.getElementById("calendar");
//   const monthNameEl = document.getElementById("month-name");
//   const weekdaysEl = document.getElementById("weekdays");
//   // const workdayCounterEl = document.getElementById("workday-counter"); // Элемент для отображения счетчика отработанных дней
//   // const earnedMoneyEl = document.getElementById("earned-money"); // Элемент для отображения заработанных денег

//   const today = new Date();
//   const currentMonth = today.getMonth();
//   const currentYear = today.getFullYear();

//   const monthStart = startOfMonth(new Date(currentYear, currentMonth));
//   const monthEnd = endOfMonth(monthStart);

//   monthNameEl.textContent = `${monthNames[currentMonth]} ${currentYear}`;

//   // Создаем заголовок для дней недели с субботой и воскресеньем в конце
//   dayNames.forEach(day => {
//     const dayNameEl = document.createElement("div");
//     dayNameEl.textContent = day;
//     weekdaysEl.appendChild(dayNameEl);
//   });

//   // Получаем отработанные дни из базы данных
//   const workdays = await fetchWorkdays();

//   // Обновляем счетчик отработанных дней и заработанных денег
//   updateWorkdayCounter(workdays.length);

//   // Определяем первый день месяца и количество дней в месяце
//   const firstDayOfMonth = getDay(monthStart); // День недели для 1 числа месяца
//   const daysInMonth = monthEnd.getDate(); // Общее количество дней в месяце

//   // Заполняем пустые ячейки до первого дня месяца
//   let shiftFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1; // Перемещаем воскресенье в конец
//   for (let i = 0; i < shiftFirstDay; i++) {
//     const emptyDay = document.createElement("div");
//     emptyDay.classList.add("empty");
//     calendar.appendChild(emptyDay);
//   }

//   // Отображаем дни месяца
//   for (let day = 1; day <= daysInMonth; day++) {
//     const date = new Date(currentYear, currentMonth, day);
//     const formattedDate = format(date, "yyyy-MM-dd");
//     const dayElement = document.createElement("div");
//     dayElement.classList.add("day");
//     dayElement.textContent = day;

//     // Подсветка выходных дней (суббота и воскресенье)
//     if (isWeekend(date)) {
//       dayElement.classList.add("weekend");
//     }

//     // Подсветка отработанных дней
//     if (workdays.includes(formattedDate)) {
//       dayElement.classList.add("highlight");
//     }

//     dayElement.addEventListener("pointerdown", () => toggleWorkday(date, dayElement));

//     calendar.appendChild(dayElement);
//   }
// });

// // Функция для получения отработанных дней
// async function fetchWorkdays() {
//   try {
//     const response = await fetch(`${API_URL}/workdays/${userId}`);
//     const data = await response.json();
//     return data.map((day) => format(parseISO(day.date), "yyyy-MM-dd"));
//   } catch (error) {
//     console.error("Error fetching workdays:", error);
//     return [];
//   }
// }

// // Функция для отметки дня
// async function toggleWorkday(date, dayElement) {
//   const formattedDate = format(date, "yyyy-MM-dd");

//   if (dayElement.classList.contains("highlight")) {
//     // Удаление отработанного дня из базы данных
//     try {
//       const response = await fetch(`${API_URL}/workday`, {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ date: formattedDate, userId }),
//       });
//       if (response.ok) {
//         dayElement.classList.remove("highlight");
//         updateWorkdayCounter(-1); // Уменьшаем счетчик
//       } else {
//         console.error("Error removing workday:", await response.json());
//       }
//     } catch (error) {
//       console.error("Error removing workday:", error);
//     }
//   } else {
//     // Добавление отработанного дня в базу данных
//     try {
//       const response = await fetch(`${API_URL}/workday`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ date: formattedDate, userId }),
//       });
//       if (response.ok) {
//         dayElement.classList.add("highlight");
//         updateWorkdayCounter(1); // Увеличиваем счетчик
//       } else {
//         console.error("Error adding workday:", await response.json());
//       }
//     } catch (error) {
//       console.error("Error adding workday:", error);
//     }
//   }
// }

// // Функция для обновления счетчика отработанных дней и заработанных денег
// function updateWorkdayCounter(change) {
//   const workdayCounterEl = document.getElementById("workday-counter");
//   const earnedMoneyEl = document.getElementById("earned-money");

//   let currentCount = parseInt(workdayCounterEl.textContent) || 0;
//   currentCount += change;
//   workdayCounterEl.textContent = currentCount;

//   // Обновляем заработанные деньги
//   const earnings = currentCount * 300;
//   earnedMoneyEl.textContent = earnings;
// }


// // Автоматическое обновление страницы каждые 5 минут
// setInterval(() => {
//   location.reload(); // Перезагружает текущую страницу
// }, 5 * 60 * 1000); // 5 минут в миллисекундах


// // Использование date-fns через глобальный объект
// const { format, parseISO, isWeekend, getDay, startOfMonth, endOfMonth } = dateFns;

// const userId = "123"; // Уникальный идентификатор пользователя
// const API_URL = 'https://calendar-66ly.onrender.com';

// // Месяцы на русском языке
// const monthNames = [
//   "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
//   "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
// ];

// // Дни недели на русском языке с субботой и воскресеньем в конце
// const dayNames = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

// // Переменная для отслеживания активного диалогового окна
// let activeDialog = null;

// document.addEventListener("DOMContentLoaded", async () => {
//   const calendar = document.getElementById("calendar");
//   const monthNameEl = document.getElementById("month-name");
//   const weekdaysEl = document.getElementById("weekdays");

//   const today = new Date();
//   const currentMonth = today.getMonth();
//   const currentYear = today.getFullYear();

//   const monthStart = startOfMonth(new Date(currentYear, currentMonth));
//   const monthEnd = endOfMonth(monthStart);

//   monthNameEl.textContent = `${monthNames[currentMonth]} ${currentYear}`;

//   // Создаем заголовок для дней недели с субботой и воскресеньем в конце
//   dayNames.forEach(day => {
//     const dayNameEl = document.createElement("div");
//     dayNameEl.textContent = day;
//     weekdaysEl.appendChild(dayNameEl);
//   });

//   // Получаем отработанные дни из базы данных
//   const workdays = await fetchWorkdays();

//   // Обновляем счетчик отработанных дней и заработанных денег
//   updateWorkdayCounter(workdays.length);

//   // Определяем первый день месяца и количество дней в месяце
//   const firstDayOfMonth = getDay(monthStart); // День недели для 1 числа месяца
//   const daysInMonth = monthEnd.getDate(); // Общее количество дней в месяце

//   // Заполняем пустые ячейки до первого дня месяца
//   let shiftFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1; // Перемещаем воскресенье в конец
//   for (let i = 0; i < shiftFirstDay; i++) {
//     const emptyDay = document.createElement("div");
//     emptyDay.classList.add("empty");
//     calendar.appendChild(emptyDay);
//   }

//   // Отображаем дни месяца
//   for (let day = 1; day <= daysInMonth; day++) {
//     const date = new Date(currentYear, currentMonth, day);
//     const formattedDate = format(date, "yyyy-MM-dd");
//     const dayElement = document.createElement("div");
//     dayElement.classList.add("day");

//     // Верхний элемент - день месяца
//     const dateEl = document.createElement("div");
//     dateEl.classList.add("date");
//     dateEl.textContent = day;

//     // Нижний элемент - значение (по умолчанию пустое)
//     const valueEl = document.createElement("div");
//     valueEl.classList.add("value");

//     const existingWorkday = workdays.find(w => w.date === formattedDate);
//     if (existingWorkday) {
//       dayElement.classList.add("highlight");
//       valueEl.textContent = existingWorkday.value || "";
//     }

//     // Подсветка выходных дней (суббота и воскресенье)
//     if (isWeekend(date)) {
//       dayElement.classList.add("weekend");
//     }

//     dayElement.appendChild(dateEl);
//     dayElement.appendChild(valueEl);

//     // Добавляем обработчик события для открытия окна ввода
//     dayElement.addEventListener("pointerdown", () => openInputDialog(date, dayElement, valueEl));

//     calendar.appendChild(dayElement);
//   }
// });

// // Функция для получения отработанных дней
// async function fetchWorkdays() {
//   try {
//     const response = await fetch(`${API_URL}/workdays/${userId}`);
//     const data = await response.json();
//     return data.map((day) => ({
//       date: format(parseISO(day.date), "yyyy-MM-dd"),
//       value: day.value || 0
//     }));
//   } catch (error) {
//     console.error("Error fetching workdays:", error);
//     return [];
//   }
// }

// // Функция для отображения окна ввода значения
// function openInputDialog(date, dayElement, valueElement) {
//   const formattedDate = format(date, "yyyy-MM-dd");

//   // Если окно уже открыто, закрываем его
//   if (activeDialog) {
//     document.body.removeChild(activeDialog);
//   }

//   // Создаём окно ввода
//   const inputDialog = document.createElement("div");
//   inputDialog.classList.add("input-dialog");

//   const inputField = document.createElement("input");
//   inputField.type = "number";
//   inputField.placeholder = "Введите значение";
//   inputField.value = valueElement.textContent || "";

//   const saveButton = document.createElement("button");
//   saveButton.textContent = "Сохранить";

//   const deleteButton = document.createElement("button");
//   deleteButton.textContent = "Удалить";
//   deleteButton.style.backgroundColor = "red";
//   deleteButton.style.color = "white";

//   const cancelButton = document.createElement("button");
//   cancelButton.textContent = "Отмена";

//   // Обработчик для сохранения данных
//   saveButton.addEventListener("click", async () => {
//     const value = parseInt(inputField.value, 10) || 0;

//     try {
//       const response = await fetch(`${API_URL}/workday`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ date: formattedDate, userId, value }),
//       });
//       if (response.ok) {
//         dayElement.classList.add("highlight");
//         valueElement.textContent = value || "";
//         document.body.removeChild(inputDialog);
//         activeDialog = null; // Убираем активное окно
//         updateWorkdayCounter(1); // Увеличиваем счётчик, если день ранее не был отмечен
//       } else {
//         console.error("Error saving workday:", await response.json());
//       }
//     } catch (error) {
//       console.error("Error saving workday:", error);
//     }
//   });

//   // Обработчик для удаления данных
//   deleteButton.addEventListener("click", async () => {
//     try {
//       const response = await fetch(`${API_URL}/workday`, {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ date: formattedDate, userId }),
//       });
//       if (response.ok) {
//         dayElement.classList.remove("highlight");
//         valueElement.textContent = "";
//         document.body.removeChild(inputDialog);
//         activeDialog = null; // Убираем активное окно
//         updateWorkdayCounter(-1); // Уменьшаем счётчик
//       } else {
//         console.error("Error deleting workday:", await response.json());
//       }
//     } catch (error) {
//       console.error("Error deleting workday:", error);
//     }
//   });

//   // Обработчик для отмены ввода
//   cancelButton.addEventListener("click", () => {
//     document.body.removeChild(inputDialog);
//     activeDialog = null; // Убираем активное окно
//   });

//   inputDialog.appendChild(inputField);
//   inputDialog.appendChild(saveButton);
//   inputDialog.appendChild(deleteButton);
//   inputDialog.appendChild(cancelButton);

//   document.body.appendChild(inputDialog);
//   activeDialog = inputDialog; // Устанавливаем текущее активное окно
// }

// // Функция для обновления счетчика отработанных дней и заработанных денег
// function updateWorkdayCounter(change) {
//   const workdayCounterEl = document.getElementById("workday-counter");
//   const earnedMoneyEl = document.getElementById("earned-money");

//   let currentCount = parseInt(workdayCounterEl.textContent) || 0;
//   currentCount += change;
//   workdayCounterEl.textContent = currentCount;

//   // Обновляем заработанные деньги
//   const earnings = currentCount * 300;
//   earnedMoneyEl.textContent = earnings;
// }

// // Автоматическое обновление страницы каждые 5 минут
// setInterval(() => {
//   location.reload(); // Перезагружает текущую страницу
// }, 5 * 60 * 1000); // 5 минут в миллисекундах


// Использование date-fns через глобальный объект
const { format, parseISO, isWeekend, getDay, startOfMonth, endOfMonth } = dateFns;

const userId = "123"; // Уникальный идентификатор пользователя
const API_URL = 'https://calendar-66ly.onrender.com';

// Месяцы на русском языке
const monthNames = [
  "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
  "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
];

// Дни недели на русском языке с субботой и воскресеньем в конце
const dayNames = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

// Переменная для отслеживания активного диалогового окна
let activeDialog = null;

document.addEventListener("DOMContentLoaded", async () => {
  const calendar = document.getElementById("calendar");
  const monthNameEl = document.getElementById("month-name");
  const weekdaysEl = document.getElementById("weekdays");
  const totalWorkdaysEl = document.getElementById("total-workdays"); // Блок для общего количества отработанных дней
  const totalValueEl = document.getElementById("total-value"); // Блок для общего значения (value)

  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const monthStart = startOfMonth(new Date(currentYear, currentMonth));
  const monthEnd = endOfMonth(monthStart);

  monthNameEl.textContent = `${monthNames[currentMonth]} ${currentYear}`;

  // Создаем заголовок для дней недели с субботой и воскресеньем в конце
  dayNames.forEach(day => {
    const dayNameEl = document.createElement("div");
    dayNameEl.textContent = day;
    weekdaysEl.appendChild(dayNameEl);
  });

  // Получаем отработанные дни из базы данных
  const workdays = await fetchWorkdays();

  // Обновляем счетчик отработанных дней и заработанных денег
  updateWorkdayCounter(workdays.length);
  updateTotalValue(workdays);

  // Обновляем общее количество отработанных дней
  totalWorkdaysEl.textContent = `Общее количество отработанных дней: ${workdays.length} шт.`; // Выводим общее количество

  // Определяем первый день месяца и количество дней в месяце
  const firstDayOfMonth = getDay(monthStart); // День недели для 1 числа месяца
  const daysInMonth = monthEnd.getDate(); // Общее количество дней в месяце

  // Заполняем пустые ячейки до первого дня месяца
  let shiftFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1; // Перемещаем воскресенье в конец
  for (let i = 0; i < shiftFirstDay; i++) {
    const emptyDay = document.createElement("div");
    emptyDay.classList.add("empty");
    calendar.appendChild(emptyDay);
  }

  // Отображаем дни месяца
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentYear, currentMonth, day);
    const formattedDate = format(date, "yyyy-MM-dd");
    const dayElement = document.createElement("div");
    dayElement.classList.add("day");

    // Верхний элемент - день месяца
    const dateEl = document.createElement("div");
    dateEl.classList.add("date");
    dateEl.textContent = day;

    // Нижний элемент - значение (по умолчанию пустое)
    const valueEl = document.createElement("div");
    valueEl.classList.add("value");

    const existingWorkday = workdays.find(w => w.date === formattedDate);
    if (existingWorkday) {
      dayElement.classList.add("highlight");
      valueEl.textContent = `${existingWorkday.value || 0} шт.`; // Добавляем "шт." после значения
    }

    // Подсветка выходных дней (суббота и воскресенье)
    if (isWeekend(date)) {
      dayElement.classList.add("weekend");
    }

    dayElement.appendChild(dateEl);
    dayElement.appendChild(valueEl);

    // Добавляем обработчик события для открытия окна ввода
    dayElement.addEventListener("pointerdown", () => openInputDialog(date, dayElement, valueEl));

    calendar.appendChild(dayElement);
  }
});

// Функция для получения отработанных дней
async function fetchWorkdays() {
  try {
    const response = await fetch(`${API_URL}/workdays/${userId}`);
    const data = await response.json();
    return data.map((day) => ({
      date: format(parseISO(day.date), "yyyy-MM-dd"),
      value: day.value || 0
    }));
  } catch (error) {
    console.error("Error fetching workdays:", error);
    return [];
  }
}

// Функция для отображения окна ввода значения
function openInputDialog(date, dayElement, valueElement) {
  const formattedDate = format(date, "yyyy-MM-dd");

  // Если окно уже открыто, закрываем его
  if (activeDialog) {
    document.body.removeChild(activeDialog);
  }

  // Создаём окно ввода
  const inputDialog = document.createElement("div");
  inputDialog.classList.add("input-dialog");

  const inputField = document.createElement("input");
  inputField.type = "number";
  inputField.placeholder = "Введите значение";
  inputField.value = valueElement.textContent.replace(" шт.", "") || ""; // Убираем "шт." перед вставкой

  const saveButton = document.createElement("button");
  saveButton.textContent = "Сохранить";

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Удалить";
  deleteButton.style.backgroundColor = "red";
  deleteButton.style.color = "white";

  const cancelButton = document.createElement("button");
  cancelButton.textContent = "Отмена";

  // Обработчик для сохранения данных
  saveButton.addEventListener("click", async () => {
    const value = parseInt(inputField.value, 10) || 0;

    try {
      const response = await fetch(`${API_URL}/workday`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ date: formattedDate, userId, value }),
      });
      if (response.ok) {
        dayElement.classList.add("highlight");
        valueElement.textContent = `${value || 0} шт.`; // Добавляем "шт."
        document.body.removeChild(inputDialog);
        activeDialog = null; // Убираем активное окно
        updateWorkdayCounter(1); // Увеличиваем счётчик, если день ранее не был отмечен
        updateTotalValue(); // Обновляем общее количество значений
      } else {
        console.error("Error saving workday:", await response.json());
      }
    } catch (error) {
      console.error("Error saving workday:", error);
    }
  });

  // Обработчик для удаления данных
  deleteButton.addEventListener("click", async () => {
    try {
      const response = await fetch(`${API_URL}/workday`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ date: formattedDate, userId }),
      });
      if (response.ok) {
        dayElement.classList.remove("highlight");
        valueElement.textContent = ""; // Убираем значение
        document.body.removeChild(inputDialog);
        activeDialog = null; // Убираем активное окно
        updateWorkdayCounter(-1); // Уменьшаем счётчик
        updateTotalValue(); // Обновляем общее количество значений
      } else {
        console.error("Error deleting workday:", await response.json());
      }
    } catch (error) {
      console.error("Error deleting workday:", error);
    }
  });

  // Обработчик для отмены ввода
  cancelButton.addEventListener("click", () => {
    document.body.removeChild(inputDialog);
    activeDialog = null; // Убираем активное окно
  });

  inputDialog.appendChild(inputField);
  inputDialog.appendChild(saveButton);
  inputDialog.appendChild(deleteButton);
  inputDialog.appendChild(cancelButton);

  document.body.appendChild(inputDialog);
  activeDialog = inputDialog; // Устанавливаем текущее активное окно
}

// Функция для обновления счетчика отработанных дней
function updateWorkdayCounter(change) {
  const workdayCounterEl = document.getElementById("workday-counter");
  let currentCount = parseInt(workdayCounterEl.textContent.replace("Отработано: ", "")) || 0;
  workdayCounterEl.textContent = `${currentCount + change}`;
}

// Функция для обновления общего значения (value)
function updateTotalValue(workdays = []) {
  const totalValueEl = document.getElementById("total-value");
  const totalValue = workdays.reduce((sum, workday) => sum + (workday.value || 0), 0);
  totalValueEl.textContent = `Общее количество значений: ${totalValue} шт.`;
}
