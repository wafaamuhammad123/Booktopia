import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './signup.css';
import { NavLink } from "react-router-dom";
import { fetchAddUser } from '../../api';

const SignUp = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [nameErr, setNameErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [re_passwordErr, setRePasswordErr] = useState("");
  const [image, setImage] = useState(null);
  const [imageErr, setImageErr] = useState('');
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileType = file.type;
      const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
  
      if (validImageTypes.includes(fileType)) {
        setImage(file);
        setImageErr('');
      } else {
        setImage(null);
        setImageErr('Please select a valid image file (JPEG, PNG, or GIF)');
      }
    } else {
      setImage(null);
      setImageErr('Please select an image file');
    }
    if (imageErr) {
      return <p className="error">{imageErr}</p>;
    }
    
  };
  

  const printError = (elemId, hintMsg) => {
    switch (elemId) {
      case "nameErr":
        setNameErr(hintMsg);
        break;
      case "emailErr":
        setEmailErr(hintMsg);
        break;
      case "passwordErr":
        setPasswordErr(hintMsg);
        break;
      case "re_passwordErr":
        setRePasswordErr(hintMsg);
        break;
      default:
        break;
    }
  };

  const validateForm = (e) => {
    e.preventDefault();
    let nameErr = true;
    let emailErr = true;
    let passwordErr = true;
    let re_passwordErr = true;

    if (username === "") {
      printError("nameErr", "Please enter your username");
    } else {
      const regex = /^[a-zA-Z\d\s]{5,}$/;
      if (regex.test(username) === false) {
        printError("nameErr", "Please enter a valid username with a minimum length of 5 characters");
      } else {
        printError("nameErr", "");
        nameErr = false;
      }
    }

    if (email === "") {
      printError("emailErr", "Please enter your email address");
    } else {
      const regex = /^\S+@\S+\.\S+$/;
      if (regex.test(email) === false) {
        printError("emailErr", "Please enter a valid email address");
      } else {
        printError("emailErr", "");
        emailErr = false;
      }
      
    }

    if (password === "") {
      printError("passwordErr", "Please enter your password");
    } else {
      const regex = /^[a-zA-Z\d\s]{5,}$/;
      if (regex.test(password) === false) {
        printError("passwordErr", "Please enter at least 5 characters");
      } else {
        printError("passwordErr", "");
        passwordErr = false;
      }
    }

    if (repassword !== password) {
      printError("re_passwordErr", "Password doesn't match");
    } else {
      printError("re_passwordErr", "");
      re_passwordErr = false;
    }

    if (nameErr || emailErr || passwordErr || re_passwordErr) {
      return false;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("type", "user");

    fetchAddUser(formData)
      .then((data) => {
        console.log("User added successfully:", data);
        navigate('/login');
      })
      .catch((error) => {
        const errorMessage = error?.response?.data || "An error occurred.";

        // Display the error message below the corresponding field
        if (errorMessage === "Email already taken") {
          setEmailErr(errorMessage);
        } else if (errorMessage === "Username already taken") {
          setNameErr(errorMessage);
        } else {
          // Handle other errors
          // For example, display a generic error message
          setNameErr("An error occurred. Please try again.");
        }
      });
  };

  return (
    <section>
      <div className="form-box">
        <div className="form-value">
          <form id="sign" name="contactForm" onSubmit={validateForm}>
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
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <p className="error">{nameErr}</p>
            <div className="inputbox">
              <input
                type="text"
                name="email"
                autoComplete="off"
                placeholder="Enter Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <p className="error">{emailErr}</p>
            <div className="inputbox">
              <input
                type="password"
                name="password"
                autoComplete="off"
                placeholder="Enter a password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <p className="error">{passwordErr}</p>
            <div className="inputbox">
              <input
                type="password"
                name="re_password"
                autoComplete="off"
                placeholder="Re-enter the password"
                onChange={(e) => setRepassword(e.target.value)}
              />
            </div>
            <p className="error">{re_passwordErr}</p>
            <div className="inputbox">
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
            />
          </div>
          {imageErr && <p className="error">{imageErr}</p>}
            <button type="submit" className="sign">Sign Up</button>
            <div>
              <p>
                Already have an account?<span id="span"><NavLink to="/login">Sign In</NavLink></span>
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

export default SignUp;
