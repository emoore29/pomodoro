import "./Pomodoro.css";
import { useEffect, useState } from "react";
import Timer from "./Components/Timer";
import ActiveSessionInfo from "./Components/ActiveSessionInfo";

function Pomodoro() {
  const [typeOfSession, setTypeOfSession] = useState("session");
  const [play, setPlay] = useState(false); // default paused
  const [sessionMinutes, setSessionMinutes] = useState(25);
  const [rest, setRest] = useState(5);
  const [minutes, setMinutes] = useState(sessionMinutes); // starts with a session, not a rest
  const [seconds, setSeconds] = useState(0);

  const beep = new Audio(
    "https://actions.google.com/sounds/v1/alarms/phone_alerts_and_rings.ogg#t=33,38"
  );

  function toggleSessionType() {
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

  function resetTimer() {
    setTypeOfSession("session");
    setPlay(false);
    setMinutes(25);
    setSeconds(0);
    setSessionMinutes(25);
    setRest(5);
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
            beep.play();
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
  }, [sessionMinutes, rest]);

  return (
    <>
      <div
        className="container"
        style={{
          backgroundColor: typeOfSession === "session" ? "#58427c" : "#a7bd83",
        }}
      >
        <ActiveSessionInfo
          play={play}
          sessionMinutes={sessionMinutes}
          rest={rest}
          setRest={setRest}
          setPlay={setPlay}
          resetTimer={resetTimer}
          setSessionMinutes={setSessionMinutes}
          setSeconds={setSeconds}
        />
        <Timer
          typeOfSession={typeOfSession}
          minutes={minutes}
          seconds={seconds}
          play={play}
          setPlay={setPlay}
          resetTimer={resetTimer}
        />
      </div>
    </>
  );
}

export default Pomodoro;
