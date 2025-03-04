import React, { useState } from "react";
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
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  let inputIndexRef = 0; 

  return (
    <div className={styles.inputContainer}>
      <div className={styles.inputWrapper}>
        {name.split("").map((char, index) => {
          if (char === " ") {
            return (
              <span key={`space-${index}`} className={styles.space}>
                {" "}
              </span>
            );
          }

          const currentInputIndex = inputIndexRef;
          inputIndexRef++; 

         
          let inputClass = styles.default; 
          if (inputValues[currentInputIndex]) {
            inputClass = errorIndexes.has(currentInputIndex)
              ? styles.error
              : correctLetters.has(currentInputIndex)
              ? styles.correct
              : styles.default;
          }

          return (
            <div key={currentInputIndex} className={`${styles.inputItem} ${inputClass}`}>
              {focusedIndex === currentInputIndex && !correctLetters.has(currentInputIndex) && (
                <span className={styles.arrow}>↓</span>
              )}

              <input
                type="text"
                value={inputValues[currentInputIndex] || ""}
                onChange={(e) => handleInputChange(currentInputIndex, e.target.value)}
                onFocus={() => setFocusedIndex(currentInputIndex)}
                onBlur={() => setFocusedIndex(null)}
                className={`${styles.inputField} ${inputClass}`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InputName;
