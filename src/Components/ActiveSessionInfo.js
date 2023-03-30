import TimeControls from "./TimeControls";

export default function ActiveSessionInfo({
  play,
  sessionMinutes,
  rest,
  setPlay,
  resetTimer,
  setSessionMinutes,
  setRest,
}) {
  return (
    <div id="activeSessionDisplay">
      <h2 id="control-session">
        Session Length:{" "}
        <TimeControls
          parentId="control-session"
          setSessionMinutes={setSessionMinutes}
          sessionMinutes={sessionMinutes}
        />
      </h2>
      <h2 id="control-break">
        Break Length:{" "}
        <TimeControls parentId="control-break" rest={rest} setRest={setRest} />
      </h2>
      <p>(Pause or reset to edit times)</p>
      <div id="playActive">
        <button
          className="icon"
          id="start_stop"
          onClick={() => setPlay((prev) => !prev)}
        >
          {!play ? "play" : "pause"}
        </button>
        <button className="icon" id="reset" onClick={resetTimer}>
          "reset"
        </button>
      </div>
    </div>
  );
}
