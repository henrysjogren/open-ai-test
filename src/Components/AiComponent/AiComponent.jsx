import styles from "./AiComponent.module.scss";
import OpenAI from "openai";

const AiComponent = ({ getOutput, setLoading, emptyOutput }) => {
  const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const sendMessage = async (event) => {
    emptyOutput("")
    event.preventDefault();
    getOutput("")
    const message = event.target[0].value;
    try {
      const stream = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
        stream: true,
      });
      for await (const chunk of stream) {
        getOutput(chunk.choices[0]?.delta?.content || "")
      }
      setLoading(false)
    } catch (e) {
      if (e.status === 429) {
        alert("You have exceeded you OpenAI quota");
      }
    }
  };
  return (
    <div className={styles["main-content"]}>
      <h2>Generic Ai Component</h2>
      <form className={styles["input-container"]} onSubmit={sendMessage}>
        <input type="text" placeholder="Ask AI" min={1} max={10}></input>
        <button type="submit">Ask away</button>
      </form>
    </div>
  );
};

export default AiComponent;
