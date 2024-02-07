import { Link } from "react-router-dom";
import styles from "./Navbar.module.scss";

const Navbar = () => {
  return (
    <nav
      className={styles["navigation-bar"]}
      role="navigation"
      aria-labelledby="mainmenulabel"
    >
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/chat">Chat</Link>
        </li>
        <li>
          <Link to="/assistant">Assistant</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
