import {
  FaPlus,
  FaMoon,
  FaSun,
} from "react-icons/fa";

function Header({
  darkMode,
  setDarkMode,
  setMessages,
  setQuestion,
  setActiveChatId,
}) {

  return (
    <div className="header">

      <div>
        <h1 className="logo">
          🧠 StudyBuddy AI
        </h1>

        <p className="header-subtitle">
          Learn • Revise • Practice
        </p>
      </div>

      <div className="header-buttons">

        <button
          onClick={() => {
            setMessages([]);
            setQuestion("");
            setActiveChatId(null);
          }}
        >
          <FaPlus /> New Chat
        </button>

        <button
          onClick={() =>
            setDarkMode(!darkMode)
          }
        >
          {darkMode
            ? <FaSun />
            : <FaMoon />}
        </button>

      </div>

    </div>
  );
}

export default Header;