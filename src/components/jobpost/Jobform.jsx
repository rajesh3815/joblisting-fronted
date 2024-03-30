import React, { useState } from "react";
import "./jobform.css";
import { DEFAULT_SKILLs } from "../../utils/Constants";
import { editJobDetails, jobpost } from "../../api/Jobpoast";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Jobform = () => {
  const { state } = useLocation();
  const nav = useNavigate();
  console.log(state);
  const [formData, setFormData] = useState({
    companyName: "" || state?.jobDetails?.companyName,
    title: "" || state?.jobDetails?.title,
    description: "" || state?.jobDetails?.description,
    logoUrl: "" || state?.jobDetails?.logoUrl,
    location: "" || state?.jobDetails?.location,
    duration: "" || state?.jobDetails?.duration,
    locationType: "" || state?.jobDetails?.locationType,
    skills: state?.jobDetails?.skills || [],
    sallary: "" || state?.jobDetails?.sallary,
    jobType: "" || state?.jobDetails?.jobType,
    aboutCompany: "" || state?.jobDetails?.aboutCompany,
    additionalInfo: "" || state?.jobDetails?.additionalInfo,
  });

  const handelChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const addSkills = (e) => {
    const skill = e.target.value;
    const duplicacyCheck = formData.skills.filter((el) => el === skill);
    if (!duplicacyCheck.length) {
      setFormData({ ...formData, skills: [...formData.skills, skill] });
    }
  };
  const deleteSkill = (element) => {
    const newSkills = formData.skills.filter((el) => el !== element);
    setFormData({ ...formData, skills: newSkills });
  };
  const submitHandeler = async () => {
    if (
      !formData.companyName ||
      !formData.title ||
      !formData.description ||
      !formData.logoUrl ||
      !formData.location ||
      !formData.duration ||
      !formData.locationType ||
      !formData.skills ||
      !formData.sallary ||
      !formData.jobType ||
      !formData.aboutCompany ||
      !formData.additionalInfo
    ) {
      toast.warn(' All fields are required!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        });
      return;
    }
    if (state?.flagEdit) {
      await editJobDetails(state?.jobDetails?._id, formData);
      nav("/");
      return;
    }
    await jobpost(formData);
  };
  const hadelCancel = () => {
    nav("/");
  };
  return (
    <div className="container">
      <div className="inner__container">
        <div className="heading">
          <p>Add job description</p>
        </div>
        <div className="inner__container--div">
          <div className="formGroup">
            <label htmlFor="company Name" className="label">
              {" "}
              Company Name
            </label>
            <input
              className="input"
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handelChange}
              placeholder="Enter company name"
            />
          </div>
          <div className="formGroup">
            <div>
              <label htmlFor="logoUrl" className="label">
                {" "}
                Add logo URL
              </label>
            </div>
            <input
              className="input"
              type="text"
              name="logoUrl"
              value={formData.logoUrl}
              onChange={handelChange}
              placeholder="Enter the link"
            />
          </div>
        </div>
        <div className="inner__container--div">
          <div className="formGroup">
            <label htmlFor="title" className="label">
              {" "}
              Job position
            </label>
            <input
              className="input"
              type="text"
              name="title"
              value={formData.title}
              onChange={handelChange}
              placeholder="Enter job position"
            />
          </div>
          <div className="formGroup">
            <label htmlFor="Monthly salary" className="label">
              {" "}
              Monthly salary
            </label>
            <input
              className="input"
              type="text"
              name="sallary"
              value={formData.sallary}
              onChange={handelChange}
              placeholder="Enter Monthly salary"
            />
          </div>
        </div>
        <div className="inner__container--div">
          <div className="skill__container">
            <div className="skillGroup" style={{ margin: "0.2rem 0" }}>
              <label htmlFor="locationType" className="label">
                {" "}
                Skills Required
              </label>
              <select
                style={{ height: "2rem" }}
                name="skills"
                className="input"
                type="text"
                onChange={addSkills}
              >
                <option value="" disabled selected>
                  Enter the must have skills
                </option>
                {DEFAULT_SKILLs.map((element, idx) => (
                  <option key={idx} value={element}>
                    {element}
                  </option>
                ))}
              </select>
            </div>
            <div className="skillsdiv">
              <div className="skillsdiv__inner">
                {formData?.skills?.map((element, index) => {
                  return (
                    <div key={index} className="skill">
                      <p>{element}</p>
                      <button onClick={() => deleteSkill(element)}>X</button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="formGroup">
            <label htmlFor="Duration" className="label">
              {" "}
              Duration
            </label>
            <input
              className="input"
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handelChange}
              placeholder="Enter the Notice period"
            />
          </div>
        </div>
        <div className="inner__container--div">
          <div className="selectGroup">
            <label htmlFor="location" className="label">
              {" "}
              Location
            </label>
            <select
              name="location"
              value={formData.location}
              className="select"
              onChange={handelChange}
            >
              <option value="" disabled selected>
                Select Location Type
              </option>
              <option value="Banglore">Banglore</option>
              <option value="Delhi">Delhi</option>
              <option value="Mumbai">Mumbai</option>
            </select>
          </div>
          <div className="selectGroup">
            <label htmlFor="locationType" className="label">
              {" "}
              Work Type
            </label>
            <select
              name="locationType"
              value={formData.locationType}
              className="select"
              onChange={handelChange}
            >
              <option value="" disabled defaultValue="workType">
                locationType
              </option>
              <option value="Remote">Remote</option>
              <option value="OffLine">Offline</option>
            </select>
          </div>
        </div>
        <div className=" inner__container--div ">
          <div style={{ gap: "0" }} className="formGroup">
            <label htmlFor="about" className="label">
              {" "}
              Additional Information
            </label>
            <textarea
              style={{ height: "5rem", width: "80%" }}
              className="input text--none"
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handelChange}
              placeholder="Enter the additional information"
            />
          </div>
          <div className="selectGroup">
            <label htmlFor="location" className="label">
              {" "}
              Job Type
            </label>
            <select
              name="jobType"
              value={formData.jobType}
              className="select"
              onChange={handelChange}
            >
              <option value="" disabled defaultValue="Select job Type">
                Select job Type
              </option>
              <option value="FullTime">FullTime</option>
              <option value=" Internship">Internship</option>
              <option value="PartTime">PartTime</option>
            </select>
          </div>
        </div>
        <div className="formGroup--full">
          <label htmlFor="description" className="label">
            {" "}
            Job description
          </label>
          <textarea
            style={{ height: "4rem", width: "98%" }}
            className="input text--none"
            name="description"
            value={formData.description}
            onChange={handelChange}
            placeholder="Type about your  Job description"
          />
        </div>
        <div className="formGroup--full">
          <label htmlFor="about" className="label">
            {" "}
            About Company
          </label>
          <textarea
            style={{ height: "4rem", width: "98%" }}
            className="input text--none"
            name="aboutCompany"
            value={formData.aboutCompany}
            onChange={handelChange}
            placeholder="Type about your company"
          />
        </div>

        <div className="form--btns">
          {" "}
          <button className="btn--cancel" onClick={hadelCancel}>
            Cancel
          </button>{" "}
          <button className="btn--add" onClick={submitHandeler}>
            {state?.flagEdit ? "Edit Job" : "+Add job"}
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Jobform;
