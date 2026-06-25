function FormulaSheetGenerator() {

  const formulas = [
    "Formula 1",
    "Formula 2",
    "Formula 3",
    "Formula 4",
    "Formula 5"
  ];

  return (
    <div className ="card">

      <h1>Formula Sheet</h1>

      {
        formulas.map((formula, index) => (
          <h3 key={index}>
             {formula}
          </h3>
        ))
      }

    </div>
  );
}

export default FormulaSheetGenerator;