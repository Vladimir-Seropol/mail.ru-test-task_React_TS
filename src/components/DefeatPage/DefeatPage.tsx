import React from "react";
import { Link, useLocation } from "react-router-dom";
import style from "./DefeatPage.module.css";

interface DefeatPageProps {
  roundTimes: number[];
  usedWords: string[];
}

const DefeatPage: React.FC = () => {
  const location = useLocation();
  const state = location.state as DefeatPageProps | undefined;


  const roundTimes = state?.roundTimes ?? [];
  const usedWords = state?.usedWords ?? [];

  return (
    <div className={style.container}>
      <img src="./Mood_bad.png" alt="Поражение" />
      <h1 className={style.title}>Время истекло :(</h1>
      {roundTimes.length > 0 && usedWords.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Слово</th>
              <th>Время (сек)</th>
            </tr>
          </thead>
          <tbody>
  {usedWords.map((word, index) => (
    <tr key={index}>
      <td>{word}</td>
      <td>{roundTimes[index] !== undefined ? `${roundTimes[index]} сек` : "Не угадано"}</td>
    </tr>
  ))}
</tbody>
        </table>
      ) : (
        <p>Нет данных о прохождении.</p>
      )}
      <Link to="/">
        <button className={style.button}>
          Вернуться к выбору раундов
        </button>
      </Link>
    </div>
  );
};

export default DefeatPage;
