import React from "react";

const Progress = ({ index, numbeOfQuestions, points, maxPoint, answer }) => {
  return (
    <header className="progress">
      <progress
        max={numbeOfQuestions}
        value={index + Number(answer !== null)}
      />
      <p>
        Question{" "}
        <strong>
          {index + 1}/{numbeOfQuestions}
        </strong>
      </p>
      <p>
        {points}/{maxPoint}
      </p>
    </header>
  );
};

export default Progress;
