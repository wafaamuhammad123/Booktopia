import axiosInstance from './Components/utils/axiosInstance';

const API_BASE_URL = "http://localhost:4000/api";

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

export function fetchuserDetails(id) {
  return axiosInstance.get(`/user/${id}`).then((response) => response.data);
}

export function fetchUpdateUser(user) {
  const id = user.get('_id');
  return axiosInstance.put(`/user/user/${id}`, user).then((response) => response.data);
}

export function fetchmyBooks(id) {
  return axiosInstance.get(`/userbook/bookStatus/${id}`).then((response) => response.data);
}

export function updateBookStatus(bookId, newStatus) {
  return axiosInstance.put(`/userbook/chooseBook/${bookId}`, { statue: newStatus }).then((response) => response.data);
}

export function createBookUser(bookId, newStatus) {
  return axiosInstance.put(`/userbook/chooseBook/${bookId}`, { statue: newStatus }).then((response) => response.data);
}
// this part about get all users to display them in admin dashboard 
export function fetchusers() {
  return axiosInstance.get('/user/users').then((response) => response.data);
}

export function fetchDeleteuser(id) {
  return axiosInstance.delete(`/user/delete/${id}`).then((response) => response.data);
}