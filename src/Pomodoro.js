import "./Pomodoro.css";
import { useEffect, useState } from "react";

function Pomodoro() {
  const [typeSession, setTypeSession] = useState(true); //true == session, false == break
  const [play, setPlay] = useState(false); //default paused
  const [session, setSession] = useState(1);
  const [rest, setRest] = useState(1);
  const [minutes, setMinutes] = useState(session);
  const [seconds, setSeconds] = useState(3);
  const [reset, setReset] = useState(false);

  function handleTime(e) {
    if (e.target.id === "session-increment") {
      setSession(session + 1);
    } else if (e.target.id === "session-decrement") {
      setSession(session - 1);
    } else if (e.target.id === "break-increment") {
      setRest(rest + 1);
    } else if (e.target.id === "break-decrement") {
      setRest(rest - 1);
    }
  }

  function handleReset() {
    setReset(true);
  }

  function handlePlay() {
    setPlay(!play);
  }

  function updateMinutesToRest() {
    if (!play) {
      //can only update length if session is paused
      if (typeSession === false) {
        console.log("rest UE did something");
        setMinutes(rest);
      }
    }
  }

  function updateMinutesToSession() {
    if (!play) {
      //can only update length if session is paused
      if (typeSession === true) {
        console.log("session UE did something");
        setMinutes(session);
      }
    }
  }

  function resetTimer() {
    if (reset === true) {
      console.log("reset UE did something");
      setTypeSession(true);
      setPlay(false);
      setMinutes(25);
      setSeconds(0);
      setSession(25);
      setRest(5);
    }
    setReset(false);
  }

  function playBell() {
    if (seconds === 0 && minutes === 0) {
      console.log("beep UE did something");
      var beep = new Audio(
        "https://actions.google.com/sounds/v1/alarms/phone_alerts_and_rings.ogg#t=33,38"
      );

      beep.play();
    }
  }

  function toggleSessionType() {
    if (seconds === 0 && minutes === 0) {
      console.log("session toggle UE did something");
      setTypeSession(!typeSession);
    }
  }

  useEffect(() => {
    resetTimer();
  }, [reset]);

  useEffect(() => {
    updateMinutesToRest();
  }, [rest]);

  useEffect(() => {
    updateMinutesToSession();
  }, [session]);

  useEffect(() => {
    let isCancelled = false;
    if (play && !isCancelled) {
      console.log("timer UE did something");
      //updates only if user doesn't reset midway through
      var interval = setInterval(() => {
        clearInterval(interval);
        if (seconds === 0) {
          if (minutes !== 0) {
            //still some time left
            setSeconds(59);
            setMinutes(minutes - 1);
          } else {
            //minutes && seconds === 0
            if (typeSession) {
              //if the previous type (before the above update, which is still pending) was a break, start session
              setMinutes(session - 1);
            } else {
              //else the previous type was a session, so start a break
              setMinutes(rest - 1);
            }
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  });

  useEffect(() => {
    playBell();
  }, [seconds, minutes]);

  useEffect(() => {
    toggleSessionType();
  }, [seconds, minutes]);

  return (
    <>
      <div className="container">
        <div
          id="activeSessionDisplay"
          style={{ display: !play ? "none" : "block" }}
        >
          <h2>Session Length: {session}</h2>
          <h2>Break Length: {rest}</h2>
          <p>(Pause or reset to edit times)</p>
          <div id="playActive">
            <button className="icon" id="start_stop" onClick={handlePlay}>
              {!play ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="2 1 20 20"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                  display="block"
                  height="2rem"
                  width="2rem"
                  margin="0"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="2 1 20 20"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                  display="block"
                  height="2rem"
                  width="2rem"
                  margin="0"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 5.25v13.5m-7.5-13.5v13.5"
                  />
                </svg>
              )}
            </button>
            <button className="icon" id="reset" onClick={handleReset}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
                display="block"
                height="2rem"
                width="2rem"
                margin="0"
              >
                <path
                  fillRule="evenodd"
                  d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0V5.36l-.31-.31A7 7 0 003.239 8.188a.75.75 0 101.448.389A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
        <div>
          <h2 id="timer-label">{typeSession ? "session" : "break"}</h2>
          {/* this is just to pass the FCC test requirements, display is none */}
        </div>
        <div
          className="time-controls"
          style={{
            display: !play ? "grid" : "none",
            color: typeSession ? "white" : "grey",
          }}
        >
          <label className="time-label" id="session-label">
            Session Length
          </label>
          <button
            className="time-button"
            id="session-increment"
            onClick={handleTime}
            disabled={(session === 60) | play}
            style={{ color: typeSession ? "white" : "grey" }}
          >
            +
          </button>
          <h2 className="session-indicator">{session}</h2>{" "}
          {/*todo: change this to an input so user can type minutes instead of clicking buttons 100 times.*/}
          <button
            className="time-button"
            id="session-decrement"
            onClick={handleTime}
            disabled={(session === 1) | play}
            style={{ color: typeSession ? "white" : "grey" }}
          >
            -
          </button>
        </div>

        <div className="Pomodoro">
          <h1 id="time-left">
            {minutes < 10 ? "0" + minutes : minutes}:
            {seconds < 10 ? "0" + seconds : seconds}
          </h1>
        </div>

        <div
          className="time-controls"
          style={{
            display: !play ? "grid" : "none",

            color: typeSession ? "grey" : "white",
          }}
        >
          <label className="time-label" id="break-label">
            Break Length
          </label>
          <button
            className="time-button"
            id="break-increment"
            onClick={handleTime}
            disabled={(rest === 60) | play}
            style={{ color: typeSession ? "grey" : "white" }}
          >
            +
          </button>
          <h2 className="session-indicator">{rest}</h2>
          {/*todo: change this to an input so user can type minutes instead of clicking buttons 100 times.*/}
          <button
            className="time-button"
            id="break-decrement"
            onClick={handleTime}
            disabled={(rest === 1) | play}
            style={{ color: typeSession ? "grey" : "white" }}
          >
            -
          </button>
        </div>
      </div>
      <div id="play-pause-reset" style={{ display: play ? "none" : "flex" }}>
        <button className="icon" id="start_stop" onClick={handlePlay}>
          {!play ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="2 1 20 20"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
              display="block"
              height="2rem"
              width="2rem"
              margin="0"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="2 1 20 20"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
              display="block"
              height="2rem"
              width="2rem"
              margin="0"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 5.25v13.5m-7.5-13.5v13.5"
              />
            </svg>
          )}
        </button>
        <button className="icon" id="reset" onClick={handleReset}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
            display="block"
            height="2rem"
            width="2rem"
            margin="0"
          >
            <path
              fillRule="evenodd"
              d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0V5.36l-.31-.31A7 7 0 003.239 8.188a.75.75 0 101.448.389A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </>
  );
}

export default Pomodoro;
