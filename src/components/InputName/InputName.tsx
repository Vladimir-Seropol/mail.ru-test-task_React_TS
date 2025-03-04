import React from "react";
import styles from "./InputName.module.css";

interface InputNameProps {
  name: string;
  inputValues: string[];
  handleInputChange: (index: number, value: string) => void;
  errorIndexes: Set<number>;
  correctLetters: Set<number>;
}

const InputName: React.FC<InputNameProps> = ({
  name,
  inputValues,
  handleInputChange,
  errorIndexes,
  correctLetters,
}) => {
  let inputIndex = 0; 

  return (
    <div className={styles.inputContainer}>
      <div className={styles.inputWrapper}>
        {name.split("").map((char, index) => {
          if (char === " ") {
            return (
              <span key={index} className={styles.space}>
                {" "}
              </span>
            );
          }

          const currentInputIndex = inputIndex; 
          inputIndex++; 

          return (
            <input
              key={index}
              type="text"
              value={inputValues[currentInputIndex] || ""}
              onChange={(e) => handleInputChange(currentInputIndex, e.target.value)}
              className={`${styles.inputField} 
                ${errorIndexes.has(currentInputIndex) ? styles.error : styles.default} 
                ${correctLetters.has(currentInputIndex) ? styles.correct : ""}`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default InputName;
