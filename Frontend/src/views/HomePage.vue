<template>
  <div class="home-page">
    <div class="hero-section">
      <div class="hero-content">
        <div class="hero-badge">📖 Добро пожаловать</div>
        <h1 class="hero-title">Городская библиотека</h1>
        <p class="hero-subtitle">им. А.С. Пушкина</p>
        <p class="hero-description">
          Более 50 000 книг, электронных ресурсов и уютное пространство для
          чтения. Присоединяйтесь к нашему читательскому сообществу!
        </p>
        <div class="hero-buttons">
          <router-link to="/books" class="btn-primary">
            <span class="btn-icon">📚</span> Перейти к каталогу
          </router-link>
          <router-link to="/contacts" class="btn-secondary">
            <span class="btn-icon">📞</span> Связаться с нами
          </router-link>
        </div>
      </div>
      <div class="hero-decoration">
        <div class="book-stack">
          <div class="book book-1"></div>
          <div class="book book-2"></div>
          <div class="book book-3"></div>
        </div>
      </div>
    </div>

    <div class="stats-section">
      <div class="stats-container">
        <div class="stat-card">
          <div class="stat-icon"></div>
          <div class="stat-value">50 000+</div>
          <div class="stat-label">Книг в фонде</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">👥</div>
          <div class="stat-value">12 000+</div>
          <div class="stat-label">Читателей</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">🏛️</div>
          <div class="stat-value">120+</div>
          <div class="stat-label">Лет истории</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">⭐</div>
          <div class="stat-value">98%</div>
          <div class="stat-label">Довольных читателей</div>
        </div>
      </div>
    </div>

    <div class="features-section">
      <h2 class="section-title">Наши преимущества</h2>
      <div class="features-grid">
        <div
          class="feature-card"
          v-for="(feature, index) in features"
          :key="index"
        >
          <div class="feature-icon">{{ feature.icon }}</div>
          <h3 class="feature-title">{{ feature.title }}</h3>
          <p class="feature-text">{{ feature.text }}</p>
        </div>
      </div>
    </div>

    <div class="popular-books-section">
      <h2 class="section-title">Популярные книги</h2>
      <div class="books-grid">
        <div class="book-card" v-for="book in popularBooks" :key="book.id">
          <div class="book-cover">
            <span class="cover-icon">📖</span>
          </div>
          <div class="book-info">
            <h3 class="book-title">{{ book.fields.Title }}</h3>
            <p class="book-author">{{ book.fields.Author }}</p>
            <span class="book-genre">{{ book.fields.Genre }}</span>
            <div
              class="book-status"
              :class="{
                available: book.fields.Available,
                unavailable: !book.fields.Available,
              }"
            >
              {{ book.fields.Available ? '✓ В наличии' : '✗ Занята' }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import booksService from '../plugins/api/services/BooksService.js';

export default {
  name: 'HomePage',
  data() {
    return {
      popularBooks: [],
      features: [
        {
          icon: '📚',
          title: 'Большой фонд',
          text: 'Более 50 000 книг на русском и иностранных языках',
        },
        {
          icon: '💻',
          title: 'Электронные ресурсы',
          text: 'Доступ к электронным библиотекам и базам данных',
        },
        {
          icon: '🕐',
          title: 'Удобный график',
          text: 'Работаем ежедневно с 9:00 до 21:00',
        },
        {
          icon: '🎓',
          title: 'Мероприятия',
          text: 'Лекции, встречи с писателями, книжные клубы',
        },
      ],
    };
  },
  async mounted() {
    try {
      const data = await booksService.getAllBooks();
      this.popularBooks = (data.records || []).slice(0, 4);
    } catch (e) {
      console.error(e);
    }
  },
};
</script>

<style scoped>
.home-page {
  background: #fdf5e6;
  min-height: 100vh;
}

.hero-section {
  background: linear-gradient(135deg, #8b0000 0%, #a52a2a 50%, #d2691e 100%);
  padding: 80px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 60px;
  position: relative;
  overflow: hidden;
}

.hero-content {
  flex: 1;
  position: relative;
  z-index: 1;
  color: #fffaf0;
}

.hero-badge {
  display: inline-block;
  background: rgba(255, 250, 240, 0.2);
  padding: 8px 20px;
  border-radius: 20px;
  font-size: 14px;
  margin-bottom: 20px;
  border: 1px solid rgba(255, 250, 240, 0.3);
}

.hero-title {
  font-family: 'Playfair Display', serif;
  font-size: 56px;
  font-weight: 700;
  margin: 0 0 8px 0;
  color: #fffaf0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.hero-subtitle {
  font-size: 24px;
  font-style: italic;
  color: #f5deb3;
  margin: 0 0 24px 0;
  font-family: 'Playfair Display', serif;
}

.hero-description {
  font-size: 18px;
  line-height: 1.6;
  margin: 0 0 32px 0;
  color: #fffaf0;
  max-width: 600px;
}

.hero-buttons {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.btn-primary,
.btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 28px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  font-size: 16px;
  transition: all 0.3s ease;
}

.btn-primary {
  background: #fffaf0;
  color: #8b0000;
  border: 2px solid #fffaf0;
}

.btn-primary:hover {
  background: #f5deb3;
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
}

.btn-secondary {
  background: transparent;
  color: #fffaf0;
  border: 2px solid #fffaf0;
}

.btn-secondary:hover {
  background: rgba(255, 250, 240, 0.15);
  transform: translateY(-2px);
}

.btn-icon {
  font-size: 20px;
}

.hero-decoration {
  flex: 0 0 300px;
  position: relative;
  z-index: 1;
}

.book-stack {
  position: relative;
  height: 300px;
}

.book {
  position: absolute;
  width: 180px;
  height: 240px;
  border-radius: 4px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}

.book-1 {
  background: linear-gradient(135deg, #f5deb3 0%, #d2691e 100%);
  top: 0;
  left: 0;
  transform: rotate(-5deg);
}

.book-2 {
  background: linear-gradient(135deg, #fffaf0 0%, #f5deb3 100%);
  top: 20px;
  left: 40px;
  transform: rotate(3deg);
}

.book-3 {
  background: linear-gradient(135deg, #d2691e 0%, #8b0000 100%);
  top: 40px;
  left: 80px;
  transform: rotate(-2deg);
}

.stats-section {
  padding: 60px 40px;
  background: #fffaf0;
}

.stats-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 30px;
}

.stat-card {
  text-align: center;
  padding: 30px 20px;
  background: #fdf5e6;
  border-radius: 12px;
  border: 2px solid #d2691e;
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(139, 0, 0, 0.2);
}

.stat-icon {
  font-size: 48px;
  margin-bottom: 12px;
}

.stat-value {
  font-family: 'Playfair Display', serif;
  font-size: 36px;
  font-weight: 700;
  color: #8b0000;
  margin-bottom: 8px;
}

.stat-label {
  font-size: 14px;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.features-section,
.popular-books-section {
  padding: 60px 40px;
  max-width: 1400px;
  margin: 0 auto;
}

.section-title {
  font-family: 'Playfair Display', serif;
  font-size: 36px;
  text-align: center;
  margin-bottom: 40px;
  color: #8b0000;
  position: relative;
  padding-bottom: 16px;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 3px;
  background: #d2691e;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
}

.feature-card {
  background: #fffaf0;
  padding: 30px;
  border-radius: 12px;
  text-align: center;
  border: 2px solid #d2691e;
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(139, 0, 0, 0.2);
  border-color: #8b0000;
}

.feature-icon {
  font-size: 56px;
  margin-bottom: 16px;
}

.feature-title {
  font-family: 'Playfair Display', serif;
  font-size: 22px;
  color: #8b0000;
  margin: 0 0 12px 0;
}

.feature-text {
  font-size: 15px;
  color: #666;
  line-height: 1.6;
  margin: 0;
}

.books-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 24px;
}

.book-card {
  background: #fffaf0;
  border-radius: 12px;
  overflow: hidden;
  border: 2px solid #d2691e;
  transition: all 0.3s ease;
}

.book-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(139, 0, 0, 0.2);
}

.book-cover {
  height: 200px;
  background: linear-gradient(135deg, #8b0000 0%, #a52a2a 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.cover-icon {
  font-size: 80px;
  opacity: 0.3;
}

.book-info {
  padding: 16px;
}

.book-title {
  font-family: 'Playfair Display', serif;
  font-size: 16px;
  color: #2c1810;
  margin: 0 0 8px 0;
  line-height: 1.3;
}

.book-author {
  font-size: 14px;
  color: #666;
  margin: 0 0 8px 0;
  font-style: italic;
}

.book-genre {
  display: inline-block;
  background: #f5deb3;
  color: #8b0000;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  margin-bottom: 8px;
}

.book-status {
  font-size: 13px;
  font-weight: 600;
  padding: 6px 12px;
  border-radius: 6px;
  text-align: center;
}

.book-status.available {
  background: #90ee90;
  color: #006400;
}

.book-status.unavailable {
  background: #ffb6c1;
  color: #8b0000;
}
</style>
