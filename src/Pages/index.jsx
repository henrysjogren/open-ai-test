import React from "react";
import styles from "../App.module.scss";
import poster from "../Assets/ai-pizza.png"
 
const Home = () => {
    return (
        <div className={styles["main-area"]}>
            <h1>AI?</h1>
            <img src={poster}/>
        </div>
    );
};
 
export default Home;