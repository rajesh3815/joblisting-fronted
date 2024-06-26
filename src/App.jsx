import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/loginpage/LoginPage";
import SingnupPage from "./pages/signinpage/SingnupPage";
import JobPost from "./pages/jobpost/JobPost";
import Jobdetails from "./pages/jobdetails/Jobdetails";
import HomePage from "./pages/home/HomePage";
import Notfound from "./pages/notfound/Notfound";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SingnupPage />} />
        <Route path="/job-post" element={<JobPost />} />
        <Route path="/job-details/:id" element={<Jobdetails />} />
        <Route  element={<Notfound />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
