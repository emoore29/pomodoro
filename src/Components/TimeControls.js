import { useState, useRef } from "react";

export default function TimeControls({
  setSessionMinutes,
  sessionMinutes,
  setRest,
  rest,
  parentId,
  setSeconds,
  play,
  typeOfSession,
}) {
  const [sessionEdit, setSessionEdit] = useState(false);
  const [hover, setHover] = useState(false);
  const formRef = useRef(null);

  const handleCancelClick = () => {
    const inputElement = formRef.current.elements.updateSessionTime;
    inputElement.value = parentId === "control-session" ? sessionMinutes : rest;
    setSessionEdit((prev) => !prev);
  };

  function handleSubmit(e) {
    e.preventDefault();
    setSessionEdit((prev) => !prev);
    setSeconds(0);
    parentId === "control-session"
      ? setSessionMinutes(e.target.elements.updateSessionTime.value)
      : setRest(e.target.elements.updateSessionTime.value);
  }

  return (
    <div
      onMouseEnter={() => setHover((prev) => !prev)}
      onMouseLeave={() => setHover((prev) => !prev)}
    >
      <p
        className="session-indicator"
        style={{
          display: sessionEdit ? "none" : "inline-block",
        }}
      >
        {parentId === "control-session" ? sessionMinutes : rest}
      </p>
      <button
        className="edit-session"
        disabled={play}
        onClick={() => {
          setSessionEdit((prev) => !prev);
        }}
        style={{ display: hover && !sessionEdit ? "inline-block" : "none" }}
      >
        Edit
      </button>
      <form
        onSubmit={handleSubmit}
        style={{ display: sessionEdit ? "block" : "none" }}
        ref={formRef}
      >
        <label htmlFor="updateSessionTime"></label>
        <input
          style={{
            backgroundColor:
              typeOfSession === "session" ? "#58427c" : "#a7bd83",
            color: typeOfSession === "session" ? "#e6e0ef" : "#fafcf8",
            border: "none",
            fontSize: "1.5rem",
            width: "2.7rem",
            margin: "0 0.5rem 0 0.5rem",
            textAlign: "left",
          }}
          className="time-input"
          min="1"
          type="number"
          name="updateSessionTime"
          defaultValue={parentId === "control-session" ? sessionMinutes : rest}
        />
        <button type="submit" style={{ cursor: "pointer" }}>
          Update
        </button>
        <button
          onClick={handleCancelClick}
          type="button"
          style={{ cursor: "pointer" }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
