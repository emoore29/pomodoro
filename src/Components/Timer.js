export default function Timer({
  typeOfSession,
  minutes,
  seconds,
  play,
  setPlay,
  resetTimer,
}) {
  return (
    <div className="Timer">
      <h1 id="time-left">
        {minutes < 10 ? "0" + minutes : minutes}:
        {seconds < 10 ? "0" + seconds : seconds}
      </h1>
    </div>
  );
}
