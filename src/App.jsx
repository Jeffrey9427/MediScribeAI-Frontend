import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import RecordingStorage from "./pages/RecordingStorage";
import SpeechRecord from "./pages/SpeechRecord";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/record-storage" element={<RecordingStorage />} />
          <Route path="/" element={<SpeechRecord />} />
          </Routes>
      </Router>
    </>
  )
}

export default App
