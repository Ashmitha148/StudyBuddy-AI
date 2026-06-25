import terms from "../Data/term";

function ImportantTerms({ topic }) {

  const importantTerms = terms[topic] || [];

  return (
    <div className ="card">
      <h1>Important Terms</h1>

      {
        importantTerms.map((term, index) => (
          <h3 key={index}>
            {term}
          </h3>
        ))
      }

    </div>
  );
}

export default ImportantTerms;