import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Login  from "./components/Login";
import Signup from "./components/Signup";
import Notestate from "./context/notes/NoteState";
import Alert from "./components/Alert";
import {useState} from "react";
function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
        setAlert(null);
    }, 1500);
}

  return (
    <>
      <Notestate>
        <Router>
          <Navbar/>
          <Alert alert={alert}/>
          <div className="container my-3">
            <Routes>
              <Route exact path="/inotebook" element={<Home showAlert={showAlert}/>} />
              <Route exact path="/inotebook/about" element={<About />} />
              <Route exact path="/inotebook/login" element={<Login showAlert={showAlert}/>} />
              <Route exact path="/inotebook/signup" element={<Signup showAlert={showAlert}/>} />
            </Routes>
          </div>
        </Router>
      </Notestate>
    </>
  );
}

export default App;
