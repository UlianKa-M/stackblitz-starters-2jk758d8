<template>
<div class="books-page">
  <div class="page-header">
    <h1>📚 Каталог книг</h1>
    <p class="page-subtitle">Найдите интересующую вас книгу в нашем фонде</p>
  </div>

  <div class="filter-section">
    <div class="filter-label">Фильтр по жанру:</div>
    <div class="filter-chips">
      <button
        v-for="genre in genres"
        :key="genre"
        class="filter-chip"
        :class="{ active: selectedGenre === genre }"
        @click="selectedGenre = genre"
      >
        {{ genre }}
      </button>
    </div>
  </div>

  <div class="books-grid">
    <div class="book-card" v-for="book in filteredBooks" :key="book.id">
      <div class="book-cover" :style="{ background: getBookColor(book.fields.Genre) }">
        <span class="cover-icon"></span>
        <div class="book-year">{{ book.fields.Year }}</div>
      </div>
      <div class="book-info">
        <h3 class="book-title">{{ book.fields.Title }}</h3>
        <p class="book-author">{{ book.fields.Author }}</p>
        <span class="book-genre">{{ book.fields.Genre }}</span>
        <p class="book-description">{{ book.fields.Description }}</p>
        <div class="book-footer">
          <div class="book-status" :class="{ available: book.fields.Available, unavailable: !book.fields.Available }">
            {{ book.fields.Available ? '✓ В наличии' : '✗ Занята' }}
          </div>
          <button
            v-if="book.fields.Available"
            class="btn-reserve"
            @click="reserveBook(book)"
          >
            📋 Забронировать
          </button>
        </div>
      </div>
    </div>
  </div>

  <div v-if="filteredBooks.length === 0" class="no-books">
    <span class="no-books-icon">📭</span>
    <p>Книги не найдены. Попробуйте другой жанр.</p>
  </div>
</div>
</template>

<script>
import booksService from '../plugins/api/services/BooksService.js';
import reservationsService from '../plugins/api/services/ReservationsService.js';

export default {
name: 'BooksPage',
data() {
  return {
    books: [],
    genres: ['Все'],
    selectedGenre: 'Все',
    genreColors: {
      'Классика': 'linear-gradient(135deg, #8B0000 0%, #A52A2A 100%)',
      'Фантастика': 'linear-gradient(135deg, #4B0082 0%, #6A0DAD 100%)',
      'Антиутопия': 'linear-gradient(135deg, #2F4F4F 0%, #556B2F 100%)',
      'Фэнтези': 'linear-gradient(135deg, #D2691E 0%, #8B4513 100%)',
      'Детектив': 'linear-gradient(135deg, #191970 0%, #483D8B 100%)',
    },
  };
},
computed: {
  filteredBooks() {
    if (this.selectedGenre === 'Все') return this.books;
    return this.books.filter(b => b.fields.Genre === this.selectedGenre);
  },
},
async mounted() {
  try {
    const data = await booksService.getAllBooks();
    this.books = data.records || [];
    const gens = [...new Set(this.books.map(b => b.fields.Genre))];
    this.genres = ['Все', ...gens];
  } catch (e) { console.error(e); }
},
methods: {
  getBookColor(genre) {
    return this.genreColors[genre] || 'linear-gradient(135deg, #8B0000 0%, #A52A2A 100%)';
  },
  async reserveBook(book) {
    const userId = sessionStorage.getItem('userId');
    if (!userId) { alert('Сначала войдите в аккаунт!'); return; }
    try {
      await reservationsService.createReservation({
        userId: parseInt(userId),
        bookId: book.fields.BookId,
        bookTitle: book.fields.Title,
        status: 'Активно',
        returnDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      });
      alert('Книга забронирована на 14 дней!');
    } catch (e) { alert('Ошибка: ' + e.message); }
  },
},
};
</script>

<style scoped>
.books-page {
background: #FDF5E6;
min-height: 100vh;
padding: 40px 20px;
}

.page-header {
text-align: center;
margin-bottom: 40px;
}

.page-header h1 {
font-family: 'Playfair Display', serif;
font-size: 42px;
color: #8B0000;
margin: 0 0 12px 0;
}

.page-subtitle {
font-size: 18px;
color: #666;
margin: 0;
font-style: italic;
}

.filter-section {
max-width: 1200px;
margin: 0 auto 40px auto;
background: #FFFAF0;
padding: 24px;
border-radius: 12px;
border: 2px solid #D2691E;
}

.filter-label {
font-size: 16px;
font-weight: 600;
color: #8B0000;
margin-bottom: 16px;
}

.filter-chips {
display: flex;
flex-wrap: wrap;
gap: 12px;
}

.filter-chip {
background: #F5DEB3;
color: #2C1810;
border: 2px solid #D2691E;
padding: 10px 20px;
border-radius: 20px;
cursor: pointer;
font-size: 14px;
font-weight: 500;
transition: all 0.3s ease;
}

.filter-chip:hover {
background: #D2691E;
color: #FFFAF0;
transform: translateY(-2px);
}

.filter-chip.active {
background: #8B0000;
color: #FFFAF0;
border-color: #8B0000;
}

.books-grid {
max-width: 1200px;
margin: 0 auto;
display: grid;
grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
gap: 30px;
}

.book-card {
background: #FFFAF0;
border-radius: 12px;
overflow: hidden;
border: 2px solid #D2691E;
transition: all 0.3s ease;
display: flex;
flex-direction: column;
}

.book-card:hover {
transform: translateY(-8px);
box-shadow: 0 12px 24px rgba(139, 0, 0, 0.25);
}

.book-cover {
height: 220px;
display: flex;
align-items: center;
justify-content: center;
position: relative;
overflow: hidden;
}

.cover-icon {
font-size: 100px;
opacity: 0.2;
}

.book-year {
position: absolute;
bottom: 12px;
right: 12px;
background: rgba(255, 250, 240, 0.9);
color: #8B0000;
padding: 6px 12px;
border-radius: 6px;
font-size: 13px;
font-weight: 600;
}

.book-info {
padding: 20px;
flex: 1;
display: flex;
flex-direction: column;
}

.book-title {
font-family: 'Playfair Display', serif;
font-size: 18px;
color: #2C1810;
margin: 0 0 8px 0;
line-height: 1.3;
}

.book-author {
font-size: 14px;
color: #666;
margin: 0 0 12px 0;
font-style: italic;
}

.book-genre {
display: inline-block;
background: #F5DEB3;
color: #8B0000;
padding: 4px 12px;
border-radius: 12px;
font-size: 12px;
margin-bottom: 12px;
align-self: flex-start;
}

.book-description {
font-size: 14px;
color: #555;
line-height: 1.5;
margin: 0 0 16px 0;
flex: 1;
}

.book-footer {
display: flex;
justify-content: space-between;
align-items: center;
gap: 12px;
margin-top: auto;
}

.book-status {
font-size: 13px;
font-weight: 600;
padding: 6px 12px;
border-radius: 6px;
}

.book-status.available {
background: #90EE90;
color: #006400;
}

.book-status.unavailable {
background: #FFB6C1;
color: #8B0000;
}

.btn-reserve {
background: #8B0000;
color: #FFFAF0;
border: none;
padding: 8px 16px;
border-radius: 6px;
cursor: pointer;
font-size: 13px;
font-weight: 600;
transition: all 0.3s ease;
}

.btn-reserve:hover {
background: #A52A2A;
transform: translateY(-2px);
box-shadow: 0 4px 8px rgba(139, 0, 0, 0.3);
}

.no-books {
text-align: center;
padding: 60px 20px;
color: #666;
}

.no-books-icon {
font-size: 80px;
display: block;
margin-bottom: 16px;
opacity: 0.5;
}
</style>