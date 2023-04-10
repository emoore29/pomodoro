import { useState } from "react";

// SVGs
import { ReactComponent as PlaySvg } from "../assets/playSvg.svg";
import { ReactComponent as PauseSvg } from "../assets/pauseSvg.svg";
import { ReactComponent as MenuSvg } from "../assets/menuSvg.svg";
import { ReactComponent as CloseMenuSvg } from "../assets/closeMenuSvg.svg";
import { ReactComponent as AudioOn } from "../assets/audioOn.svg";
import { ReactComponent as AudioOff } from "../assets/audioOff.svg";

export default function Menu({
  play,
  sessionMinutes,
  rest,
  setPlay,
  setSessionMinutes,
  setRest,
  setSeconds,
  toggleSessionType,
  setTypeOfSession,
  setMinutes,
  mute,
  setMute,
  focusColor,
  setFocusColor,
  restColor,
  setRestColor,
  handleRestColorChange,
  handleFocusColorChange,
  typeOfSession,
}) {
  const [activeMenu, setActiveMenu] = useState(false);
  const [editingFocus, setEditingFocus] = useState(false);
  const [newSessionMinutes, setNewSessionMinutes] = useState(25);
  const [newRestMinutes, setNewRestMinutes] = useState(5);
  const [editingRest, setEditingRest] = useState(false);

  function restoreDefault() {
    setTypeOfSession("session");
    setPlay(false);
    setMinutes(25);
    setSeconds(0);
    setSessionMinutes(25);
    setRest(5);
    setNewRestMinutes(5);
    setNewSessionMinutes(25);
    setFocusColor("#58427c");
    setRestColor("#405E40");
  }

  function restartTimer() {
    setTypeOfSession("session");
    setMinutes(newSessionMinutes);
    setSeconds(0);
    play && setPlay(false);
  }

  const handleButtonClick = (btnId) => {
    btnId === "edit-focus" && setEditingFocus(true);
    btnId === "edit-rest" && setEditingRest(true);
  };

  const handleInputChange = (e, id) => {
    id === "update-focus" && setNewSessionMinutes(e.target.value);
    id === "update-rest" && setNewRestMinutes(e.target.value);
  };

  const handleInputKeyDown = (e, id) => {
    if (e.key === "Enter") {
      if (id === "update-focus") {
        setSessionMinutes(newSessionMinutes);
        setEditingFocus(false);
      } else if (id === "update-rest") {
        setRest(newRestMinutes);
        setEditingRest(false);
      }
    }
  };

  const handleTickClick = (id) => {
    if (id === "update-focus") {
      setSessionMinutes(newSessionMinutes);
      setEditingFocus(false);
    } else if (id === "update-rest") {
      setRest(newRestMinutes);
      setEditingRest(false);
    }
  };

  const handleCancelClick = (id) => {
    if (id === "cancel-focus") {
      setNewSessionMinutes(sessionMinutes);
      setEditingFocus(false);
    } else if (id === "cancel-rest") {
      setNewRestMinutes(rest);
      setEditingRest(false);
    }
  };

  return (
    <>
      {!activeMenu ? (
        <button
          onClick={() => {
            setActiveMenu((prev) => !prev);
          }}
          id="open-menu"
        >
          <MenuSvg className="svg" />
        </button>
      ) : (
        <div id="menu">
          <section id="buttons-for-editing">
            {editingFocus ? (
              <div className="input-container">
                <input
                  type="number"
                  value={newSessionMinutes}
                  onChange={(e) => handleInputChange(e, "update-focus")}
                  onKeyDown={(e) => handleInputKeyDown(e, "update-focus")}
                  autoFocus
                  min="1"
                />
                <button
                  className="tick-btn"
                  onClick={() => handleTickClick("update-focus")}
                >
                  ✔
                </button>
                <button onClick={() => handleCancelClick("cancel-focus")}>
                  ✖
                </button>
              </div>
            ) : (
              <button
                id="edit-focus-button"
                onClick={() => handleButtonClick("edit-focus")}
                disabled={play && typeOfSession === "session"}
              >
                Edit focus length: {sessionMinutes}
              </button>
            )}
            {editingRest ? (
              <div className="input-container">
                <input
                  type="number"
                  value={newRestMinutes}
                  onChange={(e) => handleInputChange(e, "update-rest")}
                  onKeyDown={(e) => handleInputKeyDown(e, "update-rest")}
                  autoFocus
                  min="1"
                />
                <button
                  className="tick-btn"
                  onClick={() => handleTickClick("update-rest")}
                >
                  ✔
                </button>
                <button onClick={() => handleCancelClick("cancel-rest")}>
                  ✖
                </button>
              </div>
            ) : (
              <button
                id="edit-rest-button"
                onClick={() => handleButtonClick("edit-rest")}
                disabled={play && typeOfSession === "rest"}
              >
                Edit break length: {rest}
              </button>
            )}
            <button disabled={play} onClick={toggleSessionType}>
              Toggle session type
            </button>

            <button id="reset" onClick={restartTimer}>
              Reset timer
            </button>
            <button id="reset" onClick={restoreDefault}>
              Restore default settings
            </button>
          </section>
          <section id="colorSelectors">
            <div className="colorSelector">
              <label htmlFor="focusColorPicker">
                Select Focus Color:{" "}
                <input
                  id="focusColorPicker"
                  type="color"
                  value={focusColor}
                  onChange={handleFocusColorChange}
                />
              </label>
            </div>
            <div className="colorSelector">
              <label htmlFor="breakColorPicker">
                Select Break Color:{" "}
                <input
                  id="breakColorPicker"
                  type="color"
                  value={restColor}
                  onChange={handleRestColorChange}
                />
              </label>
            </div>
          </section>
          <section id="controls">
            <button className="icon" onClick={() => setPlay((prev) => !prev)}>
              {!play ? (
                <PlaySvg className="svg" />
              ) : (
                <PauseSvg className="svg" />
              )}
            </button>
            <button className="icon" onClick={() => setMute((prev) => !prev)}>
              {!mute ? (
                <AudioOn className="svg" />
              ) : (
                <AudioOff className="svg" />
              )}
            </button>
          </section>

          <button
            onClick={() => {
              setActiveMenu((prev) => !prev);
            }}
            id="close-menu"
          >
            <CloseMenuSvg className="svg" />
          </button>
          <p id="description">
            This timer was created by{" "}
            <a
              style={{
                color: typeOfSession === "session" ? focusColor : restColor,
              }}
              href="https://github.com/AthenasCode"
            >
              @AthenasCode
            </a>
            . Feedback via Github is welcome.
          </p>
        </div>
      )}
    </>
  );
}
