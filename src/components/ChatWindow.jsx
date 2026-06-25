import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";

function ChatWindow({
  messages,
  loading,
  chatEndRef,
}) {
  if (messages.length === 0 && !loading) {
    return (
      <div className="welcome-screen">
        <div className="welcome-logo">🧠</div>

        <h1>StudyBuddy AI</h1>
        <p>Learn • Revise • Practice</p>

        <p>Making learning simpler, faster, and smarter. 😊</p>
      </div>
    );
  }

  return (
    <div className="chat-container">
      {messages.map((message, index) => (
  <div
    key={index}
    className={
      message.role === "user"
        ? "user-message"
        : "assistant-message"
    }
  >
    <MessageBubble message={message} />
  </div>
))}

      {loading && <TypingIndicator />}

      <div ref={chatEndRef}></div>
    </div>
  );
}

export default ChatWindow;