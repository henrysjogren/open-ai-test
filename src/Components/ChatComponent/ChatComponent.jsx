import styles from "./ChatComponent.module.scss";
import openAiInstance from "../../utils/helpers/openai";

const ChatComponent = ({ getOutput, setLoading, emptyOutput }) => {

  const sendMessage = async (event) => {
    emptyOutput("")
    event.preventDefault();
    getOutput("")
    const message = event.target[0].value;
    try {
      const stream = await openAiInstance.chat.completions.create({
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
        <input type="text" placeholder="Ask AI" aria-label="Ask"></input>
        <button type="submit">Ask away</button>
      </form>
    </div>
  );
};

export default ChatComponent;
