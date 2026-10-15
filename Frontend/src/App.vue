<template>
  <v-app class="library-app">
    <NavBar @toggle-sidebar="toggleSidebar" />
    <v-main class="main-content">
      <div class="content-wrapper" :class="{ 'sidebar-open': sidebarOpen }">
        <router-view />
      </div>
      <SideBar ref="sidebar" v-show="sidebarOpen" />
    </v-main>
  </v-app>
</template>

<script>
import NavBar from './components/UI/NavBar.vue';
import SideBar from './components/UI/SideBar.vue';

export default {
  name: 'App',
  components: { NavBar, SideBar },
  data() {
    return { sidebarOpen: false };
  },
  mounted() {
    const saved = localStorage.getItem('sidebarCollapsed');
    if (saved !== null) this.sidebarOpen = saved === 'false';
    this.$watch(
      () => this.$refs.sidebar?.isCollapsed,
      (val) => {
        this.sidebarOpen = !val;
      }
    );
  },
  methods: {
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
      localStorage.setItem('sidebarCollapsed', !this.sidebarOpen);
    },
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Lora:wght@400;500&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Lora', serif;
  background-color: #fdf5e6;
  color: #2c1810;
}

.library-app {
  background-color: #fdf5e6;
}

.main-content {
  padding-top: 80px;
  min-height: 100vh;
}

.content-wrapper {
  transition: margin-right 0.3s ease;
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
}

.content-wrapper.sidebar-open {
  margin-right: 280px;
}

h1,
h2,
h3 {
  font-family: 'Playfair Display', serif;
  color: #8b0000;
}
</style>
