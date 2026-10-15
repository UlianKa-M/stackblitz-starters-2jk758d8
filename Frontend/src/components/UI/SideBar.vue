<template>
<div class="library-sidebar">
  <div class="sidebar-header">
    <h3>📖 Навигация</h3>
    <button class="close-btn" @click="toggleCollapse">✕</button>
  </div>

  <div class="sidebar-menu">
    <router-link to="/" class="menu-item" active-class="active">
      <span class="menu-icon">🏠</span>
      <span class="menu-text">Главная</span>
    </router-link>

    <router-link to="/books" class="menu-item" active-class="active">
      <span class="menu-icon">📚</span>
      <span class="menu-text">Каталог книг</span>
    </router-link>

    <router-link to="/reservations" class="menu-item" active-class="active">
      <span class="menu-icon">📋</span>
      <span class="menu-text">Мои бронирования</span>
    </router-link>

    <router-link to="/contacts" class="menu-item" active-class="active">
      <span class="menu-icon"></span>
      <span class="menu-text">Контакты</span>
    </router-link>
  </div>

  <div class="sidebar-footer">
    <div class="quote-box">
      <p class="quote-text">«Книга — источник знаний»</p>
      <p class="quote-author">— Народная мудрость</p>
    </div>
  </div>
</div>
</template>

<script>
export default {
name: 'SideBar',
data() { return { isCollapsed: false }; },
mounted() {
  const saved = localStorage.getItem('sidebarCollapsed');
  if (saved !== null) this.isCollapsed = saved === 'true';
},
methods: {
  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
    localStorage.setItem('sidebarCollapsed', this.isCollapsed);
  },
},
};
</script>

<style scoped>
.library-sidebar {
position: fixed;
right: 0;
top: 80px;
width: 280px;
height: calc(100vh - 80px);
background: linear-gradient(180deg, #FFFAF0 0%, #F5DEB3 100%);
border-left: 3px solid #8B0000;
box-shadow: -4px 0 12px rgba(139, 0, 0, 0.15);
display: flex;
flex-direction: column;
z-index: 900;
overflow-y: auto;
}

.sidebar-header {
display: flex;
justify-content: space-between;
align-items: center;
padding: 20px;
border-bottom: 2px solid #D2691E;
background: #8B0000;
color: #FFFAF0;
}

.sidebar-header h3 {
font-family: 'Playfair Display', serif;
font-size: 18px;
margin: 0;
color: #FFFAF0;
}

.close-btn {
background: none;
border: none;
color: #FFFAF0;
font-size: 20px;
cursor: pointer;
padding: 4px 8px;
border-radius: 4px;
transition: background 0.3s;
}

.close-btn:hover {
background: rgba(255, 250, 240, 0.2);
}

.sidebar-menu {
flex: 1;
padding: 16px 0;
}

.menu-item {
display: flex;
align-items: center;
padding: 16px 24px;
text-decoration: none;
color: #2C1810;
transition: all 0.3s ease;
border-left: 4px solid transparent;
gap: 12px;
}

.menu-item:hover {
background: rgba(139, 0, 0, 0.08);
border-left-color: #D2691E;
padding-left: 28px;
}

.menu-item.active {
background: rgba(139, 0, 0, 0.12);
border-left-color: #8B0000;
font-weight: 600;
}

.menu-icon {
font-size: 24px;
}

.menu-text {
font-size: 15px;
font-family: 'Lora', serif;
}

.sidebar-footer {
padding: 20px;
border-top: 2px solid #D2691E;
background: #F5DEB3;
}

.quote-box {
text-align: center;
font-style: italic;
}

.quote-text {
font-size: 14px;
color: #8B0000;
margin: 0 0 8px 0;
font-family: 'Playfair Display', serif;
}

.quote-author {
font-size: 12px;
color: #666;
margin: 0;
}
</style>