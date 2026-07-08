
import React, { useState } from "react";

// Appending unique cache-busters to prevent Chromium's multi-tag stream buffering collision
const baseAb1 = "https://res.cloudinary.com/doihibg9v/video/upload/v1783504939/ab1_hhvzfw.mp4";
const baseAb2 = "https://res.cloudinary.com/doihibg9v/video/upload/v1783508509/ab2_jjtj97.mp4";

const ab1_hero = `${baseAb1}?stream=hero`;
const ab1_tour = `${baseAb1}?stream=tour`;
const ab2_tour = `${baseAb2}?stream=tour`;

function AboutUs() {
  // Interactive State for the Core Career Tracks
  const [activeTrack, setActiveTrack] = useState(0);

  const stats = [
    { value: "California", label: "Global Roots" },
    { value: "5+", label: "Regional Training Centers" },
    { value: "10+", label: "Batches Graduated Annually" },
    { value: "100%", label: "Placement Accountability" },
  ];

  const centers = [
    { name: "Jyothy ICM Campus", location: "South Bengaluru (Head Office)", region: "Bengaluru Core" },
    { name: "Rajajinagar Center", location: "North Bengaluru", region: "Bengaluru Core" },
    { name: "The Elegant Institute", location: "Hubballi, Karnataka", region: "North Karnataka" },
    { name: "Shri Shankar College", location: "Navalgund, Karnataka", region: "North Karnataka" },
    { name: "Fantasy Foundation", location: "Solapur, Maharashtra", region: "Maharashtra Belt" },
  ];

  const coreTracks = [
    {
      title: "White-Collar Career Track",
      icon: "✈️",
      focus: "Passenger-Facing & Corporate Management",
      desc: "Tailored for premium service execution. Prepares candidates for high-profile client ecosystems requiring world-class grooming standards, native fluency in global aviation vocabulary, and core system navigation competencies.",
      roles: ["Cabin Crew Management", "Hospitality Management", "Airport Lounge Supervision", "VIP Customer Facilitation"],
      badge: "Corporate Elite"
    },
    {
      title: "Blue-Collar Career Track",
      icon: "⚙️",
      focus: "Technical Airside & Ground Operations",
      desc: "Engineered around rigorous terminal logistics, heavy aircraft technical coordination, and absolute airside safety compliance standards. Focuses on the physical engine powering airfield metrics.",
      roles: ["Airport Ground Handling", "Dangerous Goods (DG) Regulations", "Aircraft Load Control", "Air Cargo & Logistics Hub Ops"],
      badge: "Technical Operations"
    }
  ];

  const specializedLabs = [
    {
      title: "Aviation Grooming Studio",
      icon: "💄",
      desc: "A professional corporate vanity lab simulating elite airline presentation baselines. Students undergo strict evaluation on wardrobe protocols, skin care compliance, uniform posture alignments, and social etiquette symmetry."
    },
    {
      title: "Airport Check-In & Mock Counter",
      icon: "🧳",
      desc: "A live terminal simulator environment enabling hands-on practice. Students manipulate operational baggage tagging protocols, execute passenger manifest security screenings, and handle ticket issuance processing via Amadeus terminal logic."
    },
    {
      title: "Safety & Emergency Procedures (SEP) Lab",
      icon: "🚨",
      desc: "A highly technical hazard lab equipped with simulated decompression systems, functional oxygen distribution rigs, life vests, and evacuation pathway guides for high-stress crisis simulation drills."
    }
  ];

  return (
    <div style={{ background: "#f8fafc", minHeight: "100vh", color: "#0f172a", fontFamily: "system-ui, -apple-system, sans-serif", overflowX: "hidden" }}>
      
      {/* GLOBAL STYLES & RESPONSIVE RESETS */}
      <style>
        {`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(40px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
          .hover-lift {
            transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease !important;
          }
          .hover-lift:hover {
            transform: translateY(-8px);
            box-shadow: 0 25px 50px -12px rgba(2, 6, 23, 0.12) !important;
            border-color: #cbd5e1 !important;
          }
          .track-card {
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
          }
          @media (max-width: 992px) {
            .tour-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
            .tour-video-box { grid-template-columns: 1fr !important; }
          }
          @media (max-width: 768px) {
            .hero-title { font-size: 34px !important; }
            .section-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
            .tab-container { flex-direction: column !important; width: 100% !important; }
            .lab-card { grid-template-columns: 1fr !important; text-align: center !important; justify-items: center !important; }
            .badge-stack { flex-direction: column !important; gap: 10px !important; align-items: center !important; }
          }
        `}
      </style>

      {/* PROFESSIONAL VIDEO HERO SECTION */}
      <section style={{
        position: "relative",
        minHeight: "90vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#ffffff",
        padding: "120px 20px 80px",
        textAlign: "center",
        overflow: "hidden",
        backgroundColor: "#020617"
      }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: "translate(-50%, -50%)",
            zIndex: 1,
            opacity: "1" 
          }}
        >
          <source src={ab1_hero} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Hero Content Box */}
        <div className="animate-fade-in" style={{ maxWidth: "1050px", margin: "0 auto", position: "relative", zIndex: 3 }}>
          
          {/* HIGHLIGHTED TRANSITION BADGES */}
          <div className="badge-stack" style={{ display: "flex", justifyContent: "center", gap: "12px", marginBottom: "20px", flexWrap: "wrap" }}>
            <span style={{ 
              color: "#cbd5e1", 
              fontSize: "11px", 
              fontWeight: "700", 
              letterSpacing: "2px", 
              textTransform: "uppercase",
              background: "rgba(2, 6, 23, 0.7)", 
              padding: "6px 16px",
              borderRadius: "50px",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              backdropFilter: "blur(4px)"
            }}>
              🇺🇸 Originated in California
            </span>
            <span style={{ 
              color: "#E2A329", 
              fontSize: "11px", 
              fontWeight: "700", 
              letterSpacing: "2px", 
              textTransform: "uppercase",
              background: "rgba(2, 6, 23, 0.7)",
              padding: "6px 16px",
              borderRadius: "50px",
              border: "1px solid rgba(226, 163, 41, 0.4)",
              backdropFilter: "blur(4px)"
            }}>
              🇮🇳 Now Launching In India
            </span>
          </div>
          
          <h1 className="hero-title" style={{ 
            fontSize: "60px", 
            fontWeight: "900", 
            marginTop: "16px", 
            marginBottom: "24px", 
            lineHeight: "1.2", 
            letterSpacing: "-1.5px",
            textShadow: "0 4px 12px rgba(0,0,0,0.7)" 
          }}>
            <span style={{ color: "#E2A329" }}>SkyCrest &</span> <br/>
            Jyothy Cirruss School of Aviation
          </h1>
          
          <p style={{ 
            fontSize: "20px", 
            color: "rgba(255,255,255,0.95)", 
            lineHeight: "1.75", 
            maxWidth: "880px", 
            margin: "0 auto", 
            fontWeight: "400",
            textShadow: "0 2px 8px rgba(0,0,0,0.8)"
          }}>
            Bringing elite global flight service ecosystems directly to India. Built on premium operational models perfected in <strong>California</strong> and accelerated by the multi-decade industrial legacy of the <strong>Jyothy Group</strong>, we transform regional talent into high-readiness airfield assets within 90 days.
          </p>
        </div>
      </section>

      {/* INDUSTRIAL LEGACY & GLOBAL TRANSITION SUMMARY */}
      <section style={{ padding: "120px 20px 60px", maxWidth: "1200px", margin: "0 auto" }}>
        <div className="section-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>
          <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div style={{ color: "#E2A329", fontWeight: "700", fontSize: "14px", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "8px" }}>
              Global Standards meets Local Potential
            </div>
            <h2 style={{ fontSize: "40px", fontWeight: "800", color: "#020617", marginBottom: "24px", lineHeight: "1.2", letterSpacing: "-0.5px" }}>
              From California Runways <br/>to Indian Aviation Hubs
            </h2>
            <p style={{ color: "#475569", fontSize: "16px", lineHeight: "1.8", marginBottom: "20px" }}>
              <strong>Skycrest Aviation</strong> breaks geographic constraints by translating high-end corporate cabin protocols and airline technical systems from its original California blueprint into India's rapid-growth infrastructure. 
            </p>
            <p style={{ color: "#475569", fontSize: "16px", lineHeight: "1.8" }}>
              In an exclusive alliance with <strong>CollabForce</strong> and running under the structural umbrella of the 50-year-old <strong>Jyothy Group</strong>, our centers specialize heavily in identifying talents from rural belts, Tier-2, and Tier-3 urban segments across India—equipping them with matching international air operator criteria.
            </p>
          </div>

          {/* STATS GRID */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
            {stats.map((stat, idx) => (
              <div 
                key={idx} 
                className="hover-lift"
                style={{ 
                  background: "#ffffff", 
                  padding: "45px 24px", 
                  borderRadius: "24px", 
                  border: stat.label === "Global Roots" ? "1px solid #E2A329" : "1px solid #e2e8f0", 
                  textAlign: "center", 
                  boxShadow: "0 10px 25px -5px rgba(2, 6, 23, 0.02)",
                  cursor: "default",
                  position: "relative"
                }}
              >
                {stat.label === "Global Roots" && (
                  <span style={{ position: "absolute", top: "12px", right: "12px", fontSize: "14px" }}>🇺🇸</span>
                )}
                <div style={{ fontSize: "36px", fontWeight: "800", color: "#020617", marginBottom: "6px", letterSpacing: "-1px" }}>{stat.value}</div>
                <div style={{ fontSize: "11px", fontWeight: "700", color: "#64748b", textTransform: "uppercase", letterSpacing: "1.5px" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FIXED MODULE: SKYCREST TOUR WITH TWO VIDEOS */}
      <section style={{ padding: "0 20px 120px", maxWidth: "1200px", margin: "0 auto" }}>
        <div className="tour-grid" style={{
          background: "linear-gradient(135deg, #0f172a 0%, #020617 100%)",
          borderRadius: "32px",
          padding: "50px",
          color: "#ffffff",
          display: "grid",
          gridTemplateColumns: "1fr 1.2fr",
          gap: "50px",
          alignItems: "center",
          boxShadow: "0 30px 60px -15px rgba(2, 6, 23, 0.3)"
        }}>
          <div>
            <span style={{ color: "#E2A329", fontWeight: "700", fontSize: "12px", letterSpacing: "2px", textTransform: "uppercase" }}>
              Global Footprint Mapping
            </span>
            <h3 style={{ fontSize: "32px", fontWeight: "800", marginTop: "8px", marginBottom: "16px", letterSpacing: "-0.5px", lineHeight: "1.3" }}>
              Skycrest Legacy:<br/>California to India
            </h3>
            <p style={{ color: "#94a3b8", fontSize: "15px", lineHeight: "1.8", marginBottom: "16px" }}>
              Originating from premium aviation proving grounds in **California**, Skycrest developed rigorous cabin workflows, simulation architectures, and strict evaluation baselines approved by international standard ecosystems.
            </p>
            <p style={{ color: "#94a3b8", fontSize: "15px", lineHeight: "1.8", margin: 0 }}>
              Now transitioning directly into **India**, we replicate this high-fidelity framework. Our systems deploy specialized mock layouts and predictive lab modeling to convert raw localized potential into elite, runway-ready global aviation personnel.
            </p>
          </div>
          
          {/* Two Side-By-Side Video Assets Holder */}
          <div className="tour-video-box" style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px"
          }}>
            {/* Video 1: California Proving Grounds */}
            <div style={{
              position: "relative",
              borderRadius: "20px",
              overflow: "hidden",
              aspectRatio: "4/5",
              boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
              border: "1px solid rgba(255,255,255,0.08)",
              backgroundColor: "#020617"
            }}>
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              >
                <source src={ab1_tour} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div style={{ position: "absolute", bottom: "12px", left: "12px", background: "rgba(2,6,23,0.85)", padding: "4px 10px", borderRadius: "6px", fontSize: "11px", color: "#E2A329", fontWeight: "600", zIndex: 2 }}>
                🇺🇸 California Model
              </div>
            </div>

            {/* Video 2: India Training Systems */}
            <div style={{
              position: "relative",
              borderRadius: "20px",
              overflow: "hidden",
              aspectRatio: "4/5",
              boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
              border: "1px solid rgba(255,255,255,0.08)",
              backgroundColor: "#020617"
            }}>
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              >
                <source src={ab2_tour} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div style={{ position: "absolute", bottom: "12px", left: "12px", background: "rgba(2,6,23,0.85)", padding: "4px 10px", borderRadius: "6px", fontSize: "11px", color: "#E2A329", fontWeight: "600", zIndex: 2 }}>
                🇮🇳 Indian Simulation Centres
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE TRACK SYSTEM */}
      <section style={{ background: "#020617", color: "#ffffff", padding: "120px 20px", position: "relative" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          
          <div style={{ marginBottom: "60px", textAlign: "center" }}>
            <h2 style={{ fontSize: "42px", fontWeight: "800", marginBottom: "16px", letterSpacing: "-0.5px" }}>Two Structured Professional Tracks</h2>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "17px", maxWidth: "600px", margin: "0 auto" }}>
              Select a discipline pathway below to evaluate specific terminal operational deployment directives.
            </p>
          </div>

          {/* Tab Controls */}
          <div className="tab-container" style={{ display: "flex", justifyContent: "center", gap: "16px", marginBottom: "60px" }}>
            {coreTracks.map((track, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTrack(idx)}
                style={{
                  background: activeTrack === idx ? "#E2A329" : "rgba(255, 255, 255, 0.03)",
                  color: activeTrack === idx ? "#020617" : "#ffffff",
                  border: activeTrack === idx ? "1px solid #E2A329" : "1px solid rgba(255,255,255,0.1)",
                  padding: "16px 32px",
                  borderRadius: "50px",
                  fontSize: "15px",
                  fontWeight: "700",
                  cursor: "pointer",
                  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                  boxShadow: activeTrack === idx ? "0 12px 30px rgba(226, 163, 41, 0.25)" : "none"
                }}
              >
                {track.icon} &nbsp; {track.title}
              </button>
            ))}
          </div>

          {/* Dynamic Track Panel */}
          <div 
            key={activeTrack}
            className="animate-fade-in track-card"
            style={{ 
              background: "rgba(255,255,255,0.02)", 
              border: "1px solid rgba(255,255,255,0.07)", 
              borderRadius: "32px", 
              padding: "50px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "60px",
              alignItems: "center"
            }}
          >
            <div>
              <span style={{ color: "#E2A329", fontSize: "12px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "2px", display: "block", marginBottom: "16px" }}>
                🎯 {coreTracks[activeTrack].badge}
              </span>
              <h3 style={{ fontSize: "32px", fontWeight: "800", marginBottom: "8px" }}>{coreTracks[activeTrack].title}</h3>
              <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "14px", fontWeight: "600", marginBottom: "24px" }}>{coreTracks[activeTrack].focus}</p>
              <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "16px", lineHeight: "1.8", margin: 0 }}>{coreTracks[activeTrack].desc}</p>
            </div>

            <div style={{ background: "rgba(15, 23, 42, 0.6)", borderRadius: "24px", padding: "40px", border: "1px solid rgba(255,255,255,0.05)" }}>
              <h4 style={{ fontSize: "14px", fontWeight: "700", color: "#E2A329", marginBottom: "24px", textTransform: "uppercase", letterSpacing: "1.5px" }}>
                Target Placement Directives:
              </h4>
              <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "16px" }}>
                {coreTracks[activeTrack].roles.map((role, rIdx) => (
                  <div key={rIdx} style={{ display: "flex", alignItems: "center", gap: "14px", fontSize: "15px", color: "rgba(255,255,255,0.9)" }}>
                    <span style={{ 
                      width: "24px", 
                      height: "24px", 
                      background: "rgba(226, 163, 41, 0.15)", 
                      borderRadius: "50%", 
                      display: "flex", 
                      alignItems: "center", 
                      justifyContent: "center",
                      color: "#E2A329",
                      fontSize: "11px",
                      flexShrink: 0,
                      fontWeight: "bold"
                    }}>✓</span> 
                    {role}
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SIMULATION INFRASTRUCTURE CARDS */}
      <section style={{ padding: "120px 20px", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "80px" }}>
          <span style={{ color: "#E2A329", fontSize: "12px", fontWeight: "700", letterSpacing: "3px", textTransform: "uppercase" }}>Tactile Asset Integration</span>
          <h2 style={{ fontSize: "40px", fontWeight: "800", color: "#020617", marginTop: "12px", letterSpacing: "-0.5px" }}>Advanced Simulator Facilities</h2>
          <p style={{ color: "#475569", fontSize: "16px", marginTop: "12px", maxWidth: "600px", margin: "12px auto 0", lineHeight: "1.6" }}>
            We reduce technical response friction by exposing students to operational equipment replicas before final regulatory evaluations.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {specializedLabs.map((lab, idx) => (
            <div 
              key={idx} 
              className="hover-lift lab-card"
              style={{ 
                background: "#ffffff", 
                padding: "40px", 
                borderRadius: "24px", 
                border: "1px solid #e2e8f0", 
                boxShadow: "0 4px 6px -1px rgba(2, 6, 23, 0.01)", 
                display: "grid", 
                gridTemplateColumns: "auto 1fr", 
                gap: "40px", 
                alignItems: "center"
              }}
            >
              <div style={{ 
                fontSize: "40px", 
                background: "#f1f5f9", 
                width: "90px", 
                height: "90px", 
                borderRadius: "20px", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center"
              }}>
                {lab.icon}
              </div>
              <div>
                <h3 style={{ fontSize: "24px", fontWeight: "700", color: "#020617", marginBottom: "10px" }}>
                  {lab.title}
                </h3>
                <p style={{ color: "#475569", fontSize: "15px", lineHeight: "1.7", margin: 0 }}>{lab.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* GEOGRAPHIC NETWORK REGIONS */}
      <section style={{ background: "#f1f5f9", padding: "120px 20px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <h2 style={{ fontSize: "40px", fontWeight: "800", color: "#020617", letterSpacing: "-0.5px" }}>Our Expanding Operational Map</h2>
            <p style={{ color: "#475569", fontSize: "17px", marginTop: "12px" }}>Unified academic points delivering matching aviation certifications across state boundaries.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "30px" }}>
            {centers.map((center, idx) => (
              <div 
                key={idx} 
                className="hover-lift"
                style={{ 
                  background: "#ffffff", 
                  padding: "35px", 
                  borderRadius: "24px", 
                  border: "1px solid #e2e8f0",
                  position: "relative",
                  overflow: "hidden"
                }}
              >
                <div style={{ 
                  position: "absolute", 
                  top: 0, 
                  right: 0, 
                  background: "#020617", 
                  color: "#ffffff", 
                  fontSize: "10px", 
                  fontWeight: "700", 
                  padding: "6px 14px", 
                  borderBottomLeftRadius: "14px",
                  textTransform: "uppercase",
                  letterSpacing: "1px"
                }}>
                  {center.region}
                </div>
                <div style={{ fontSize: "28px", marginBottom: "20px", marginTop: "8px" }}>🏢</div>
                <h4 style={{ fontSize: "19px", fontWeight: "700", color: "#020617", marginBottom: "8px" }}>{center.name}</h4>
                <p style={{ color: "#475569", fontSize: "14px", margin: 0, lineHeight: "1.5" }}>{center.location}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

export default AboutUs;