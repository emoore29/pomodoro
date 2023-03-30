import TimeControls from "./TimeControls";
import playSvg from "../assets/playSvg.svg";
import pauseSvg from "../assets/pauseSvg.svg";
import resetSvg from "../assets/resetSvg.svg";

export default function ActiveSessionInfo({
  play,
  sessionMinutes,
  rest,
  setPlay,
  resetTimer,
  setSessionMinutes,
  setRest,
  setSeconds,
}) {
  return (
    <div id="activeSessionDisplay">
      <h2 id="control-session">
        Session Length:{" "}
        <TimeControls
          parentId="control-session"
          setSeconds={setSeconds}
          setSessionMinutes={setSessionMinutes}
          sessionMinutes={sessionMinutes}
        />
      </h2>
      <h2 id="control-break">
        Break Length:{" "}
        <TimeControls
          parentId="control-break"
          setSeconds={setSeconds}
          rest={rest}
          setRest={setRest}
        />
      </h2>
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
      </div>
    </div>
  );
}
