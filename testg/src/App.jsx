import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Home from './Components/Home.jsx';
import COPE from './Components/Events/COPE.jsx';
import COPE2 from './Components/COPE2/COPE2.jsx'
import Delegation from './Components/Events/Delegation.jsx';
import DSUMUN1 from './Components/Events/DSUMUN1.jsx';
import Secretariat from './Components/Secretariat/Secretariat.jsx';
import DSUMUN2 from './Components/Events/DSUMUN2/DSUMUN2.jsx';
import Others from './Components/Events/Others.jsx';
import Eb from './Components/Events/DSUMUN2/Eb.jsx';
import './App.css';

function LoadingScreen() {
  return (
    <div id="loading-screen">
      <img src="/img/logo_white.png" alt="MUNSOC Logo" id="loading-logo" width="200" height="200" />
    </div>
  );
}

function AppContent() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [location]);

  return (
    <>
      {loading && <LoadingScreen />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cope2" element={<COPE2 />} />
        <Route path="/events/cope" element={<COPE />} />
        <Route path="/events/dsumun2" element={<DSUMUN2 />} />
        <Route path="/events/delegation" element={<Delegation />} />
        <Route path="/events/dsumun1" element={<DSUMUN1 />} />
        <Route path="/secretariat" element={<Secretariat />} />
        <Route path="/events/others" element={<Others />} />
        <Route path="/dsumun2/executive-board" element={<Eb />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
