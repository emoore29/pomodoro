import "./Pomodoro.css";
import { useEffect, useState } from "react";
import Timer from "./Components/Timer";
import Menu from "./Components/Menu";

function Pomodoro() {
  const [typeOfSession, setTypeOfSession] = useState("session");
  const [play, setPlay] = useState(false); // default paused
  const [sessionMinutes, setSessionMinutes] = useState(25);
  const [rest, setRest] = useState(5);
  const [minutes, setMinutes] = useState(sessionMinutes); // starts with a session, not a rest
  const [seconds, setSeconds] = useState(0);

  const circleRadius = 100;
  const viewBoxSizing = circleRadius * 2 + 10; //"-5 0 150 150"
  const viewBox =
    "-5 5 " + viewBoxSizing.toString() + " " + viewBoxSizing.toString();
  const circleCircumference = 2 * Math.PI * circleRadius;
  const timeLeft = minutes * 60 + seconds;
  let totalTime;
  typeOfSession === "session"
    ? (totalTime = sessionMinutes * 60)
    : (totalTime = rest * 60);

  const strokeDashoffset = (1 - timeLeft / totalTime) * circleCircumference; // calculates percentage of time left, offsets dasharray by that amount.

  const beep = new Audio(
    "https://actions.google.com/sounds/v1/alarms/phone_alerts_and_rings.ogg#t=33,38"
  );

  if (minutes === 0 && seconds === 0) {
    beep.play();
  }

  function toggleSessionType() {
    setSeconds(0);
    if (typeOfSession === "session") {
      setTypeOfSession("rest");
    } else {
      setTypeOfSession("session");
    }
  }

  function updateDisplayOfMinutes() {
    if (!play) {
      //can only update minutes if session is paused
      if (typeOfSession === "session") {
        setMinutes(sessionMinutes);
      } else {
        setMinutes(rest);
      }
    }
  }

  // this will run after every render.
  useEffect(() => {
    let isCancelled = false; // updates only if user doesn't reset or pause midway through
    if (play && !isCancelled) {
      // every 1 sec interval
      var interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes !== 0) {
            //still some minutes left
            setSeconds(59);
            setMinutes((prev) => prev - 1);
          } else {
            //minutes && seconds === 0

            toggleSessionType();
            if (typeOfSession === "session") {
              setMinutes(rest - 1);
            } else {
              // typeOfSession === "rest", so switch to a new session
              setMinutes(sessionMinutes - 1);
            }
            setSeconds(59);
          }
        } else {
          // mins && seconds !== 0
          setSeconds((prev) => prev - 1);
        }
      }, 1000);
    }
    // cleanup function ensures the interval stops and does not continue to execute if the play state changes.
    return () => clearInterval(interval);
  });

  useEffect(() => {
    updateDisplayOfMinutes();
  }, [sessionMinutes, rest, typeOfSession]);

  return (
    <div className="container">
      <Menu
        play={play}
        toggleSessionType={toggleSessionType}
        sessionMinutes={sessionMinutes}
        rest={rest}
        setRest={setRest}
        setPlay={setPlay}
        setSessionMinutes={setSessionMinutes}
        setSeconds={setSeconds}
        typeOfSession={typeOfSession}
        setTypeOfSession={setTypeOfSession}
        setMinutes={setMinutes}
      />
      <div
        className="pomodoro-container"
        style={{
          backgroundColor: typeOfSession === "session" ? "#58427c" : "#405E40",
          color: "rgba(255, 255, 255, 0.5)",
        }}
      >
        <div className="clock-container">
          <svg
            id="circle-svg"
            viewBox={viewBox}
            width={2 * circleRadius}
            height={2 * circleRadius}
          >
            <circle
              className="timer-background"
              cx={circleRadius}
              cy={circleRadius}
              r={circleRadius}
              stroke={typeOfSession === "session" ? "#58427c" : "#405E40"}
            />
            <circle
              className="timer-progress"
              cx={circleRadius}
              cy={circleRadius}
              r={circleRadius}
              strokeDasharray={circleCircumference}
              strokeDashoffset={strokeDashoffset}
            />
          </svg>
        </div>
        <Timer
          typeOfSession={typeOfSession}
          minutes={minutes}
          seconds={seconds}
          play={play}
        />
      </div>
    </div>
  );
}

export default Pomodoro;
