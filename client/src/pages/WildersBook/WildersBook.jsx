import React, { useEffect, useState } from "react";
import axios from "axios";
import Wilder from "../../components/Wilder/Wilder";
import styles from "./WildersBook.module.css";
import Form from "../../components/Form/Form";

function WildersBook() {
  const [wilders, setWilders] = useState([]);

  const fetchData = async () => {
    const wildersFromDB = await axios.get("http://localhost:5000/api/wilder");

    setWilders(wildersFromDB.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div id={styles.wilderBookContainer}>
      <Form fetchData={fetchData} />

      <section>
        <h2>Wilders</h2>

        <div className={styles.WildersBookCardRow}>
          {wilders.map((wilder) => (
            <Wilder
              key={wilder.id}
              id={wilder.id}
              name={wilder.name}
              city={wilder.city}
              skills={wilder.skills}
              setWilders={setWilders}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default WildersBook;
