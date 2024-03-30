import React, { useEffect, useState } from "react";
import Styles from "./Home.module.css";
import { DEFAULT_SKILLs } from "../../utils/Constants";
import { getAlljobs, jobpost } from "../../api/Jobpoast";
import { useNavigate } from "react-router-dom";
import { FcSearch } from "react-icons/fc";
import { FaPeopleCarry } from "react-icons/fa";
import logo from "../../assets/emojione-v1_flag-for-india.svg";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Home = () => {
  const [allJob, setAlljob] = useState({});
  const [skills, setSkills] = useState([]);
  const [title, setTitle] = useState("");
  const [isLogedin] = useState(localStorage.getItem("token"));
  const nav = useNavigate();
  useEffect(() => {
    getJobs();
  }, [title, skills]);
  const handelLogout = () => {
    localStorage.clear("token");
    nav("/login");
  };
  const addSkills = (e) => {
    const skill = e.target.value;
    console.log(skill);
    const duplicacySkill = skills.filter((el) => el === skill);
    if (!duplicacySkill.length) {
      setSkills((prev) => [...prev, skill]);
    }
    console.log(skills);
  };
  const deleteSkill = (element) => {
    const newSkills = skills.filter((el) => el !== element);
    setSkills(() => [...newSkills]);
  };
  const filterApply = async () => {
    const jobs = await getAlljobs(title, skills);
    setAlljob(() => [...jobs.data]);
    toast.success("👏Applied Successfully", {
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
  };
  const clearJob = () => {
    setSkills(() => []);
    setTitle("");
    getJobs();
    toast.success("👏Cleared Successfully", {
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
  };
  const getJobs = async () => {
    const response = await getAlljobs(title, skills);
    setAlljob(() => [...response.data]);
    console.log(allJob?.userName);
    //  setAlljob(response.data)
    // console.log(allJob.length);
  };
  const handelAddjob = () => {
    nav("/job-post");
  };

  return (
    <>
      <nav>
        <nav className={Styles.navbar}>
          <p className={Styles.navbar__logo}>Jobfinder</p>
          <div className={Styles.navbar__inner}>
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
              <>
                <button
                  onClick={handelAddjob}
                  style={{ backgroundColor: "#ff1818", marginLeft: "10px" }}
                >
                  +Addjob
                </button>
                <button
                  onClick={handelLogout}
                  style={{ backgroundColor: "#ff6e6e" }}
                >
                  Logout
                </button>
              </>
            )}
            {/* {allJob?.userName} */}
            
          </div>
        </nav>
      </nav>
      <div className={Styles.jobSearchDiv}>
        <div className={Styles.searchInput}>
          <FcSearch />
          <input
            className={Styles.inputs}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Type any job title"
          />
        </div>
        <div className={Styles.jobSearchDivFooter}>
          <div className={Styles.skillGroup} style={{ margin: "0.2rem 0" }}>
            <select
              style={{ height: "2rem" }}
              name="skills"
              className={Styles.select}
              type="text"
              onChange={addSkills}
            >
              <option style={{ fontSize: "18px" }} value="" disabled selected>
                Skills
              </option>
              {DEFAULT_SKILLs.map((element, idx) => (
                <option key={idx} value={element}>
                  {element}
                </option>
              ))}
            </select>
            <div className={Styles.skills}>
              {skills?.map((element, index) => {
                return (
                  <div key={index} className={Styles.skillChip}>
                    <p>{element}</p>
                    <button onClick={() => deleteSkill(element)}>
                      {" "}
                      <span className={Styles.spanx}>x</span>{" "}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          <button onClick={filterApply} className={Styles.filterBtn}>
            Apply Filter
          </button>
          <p className={Styles.clear} onClick={clearJob}>
            clear
          </p>
        </div>
      </div>
      <div className={Styles.allJobs}>
        {allJob.length > 0 &&
          allJob?.map((job, index) => {
            return (
              <div key={index} className={Styles.container}>
                <div className={Styles.containerLeft}>
                  <div className={Styles.containerLeftHead}>
                    <img
                      style={{
                        height: "65px",
                        width: "85px",
                        borderRadius: "10px",
                        boxShadow:
                          " rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
                      }}
                      src={job?.logoUrl}
                      alt=""
                    />
                    <div className={Styles.containerDetailLeft}>
                      <p className={Styles.jobTitle}>{job?.title}</p>
                      <div className={Styles.detailChip}>
                        <p>
                          <FaPeopleCarry /> 100-200
                        </p>
                        <p className={Styles.jobsallary}>💵{job.sallary}</p>
                        <p className={Styles.joblocation}>
                          {" "}
                          <img src={logo} alt="" /> &nbsp; {job?.location}
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className={Styles.spnlocation}
                    
                  >
                    <span>{job?.locationType}</span> &nbsp; &nbsp; &nbsp; &nbsp;
                    <span>{job?.jobType}</span>
                  </p>
                </div>
                <div className={Styles.containerRight}>
                  <div className={Styles.skillDetail}>
                    {job?.skills?.map((element, index) => {
                      return (
                        <div
                          style={{ borderRadius: "10px" }}
                          key={index}
                          className={Styles.skillChip}
                        >
                          <p>{element}</p>
                        </div>
                      );
                    })}
                  </div>
                  <button
                    onClick={() => nav(`/job-details/${job._id}`)}
                    className={Styles.viewDetailsBtn}
                  >
                    View details
                  </button>
                </div>
              </div>
            );
          })}
        <ToastContainer />
      </div>
    </>
  );
};

export default Home;
