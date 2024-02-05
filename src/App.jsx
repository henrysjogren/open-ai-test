import styles from "./App.module.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages";
import Chat from "./Pages/Chat";
import Assistant from "./Pages/Assistant";

function App() {
  return (
    <Router>
      <div className={styles.App}>
        <header className={styles["App-header"]}></header>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/chat" element={<Chat />}/>
          <Route exact path="/assistant" element={<Assistant />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
