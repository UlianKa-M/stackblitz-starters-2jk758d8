import express from 'express';
import tableService from '../services/TableService.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try { res.json(await tableService.get('reservations.json')); }
  catch (error) { res.status(500).json({ message: 'Ошибка получения бронирований' }); }
});

router.post('/', async (req, res) => {
  try {
    const { userId, bookId, bookTitle, status, returnDate } = req.body;
    if (!userId || !bookId || !bookTitle)
      return res.status(400).json({ message: 'Не заполнены обязательные поля' });
    const reservations = await tableService.get('reservations.json');
    const newId = reservations.records.length > 0
      ? Math.max(...reservations.records.map((r) => r.fields.ReservationId || 0)) + 1 : 1;
    const newReservation = await tableService.create('reservations.json', {
      ReservationId: newId, UserId: userId, BookId: bookId,
      BookTitle: bookTitle, Status: status || 'Активно',
      ReturnDate: returnDate,
      CreatedAt: new Date().toISOString(),
    });
    res.status(201).json(newReservation);
  } catch (error) { res.status(500).json({ message: 'Ошибка создания бронирования' }); }
});

router.put('/:id', async (req, res) => {
  try {
    const updated = await tableService.put('reservations.json', req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'Бронирование не найдено' });
    res.json(updated);
  } catch (error) { res.status(500).json({ message: 'Ошибка обновления' }); }
});

router.delete('/:id', async (req, res) => {
  try {
    await tableService.delete('reservations.json', req.params.id);
    res.json({ message: 'Бронирование удалено' });
  } catch (error) { res.status(500).json({ message: 'Ошибка удаления' }); }
});

export default router;