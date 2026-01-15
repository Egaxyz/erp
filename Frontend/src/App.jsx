import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/Login";

import "./App.css";
import Testing from "./components/test";

function App() {
  return (
    <>
      <div className="min-h-screen bg-primary text-black flex items-center justify-center">
        <Routes>
          <Route path="/" element={<Dashboard />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
