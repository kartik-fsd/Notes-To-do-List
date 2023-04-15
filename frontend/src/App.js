import "./App.css";
import React ,{useState}from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Notes_Navbar";
import About from "./components/Notes_About";
import Home from "./components/Note_Home";
import NoteState from "./Context/notes/NoteState";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Alert from "./components/alert";
//import './App.css';
function App() {
  const[alert,setalert] = useState(null);
  const showAlert = (message, type)=>{
    setalert({
      msg: message,
      type: type
    })
    setTimeout(() => {
        setalert(null);
    }, 1500);
}
  return (
<NoteState>
    <Router>
        <Navbar />
        <Alert alert={alert} />
        <div className="container">
       <Routes>
          <Route exact path="/" element={<Home showAlert={showAlert}/>} />
          <Route exact path="/About" element={<About showAlert={showAlert}/>} />
          <Route exact path="/login" element={<Login showAlert={showAlert}/>} />
          <Route exact path="/signup" element={<SignUp showAlert={showAlert}/>} />
        </Routes>
      </div>
    </Router>
    </NoteState>
  );
}

export default App;
