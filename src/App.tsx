import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import './App.css'; // Import the external CSS file
import Home from './pages/Home';
import Lesson from './pages/Lesson';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Home Route */}
        <Route path="/" element={<Home />} />

        {/* Lesson Route */}
        <Route path="/lesson/:id" element={<Lesson />} />
      </Routes>
    </Router>
  );
}

export default App;