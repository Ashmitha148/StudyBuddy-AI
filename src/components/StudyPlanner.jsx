function StudyPlanner() {

  const plans = [
    "Day 1 : Learn Concepts",
    "Day 2 : Practice Questions",
    "Day 3 : Revise Important Topics",
    "Day 4 : Solve Previous Papers",
    "Day 5 : Final Revision"
  ];

  return (
    <div className ="card">

      <h1>Study Planner</h1>

      {
        plans.map((plan, index) => (
          <h3 key={index}>
            📅 {plan}
          </h3>
        ))
      }

    </div>
  );
}

export default StudyPlanner;