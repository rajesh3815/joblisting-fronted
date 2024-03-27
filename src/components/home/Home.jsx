import React, { useEffect, useState } from "react";
import Styles from "./Home.module.css";
import { DEFAULT_SKILLs } from "../../utils/Constants";
import { getAlljobs } from "../../api/Jobpoast";
import { useNavigate } from "react-router-dom";
import { FcSearch } from "react-icons/fc";

const Home = () => {
  const [allJob, setAlljob] = useState({});
  const [skills, setSkills] = useState([]);
  const [title, setTitle] = useState("");
  const [isLogedin] = useState(localStorage.getItem("token"));
  const nav = useNavigate();
  useEffect(() => {
    getJobs();
  }, []);
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
    setSkills([...newSkills]);
  };
  const filterApply = () => {};
  const clearJob = () => {
    setSkills([]);
    setTitle("");
  };
  const getJobs = async () => {
    const response = await getAlljobs();
    setAlljob([...response.data]);
      //  setAlljob(response.data)
    console.log( allJob.length);
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
              <button
                onClick={handelLogout}
                style={{ backgroundColor: "#ff6e6e" }}
              >
                Logout
              </button>
            )}
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
                    <img src={job.logoUrl} alt="" />
                    <div className={Styles.containerDetailLeft}></div>
                  </div>
                  <p>
                    <span></span> <span></span>
                  </p>
                </div>
                <div className={Styles.containerRight}></div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Home;
