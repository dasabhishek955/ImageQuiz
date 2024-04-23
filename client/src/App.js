import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Test from './component/Test';
import ImageUploader from './component/ImageUploader';
import Result from './component/Result'

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/Test" element={<Test />} />
        <Route exact path="/ImageUploader" element={<ImageUploader />} />
        <Route exact path="/Result" element={<Result />} />
      </Routes>
    </Router>
  );
}

export default App;
