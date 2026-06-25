import Tesseract from "tesseract.js";

async function extractTextFromImage(file) {
  const result = await Tesseract.recognize(
    file,
    "eng"
  );

  return result.data.text;
}

export default extractTextFromImage;