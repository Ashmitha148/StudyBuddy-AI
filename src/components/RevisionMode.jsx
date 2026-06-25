function RevisionMode() {

  const revisionItems = [
    "Top Questions",
    "Important Terms",
    "Key Points",
    "Formula Sheet",
    "FAQs"
  ];

  return (
    <div className ="card">

      <h1>Revision Mode</h1>

      {
        revisionItems.map((item, index) => (
          <h3 key={index}>
            ✓ {item}
          </h3>
        ))
      }

    </div>
  );
}

export default RevisionMode;