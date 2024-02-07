import styles from "../App.module.scss";
import AssistantComponent from "../Components/AssistantComponent/AssistantComponent";

const Assistant = () => {
  return (
    <div className={styles["main-area"]}>
      <AssistantComponent />
    </div>
  );
};

export default Assistant;
