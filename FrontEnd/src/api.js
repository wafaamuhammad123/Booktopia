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

export function fetchAuthor(id) {
  return axiosInstance.get(`/author/${id}`).then((response) => response.data);
}

export function createAuthor(data) {
  return axiosInstance.post('/author/create', data).then((response) => response.data);
}

export function deleteAuthor(id) {
  return axiosInstance.delete(`/author/delete/${id}`).then((response) => response.data);
}

export function fetchAddUser(user) {
  return axiosInstance.post('/user/create', user).then((response) => response.data);
}

export function fetchUpdateUser(id) {
  return axiosInstance.put(`/user/user/${id}`).then((response) => response.data);
}
