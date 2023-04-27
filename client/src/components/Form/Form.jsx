import React, { useState } from "react";
import axios from "axios";
import styles from "./Form.module.css";

function Form({ fetchData }) {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");

  const handleNameChange = (name) => {
    setName(name);
  };

  const handleCityChange = (city) => {
    setCity(city);
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:5000/api/wilder", { name, city });
    await fetchData();

    setName("");
    setCity("");
  };

  return (
    <div className={styles.addWilder}>
      <h3>Add a wilder</h3>

      <form method="post" onSubmit={onFormSubmit}>
        <section>
          <label className="wilder-name">
            <p>Name</p>
            <input
              type="text"
              value={name ? name : ""}
              onChange={(e) => handleNameChange(e.currentTarget.value)}
              placeholder="John Doe"
            />
          </label>
        </section>

        <section>
          <label className="wilder-city">
            <p>City</p>
            <input
              type="text"
              value={city ? city : ""}
              onChange={(e) => handleCityChange(e.currentTarget.value)}
              placeholder="New York"
            />
          </label>
        </section>

        <input className="addWilderButton" type="submit" value="Add wilder" />
      </form>
    </div>
  );
}

export default Form;
