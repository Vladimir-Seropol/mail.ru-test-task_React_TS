import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import RoundDisplay from "../RoundDisplay/RoundDisplay";
import InputName from "../InputName/InputName";
import TimeDisplay from "../TimeDisplay/TimeDisplay";
import PenaltyMessage from "../PenaltyMessage/PenaltyMessage";
import style from "./Game.module.css";

interface User {
  id: number;
  name: string;
}

const roundDurations: { [key: number]: number } = {
  3: 90,
  5: 150,
  10: 300,
};

const Game: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [rounds, setRounds] = useState<number>(3);
  const [time, setTime] = useState<number | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [currentRound, setCurrentRound] = useState<number>(0);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [inputValues, setInputValues] = useState<string[]>([]);
  const [errorIndexes, setErrorIndexes] = useState<Set<number>>(new Set());
  const [penaltyMessage, setPenaltyMessage] = useState<string | null>(null);
  const [roundTimes, setRoundTimes] = useState<number[]>([]);
  const [usedWords, setUsedWords] = useState<string[]>([]);
  const startTime = useRef<number>(Date.now());

 
  const shuffleArray = (array: unknown[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const roundsFromUrl = queryParams.get("rounds");
    if (roundsFromUrl) {
      setRounds(Number(roundsFromUrl));
    }

    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        const data = await response.json();

       
        const shuffledUsers = [...data];
        shuffleArray(shuffledUsers);
        setUsers(shuffledUsers.slice(0, rounds));

        if (shuffledUsers[0]) {
          setCurrentUser(shuffledUsers[0]);

          const filteredName = shuffledUsers[0].name.replace(/\s/g, "");
          setInputValues(Array(filteredName.length).fill(""));
        }
      } catch (error) {
        console.error("Ошибка при загрузке пользователей:", error);
      }
    };

    fetchUsers();
    setTime(roundDurations[rounds]);
  }, [rounds, location]);

  useEffect(() => {
    if (time !== null && time > 0) {
      const intervalId = setInterval(() => {
        setTime((prevTime) =>
          prevTime !== null ? prevTime - 1 : prevTime
        );
      }, 1000);
      return () => clearInterval(intervalId);
    } else if (time === 0) {
      if (currentRound < rounds - 1) {
        const endTime = Date.now();
        const roundTime = Math.round((endTime - startTime.current) / 1000);
        setRoundTimes((prevTimes) => [...prevTimes, roundTime]);
        navigate("/defeat", {
          state: { roundTimes: [...roundTimes, roundTime], usedWords },
        });
      }
    }
  }, [time, currentRound, rounds, navigate]);

  const handleInputChange = (index: number, value: string) => {
    if (currentUser) {
      const newInputValues = [...inputValues];
      newInputValues[index] = value;
      setInputValues(newInputValues);

      const filteredName = currentUser.name.replace(/\s/g, "");
      const currentChar = filteredName[index].toLowerCase();

      if (value.toLowerCase() !== currentChar) {
        setErrorIndexes((prevIndexes) => new Set(prevIndexes.add(index)));
        setPenaltyMessage("-5 сек");
        setTime((prevTime) =>
          prevTime !== null ? Math.max(0, prevTime - 5) : prevTime
        );
      } else {
        setErrorIndexes((prevIndexes) => {
          const newIndexes = new Set(prevIndexes);
          newIndexes.delete(index);
          return newIndexes;
        });
        setPenaltyMessage(null);
      }
    }
  };

  const handleNextRound = () => {
    const endTime = Date.now();
    const roundTime = Math.round((endTime - startTime.current) / 1000);

    setRoundTimes((prevTimes) => [...prevTimes, roundTime]);

    const updatedUsedWords = [...usedWords, currentUser?.name || ""];

    setUsedWords(updatedUsedWords);

    if (currentRound < rounds - 1) {
      const nextRound = currentRound + 1;
      const nextUser = users[nextRound];

      if (nextUser) {
        setCurrentRound(nextRound);
        setCurrentUser(nextUser);

        const filteredName = nextUser.name.replace(/\s/g, "");
        setInputValues(Array(filteredName.length).fill(""));
        setErrorIndexes(new Set());
        setPenaltyMessage(null);
        startTime.current = Date.now();
      }
    } else {
      navigate("/victory", {
        state: { roundTimes: [...roundTimes, roundTime], usedWords: updatedUsedWords },
      });
    }
  };

  const isInputCorrect =
    currentUser &&
    inputValues.every(
      (value, index) =>
        value.toLowerCase() ===
        currentUser.name.replace(/\s/g, "")[index].toLowerCase()
    );

  useEffect(() => {
    if (isInputCorrect) {
      handleNextRound();
    }
  }, [isInputCorrect]);

  return (
    <div className={style.container}>
      <div className={style.timeBlock}>
        {time !== null && <TimeDisplay time={time} />}
        <PenaltyMessage penaltyMessage={penaltyMessage} />
      </div>

      <RoundDisplay
        currentRound={currentRound}
        rounds={rounds}
        currentUserName={currentUser?.name}
      />

      <InputName
        name={currentUser?.name || ""}
        inputValues={inputValues}
        handleInputChange={handleInputChange}
        errorIndexes={errorIndexes}
        correctLetters={new Set(
          inputValues
            .map((char, index) => (char === currentUser?.name[index] ? index : -1))
            .filter((index) => index !== -1)
        )}
      />
    </div>
  );
};

export default Game;
