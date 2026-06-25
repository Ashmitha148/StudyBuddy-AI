import { useState } from "react";
import {
  FaComments,
  FaTrash,
  FaSearch,
  FaCog,
} from "react-icons/fa";

import SearchBar from "./SearchBar";
import GoogleSignIn from "./GoogleSignIn";

function ChatSidebar({
  chatHistory,
  searchTerm,
  setSearchTerm,
  setMessages,
  setChatHistory,
  activeChatId,
  setActiveChatId,
  setPdfTexts,
}) {
  const [showSettings, setShowSettings] =
    useState(false);

  return (
    <div className="sidebar">

      <div className="sidebar-top">
        <h2>🧠 StudyBuddy AI</h2>
      </div>

      <div className="search-wrapper">
        <FaSearch />

        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </div>

      <div className="chat-list">

        {chatHistory
          .filter((chat) =>
            chat.title
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
          )
          .map((chat) => (
            <div
              className="chat-item"
              key={chat.id}
            >

              <button
                className={
                  activeChatId === chat.id
                    ? "chat-button active-chat"
                    : "chat-button"
                }
                onClick={() => {
                  setMessages(chat.messages);
                  setPdfTexts(chat.pdfTexts || "");
                  setActiveChatId(chat.id);
                }}
              >
                <FaComments /> {chat.title}
              </button>

              <button
                className="delete-button"
                onClick={() => {

                  if (activeChatId === chat.id) {
                    setMessages([]);
                    setPdfTexts([]);
                    setActiveChatId(null);
                  }

                  setChatHistory((prev) =>
                    prev.filter(
                      (item) => item.id !== chat.id
                    )
                  );
                }}
              >
                <FaTrash />
              </button>

            </div>
          ))}

      </div>

      <button
        className="settings-btn"
        onClick={() =>
          setShowSettings(!showSettings)
        }
      >
        <FaCog /> Settings
      </button>

      {showSettings && (
        <div className="settings-menu">
          <GoogleSignIn />
        </div>
      )}

    </div>
  );
}

export default ChatSidebar;