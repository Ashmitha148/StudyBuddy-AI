function ProgressTracker() {

  const progress = [
    "Completed Topics : 12",
    "Pending Topics : 5",
    "Revision Completed : 8"
  ];

  return (
    <div className= "card">

      <h1>Progress Tracker</h1>

      {
        progress.map((item, index) => (
          <h3 key={index}>
            ✔ {item}
          </h3>
        ))
      }

    </div>
  );
}

export default ProgressTracker;