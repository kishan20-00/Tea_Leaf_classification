import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './screens/login';
import Signup from './screens/signup';
import Profile from './screens/profile';
import Soil from "./screens/soilPredict";
import Leaf from "./screens/leafPredict";
import Home from "./screens/home";

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/soil" element={<Soil />} />
          <Route path="/home" element={<Home />} />
          <Route path="/leaf" element={<Leaf />} />
        </Routes>
    </Router>
  );
}

export default App;
