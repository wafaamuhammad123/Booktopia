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
import Contact from './Components/contact/contact';

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
              <Route path="dashboard" element={<DashboardPage/>}/>
              <Route path="updatebook/:id" element={<UpdateBook/>}/>
              <Route path="home" element={<Home/>}/>
              <Route path="*" element={<Error/>}/>
              <Route path="contact" element={<Contact/>}/>

              <Route path="BookDetail" element={<BookDetail/>}/>
          </Routes>
      </BrowserRouter>

    </div>
  )
}
export default App;