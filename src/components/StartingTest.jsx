import React from "react";

const SatrtingExam = ({ numbeOfQuestions, dispatch }) => {
  return (
    <div className="start">
      <h2>Welcome to the English Grammer Quiz!</h2>
      <h3>{numbeOfQuestions} Questins to test your English Level</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Let's Start
      </button>
    </div>
  );
};

export default SatrtingExam;
