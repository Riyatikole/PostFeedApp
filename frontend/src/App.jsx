import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import NameInput from "./components/NameInput";
import CreatePostPage from "./components/CreatePostPage";
import MainPage from "./components/MainPage";

function App() {
  const [userName, setUserName] = useState(
    localStorage.getItem("userName") || ""
  );

  const handleNameSubmit = (name) => {
    localStorage.setItem("userName", name);
    setUserName(name);
  };

  return (
    <div className="App">
      <Router>
        <div className="app-container">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/create-post" element={<CreatePostPage />} />
          </Routes>

          {!userName && <NameInput onSubmit={handleNameSubmit} />}
        </div>
      </Router>
    </div>
  );
}

export default App;
