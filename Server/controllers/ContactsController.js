import express from 'express';
import tableService from '../services/TableService.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try { res.json(await tableService.get('contacts.json')); }
  catch (error) { res.status(500).json({ message: 'Ошибка получения контактов' }); }
});

export default router;