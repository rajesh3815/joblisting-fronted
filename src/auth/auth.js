import axios from "axios";

export const signupAuth = async ({ name, email, password, phone }) => {
  try {
    const response = await axios.post(
      "http://localhost:4000/api/v1/auth/register/",
      {
        name,
        email,
        password,
        phone,
      }
    );
    console.log(response);
  } catch (error) {
    console.error("Error occurred during signup:", error);
    throw error; // Re-throw the error for the caller to handle
  }
};

export const signinAuth = async ({ email, password }) => {
  try {
    const response = await axios.post(
      "http://localhost:4000/api/v1/auth/login/",
      {
        email,
        password,
      }
    );
    localStorage.setItem("token",response.data.token)
    alert(response.data.message+'👌');
  } catch (error) {
    console.error("Error occurred during signup:", error);
    
  }
};
