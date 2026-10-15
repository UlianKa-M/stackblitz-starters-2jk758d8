import LoginService from './LoginService.js';
import UserService from './UserService.js';
import BooksService from './BooksService.js';
import ReservationsService from './ReservationsService.js';
import ContactsService from './ContactsService.js';

export const registerServices = (app) => {
  app.provide('loginService', LoginService);
  app.provide('userService', UserService);
  app.provide('booksService', BooksService);
  app.provide('reservationsService', ReservationsService);
  app.provide('contactsService', ContactsService);
};