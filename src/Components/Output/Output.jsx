import styles from "./Output.module.scss";
import React, { useState } from "react";

const Output = ({ data, loading }) => {
  const [outputData, setOutputData] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    setIsLoading(loading);
  }, [loading]);
  
  React.useEffect(() => {
    setOutputData(data);
  }, [data]);

  return (
    <div className={styles["output-area"]}>
      {isLoading && <div className={styles["loader"]}></div>}
      <p className={styles["output-text"]}>{outputData}</p>
    </div>
  );
};

export default Output;
