import { Link } from "react-router-dom";
import styles from "./Navbar.module.scss";

const Navbar = () => {
  return (
    <div className={styles["navigation-bar"]}>
      <Link to="/" activeStyle>Home</Link>
      <Link to="/chat">Chat</Link>
      <Link to="/assistant">Assistant</Link>
    </div>
  );
};

export default Navbar;
