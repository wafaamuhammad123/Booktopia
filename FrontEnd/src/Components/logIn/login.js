import React, { useState } from 'react';
import './login.css';
import { NavLink,  useNavigate } from 'react-router-dom';
import { fetchLogin } from '../../auth';
import jwtDecode from 'jwt-decode';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');

  const validateForm = (e) => {
    e.preventDefault();

    let emailErr = '';
    let passwordErr = '';

    // Validate email
    if (email === '') {
      emailErr = 'Please enter your email address';
    } else {
      const regex = /^\S+@\S+\.\S+$/;
      if (!regex.test(email)) {
        emailErr = 'Please enter a valid email address';
      }
    }

    // Validate password
    if (password === '') {
      passwordErr = 'Please enter your password';
    }

    setEmailErr(emailErr);
    setPasswordErr(passwordErr);

    if (!emailErr && !passwordErr) {
      fetchLogin(email, password)
        .then((data) => {
          console.log(data);
          console.log(data.token);
          localStorage.setItem('token', data.token);
          const token = localStorage.getItem('token');
          let user = JSON.stringify(data.user);
           localStorage.setItem("user", user);
         
          if(token){
            const decodedToken = jwtDecode(token);
            const userType = decodedToken.userType;
            console.log(userType);
            if( userType === 'admin'){
               navigate("/books")
            }
            else if( userType === 'user'){
               navigate("/home")
            }
          }
        })
        .catch((error) => {
          console.error('Error logging in:', error);
        });
    }
  };

  return (
    <section className="L">
      <div className="form-boxL">
        <div className="form-valueL">
          <form id="form" name="contactForm" onSubmit={validateForm}>
            <header className="header">Login</header>
            <br />
            <h5 className="centered" id="hello">
              Hey, Enter your details to get sign in
            </h5>
            <h5 className="centered" id="hello">
              to your account
            </h5>
            <div className="inputbox">
              <input
                type="text"
                name="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="error" id="emailErr">
              {emailErr}
            </div>

            <div className="inputbox">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="error" id="passwordErr">
              {passwordErr}
            </div>

            <button type="submit" className="sign">
              Sign in
            </button>
            <div>
              <p>
                Don't have an account?
                <span id="signUp">
                  <NavLink to="/signup">Sign up</NavLink>
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
      <p id="copyright">
        Copyright @booktopia2023 | privacy policy
      </p>
    </section>
  );
};

export default Login;
