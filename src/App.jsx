import styles from "./App.module.scss";
import { useState } from "react";
import AiComponent from "./Components/AiComponent/AiComponent";
import Output from "./Components/Output/Output";

function App() {
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  
  const getOutput = (data) => {
    setOutput(output => output + data)
  };
  return (
    <div className={styles.App}>
      <header className={styles["App-header"]}></header>
      <div className={styles["main-area"]}>
        <AiComponent getOutput={getOutput} setLoading={setIsLoading} emptyOutput={setOutput}/>
        <Output data={output} loading={isLoading}/>
      </div>
    </div>
  );
}

export default App;
