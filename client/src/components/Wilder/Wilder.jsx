import axios from "axios";
import React from "react";
import profilePic from "../../assets/pic_profile_wilder.png";
import Skills from "../Skills/Skills";
import styles from "./Wilder.module.css";
import PropTypes from "prop-types";

function Wilder({ id, name, city, skills, setWilders }) {
  const handleDeleteWilder = () => {
    axios
      .delete(`http://localhost:5000/api/wilder`, { data: { id } })
      .then(() => {
        setWilders((prevWilder) => prevWilder.filter((wilder) => wilder.id !== id));
      })
      .catch((err) => console.log("Error while deleting:", err));
  };

  return (
    <div className={styles.wilderCard} key={id + name}>
      <img src={profilePic} alt="wilder profile pic" />

      <section>
        <h3 className={styles.name}>{name}</h3>

        <p className={styles.description}>{city}</p>

        <div className={styles.skills}>
          <Skills skills={skills} />
        </div>
      </section>

      <button className={styles.deleteWilder} onClick={handleDeleteWilder}>
        Delete wilder
      </button>
    </div>
  );
}

export default Wilder;

Wilder.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  city: PropTypes.string,
  skills: PropTypes.array,
  setWilders: PropTypes.func,
};
