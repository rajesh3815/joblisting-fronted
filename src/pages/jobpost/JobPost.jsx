import React from "react";
import Jobform from "../../components/jobpost/Jobform";
import jobpostimg from '../../assets/jobpostImg.png'
import './jobpost.css'
const JobPost = () => {
  return (
    <div className="container--page">
      
      <Jobform />
      <img src={jobpostimg} className="job-post--image" alt="" />
    </div>
  );
};

export default JobPost;
