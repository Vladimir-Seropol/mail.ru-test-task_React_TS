// PenaltyMessage.tsx
import React from 'react';
import style from './PenaltyMessage.module.css';

interface PenaltyMessageProps {
  penaltyMessage: string | null;
}

const PenaltyMessage: React.FC<PenaltyMessageProps> = ({ penaltyMessage }) => (
  penaltyMessage ? <div className={style.penalty}>{penaltyMessage}</div> : null
);

export default PenaltyMessage;
