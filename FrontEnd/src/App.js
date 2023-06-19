import { BrowserRouter,Route, Routes } from "react-router-dom";

import Login from "./Components/logIn/login"
import SignUp from "./Components/signUp/signup"
import Books from './Components/books/index'
import BookDetails from './Components/books/bookDetails'
import AddBook from './Components/books/addBook'
import Home from './Components/home/home'
import DashboardPage from "./Components/admin_dashboard/dashboard";
import Error from "./Components/error";
import UpdateBook from "./Components/books/updateBook";
import BookDetail from "./Components/book_detail/book_detail";
import BookList from "./Components/testSearch/search"
import Authors from "./Components/authors/authors";
import AddAuthor from "./Components/authors/addAuthor";
import UpdateAuthor from "./Components/authors/updateAuthor";
import Author from "./Components/authors/authorDetails";
import AllBooks from "./Components/books/allBooks";
function App(){
  return(
    <div>
      <BrowserRouter>
          <Routes>
              <Route path="" element={<Login/>}/>
              <Route path="login" element={<Login/>}/>
              <Route path="signup" element={<SignUp/>}/>
              <Route path="/books/:id" element={<BookDetails/>}/>
              <Route path="createbook" element={<AddBook/>}/>
              <Route path="books" element={<Books/>}/>
              <Route path="authors" element={<Authors/>}/>
              <Route path="authors/:id" element={<Author/>}/>
              <Route path="createAuthor" element={<AddAuthor/>}/>
              <Route path="updateAuthor/:id" element={<UpdateAuthor/>}/>
              <Route path="dashboard" element={<DashboardPage/>}/>
              <Route path="updatebook/:id" element={<UpdateBook/>}/>
              <Route path="home" element={<Home/>}/>
              <Route path="lists" element={<BookList/>}/>
              <Route path="*" element={<Error/>}/>

              <Route path="BookDetail" element={<BookDetail/>}/>
          </Routes>
      </BrowserRouter>

    </div>
  )
}
export default App;