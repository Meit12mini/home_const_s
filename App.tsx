
import React  from 'react';
import { Routes, Route } from "react-router-dom";
import HomePage from "./src/pages/HomePage";
import DirectPage from "./src/pages/DirectPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/direct" element={<DirectPage />} />
    </Routes>
  );
}

export default App;