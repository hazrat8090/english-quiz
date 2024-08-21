import React from "react";

const FinishingTest = ({ points, maxPoint, highscore, dispatch }) => {
  const percentage = (points / maxPoint) * 100;

  let emoji;
  if (percentage === 100) emoji = "🥇";
  if ((percentage < 100) & (percentage > 80)) emoji = "🎉";
  if ((percentage <= 80) & (percentage > 50)) emoji = "😃";
  if ((percentage > 0) & (percentage <= 50)) emoji = "⛳";
  if (percentage < 50) emoji = "🤦‍♂️";

  return (
    <>
      <p className="result">
        <span>{emoji}</span> You Scored <strong>{points}</strong> out of{" "}
        {maxPoint} ({Math.ceil(percentage)}%)
      </p>
      <p className="highscore">(Highscore: {highscore} points)</p>

      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart the Exam
      </button>
    </>
  );
};

export default FinishingTest;
