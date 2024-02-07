import openAiInstance from "../../utils/helpers/openai";
import styles from "./AssistantComponent.module.scss";
import { useState } from "react";

const AssistantComponent = () => {
  const [activeConversation, setActiveConversation] = useState(false);
  const [thread, setThread] = useState();
  const [assistant, setAssistant] = useState();
  const [messageHistory, setMessageHistory] = useState([]);
  const [polling, setPolling] = useState(false);

  async function createAssistant() {
    setActiveConversation(true);
    const openAiAssistant = await openAiInstance.beta.assistants.retrieve(
      process.env.REACT_APP_ASSISTANT_ID
    );
    setAssistant(openAiAssistant);
    const opanAiThread = await openAiInstance.beta.threads.create();
    setThread(opanAiThread);
    console.log("Created thread:", opanAiThread);
  }

  async function sendMessage(event) {
    event.preventDefault();
    setPolling(true)
    const message = await openAiInstance.beta.threads.messages.create(
      thread.id,
      {
        role: "user",
        content: event.target[0].value,
      }
    );
    event.target[0].value = "";
    const run = await openAiInstance.beta.threads.runs.create(thread.id, {
      assistant_id: assistant.id,
      //instructions: "" //Optional new instructions.
      // These instructions can override the default instructions of the Assistant.
      // But assistant be told to e.g. address the user with a dynamic name
    });
    retrieveRun(run, message);
  }

  async function retrieveRun(run, message) {
    let keepRetrievingRun;
    let allMessages;

    while (run.status === "queued" || run.status === "in_progress") {
      keepRetrievingRun = await openAiInstance.beta.threads.runs.retrieve(
        thread.id,
        run.id
      );
      console.log(`Run status: ${keepRetrievingRun.status}`);
      if (keepRetrievingRun.status === "completed") {
        allMessages = await openAiInstance.beta.threads.messages.list(
          thread.id
        );
        console.log("User: ", message.content[0].text.value);
        console.log("Assistant: ", allMessages.data[0].content[0].text.value);
        break;
      } else if (
        keepRetrievingRun.status === "queued" ||
        keepRetrievingRun.status === "in_progress"
      ) {
        // pass
      } else {
        console.log(`Run status: ${keepRetrievingRun.status}`);
        break;
      }
    }
    setPolling(false)
    setMessageHistory(allMessages.data);
  }

  return (
    <div>
      <h2>AI Assistant</h2>
      {!activeConversation && (
        <button onClick={createAssistant}>Start a conversation</button>
      )}
      <div className={styles["feature-container"]}>
        <div
          className={
            !activeConversation
              ? styles["display-none"]
              : styles["conversation-container"]
          }
        >
          <div className={styles["history-container"]}>
            {polling && <div className={styles.loader}></div>}
            {messageHistory !== null &&
              messageHistory.map((m) => (
                <p
                  key={m.id}
                  className={
                    m.role === "assistant"
                      ? `${styles["chat-message"]} ${styles.left}`
                      : `${styles["chat-message"]} ${styles.right}`
                  }
                >
                  {m.content[0].text.value}
                </p>
              ))}
          </div>
        </div>
        {activeConversation && (
          <form onSubmit={sendMessage}>
            <input
              type="text"
              placeholder="Ask away"
              disabled={polling}
              className={
                !activeConversation
                  ? styles["display-none"]
                  : styles["conversation-input"]
              }
            />
          </form>
        )}
      </div>
    </div>
  );
};

export default AssistantComponent;
