import { jsPDF } from "jspdf";

function PdfExport({ messages }) {
  const downloadPdf = () => {
    const doc = new jsPDF();

    const content = messages
      .map(
        (msg) =>
          `${msg.role.toUpperCase()}\n${msg.content}\n`
      )
      .join("\n\n");

    const lines = doc.splitTextToSize(
      content,
      180
    );

    doc.text(lines, 10, 10);

    doc.save("StudyBuddy-Notes.pdf");
  };

  return (
    <button
      className="pdf-download-btn"
      onClick={downloadPdf}
    >
      📄 Download PDF
    </button>
  );
}

export default PdfExport;