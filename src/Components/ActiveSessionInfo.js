import TimeControls from "./TimeControls";
import playSvg from "../assets/playSvg.svg";
import pauseSvg from "../assets/pauseSvg.svg";
import resetSvg from "../assets/resetSvg.svg";
import { useState } from "react";

export default function ActiveSessionInfo({
  play,
  sessionMinutes,
  rest,
  setPlay,
  resetTimer,
  setSessionMinutes,
  setRest,
  setSeconds,
  toggleSessionType,
  typeOfSession,
}) {
  return (
    <div id="activeSessionDisplay">
      <section id="control-session" className="session-controls">
        <h2>Focus length: </h2>
        <TimeControls
          parentId="control-session"
          setSeconds={setSeconds}
          setSessionMinutes={setSessionMinutes}
          sessionMinutes={sessionMinutes}
          play={play}
          typeOfSession={typeOfSession}
        />
      </section>
      <section id="control-break" className="session-controls">
        <h2>Break length: </h2>
        <TimeControls
          parentId="control-break"
          setSeconds={setSeconds}
          rest={rest}
          setRest={setRest}
          play={play}
          typeOfSession={typeOfSession}
        />
      </section>
      <p>(Pause or reset to edit times)</p>
      <div id="playActive">
        <button
          className="icon"
          id="start_stop"
          onClick={() => setPlay((prev) => !prev)}
        >
          {!play ? (
            <img id="playSvg" src={playSvg} alt="play" />
          ) : (
            <img id="pauseSvg" src={pauseSvg} alt="pause" />
          )}
        </button>
        <button className="icon" id="reset" onClick={resetTimer}>
          <img id="resetSvg" src={resetSvg} alt="reset" />
        </button>
        <button disabled={play} onClick={toggleSessionType}>
          Toggle session type
        </button>
      </div>
    </div>
  );
}
