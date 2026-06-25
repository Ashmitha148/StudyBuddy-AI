import { useState } from "react";
function Summary() {
    const [showSummary, setShowSummary] = useState(false);
    return (
        <div className ="card">
            <button onClick={() => setShowSummary(true)}>
                Generate Summary
            </button>
            {showSummary ?
                <h2>Summary Generated Successfully!</h2>
                :
                <h2>No Summary Yet</h2>
            }
        </div>
    );
}
export default Summary;