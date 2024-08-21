import React, { useEffect } from "react";
import { toast } from "react-toastify";

const Timer = ({ dispatch, timer }) => {
  const minute = Math.floor(timer / 60);
  const second = timer % 60;

  useEffect(function () {
    if ((minute === 12) & (second === 30)) {
      toast.info("the exam is started!", {
        position: "top-right",
        onClick: true,
        closeButton: true,
        className: "toas-style",
      });
    } else if ((minute === 12) & (second === 0)) {
      toast.warning("the exam is about to finish", {
        position: "top-right",
        onClick: true,
        closeButton: true,
        className: "toas-style",
      });
    } else if ((minute === 0) & (second === 5)) {
      toast.success("the time is over and exam is finished", {
        position: "top-right",
        onClick: true,
        closeButton: true,
        className: "toas-style",
      });
    }
  });

  useEffect(
    function () {
      const id = setInterval(() => {
        dispatch({ type: "tickTok" });
      }, 1000);
      return () => clearInterval(id);
    },
    [dispatch]
  );
  return (
    <div className="timer">
      {minute < 10 ? "0" : ""}
      {minute}:{second < 10 ? "0" : ""}
      {second}
    </div>
  );
};

export default Timer;
