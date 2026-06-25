import { useState } from "react";

function Form() {

  const [topic, setTopic] = useState("");

  return (
    <input
      type="text"
      value={topic}
      onChange={(e) => setTopic(e.target.value)}
    />
  );
}

export default Form;