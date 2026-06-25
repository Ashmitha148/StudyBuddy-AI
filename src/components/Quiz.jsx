function Quiz() {

  const questions = [
    "What is OOP?",
    "What is Encapsulation?",
    "What is Polymorphism?"
  ];

  return (
    <div className ="card">

      <h1>Quiz Questions</h1>

      {
        questions.map((question, index) => (
          <h3 key={index}>
            {index + 1}. {question}
          </h3>
        ))
      }

    </div>
  );
}

export default Quiz;