import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

function MessageBubble({ message }) {
  // Prevent crash if message is undefined
  if (!message) return null;

  const [copiedIndex, setCopiedIndex] = useState(null);

  let blockIndex = 0;

  return (
   <ReactMarkdown
  components={{
    p({ children }) {
      return <>{children}</>;
    },

    code({ inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");

          if (inline) {
            return (
              <code className={className} {...props}>
                {children}
              </code>
            );
          }

          const code = String(children).replace(/\n$/, "");
          const currentIndex = blockIndex++;

          return (
            <div
              style={{
                position: "relative",
                margin: "18px 0",
              }}
            >
              <button
                className="code-copy-btn"
                onClick={() => {
                  navigator.clipboard.writeText(code);
                  setCopiedIndex(currentIndex);

                  setTimeout(() => {
                    setCopiedIndex(null);
                  }, 1500);
                }}
              >
                {copiedIndex === currentIndex
                  ? "Copied!"
                  : "Copy"}
              </button>

              <SyntaxHighlighter
                language={match?.[1] || "text"}
                style={oneDark}
                PreTag="div"
                customStyle={{
                  borderRadius: "10px",
                  paddingTop: "40px",
                }}
                {...props}
              >
                {code}
              </SyntaxHighlighter>
            </div>
          );
        },
      }}
    >
      {message?.content || ""}
    </ReactMarkdown>
  );
}

export default MessageBubble;