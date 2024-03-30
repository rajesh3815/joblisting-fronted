import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { CiCalendar } from "react-icons/ci";
import { jobpostDetails } from "../../api/Jobpoast";
import "./DetailsJob.css";
const DetailsJob = () => {
  const [jobdetails, setJobdetails] = useState({});
  const nav = useNavigate();
  const { id } = useParams();
  const [isLogedin] = useState(localStorage.getItem("token"));

  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = async () => {
    if (!id) return;
    const data = await jobpostDetails(id);
    // console.log(jobdetails?.userName.split(" ")[0]);

    setJobdetails({ ...data.data, isEditable: data.flag });
  };

  const handelLogout = () => {
    localStorage.clear("token");
    nav("/login");
  };

  return (
    jobdetails && (
      <>
        <nav className="navbar">
          <p className="navbar__logo">Jobfinder</p>
          <div className="job_name" style={{  fontWeight: "bold",fontSize:"19px" }}>
            {jobdetails?.isEditable ? `  Hi ,${jobdetails?.userName.split(" ")[0]} check your job` : ""}
          </div>
          <div className="navbar__inner">
            {!isLogedin ? (
              <>
                <button
                  onClick={() => nav("/login")}
                  style={{ backgroundColor: "#ff6e6e" }}
                >
                  Login
                </button>
                <button
                  onClick={() => nav("/signup")}
                  style={{ backgroundColor: "white", color: "#ff6e6e" }}
                >
                  Register
                </button>
              </>
            ) : (
              <button
                onClick={handelLogout}
                style={{ backgroundColor: "#ff6e6e" }}
              >
                Logout
              </button>
            )}
          </div>
        </nav>
        <div>
          <div className="jobdetails--heading">
            <p>{`${jobdetails?.title}  ${jobdetails?.jobType} at ${jobdetails?.companyName}`}</p>
          </div>
          <div className="jd__details">
            <p>
              {" "}
              <span>1w ago</span> .{jobdetails?.jobType}
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <p className="subheading">{jobdetails?.title}</p>
              {isLogedin && jobdetails?.isEditable ? (
                <button
                  onClick={() =>
                    nav("/job-post", {
                      state: { jobDetails: jobdetails, flagEdit: true },
                    })
                  }
                  className="edit--btn"
                >
                  Edit job
                </button>
              ) : (
                ""
              )}
            </div>

            <p className="jobdetails--location">{jobdetails?.location}|India</p>
            <div className="jd__details--wages">
              <div className="wages--div">
                <p>
                  <FaMoneyCheckAlt /> Stipend
                </p>
                <p style={{ color: "#595959" }}>
                  Rs {jobdetails?.sallary}/year
                </p>
              </div>
              <div className="wages--div">
                <p>
                  <CiCalendar /> Duration
                </p>
                <p style={{ color: "#595959" }}>{jobdetails?.duration}</p>
              </div>
            </div>
            <p className="about--heading">About Company</p>
            <p
              style={{
                lineHeight: "1.6rem",
                color: "#595959",
              }}
            >
              {jobdetails?.aboutCompany}
            </p>
            <p className="about--heading">About the job/internship</p>
            <p
              style={{
                lineHeight: "1.6rem",
                color: "#595959",
              }}
            >
              {jobdetails?.description}
            </p>
            <div>
              <p className="about--heading">{`Skill(s) required`}</p>
              <div className="require--skill">
                {jobdetails?.skills?.map((el, idx) => {
                  return (
                    <span key={idx} className="skill--span">
                      {el}
                    </span>
                  );
                })}
              </div>
            </div>
            <p className="about--heading">Additional Information</p>
            <p
              style={{
                lineHeight: "1.6rem",
                color: "#595959",
              }}
            >
              {jobdetails?.additionalInfo}
            </p>
          </div>
        </div>
      </>
    )
  );
};

export default DetailsJob;
