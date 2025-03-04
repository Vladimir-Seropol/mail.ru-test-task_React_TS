// TimeDisplay.tsx
import React from 'react';
import style from './TimeDisplay.module.css';

interface TimeDisplayProps {
  time: number;
}

const TimeDisplay: React.FC<TimeDisplayProps> = ({ time }) => (
  <div className={style.time}>
    <div > Время: {new Date(time * 1000).toISOString().substr(14, 5)}</div>
  </div>
);

export default TimeDisplay;
