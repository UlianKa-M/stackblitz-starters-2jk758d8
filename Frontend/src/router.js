import { createRouter, createWebHashHistory } from 'vue-router';
import HomePage from './views/HomePage.vue';
import BooksPage from './views/BooksPage.vue';
import ReservationsPage from './views/ReservationsPage.vue';
import ContactsPage from './views/ContactsPage.vue';

const routes = [
  { path: '/', name: 'home', component: HomePage },
  { path: '/books', name: 'books', component: BooksPage },
  { path: '/reservations', name: 'reservations', component: ReservationsPage },
  { path: '/contacts', name: 'contacts', component: ContactsPage },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;