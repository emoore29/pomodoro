import { useState } from "react";

export default function TimeControls({
  setSessionMinutes,
  sessionMinutes,
  setRest,
  rest,
  parentId,
}) {
  const [sessionEdit, setSessionEdit] = useState(false);

  function handleChange(e) {
    parentId === "control-session"
      ? setSessionMinutes(e.target.value)
      : setRest(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSessionEdit((prev) => !prev);
    parentId === "control-session"
      ? setSessionMinutes(e.target.elements.updateSessionTime.value)
      : setRest(e.target.elements.updateSessionTime.value);
  }

  return (
    <div>
      <button
        onClick={() => {
          setSessionEdit((prev) => !prev);
        }}
        className="session-indicator"
        style={{
          display: sessionEdit ? "none" : "block",
          cursor: "pointer",
        }}
      >
        {parentId === "control-session" ? sessionMinutes : rest}
      </button>
      <form
        onSubmit={handleSubmit}
        style={{ display: sessionEdit ? "block" : "none" }}
      >
        <label htmlFor="updateSessionTime"></label>
        <input
          type="number"
          name="updateSessionTime"
          value={parentId === "control-session" ? sessionMinutes : rest}
          onChange={handleChange}
        />
        <button type="submit" style={{ cursor: "pointer" }}>
          Update
        </button>
      </form>
    </div>
  );
}
