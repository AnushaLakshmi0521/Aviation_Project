
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layout & Pages
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import CurriculumView from "./components/CurriculumView";
import AboutUs from "./components/AboutUs";
import Batches from "./components/Batches";
import Fees from "./components/Fees";
import Placements from "./components/Placements";
import Apply from "./components/Apply";
import Admissions from "./components/Admissions";
import ContactUs from "./components/ContactUs";
import WhiteCollar from "./pages/WhiteCollar";
import BlueCollar from "./pages/BlueCollar";
import FloatingAIButton from "./components/FloatingAIButton";
import Models from "./components/Models";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/curriculum" element={<CurriculumView />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/batches" element={<Batches />} />
        <Route path="/fees" element={<Fees />} />
        <Route path="/placements" element={<Placements />} />
        <Route path="/apply" element={<Apply />} />
        <Route path="/admissions" element={<Admissions />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/white-collar" element={<WhiteCollar />} />
        <Route path="/blue-collar" element={<BlueCollar />} />
        <Route path="/models" element={<Models />} />
      </Routes>

      {/* 👇 ADD THIS (GLOBAL FLOATING CHAT) */}
     <FloatingAIButton />

      <footer className="footer">
        <div className="container">
          <h2>SkyCrest Aviation and Modelling Training</h2>
          <p>
            India's most accessible aviation ground training programme built for aspiring aviation professionals.
          </p>
          <div className="footerBottom">
            © 2026 SkyCrest. All Rights Reserved.
          </div>
        </div>
      </footer>

    
    </BrowserRouter>
  );
}

export default App;