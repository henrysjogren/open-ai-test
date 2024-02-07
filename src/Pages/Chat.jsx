import ChatComponent from "../Components/ChatComponent/ChatComponent";
import Output from "../Components/Output/Output";
import { useState } from "react";
import styles from "../App.module.scss";

const Chat = () => {
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getOutput = (data) => {
    setOutput((output) => output + data);
  };
  return (
    <div className={styles["main-area"]}>
      <ChatComponent
        getOutput={getOutput}
        setLoading={setIsLoading}
        emptyOutput={setOutput}
      />
      <Output data={output} loading={isLoading} />
    </div>
  );
};

export default Chat