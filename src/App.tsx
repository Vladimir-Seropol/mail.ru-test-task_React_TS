import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GameSetup from "./components/GameSetup/GameSetup";
import Game from "./components/Game/Game";
import VictoryPage from "./components/VictoryPage/VictoryPage";
import DefeatPage from "./components/DefeatPage/DefeatPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GameSetup />} />
        <Route path="/game" element={<Game />} />
        <Route path="/victory" element={<VictoryPage />} />
        <Route path="/defeat" element={<DefeatPage />} />
      </Routes>
    </Router>
  );
};

export default App;
