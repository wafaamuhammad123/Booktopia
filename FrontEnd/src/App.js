import { BrowserRouter,Route, Routes } from "react-router-dom";
import Login from "./Components/logIn/login"
import SignUp from "./Components/signUp/signup"
import Error from "./Components/error";
function App(){
  return(
    <div>
      <BrowserRouter>
          <Routes>
              <Route path="login" element={<Login/>}/>
              <Route path="signup" element={<SignUp/>}/>
              <Route path="*" element={<Error/>}/>
          </Routes>
      </BrowserRouter>

    </div>
  )
}
export default App;