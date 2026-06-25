# 📚 StudyBuddy AI

React • Vite • JavaScript • Firebase • Ollama • Qwen2.5:7B • PDF.js • Tesseract.js

An AI-powered study assistant that helps students learn smarter using PDFs, images, voice, and AI.

---

## What is this?

StudyBuddy AI is a learning assistant designed to simplify studying. Instead of switching between multiple resources, students can upload PDFs or images, ask questions, generate summaries, create MCQs, and get programming help—all in one place.

The application supports voice input, maintains chat history, and provides AI-generated explanations to make revision faster and more interactive.

---

## Why I built this

Many students spend more time searching for information than actually studying. I wanted to build a single platform where learning materials could be uploaded, analyzed, and used to answer questions instantly.

The most challenging part of the project was handling multiple uploaded documents together while maintaining conversation context and presenting AI-generated code in a clean, readable format with syntax highlighting and per-code-block copy functionality.

---

## Screenshots

**HOMESCREEN**
<img width="1440" height="823" alt="image" src="https://github.com/user-attachments/assets/126baeb9-aadc-488e-a91d-4e950b4e4452" />
**CHAT INTERFACE**
<img width="1427" height="829" alt="Screenshot 2026-06-26 at 12 52 49 AM" src="https://github.com/user-attachments/assets/970c8ac9-d011-4717-bac1-3bfc76c49c79" />
**PDF UPLOAD**
<img width="1441" height="803" alt="image" src="https://github.com/user-attachments/assets/23dcae45-a600-4713-a928-41ffcedfa6ac" />
**Image OCR**
<img width="1417" height="786" alt="Screenshot 2026-06-26 at 1 02 42 AM" src="https://github.com/user-attachments/assets/e7a7e7d2-337e-48e6-936b-30099a594466" />



---

## Features

- AI-powered study assistant
- PDF upload and analysis
- Multi-document support
- Image OCR (text extraction)
- Voice input using microphone
- Summary and short note generation
- MCQ generation
- Programming explanations with syntax highlighting
- One-click copy for individual code blocks
- Chat history
- Chat search
- Automatic chat title generation
- Dark mode
- Firebase Authentication
- Responsive user interface

---

## Architecture

The frontend is built using React and Vite. Firebase Authentication manages user login, while Ollama runs the Qwen2.5:7B model locally for AI inference.

Uploaded PDFs are processed using PDF.js, images are converted to text through OCR, and the extracted content is supplied to the language model so responses remain relevant to the uploaded study material.

Chats are stored locally to preserve conversation history, while React Markdown and React Syntax Highlighter are used to render formatted responses and code snippets.

---

## Tech Stack

### Frontend

- React.js
- Vite
- JavaScript
- CSS

### AI & Backend

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

## Running Locally

Clone the repository

```bash
git clone https://github.com/Ashmitha148/StudyBuddy-AI.git
```

Move into the project folder

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

## Resume Highlights

- Developed an AI-powered study assistant with support for text, voice, PDF, and image-based learning.
- Implemented multi-document question answering using locally processed study materials.
- Built AI-powered summary generation, MCQ generation, and programming assistance using the Qwen2.5:7B model.
- Designed an interactive chat interface with syntax-highlighted code, individual code copy, chat history, and automatic chat title generation.
- Integrated Firebase Authentication and built a responsive user interface using React and Vite.

---

## What's Next

- Text-to-Speech support
- Flashcards
- Study planner
- Multiple AI model support
- Cloud synchronization
- Multi-language support

---

## License

This project is intended for educational purposes.

Built by **Ashmitha**
