import React from 'react';
import './login.css'
import { NavLink } from "react-router-dom";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
  }

  printError = (elemId, hintMsg) => {
    this.setState({ [elemId]: hintMsg });
  };

  validateForm = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    let emailErr = true;
    let passwordErr = true;

    // Validate email
    if (email === "") {
      this.printError("emailErr", "Please enter your email address");
    } else {
      const regex = /^\S+@\S+\.\S+$/;
      if (regex.test(email) === false) {
        this.printError("emailErr", "Please enter a valid email address");
      } else {
        const storageUserEmail = localStorage.getItem("email");
        if (email !== storageUserEmail) {
          this.printError("emailErr", "Please enter your correct email address or password");
        } else {
          this.printError("emailErr", "");
          emailErr = false;
        }
      }
    }

    // Validate password
    if (password === "") {
      this.printError("passwordErr", "Please enter your password");
    } else {
      const storagePassword = localStorage.getItem("password");
      if (password !== storagePassword) {
        this.printError("passwordErr", "Please enter your correct email address or password");
      } else {
        this.printError("passwordErr", "");
        passwordErr = false;
      }
    }

    if (emailErr || passwordErr) {
      return false;
    } else {
      const storageUserEmail = localStorage.getItem("email");
      const storagePassword = localStorage.getItem("password");
      if (email === storageUserEmail && storagePassword === password) {
        localStorage.setItem("loginstatus", true);
      }
    }
  };

  render() {
    const { emailErr, passwordErr } = this.state;

    return (
      <section className='L'>
        <div className="form-boxL">
          <div className="form-valueL">
            <form id="form" name="contactForm" onSubmit={this.validateForm}>
              <header className="header">Login</header>
              <br />
              <h5 className="centered" id="hello">Hey, Enter your details to get sign in </h5>
              <h5 className="centered" id="hello">to your account</h5>
              <div className="inputbox">
                <input
                  type="text"
                  name="email"
                  placeholder="Enter Email"
                  onChange={(e) => this.setState({ email: e.target.value })}
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
                  onChange={(e) => this.setState({ password: e.target.value })}
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
                  Don't have an account?<span id="signUp"><NavLink to="/signup">Sign up</NavLink></span>
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
  }
}

export default Login;
