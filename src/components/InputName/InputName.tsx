import React, { useState, useEffect, useRef } from "react";
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
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Получаем индексы инпутов (игнорируем пробелы)
  const inputIndexes = name
    .split("")
    .map((char, index) => (char !== " " ? index : null))
    .filter((index): index is number => index !== null);

 
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, [name]);

  
  const handleChange = (index: number, value: string) => {
    handleInputChange(index, value);

    if (value && index < inputIndexes.length - 1) {
      setTimeout(() => inputRefs.current[index + 1]?.focus(), 50);
    }
  };

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

          const inputIndex = inputIndexes.indexOf(index);
          let inputClass = styles.default;
          
          if (errorIndexes.has(inputIndex)) {
            inputClass = styles.error;
          } else if (correctLetters.has(inputIndex)) {
            inputClass = styles.correct;
          }
          

          return (
            <div key={inputIndex} className={`${styles.inputItem} ${inputClass}`}>
              {focusedIndex === inputIndex && !correctLetters.has(inputIndex) && (
                <span className={styles.arrow}>↓</span>
              )}

              <input
                ref={(el) => {
                  if (el) inputRefs.current[inputIndex] = el;
                }}
                type="text"
                value={inputValues[inputIndex] || ""}
                onChange={(e) => handleChange(inputIndex, e.target.value)}
                onFocus={() => setFocusedIndex(inputIndex)}
                onBlur={() => setFocusedIndex(null)}
                className={`${styles.inputField} ${inputClass}`}
                maxLength={1}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InputName;
