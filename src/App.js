import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import SatrtingExam from "./components/StartingTest";
import Questions from "./components/Questions";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import FinishingTest from "./components/FinishingTest";
import Footer from "./components/Footer";
import Timer from "./components/Timer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const second_per_question = 50;
const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  timer: null,
};
function App() {
  const [
    { questions, status, index, answer, points, highscore, timer },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numbeOfQuestions = questions.length;
  const maxPoint = questions.reduce((prev, curr) => prev + curr.points, 0);

  function reducer(state, action) {
    switch (action.type) {
      case "dataRecived":
        return {
          ...state,
          questions: action.payload,
          status: "ready",
        };
      case "dataFailed":
        return {
          ...state,
          status: "error",
        };
      case "start":
        return {
          ...state,
          status: "active",
          timer: state.questions.length * second_per_question,
        };
      case "newAnswer":
        const question = state.questions.at(state.index);
        return {
          ...state,
          answer: action.payload,
          points:
            action.payload === question.correctOption
              ? state.points + question.points
              : state.points,
        };
      case "nextQuestion":
        return { ...state, index: state.index + 1, answer: null };
      case "finish":
        return {
          ...state,
          status: "finished",
          highscore:
            state.points > state.highscore ? state.points : state.highscore,
        };
      case "restart":
        return {
          ...initialState,
          questions: state.questions,
          status: "ready",
        };
      case "tickTok":
        return {
          ...state,
          timer: state.timer - 1,
          status: state.timer === 0 ? "finished" : state.status,
        };
      default:
        throw new Error("action Failed");
    }
  }
  useEffect(function () {
    fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataRecived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <SatrtingExam
            numbeOfQuestions={numbeOfQuestions}
            dispatch={dispatch}
          />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numbeOfQuestions={numbeOfQuestions}
              points={points}
              maxPoint={maxPoint}
              answer={answer}
            />
            <Questions
              questions={questions[index]}
              answer={answer}
              dispatch={dispatch}
            />

            <Footer>
              <Timer dispatch={dispatch} timer={timer} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                numbeOfQuestions={numbeOfQuestions}
              />
              <ToastContainer />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishingTest
            points={points}
            maxPoint={maxPoint}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
