import axiosInstance from './Components/utils/axiosInstance';

// const API_BASE_URL = "http://localhost:4000/api";

export function fetchBookDetails(id) {
  return axiosInstance.get(`/book/${id}`).then((response) => response.data);
}

export function fetchBooks() {
  return axiosInstance.get('/book/books').then((response) => response.data);
}

export function fetchAddBook(book) {
  return axiosInstance.post('/book/create', book).then((response) => response.data);
}

export function updateBook(book) {
  const id = book.get('_id');
  return axiosInstance.put(`/book/book/${id}`, book).then((response) => response.data);
}

export function fetchDeleteBook(id) {
  return axiosInstance.delete(`/book/delete/${id}`).then((response) => response.data);
}

// Similarly, update your other API functions as well

export function fetchAuthors() {
  return axiosInstance.get('/author/authors').then((response) => response.data);
}

<<<<<<< HEAD
export function fetchAuthor(id, token) {
  const url = `${API_BASE_URL}/author/${id}`;
  const headers = {
    authorization: `${token}`,
  };
  return fetch(url, {headers}).then((response) => response.json());
=======
export function fetchAuthor(id) {
  return axiosInstance.get(`/author/${id}`).then((response) => response.data);
>>>>>>> cb3bfa476ab499f9d014c8a4c5de7217b793600d
}

export function createAuthor(data) {
  return axiosInstance.post('/author/create', data).then((response) => response.data);
}

<<<<<<< HEAD
export function fetchBooksByAuthor (id, token){
  const url = `${API_BASE_URL}/book/booksByAuthor/${id}`;
  const headers = {
    authorization: `${token}`,
  };
  return fetch(url, {headers}).then((response) => response.json());
}

=======
export function deleteAuthor(id) {
  return axiosInstance.delete(`/author/delete/${id}`).then((response) => response.data);
}
>>>>>>> cb3bfa476ab499f9d014c8a4c5de7217b793600d

export function fetchAddUser(user) {
  return axiosInstance.post('/user/create', user).then((response) => response.data);
}
