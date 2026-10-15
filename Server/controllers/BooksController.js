import express from 'express';
import tableService from '../services/TableService.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try { res.json(await tableService.get('books.json')); }
  catch (error) { res.status(500).json({ message: 'Ошибка получения книг' }); }
});

router.get('/byGenre', async (req, res) => {
  const { genre } = req.query;
  if (!genre) return res.status(400).json({ message: 'Не указан жанр' });
  try {
    const data = await tableService.get('books.json');
    const filtered = genre === 'Все'
      ? data.records
      : data.records.filter((r) => r.fields.Genre === genre);
    res.json({ records: filtered });
  } catch (error) { res.status(500).json({ message: 'Ошибка фильтрации' }); }
});

export default router;