// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// require('dotenv').config();

// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(cors());
// app.use(express.json());

// // Подключение к MongoDB Atlas
// mongoose.connect(process.env.MONGO_URI, {
// }).then(() => console.log("Connected to MongoDB"))
//   .catch(err => console.error("Could not connect to MongoDB:", err));

// // Определение схемы и модели для работы с датами
// const workdaySchema = new mongoose.Schema({
//   date: { type: Date, required: true },
//   userId: { type: String, required: true }
// });


// const Workday = mongoose.model("Workday", workdaySchema);

// // Маршрут для добавления отработанного дня
// app.post('/workday', async (req, res) => {
//   try {
//     const { date, userId } = req.body;
//     const workday = new Workday({ date, userId });
//     await workday.save();
//     res.status(201).send(workday);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });

// // Маршрут для получения отработанных дней пользователя
// app.get('/workdays/:userId', async (req, res) => {
//   try {
//     const workdays = await Workday.find({ userId: req.params.userId });
//     res.status(200).send(workdays);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });

// // Маршрут для удаления отработанного дня
// app.delete('/workday', async (req, res) => {
//     try {
//       const { date, userId } = req.body;
//       const result = await Workday.findOneAndDelete({ date: new Date(date), userId });
//       if (result) {
//         res.status(200).send({ message: "Workday removed" });
//       } else {
//         res.status(404).send({ message: "Workday not found" });
//       }
//     } catch (error) {
//       res.status(400).send(error);
//     }
//   });
  

// // Запуск сервера
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const { format, utcToZonedTime } = require('date-fns-tz');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Подключение к MongoDB
mongoose.connect(process.env.MONGO_URI, {
  dbName: 'your_database_name',
}).then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Could not connect to MongoDB:", err));

// Определение схемы и модели для работы с датами
const workdaySchema = new mongoose.Schema({
  date: { type: String, required: true }, // Храним только дату в формате 'YYYY-MM-DD'
  userId: { type: String, required: true }
});

const Workday = mongoose.model("Workday", workdaySchema);

// Установка часового пояса
const TIME_ZONE = 'Europe/Warsaw'; // Укажите нужный часовой пояс

// Маршрут для добавления отработанного дня
app.post('/workday', async (req, res) => {
  try {
    const { date, userId } = req.body;

    // Преобразуем дату в локальное время и форматируем
    const zonedDate = utcToZonedTime(new Date(date), TIME_ZONE);
    const formattedDate = format(zonedDate, 'yyyy-MM-dd');

    const workday = new Workday({ date: formattedDate, userId });
    await workday.save();
    res.status(201).send(workday);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Маршрут для получения отработанных дней пользователя
app.get('/workdays/:userId', async (req, res) => {
  try {
    const workdays = await Workday.find({ userId: req.params.userId });
    res.status(200).send(workdays);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Маршрут для удаления отработанного дня
app.delete('/workday', async (req, res) => {
  try {
    const { date, userId } = req.body;

    // Преобразуем дату в локальное время и форматируем
    const zonedDate = utcToZonedTime(new Date(date), TIME_ZONE);
    const formattedDate = format(zonedDate, 'yyyy-MM-dd');

    const result = await Workday.findOneAndDelete({ date: formattedDate, userId });
    if (result) {
      res.status(200).send({ message: "Workday removed" });
    } else {
      res.status(404).send({ message: "Workday not found" });
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
