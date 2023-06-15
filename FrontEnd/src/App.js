import { BrowserRouter,Route, Routes } from "react-router-dom";

import Login from "./Components/logIn/login"
import SignUp from "./Components/signUp/signup"
import Books from './Components/books/index'
import BookDetails from './Components/books/bookDetails'
import AddBook from './Components/books/addBook'
import DashboardPage from "./Components/admin_dashboard/dashboard";
import Error from "./Components/error";
function App(){
  return(
    <div>
      <BrowserRouter>
          <Routes>
              <Route path="login" element={<Login/>}/>
              <Route path="signup" element={<SignUp/>}/>
              <Route path="/books/:id" element={<BookDetails/>}/>
              <Route path="createbook" element={<AddBook/>}/>
              <Route path="books" element={<Books/>}/>
              <Route path="dashboard" element={<DashboardPage/>}/>
              <Route path="*" element={<Error/>}/>
          </Routes>
      </BrowserRouter>

    </div>
  )
}
export default App;