import React from "react";
import styles from "../App.module.scss";
import poster from "../Assets/ai-pizza.png"
 
const Home = () => {
    return (
        <div className={styles["main-area"]}>
            <h1>AI?</h1>
            <img src={poster} alt={"AI generated pizza and computer screen"}/>
        </div>
    );
};
 
export default Home;