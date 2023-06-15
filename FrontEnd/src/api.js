const API_BASE_URL = "http://localhost:4000/api";

export function fetchBookDetails(id) {
  const url = `${API_BASE_URL}/book/${id}`;
  return fetch(url).then((response) => response.json());
}

export function fetchBooks() {
  const url = `${API_BASE_URL}/book/books`;
  return fetch(url).then((response) => response.json());
}

export function fetchAddBook(book) {
    const url = `${API_BASE_URL}/book/create`;
    return fetch(url, {
      method: "POST",
      body: book,
    }).then((response) => response.json());
}

export function fetchDeleteBook(id) {
  const url = `${API_BASE_URL}/book/delete/${id}`;
  return fetch(url, {
    method: 'DELETE',
  }).then((response) => response.json());
}
  

//////////////////////////////////////////////////////////////
export function fetchAuthors() {
  const url = `${API_BASE_URL}/author/authors`;
  return fetch(url).then((response) => response.json());
}
