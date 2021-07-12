import axios from "axios";
import { useState } from "react";
import "./App.css";

function App() {
  const [benchmarkName, setBenchmarkName] = useState("")
  const [benchmarkResults, setBenchmarkResults] = useState([])


  const startBenchmarking = () => {
  }
  return (
    <div class="container py-4">
      <div class="row justify-content-center">
        <div class="col-4">
          <input
            class="w-100 form-control"
            type="text"
            placeholder="Test Name"
            value={benchmarkName}
            onChange={(e) => setBenchmarkName(e.target.value)}
          />
        </div>
        <div class="col-1">
          <button onClick={startBenchmarking} class="btn btn-primary">Start</button>
        </div>
      </div>
    </div>
  );
}

export default App;
