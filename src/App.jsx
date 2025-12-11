import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Events from './pages/Events';
import Membership from './pages/Membership';
import EventDetail from './pages/EventDetail';
import Info from './pages/Info';
import About from './pages/About';
import PosterLanding from './pages/PosterLanding';
import Home2 from './pages/Home2';
import PrivacyPolicy from './pages/PrivacyPolicy';
import DJApplication from './pages/DJApplication';


function App() {
  return (
    <Router basename="/website-test">
      <div className="app-wrapper">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home2 />} />
            <Route path="/home-old" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/event/:eventId" element={<EventDetail />} />
            <Route path="/membership" element={<Membership />} />
            <Route path="/info" element={<Info />} />
            <Route path="/about" element={<About />} />
            <Route path="/minimal" element={<PosterLanding />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/dj-application" element={<DJApplication />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
