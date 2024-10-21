
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home2 from './components/Home';
// import Privacy from './components/Privacy';
// import Terms from './components/Terms';
import Home from './pages/Home'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
    </Router>
  );
}

export default App;
