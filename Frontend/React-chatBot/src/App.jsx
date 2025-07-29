import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

import Sidebar from "./components/Sidebar";
import ChatBot from "./pages/ChatBot";

function App() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/chatbot" element={<ChatBot />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
