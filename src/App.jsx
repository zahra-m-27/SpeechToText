import Archive from "./Pages/Archive/Archive";
import SpeechConversion from "./Pages/SpeechConversion/SpeechConversion";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SpeechConversion />} />
      <Route path="/speech-conversion" element={<SpeechConversion />} />
      <Route path="/archive" element={<Archive />} />
    </Routes>
  );
}

export default App;
