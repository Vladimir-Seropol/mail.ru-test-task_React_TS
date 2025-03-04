import React from "react";
import { useLocation, Link } from "react-router-dom"; 
import style from "./VictoryPage.module.css";

interface VictoryPageProps {
  roundTimes: number[];
  usedWords: string[];
}

const VictoryPage: React.FC = () => {
  const location = useLocation();
  const state = location.state as VictoryPageProps | undefined;

  const roundTimes = state?.roundTimes ?? [];
  const usedWords = state?.usedWords ?? [];

  const hasData = roundTimes.length > 0 && usedWords.length > 0;

  const totalSeconds = roundTimes.reduce((acc, time) => acc + time, 0);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return (
    <div className={style.container}>
      <img src="./Correct.png" alt="Победа!" />
      <h1 className={style.title}>Победа!</h1>
      <p className={style.time}>Вы справились за {minutes} минут {seconds} секунд</p>
      
      {hasData ? (
        <table>
          <thead>
            <tr>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {roundTimes.map((time, index) => (
              <tr key={index}>
                <td>{usedWords[index]}</td>
                <td>{time} сек</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Нет данных о прохождении. Попробуйте снова!</p>
      )}

      <Link to="/">
        <button className={style.button}>
          Играть еще
        </button>
      </Link>
    </div>
  );
};

export default VictoryPage;
