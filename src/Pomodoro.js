import "./Pomodoro.css";
import { useEffect, useState } from "react";
import Timer from "./Components/Timer";
import Menu from "./Components/Menu";

function Pomodoro() {
  const [typeOfSession, setTypeOfSession] = useState("session");
  const [play, setPlay] = useState(false); // default paused
  const [mute, setMute] = useState(true); // default muted
  const [sessionMinutes, setSessionMinutes] = useState(25);
  const [rest, setRest] = useState(5);
  const [minutes, setMinutes] = useState(sessionMinutes); // starts with a session, not a rest
  const [seconds, setSeconds] = useState(0);

  const [focusColor, setFocusColor] = useState("#58427c"); // blue: 1a75a2, purple: 58427c
  const [restColor, setRestColor] = useState("#405E40");
  const [radius, setRadius] = useState(100);

  // Responsive clock radius
  useEffect(() => {
    console.log("UseEffect ran");
    function handleResize() {
      console.log("handling resize");
      const clockContainerWidth =
        document.getElementById("clock-container").offsetWidth;
      setRadius(0.5 * clockContainerWidth);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const circumference = 2 * Math.PI * radius;
  const timeLeft = minutes * 60 + seconds;
  let totalTime;
  typeOfSession === "session"
    ? (totalTime = sessionMinutes * 60)
    : (totalTime = rest * 60);
  const strokeDashoffset = (1 - timeLeft / totalTime) * circumference; // calculates percentage of time left, offsets dasharray by that amount.

  const viewBoxSizing = radius * 2 + 10; //"-5 0 150 150"
  const viewBox =
    "-5 5 " + viewBoxSizing.toString() + " " + viewBoxSizing.toString();

  // Bell ring
  const beep = new Audio(
    "https://actions.google.com/sounds/v1/alarms/phone_alerts_and_rings.ogg#t=33,38"
  );

  if (minutes === 0 && seconds === 0 && !mute) {
    beep.play();
  }

  // Other
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

  function handleFocusColorChange(event) {
    setFocusColor(event.target.value);
  }

  function handleRestColorChange(event) {
    setRestColor(event.target.value);
  }

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
        mute={mute}
        setMute={setMute}
        focusColor={focusColor}
        setFocusColor={setFocusColor}
        restColor={restColor}
        setRestColor={setRestColor}
        handleFocusColorChange={handleFocusColorChange}
        handleRestColorChange={handleRestColorChange}
      />
      <div
        className="pomodoro-container"
        style={{
          backgroundColor: typeOfSession === "session" ? focusColor : restColor,
          color: "rgba(255, 255, 255, 0.5)",
        }}
      >
        <div className="clock-container">
          <svg
            id="circle-svg"
            viewBox={viewBox}
            width={3 * radius}
            height={3 * radius}
          >
            <circle
              className="timer-progress"
              cx={radius}
              cy={radius}
              r={radius}
              strokeDasharray={circumference}
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
