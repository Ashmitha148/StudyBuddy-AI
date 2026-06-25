//import * as pdfjsLib from "pdfjs-dist";
import { useState, useRef, useEffect } from "react";
import Header from "./Header";
import ChatSidebar from "./ChatSideBar";
import ChatWindow from "./ChatWindow";
import InputBox from "./InputBox";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import extractTextFromImage from "./ImageUpload";
import PdfUpload from "./PdfUpload";

function AskStudyBuddy() {

  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [activeChatId, setActiveChatId] = useState(null);

  const [pdfTexts, setPdfTexts] = useState([]);

  const chatEndRef = useRef(null);
  const [user, setUser] = useState(null);



  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  
  useEffect(() => {

  if (!user) return;

  const savedChats =
    localStorage.getItem(
      `chatHistory_${user.email}`
    );

  if (savedChats) {
    setChatHistory(
      JSON.parse(savedChats)
    );
  }

}, [user]);

  
  useEffect(() => {

  if (!user) return;

  localStorage.setItem(
    `chatHistory_${user.email}`,
    JSON.stringify(chatHistory)
  );

}, [chatHistory, user]);

  
  useEffect(() => {
    const savedTheme = localStorage.getItem("darkMode");

    if (savedTheme) {
      setDarkMode(JSON.parse(savedTheme));
    }
  }, []);

  
  useEffect(() => {
    localStorage.setItem(
      "darkMode",
      JSON.stringify(darkMode)
    );
  }, [darkMode]);
  
  useEffect(() => {
  localStorage.setItem(
    "activeChatId",
    JSON.stringify(activeChatId)
  );
}, [activeChatId]);

useEffect(() => {
  const savedId = localStorage.getItem("activeChatId");

  if (
    savedId &&
    savedId !== "null"
  ) {
    setActiveChatId(JSON.parse(savedId));
  }
}, []);

useEffect(() => {

  const unsubscribe = onAuthStateChanged(
    auth,
    (currentUser) => {

      setUser(currentUser);

    }
  );

  return unsubscribe;

}, []);

async function handleImageUpload(file) {

  if (!file) return;

  const text =
    await extractTextFromImage(file);

  setPdfTexts(prev => [
  ...prev,
  {
    name: file.name,
    text,
    type: "image",
  },
]);

  setMessages(prev => [
    ...prev,
    {
      role: "assistant",
      content:
        "🖼️ Image text extracted successfully.",
    },
  ]);
}
 async function handlePdfUpload(file) {

  if (!file) return;

  try {

    const text =
      await PdfUpload(file);

   setPdfTexts(prev => [
  ...prev,
  {
    name: file.name,
    text: text,
  },
]);

if (activeChatId !== null) {
  setChatHistory(prev =>
    prev.map(chat =>
      chat.id === activeChatId
        ? {
            ...chat,
            pdfTexts: [
              ...(chat.pdfTexts || []),
              {
                name: file.name,
                text: text,
              },
            ],
          }
        : chat
    )
  );
}

    setMessages(prev => [
      ...prev,
      {
        role: "assistant",
        content:
          "📄 PDF text extracted successfully.",
      },
    ]);

  } catch (error) {

    console.error(error);

    setMessages(prev => [
      ...prev,
      {
        role: "assistant",
        content:
          "❌ Unable to read PDF.",
      },
    ]);
  }
}

 
  async function handleAsk(customQuestion = null) {

  const currentQuestion =
    customQuestion || question;

  if (!currentQuestion.trim() || loading)
    return;

 const userMessage = {
  role: "user",
  content: currentQuestion,
};

  
  setMessages((prev) => [...prev, userMessage]);

  
  setQuestion("");

  setLoading(true);

  try {
  const response = await fetch(
    "http://localhost:11434/api/chat",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      

      body: JSON.stringify({
     model: "qwen2.5:7b", 

        messages: [
          
            {
  role: "system",
  content: `
You are StudyBuddy AI 📚🤖.

You are a friendly study companion.

Rules:

- Explain topics in simple words 😊.
- Give short and direct answers.
- Avoid unnecessary paragraphs.
- Use bullet points whenever possible.
- Use emojis naturally.
- Give tricks and memory techniques 🧠.
- Explain coding concepts before giving code.
- Divide long answers into sections.
- Highlight important points with ⭐.
- Focus on understanding, revision, and exam preparation 🎯.
- Encourage students positively.

Special abilities:

📖 Create short notes.
⚡ Give quick revision points.
🧠 Provide mnemonics and shortcuts.
❓ Generate MCQs when asked.
💻 Explain code simply.
🚀 Help students understand instead of memorizing.

Formatting Rules:

- Use headings using ##.
- Leave a blank line between sections.
- Use bullet points whenever possible.
- Keep answers concise unless the user asks for detail.

=========================
IMPORTANT FOR CODE
=========================

Whenever you provide source code:

- ALWAYS wrap EVERY program inside Markdown triple backticks.
- ALWAYS specify the language.
- NEVER output source code as plain text.
- NEVER indent code without triple backticks.
- If there are multiple programs, EACH program must have its OWN code block.
- Give every program a title.
- Write the explanation AFTER the code block.
- Do not merge multiple programs into one code block.

Correct example:

\`\`\`cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Hello World";
    return 0;
}
\`\`\`

Another example:

\`\`\`python
print("Hello World")
\`\`\`

IMPORTANT FOR CODE:

- Always wrap every code snippet inside Markdown triple backticks.
- Always specify the programming language.
- Never output code as plain text.
- If there are multiple programs, put each one in its own code block.
- Give every program a title.
- Write the explanation after the code block.
`,
            },
...(pdfTexts.length
  ? [
      {
        role: "system",
        content: `
The user has uploaded ${pdfTexts.length} document(s).

Instructions:
- Use all uploaded documents when answering.
- If the user says "first PDF", use Document 1.
- If the user says "second PDF", use Document 2.
- If the user mentions a file name, answer from that file.
- If the answer requires information from multiple documents, combine them.

Documents:

${pdfTexts
  .map(
    (pdf, index) => `
Document ${index + 1}
File: ${pdf.name}

${pdf.text}
`
  )
  .join("\n=========================\n")}
`,
      },
    ]
  : []),
          ...messages,

          userMessage,
        ],

        stream: true,
      }),
    }
  );
if (!response.ok) {
  throw new Error("Request failed");
}
  if (!response.body) {
    throw new Error("No response body");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  let fullResponse = "";

  setMessages(prev => [
    ...prev,
    {
      role: "assistant",
      content: "",
    },
  ]);

  while (true) {

    const { done, value } = await reader.read();

    if (done) break;

    const chunk = decoder.decode(value);

    const lines = chunk
      .split("\n")
      .filter(line => line.trim());

    for (const line of lines) {

      try {

        const json = JSON.parse(line);

        if (json.message?.content) {

          fullResponse += json.message.content;

          setMessages(prev => {

            const copy = [...prev];

            copy[copy.length - 1] = {
              role: "assistant",
              content: fullResponse,
            };

            return copy;
          });

        }

      } catch {
        continue;
      }

    }
  }


const assistantMessage = {
  role: "assistant",
  content: fullResponse,
};

const updatedMessages = [
  ...messages,
  userMessage,
  assistantMessage,
];
const titlePrompt = `
Generate a chat title from the FIRST meaningful topic discussed.

Ignore greetings such as:
- hey
- hi
- hello
- good morning

Rules:
- 2 to 5 words.
- Use the first real question/topic.
- Do not use greetings as the title.
- Return only the title.

Conversation:
${updatedMessages
  .slice(0, 6)
  .map(m => m.content)
  .join("\n")}
`;


const titleResponse = await fetch(
  "http://localhost:11434/api/chat",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
   model: "qwen2.5:7b",
      messages: [
        {
          role: "user",
          content: titlePrompt,
        },
      ],
      stream: false,
    }),
  }
);

const titleData = await titleResponse.json();

const generatedTitle =
  titleData.message.content.trim();


if (activeChatId === null) {

  const newChat = {
    id: Date.now(),
    title: generatedTitle || "New Chat",
    messages: updatedMessages,
    pdfTexts,
  };

  setChatHistory(prev => [...prev, newChat]);
  setActiveChatId(newChat.id);

}
else {

  setChatHistory(prev =>
    prev.map(chat =>
      chat.id === activeChatId
        ? {
            ...chat,
            title: generatedTitle || chat.title,
            messages: updatedMessages,
            pdfTexts,
          }
        : chat
    )
  );

}

  } catch (error) {
    console.error(error);

    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: "Unable to get response.",
      },
    ]);
  } finally {
    setLoading(false);
  }
}

  return (
    <div
      className={
        darkMode
          ? "main-container dark"
          : "main-container"
      }
    >
      <ChatSidebar
  chatHistory={chatHistory}
  searchTerm={searchTerm}
  setSearchTerm={setSearchTerm}
  setMessages={setMessages}
  setChatHistory={setChatHistory}
  activeChatId={activeChatId}
  setActiveChatId={setActiveChatId}
  setPdfTexts={setPdfTexts}
/>

      <div className="card">
      <Header
  darkMode={darkMode}
  setDarkMode={setDarkMode}
  messages={messages}
  chatHistory={chatHistory}
  setChatHistory={setChatHistory}
  setMessages={setMessages}
  setQuestion={setQuestion}
  setActiveChatId={setActiveChatId}
  setPdfTexts={setPdfTexts}
/>
       <ChatWindow
  messages={messages}
  loading={loading}
  chatEndRef={chatEndRef}
/>

<InputBox
  question={question}
  setQuestion={setQuestion}
  handleAsk={handleAsk}
  loading={loading}
  messages={messages}
  handleImageUpload={handleImageUpload}
  handlePdfUpload={handlePdfUpload}
/>

      </div>
    </div>
  );
}

export default AskStudyBuddy;