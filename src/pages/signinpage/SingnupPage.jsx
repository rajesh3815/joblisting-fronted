import React, { useState } from "react";
import "./signup.css";
import heroimage from "../../assets/heroimage.png";
import { useNavigate } from "react-router-dom";
import { signupAuth } from "../../auth/auth";
import { ToastContainer, toast,Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const SingnupPage = () => {
  const nav = useNavigate();
  const [formData, setformData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const handleSubmit =  (event) => {
    event.preventDefault();
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.phone
    ) {
      toast.warn("All fields are required", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      return;
    }
     signupAuth(formData);
     nav('/login')
  };
  const handleInputChange = (event) => {
    event.preventDefault();

    const { name, value } = event.target;
    setformData((values) => ({
      ...values,
      [name]: value,
    }));
  };
  return (
    <div className="containerSignup">
      <div className="form-containerSignup">
        <div className="innerform">
          <h1 className="head">Create an account</h1>
          <p style={{ marginTop: "7px", marginBottom: "1rem" }}>
            Your personal job finder is here
          </p>
          <form className="forms">
            <input
              className="form-field"
              type="text"
              placeholder="First Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />

            {/* {!values.firstName && (
            <span id="first-name-error">Please enter a first name</span>
          )} */}

            <input
              className="form-field"
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />

            <input
              className="form-field"
              type="text"
              placeholder="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
            />
            <input
              className="form-field"
              type="password"
              placeholder="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
            <label style={{ marginTop: "7px" }}>
              <input style={{ marginRight: ".5rem" }} type="checkbox" />
              By creating an account, I agree to our terms of use and privacy
              policy
            </label>
          </form>

          <button
            onClick={handleSubmit}
            className="button-82-pushable"
            role="button"
          >
            <span className="button-82-shadow"></span>
            <span className="button-82-edge"></span>
            <span className="button-82-front text">Sign Up</span>
          </button>
          <p style={{ marginTop: "1rem" }}>
            Already have an account?{" "}
            <span
              onClick={() => nav("/login")}
              style={{
                textDecoration: "underLine",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Sign In
            </span>
          </p>
          <button className={"btnHome"} style={{}} onClick={()=>nav('/')}>Home</button>
        </div>
      </div>

      <img className="heroImage" src={heroimage} alt="image" />
      <ToastContainer />
    </div>
  );
};

export default SingnupPage;
