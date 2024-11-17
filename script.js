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


// Импорт функций из date-fns и date-fns-tz
const { format, utcToZonedTime, parseISO } = dateFnsTz;
const TIME_ZONE = 'Europe/Warszawa'; // Укажите нужный часовой пояс

const API_BASE_URL = 'https://calendar-66ly.onrender.com'; // Замените на свой адрес API

const userId = '123'; // Уникальный идентификатор пользователя

// Отображение текущего месяца
const currentDate = new Date();
const currentMonth = currentDate.getMonth();
const currentYear = currentDate.getFullYear();

document.getElementById('monthYear').textContent = `${currentDate.toLocaleString('ru-RU', {
  month: 'long',
  year: 'numeric',
})}`;

// Генерация календаря
function generateCalendar(year, month) {
  const firstDay = new Date(year, month, 1).getDay(); // День недели первого числа
  const daysInMonth = new Date(year, month + 1, 0).getDate(); // Количество дней в месяце
  const calendarGrid = document.getElementById('calendarGrid');

  // Очистка предыдущего календаря
  calendarGrid.innerHTML = '';

  // Добавление пустых ячеек до начала месяца
  for (let i = 0; i < (firstDay === 0 ? 6 : firstDay - 1); i++) {
    const emptyCell = document.createElement('div');
    emptyCell.className = 'emptyCell';
    calendarGrid.appendChild(emptyCell);
  }

  // Заполнение календаря днями
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const cell = document.createElement('div');
    cell.className = 'calendarCell';
    cell.textContent = day;

    // Добавляем обработчик клика
    cell.addEventListener('click', () => toggleWorkday(date));

    calendarGrid.appendChild(cell);
  }

  // Обновляем выделение отработанных дней
  fetchWorkdays();
}

// Добавление/удаление отработанного дня
async function toggleWorkday(date) {
  const formattedDate = format(date, 'yyyy-MM-dd'); // Форматирование даты
  const isWorkday = document
    .querySelector(`[data-date="${formattedDate}"]`)
    ?.classList.contains('workday');

  try {
    if (isWorkday) {
      await fetch(`${API_BASE_URL}/workday`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date: formattedDate, userId }),
      });
    } else {
      await fetch(`${API_BASE_URL}/workday`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date: formattedDate, userId }),
      });
    }

    fetchWorkdays();
  } catch (error) {
    console.error('Error toggling workday:', error);
  }
}

// Получение отработанных дней
async function fetchWorkdays() {
  try {
    const response = await fetch(`${API_BASE_URL}/workdays/${userId}`);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const workdays = await response.json();

    // Сброс выделения всех дней
    document.querySelectorAll('.calendarCell').forEach((cell) => {
      cell.classList.remove('workday');
    });

    // Выделение отработанных дней
    workdays.forEach(({ date }) => {
      const zonedDate = utcToZonedTime(parseISO(date), TIME_ZONE); // Преобразование в локальную дату
      const formattedDate = format(zonedDate, 'yyyy-MM-dd');
      const cell = document.querySelector(`[data-date="${formattedDate}"]`);

      if (cell) cell.classList.add('workday');
    });
  } catch (error) {
    console.error('Error fetching workdays:', error);
  }
}

// Навигация по месяцам
document.getElementById('prevMonth').addEventListener('click', () => {
  const prevMonth = new Date(currentYear, currentMonth - 1);
  generateCalendar(prevMonth.getFullYear(), prevMonth.getMonth());
});

document.getElementById('nextMonth').addEventListener('click', () => {
  const nextMonth = new Date(currentYear, currentMonth + 1);
  generateCalendar(nextMonth.getFullYear(), nextMonth.getMonth());
});

// Инициализация календаря
generateCalendar(currentYear, currentMonth);
