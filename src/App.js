import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Notestate from "./context/notes/NoteState";
import Alert from "./components/Alert";
function App() {
  return (
    <>
      <Notestate>
        <Router>
          <Navbar/>
          <Alert message="This is Amazing"/>
          <div className="container my-3">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/about" element={<About />} />
            </Routes>
          </div>
        </Router>
      </Notestate>
    </>
  );
}

export default App;
