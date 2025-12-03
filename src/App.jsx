import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Events from './pages/Events';
import Membership from './pages/Membership';
import EventDetail from './pages/EventDetail';
import Info from './pages/Info';
import Studio from './pages/Studio';

function App() {
  return (
    <Router basename="/website-test">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/event/:eventId" element={<EventDetail />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/info" element={<Info />} />
        <Route path="/studio" element={<Studio />} />
      </Routes>
    </Router>
  );
}

export default App;
