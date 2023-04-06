import TimeControls from "./TimeControls";
import playSvg from "../assets/playSvg.svg";
import pauseSvg from "../assets/pauseSvg.svg";
import resetSvg from "../assets/resetSvg.svg";
import { useState } from "react";
import menuSvg from "../assets/menuSvg.svg";
import closeMenuSvg from "../assets/closeMenuSvg.svg";

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
  const [activeMenu, setActiveMenu] = useState(false);

  return (
    <div>
      {!activeMenu ? (
        <button
          onClick={() => {
            setActiveMenu((prev) => !prev);
          }}
          id="open-menu"
        >
          <img id="menuSvg" src={menuSvg} alt="menu" />
        </button>
      ) : (
        <div>
          <div id="activeSessionDisplay">
            <section id="control-session" className="session-controls">
              <h2>Edit focus length: </h2>
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
              <h2>Edit break length: </h2>
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
                <img id="resetSvg" src={resetSvg} alt="reset-button" />
              </button>
              <button disabled={play} onClick={toggleSessionType}>
                Toggle session type
              </button>
            </div>
          </div>
          <button
            onClick={() => {
              setActiveMenu((prev) => !prev);
            }}
            id="close-menu"
          >
            <img id="closeMenuSvg" src={closeMenuSvg} alt="close-menu" />
          </button>
        </div>
      )}
    </div>
  );
}
