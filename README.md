# 📚 StudyBuddy AI

StudyBuddy AI is a web-based learning assistant built to make studying easier and more interactive. It allows students to ask questions, upload study materials, summarize content, generate MCQs, and understand programming concepts with the help of AI.

The application also supports PDF and image analysis, voice input, and maintains chat history to provide a smooth learning experience.

---

## Features

- AI-powered study assistant
- PDF upload and analysis
- Multiple document support
- Image text extraction (OCR)
- Voice input using microphone
- Summary and short notes generation
- MCQ generation for revision
- Programming help with syntax-highlighted code
- One-click code copy
- Chat history and search
- Automatic chat title generation
- Dark mode
- Firebase Authentication
- Real-time AI responses
- Responsive user interface

---

## Tech Stack

### Frontend
- React.js
- Vite
- JavaScript
- CSS

### Backend & AI
- Ollama
- Qwen2.5:7B
- Firebase Authentication

### Libraries
- React Markdown
- React Syntax Highlighter
- PDF.js
- Tesseract.js
- React Icons

---

## Project Structure

```text
src/
├── components/
├── assets/
├── firebase.js
├── App.jsx
└── main.jsx
```

---

## Getting Started

Clone the repository

```bash
git clone https://github.com/Ashmitha148/StudyBuddy-AI.git
```

Navigate to the project folder

```bash
cd StudyBuddy-AI
```

Install dependencies

```bash
npm install
```

Create a `.env` file and add your Firebase configuration.

Download the AI model

```bash
ollama pull qwen2.5:7b
```

Run the application

```bash
npm run dev
```

---

## AI Model

This project uses the **Qwen2.5:7B** model through **Ollama** to generate AI responses.

---

## Future Improvements

- Text-to-Speech support
- Flashcards for revision
- Study planner
- Cloud chat synchronization
- Multiple AI model support
- Multi-language support

---

## Developed By

**Ashmitha**

---

## License

This project is intended for educational purposes.
