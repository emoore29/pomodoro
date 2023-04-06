export default function Timer({ minutes, seconds }) {
  return (
    <div className="Timer">
      <h1 id="time-left">
        {minutes < 10 ? "0" + minutes : minutes}:
        {seconds < 10 ? "0" + seconds : seconds}
      </h1>
    </div>
  );
}
