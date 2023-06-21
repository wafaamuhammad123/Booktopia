import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";

import Login from "./Components/logIn/login";
import SignUp from "./Components/signUp/signup";
import Books from "./Components/books/index";
import BookDetails from "./Components/books/bookDetails";
import AddBook from "./Components/books/addBook";
import Home from "./Components/home/home";
import DashboardPage from "./Components/admin_dashboard/dashboard";
import Error from "./Components/error";
import UpdateBook from "./Components/books/updateBook";
import BookDetail from "./Components/book_detail/book_detail";
import BookList from "./Components/testSearch/search";
import Authors from "./Components/authors/authors";
import AddAuthor from "./Components/authors/addAuthor";
import UpdateAuthor from "./Components/authors/updateAuthor";
import Author from "./Components/authors/authorDetails";
import Checkout from "./Components/checkout/checkout";
import PaymentSuccess from "./Components/checkout/paymentSuccess";
import UserProfile from "./Components/user/userprofile";
import AllBooks from "./Components/books/allBooks";
import UpdateUser from "./Components/user/updateUser";
import jwtDecode from "jwt-decode";
import Error403 from "./Components/error403";
import UserBooks from "./Components/user/userBooks";
import Users from "./Components/user_dashboard/users";
import ViewUser from "./Components/user_dashboard/viewUser";
import UpdateUserDetails from "./Components/user_dashboard/updateUserDetails";
import CreateUser from "./Components/user_dashboard/createUser";
const isAuthenticated = () => {
  // const navigate =useNavigate();
  const token = localStorage.getItem("token");
  // return !!token;
  if(token) return true;
  else return false;
};

const isAdmin = () => {
  const token = localStorage.getItem("token");
  if (token) {
    const decodedToken = jwtDecode(token);
    const userRole = decodedToken.userType;
    return userRole === "admin";
  }
  return false;
};


function App() {
  // const navigate=useNavigate();

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="home" element={<Home />} />
          <Route path="error403" element={<Error403 />} />

          {isAdmin() ? (
            <>
              <Route path="/books/:id" element={<BookDetails />} />
              <Route path="createbook" element={<AddBook />} />
              <Route path="books" element={<Books />} />
              <Route path="authors" element={<Authors />} />
              <Route path="createAuthor" element={<AddAuthor />} />
              <Route path="updateAuthor/:id" element={<UpdateAuthor />} />
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="updatebook/:id" element={<UpdateBook />} />
              <Route path="getUsers" element={<Users />} />
              <Route path="viewUser/:id" element={<ViewUser />} />
              <Route path="updateUser/:id" element={<UpdateUserDetails />} />
              <Route path="CreateUser" element={<CreateUser />} />
            </>
          ) : (
            <>
              <Route path="/books/:id" element={<Navigate to="/error403" replace />} />
              <Route path="createbook" element={<Navigate to="/error403" replace />} />
              <Route path="books" element={<Navigate to="/error403" replace />} />
              <Route path="authors" element={<Navigate to="/error403" replace />} />
              <Route path="createAuthor" element={<Navigate to="/error403" replace />} />
              <Route path="updateAuthor/:id" element={<Navigate to="/error403" replace />} />
              <Route path="dashboard" element={<Navigate to="/error403" replace />} />
              <Route path="updatebook/:id" element={<Navigate to="/error403" replace />} />            
            
            </>

            
          )}



          {isAuthenticated() ? (
            <>
              <Route path="lists" element={<BookList />} />
              <Route path="book/:id" element={<BookDetail />} />
              <Route path="userprofile" element={<UserProfile />} />
              <Route path="UpdateUser/:id" element={<UpdateUser />} />
              <Route path="UserBooks/:id" element={<UserBooks />} />
              <Route path="BookDetail" element={<BookDetail />} />
              <Route path="authors/:id" element={<Author/>}/>
              <Route path="/checkout" element={<Checkout/>}/>
              <Route path="/paymentSuccessful" element={<PaymentSuccess/>}/>
            </>
          ) : (
            <>
              <Route path="lists" element={<Navigate to="/login" replace />} />
              <Route path="BookDetail" element={<Navigate to="/login" replace />} />
              <Route path="userprofile" element={<Navigate to="/login" replace />} />
              <Route path="UpdateUser/:id" element={<Navigate to="/login" replace />} />
              <Route path="authors/:id" element={<Navigate to="/login" replace />}/>
              <Route path="/checkout" element={<Navigate to="/login" replace />}/>
              <Route path="/paymentSuccessful" element={<Navigate to="/login" replace />}/>
            </>

            
          )}

          

          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;