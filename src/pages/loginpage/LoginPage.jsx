import React, { useState } from "react";
import "./login.css";
import heroimage from "../../assets/heroimage.png";
import { useNavigate } from "react-router-dom";
import { signinAuth } from "../../auth/auth";
import { ToastContainer, toast,Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const LoginPage = () => {
  const nav = useNavigate();
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.email || !formData.password) {
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
    const datas = await signinAuth(formData);
    if (datas === 400) {
      toast.error("🔑 Wrong password!", {
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
    } else if (datas === 500) {
      toast.error("✉️ Wrong Email!", {
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
    nav("/");
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
    <div className="containerLogin">
      <div className="form-container">
        <div className="innerformLogin">
          <h1 className="head">Create an account</h1>
          <p style={{ marginTop: "7px", marginBottom: "1rem" }}>
            Your personal job finder is here
          </p>
          <form className="forms">
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
              type="password"
              placeholder="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </form>

          <button
            onClick={handleSubmit}
            className="button-82-pushable"
            role="button"
          >
            <span className="button-82-shadow"></span>
            <span className="button-82-edge"></span>
            <span className="button-82-front text">Sign in</span>
          </button>
          <p style={{ marginTop: "1rem" }}>
            Don't have an account?{" "}
            <span
              onClick={() => nav("/signup")}
              style={{
                textDecoration: "underLine",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Sign up
            </span>
          </p>
          <button className={"btnHome"} style={{}} onClick={() => nav("/")}>
            Home
          </button>
        </div>
      </div>

      <img className="heroImage" src={heroimage} alt="image" />
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
