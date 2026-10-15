import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3010;

app.use(cors());
app.use(express.json());

// Утилита для работы с JSON
const readJSON = (fileName) => {
  const filePath = path.join(__dirname, 'Server', 'data', fileName);
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
};

const writeJSON = (fileName, data) => {
  const filePath = path.join(__dirname, 'Server', 'data', fileName);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
};

// === USERS ===
app.get('/api/users/getById', (req, res) => {
  const { id } = req.query;
  if (!id) return res.status(400).json({ message: 'Не указан ID' });
  const data = readJSON('users.json');
  const user = data.records.find(r => r.fields.UserId === parseInt(id));
  if (!user) return res.status(404).json({ message: 'Пользователь не найден' });
  res.json(user);
});

// === LOGIN ===
app.get('/api/login/auth', (req, res) => {
  const { email, password } = req.query;
  if (!email || !password) return res.status(400).json({ message: 'Не заполнены поля' });
  const data = readJSON('login.json');
  const found = data.records.find(r => r.fields.Email === email && r.fields.Password === password);
  if (!found) return res.status(401).json({ message: 'Неверный email или пароль', userId: 0 });
  res.json({ message: 'Успешная авторизация', userId: found.fields.UserId, recordId: found.id });
});

app.post('/api/login/register', (req, res) => {
  const { email, password, name, surname, phone } = req.body;
  if (!email || !password || !name || !surname) return res.status(400).json({ message: 'Не заполнены поля' });
  const logins = readJSON('login.json');
  if (logins.records.find(r => r.fields.Email === email)) return res.status(400).json({ message: 'Email уже зарегистрирован' });
  const users = readJSON('users.json');
  const newUserId = users.records.length > 0 ? Math.max(...users.records.map(r => r.fields.UserId)) + 1 : 1;
  users.records.push({ id: `rec_user_${Date.now()}`, fields: { UserId: newUserId, Name: name, Surname: surname, Patronymic: '', Phone: phone || '', DateRegistration: new Date().toISOString() } });
  writeJSON('users.json', users);
  logins.records.push({ id: `rec_login_${Date.now()}`, fields: { LoginId: logins.records.length + 1, UserId: newUserId, Login: email.split('@')[0], Password: password, Email: email } });
  writeJSON('login.json', logins);
  res.status(201).json({ message: 'Регистрация успешна', userId: newUserId });
});

// === BOOKS ===
app.get('/api/books/', (req, res) => {
  res.json(readJSON('books.json'));
});

// === RESERVATIONS ===
app.get('/api/reservations/', (req, res) => {
  res.json(readJSON('reservations.json'));
});

app.post('/api/reservations/', (req, res) => {
  const { userId, bookId, bookTitle, status, returnDate } = req.body;
  if (!userId || !bookId || !bookTitle) return res.status(400).json({ message: 'Не заполнены поля' });
  const reservations = readJSON('reservations.json');
  const newId = reservations.records.length > 0 ? Math.max(...reservations.records.map(r => r.fields.ReservationId || 0)) + 1 : 1;
  const newRec = { id: `rec_reservation_${Date.now()}`, fields: { ReservationId: newId, UserId: userId, BookId: bookId, BookTitle: bookTitle, Status: status || 'Активно', ReturnDate: returnDate, CreatedAt: new Date().toISOString() } };
  reservations.records.push(newRec);
  writeJSON('reservations.json', reservations);
  res.status(201).json(newRec);
});

app.put('/api/reservations/:id', (req, res) => {
  const data = readJSON('reservations.json');
  const index = data.records.findIndex(r => r.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Не найдено' });
  data.records[index].fields = { ...data.records[index].fields, ...req.body };
  writeJSON('reservations.json', data);
  res.json(data.records[index]);
});

app.delete('/api/reservations/:id', (req, res) => {
  const data = readJSON('reservations.json');
  data.records = data.records.filter(r => r.id !== req.params.id);
  writeJSON('reservations.json', data);
  res.json({ message: 'Удалено' });
});

// === CONTACTS ===
app.get('/api/contacts/', (req, res) => {
  res.json(readJSON('contacts.json'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});