import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./GameSetup.module.css";

const GameSetup: React.FC = () => {
  const [rounds, setRounds] = useState<number | null>(null); 
  const navigate = useNavigate();

 
  const handleRoundsChange = (rounds: number) => {
    setRounds(rounds);
  };


  const handleStartGame = () => {
    if (rounds !== null) {
    
      navigate(`/game?rounds=${rounds}`);
    }
  };

  return (
    <div className={style.container}>
      <h1>Выберите количество раундов</h1>
      <div className={style.buttons}>
        <button className={style.button} onClick={() => handleRoundsChange(3)}>3</button>
        <button className={style.button} onClick={() => handleRoundsChange(5)}>5</button>
        <button className={style.button} onClick={() => handleRoundsChange(10)}>10</button>
      </div>
      <button className={style.buttonPlay} onClick={handleStartGame} disabled={rounds === null}>
        Играть
      </button>
    </div>
  );
};

export default GameSetup;
