import { API_BASE_URL, fetchData } from '../apiConfig.js';
class BooksService {
  async getAllBooks() { return fetchData(`${API_BASE_URL}/books/`); }
  async getByGenre(genre) {
    return fetchData(`${API_BASE_URL}/books/byGenre?genre=${encodeURIComponent(genre)}`);
  }
}
export default new BooksService();