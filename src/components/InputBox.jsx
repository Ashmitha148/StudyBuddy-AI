import {
  FaPaperPlane,
  FaMicrophone,
  FaCamera,
  FaFilePdf,
} from "react-icons/fa";

import { jsPDF } from "jspdf";

function InputBox({
  question,
  setQuestion,
  handleAsk,
  loading,
  messages = [],
  handleImageUpload,
  handlePdfUpload,
}) {

  function downloadPdf() {

    const doc = new jsPDF();

    const content = messages
      .map(
        (msg) =>
          `${msg.role.toUpperCase()}\n${msg.content}`
      )
      .join("\n\n");

    const lines =
      doc.splitTextToSize(
        content,
        180
      );

    doc.text(lines, 10, 10);

    doc.save("StudyBuddy-Notes.pdf");
  }
function startVoiceInput() {

  console.log("MIC CLICKED");

  const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

  console.log(SpeechRecognition);

  if (!SpeechRecognition) {
    alert(
      "Speech recognition not supported"
    );
    return;
  }

  const recognition = new SpeechRecognition();

recognition.lang = "en-US";

recognition.onstart = () => {
  console.log("LISTENING...");
};

recognition.onresult = (event) => {
  const transcript =
    event.results[0][0].transcript;

  console.log("VOICE:", transcript);

  setQuestion(transcript);

  setTimeout(() => {
  handleAsk(transcript);
}, 300);
};

recognition.onerror = (event) => {
  console.log("ERROR:", event.error);
};

recognition.onend = () => {
  console.log("ENDED");
};

recognition.start();
}
  return (
    <div className="input-section">

      <div className="input-box">

        <input
          type="text"
          placeholder="Message StudyBuddy..."
          value={question}
          onChange={(e) =>
            setQuestion(e.target.value)
          }
         onKeyDown={(e) => {
  if (e.key === "Enter" && !loading) {
    console.log("ENTER PRESSED");
    e.preventDefault();
    handleAsk();
  }
}}
        />

        <button
          className="send-button"
          onClick={handleAsk}
          disabled={loading}
        >
          <FaPaperPlane />
        </button>

      </div>

      <div className="input-icons">

      <label
  htmlFor="pdf-upload"
  className="tool-icon"
>
 <FaFilePdf
  size={22}
  color="white"
/>
</label>

<input
  id="pdf-upload"
  type="file"
  accept=".pdf"
  style={{ display: "none" }}
  onChange={(e) => {
    if (e.target.files[0]) {
      handlePdfUpload(
        e.target.files[0]
      );
    }
  }}
/>


<label
  htmlFor="image-upload"
  className="tool-icon"
>
  <FaCamera
  size={22}
  color="white"
/>
</label>


<label
  className="tool-icon"
  title="Voice Input"
  onClick={startVoiceInput}
>
  <FaMicrophone
  size={22}
  color="white"
/>


</label>


<input
  id="image-upload"
  type="file"
  accept="image/*"
  style={{ display: "none" }}
  onChange={(e) => {
    console.log("IMAGE SELECTED");

    if (e.target.files[0]) {
      handleImageUpload(
        e.target.files[0]
      );
    }
  }}
/>

      </div>

    </div>
  );
}

export default InputBox;