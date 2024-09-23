import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import RecordingStorage from "./pages/RecordingStorage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/record-storage" element={<RecordingStorage />} />
          </Routes>
      </Router>
    </>
  )
}

export default App
