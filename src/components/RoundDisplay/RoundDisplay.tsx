
import React from 'react';
import style from './RoundDisplay.module.css';

interface RoundDisplayProps {
  currentRound: number;
  rounds: number;
  currentUserName: string | undefined;
}

const RoundDisplay: React.FC<RoundDisplayProps> = ({ currentUserName }) => (
  <div>    
    {currentUserName ? (
      <ol>
        <li className={style.round}>- {currentUserName}</li>
      </ol>
    ) : (
      <div>Нет данных о пользователе</div>
    )}
  </div>
);

export default RoundDisplay;
