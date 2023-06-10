import React from 'react';
import './signup.css';
import { NavLink } from "react-router-dom";

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      email: "",
      password: "",
      repassword: "",
      nameErr: "",
      emailErr: "",
      passwordErr: "",
      re_passwordErr: ""
    };
  }

  printError = (elemId, hintMsg) => {
    this.setState({ [elemId]: hintMsg });
  };

  validateForm = (e) => {
    e.preventDefault();
    const { username, email, password, repassword } = this.state;
    let nameErr = true;
    let emailErr = true;
    let passwordErr = true;
    let re_passwordErr = true;

    // Validate name
    if (username === "") {
      this.printError("nameErr", "Please enter your username");
    } else {
      const regex =/^[a-zA-Z\d\s]{5,}$/;
      if (regex.test(username) === false) {
        this.printError("nameErr", "Please enter a valid username with minimum length 5 characters");
      } else {
        this.printError("nameErr", "");
        nameErr = false;
      }
    }

    // Validate email
    if (email === "") {
      this.printError("emailErr", "Please enter your email address");
    } else {
      const regex = /^\S+@\S+\.\S+$/;
      if (regex.test(email) === false) {
        this.printError("emailErr", "Please enter a valid email address");
      } else {
        this.printError("emailErr", "");
        emailErr = false;
      }
    }

    // Validate password
    if (password === "") {
      this.printError("passwordErr", "Please enter your password");
    } else {
      const regex = /^[a-zA-Z\d\s]{5,}$/;
      if (regex.test(password) === false) {
        this.printError(
          "passwordErr",
          "Please enter at least 5 characters"
        );
      } else {
        this.printError("passwordErr", "");
        passwordErr = false;
      }
    }

    // Validate re-entered password
    if (repassword !== password) {
      this.printError("re_passwordErr", "Password doesn't match");
    } else {
      this.printError("re_passwordErr", "");
      re_passwordErr = false;
    }

    if (nameErr || emailErr || passwordErr || re_passwordErr) {
      return false;
    }

    // Set the values in local storage
    localStorage.setItem("username", username);
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
  };

  render() {
    const { nameErr, emailErr, passwordErr, re_passwordErr } = this.state;

    return (
      <section>
        <div className="form-box">
          <div className="form-value">
            <form id="sign" name="contactForm" onSubmit={this.validateForm}>
              <header className="header">Sign Up</header>
              <br />
              <h5 id="hello" className="centered">
                Hey, Welcome with us
              </h5>
              <div className="inputbox">
                <input
                  type="text"
                  name="name"
                  autoComplete="off"
                  placeholder="Enter a username"
                  onChange={(e) => this.setState({ username: e.target.value })}
                />
                 </div>
                <p className="error">{nameErr}</p>
            <div className="inputbox">
                <input
                  type="text"
                  name="email"
                  autoComplete="off"
                  placeholder="Enter Email"
                  onChange={(e) => this.setState({ email: e.target.value })}
                />
                </div>
                <p className="error">{emailErr}</p>
              
              <div className="inputbox">
                <input
                  type="password"
                  name="password"
                  autoComplete="off"
                  placeholder="Enter a password"
                  onChange={(e) => this.setState({ password: e.target.value })}
                />
                 </div>
                <p className="error">{passwordErr}</p>
             
              <div className="inputbox">
                <input
                  type="password"
                  name="re_password"
                  autoComplete="off"
                  placeholder="Re-enter the password"
                  onChange={(e) =>
                    this.setState({ repassword: e.target.value })
                  }
                />
                </div>
                <p className="error">{re_passwordErr}</p>
              
              <button type="submit" class="sign">Sign Up</button>
              <div>
                <p>
                  Already have an account?<span><NavLink to="/login">Sign In</NavLink></span>
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

export default SignUp;
