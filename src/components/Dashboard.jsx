function Dashboard() {

  const sections = [
    "Recent Searches",
    "Study Streak",
    "Uploaded PDFs",
    "Completed Topics",
    "Weekly Progress"
  ];

  return (
    <div className ="card">   

      <h1>Dashboard</h1>

      {
        sections.map((section, index) => (
          <h3 key={index}>
            📊 {section}
          </h3>
        ))
      }

    </div>
  );
}

export default Dashboard;