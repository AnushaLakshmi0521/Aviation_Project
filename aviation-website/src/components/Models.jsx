
import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";

// Import Swiper styling specifications
import "swiper/css";
import "swiper/css/effect-fade";

// Video Asset Registry Mapping (Using your exact video imports/filenames)
const m1 ="https://res.cloudinary.com/doihibg9v/video/upload/v1783424949/m1_m0vxd0.mp4";
const m2 ="https://res.cloudinary.com/doihibg9v/video/upload/v1783424952/m2_qokat0.mp4";
const m3 ="https://res.cloudinary.com/doihibg9v/video/upload/v1783424953/m3_x6wba9.mp4";


const pose ="https://res.cloudinary.com/doihibg9v/video/upload/v1783424948/pose_uv5idj.mp4";
const ramp ="https://res.cloudinary.com/doihibg9v/video/upload/v1783424951/ramp_i0vr13.mp4";
const print ="https://res.cloudinary.com/doihibg9v/video/upload/v1783424952/print_nredbw.mp4";
const commercial ="https://res.cloudinary.com/doihibg9v/video/upload/v1783424950/commercial_zgzjky.mp4";
const ecom ="https://res.cloudinary.com/doihibg9v/video/upload/v1783424950/ecom_cg1f4g.mp4";
const cat ="https://res.cloudinary.com/doihibg9v/video/upload/v1783424949/cat_ypwnz5.mp4";
const bridal ="https://res.cloudinary.com/doihibg9v/video/upload/v1783424949/bridal_hiugrs.mp4";
const ethnic ="https://res.cloudinary.com/doihibg9v/video/upload/v1783424948/ethnic_u8luqj.mp4";
const luxury ="https://res.cloudinary.com/doihibg9v/video/upload/v1783424949/luxury_hei8qk.mp4";


// Simple custom hook to check intersection states for structural visibility triggers
function useScrollReveal(options = { threshold: 0.15 }) {
  const [hasRevealed, setHasRevealed] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const currentRef = elementRef.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setHasRevealed(true);
      } else {
        setHasRevealed(false);
      }
    }, options);

    observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [options]);

  return [elementRef, hasRevealed];
}

function Models() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState("runway");

  // Form State Data
  const [formData, setFormData] = useState({
  full_name: "",
  email: "",
  phone: "",
  age: "",
  height: "",
  instagram: "",
  division: "Modeling Foundation",
  message: "",
});
  // Hook references mapping intersection tracks directly to section frames
  const [heroRef, heroRevealed] = useScrollReveal({ threshold: 0.05 });
  const [statsRef, statsRevealed] = useScrollReveal({ threshold: 0.2 });
  const [gridRef, gridRevealed] = useScrollReveal({ threshold: 0.05 });
  const [syllabusRef, syllabusRevealed] = useScrollReveal({ threshold: 0.15 });
  const [formSectionRef, formSectionRevealed] = useScrollReveal({ threshold: 0.1 });
  const [guaranteeRef, guaranteeRevealed] = useScrollReveal({ threshold: 0.15 });

  const [counts, setCounts] = useState({ models: 0, placements: 0, partners: 0 });

  // Mouse move listener tracking vectors for 3D depth parallax layers on the hero text content
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX - window.innerWidth / 2) / 50;
      const y = (e.clientY - window.innerHeight / 2) / 50;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Running counter for metrics section linked directly to its scroll reveal state
  useEffect(() => {
    if (!statsRevealed) {
      setCounts({ models: 0, placements: 0, partners: 0 });
      return;
    }

    const endModels = 380;
    const endPlacements = 95;
    const endPartners = 45;
    const duration = 1500;
    const frameRate = 1000 / 60;
    const totalFrames = Math.round(duration / frameRate);
    let frame = 0;

    const counterInterval = setInterval(() => {
      frame++;
      setCounts({
        models: Math.floor((endModels / totalFrames) * frame),
        placements: Math.floor((endPlacements / totalFrames) * frame),
        partners: Math.floor((endPartners / totalFrames) * frame),
      });

      if (frame >= totalFrames) {
        clearInterval(counterInterval);
        setCounts({ models: endModels, placements: endPlacements, partners: endPartners });
      }
    }, frameRate);

    return () => clearInterval(counterInterval);
  }, [statsRevealed]);

  // Form input change controller
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
        ...prev,
        [name]: value,
    }));
};
  // Form Submission Logic 
 const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch(
            "https://aviation-project-7d1q.onrender.com/api/model-application/",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            }
        );

        const data = await response.json();

        if (response.ok) {

            alert("Application submitted successfully!");

            setFormData({
                full_name: "",
                email: "",
                phone: "",
                age: "",
                height: "",
                instagram: "",
                division: "Modeling Foundation",
                message: "",
            });

        } else {

            alert("Submission failed");

            console.log(data);
        }

    } catch (error) {

        console.error(error);

        alert("Server Error");
    }
};

  const heroReelVideos = [m2, m3, m1];

  const modelCategories = [
    { video: pose, title: "Modeling Foundation", tagline: "Pro Posing & Body Language", description: "Master fundamental alignment mechanics, facial expression control, camera awareness, and basic posture required across all styling fields." },
    { video: ramp, title: "Ramp Modeling", tagline: "High-Fashion Runway Tracks", description: "Master standard fashion-week runway walks, posture coordination, speed pacing, garment movement dynamics, and haute couture choreography." },
    { video: print, title: "Print Modeling", tagline: "Editorial Cover Layouts", description: "Precision static posing mechanics tailored specifically for premium magazine spreads, enterprise billboards, luxury posters, and physical print lookbooks." },
    { video: commercial, title: "Commercial Modeling", tagline: "Television & Media Ads", description: "Expressive narrative acting, camera placement adaptation, brand communication, and public screen presence engineered for mainstream video advertisements." },
    { video: ecom, title: "E-Commerce Modeling", tagline: "Digital Storefront Ready", description: "High-speed lifestyle studio catalog production customized for online retail hubs, marketplace listings, and international fashion web fronts." },
    { video: cat, title: "Catalogue Modeling", tagline: "Structural Lookbooks", description: "Accurate textile representation and clean modeling angles to showcase precise apparel design details, textile weight, and garment fitting properties." },
    { video: bridal, title: "Bridal Modeling", tagline: "Ethnic Haute Couture", description: "Graceful movement styling and specialized heavy ensemble balancing tailored to frame luxury bridal wear lines, fine jewelry campaigns, and heritage labels." },
    { video: ethnic, title: "Ethnic Wear Modeling", tagline: "Traditional Frameworks", description: "Showcasing cultural design flow, fluid festive attire configurations, and regional styling patterns for major domestic and international fusion houses." },
    { video: luxury, title: "Luxury Modeling", tagline: "Elite High-End Assets", description: "Sophisticated conceptual pacing and high-end aesthetic carriage crafted to present premium Swiss timepieces, fine diamonds, and luxury lifestyle products." }
  ];

  const curriculumBootcamps = {
    runway: { title: "Runway Mechanics & Posture Development", duration: "4 Weeks Focus", items: ["The Classical Haute Couture Walk & Pacing Dynamics", "Symmetry Correction, Alignment and Balance Architecture", "Managing Complex Heavy Apparel & Train Distributions", "Live Runway Rehearsal Drills under Synchronized Lighting Grids"] },
    camera: { title: "Camera Mechanics & Light Tracking", duration: "4 Weeks Focus", items: ["Angles Discovery: Framing and Facial Axis Dominance", "Fluid Continuity During Continuous Flash Strobes", "Expressing Complex Micro-Expressions and Mood Shifting", "High-Speed Commercial Performance & Acting Exercises"] },
    business: { title: "Talent Management & Brand Business", duration: "2 Weeks Focus", items: ["Contracts Blueprint: Understanding Model Agency Structures", "Social Media Feed Engineering & Identity Development", "International Scouting Mechanics & Traveling Show Logistics", "In-depth Audition Performance Drills and Interview Panels"] }
  };

  return (
    <div style={{ background: "#030712", minHeight: "100vh", color: "#ffffff", overflowX: "hidden", fontFamily: "system-ui, sans-serif" }}>
      
      {/* SCROLL-DEPENDENT PERFORMANCE OPTIMIZED STYLING SHEET */}
      <style>
        {`
          .reveal-element {
            opacity: 0;
            transform: translateY(50px);
            filter: blur(8px);
            transition: opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), 
                        transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), 
                        filter 1s cubic-bezier(0.16, 1, 0.3, 1);
          }
          
          .reveal-element.active {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }

          .grid-stagger-item {
            opacity: 0;
            transform: translateY(60px);
            transition: opacity 1s cubic-bezier(0.16, 1, 0.3, 1),
                        transform 1s cubic-bezier(0.16, 1, 0.3, 1),
                        border-color 0.3s ease,
                        box-shadow 0.3s ease;
          }

          .active .grid-stagger-item {
            opacity: 1;
            transform: translateY(0);
          }

          .active .grid-stagger-item:nth-child(1) { transition-delay: 0.1s; }
          .active .grid-stagger-item:nth-child(2) { transition-delay: 0.2s; }
          .active .grid-stagger-item:nth-child(3) { transition-delay: 0.3s; }
          .active .grid-stagger-item:nth-child(4) { transition-delay: 0.1s; }
          .active .grid-stagger-item:nth-child(5) { transition-delay: 0.2s; }
          .active .grid-stagger-item:nth-child(6) { transition-delay: 0.3s; }
          .active .grid-stagger-item:nth-child(7) { transition-delay: 0.1s; }
          .active .grid-stagger-item:nth-child(8) { transition-delay: 0.2s; }
          .active .grid-stagger-item:nth-child(9) { transition-delay: 0.3s; }

          @keyframes particleDrift {
            0% { transform: translateY(0) scale(1); opacity: 0; }
            50% { opacity: 0.3; }
            100% { transform: translateY(-100vh) scale(1.2); opacity: 0; }
          }
          @keyframes spinSlow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          
          .shimmer-track:hover { border-color: #E8A830 !important; box-shadow: 0 0 30px rgba(232, 168, 48, 0.15) !important; }
          
          /* Form Input Focus Ring Aesthetics */
          .form-input-field:focus {
            outline: none !important;
            border-color: #E8A830 !important;
            box-shadow: 0 0 10px rgba(232, 168, 48, 0.15) !important;
          }
        `}
      </style>

      {/* SECTION 1: 100VH CINEMATIC SWIPER VIDEO HERO CONTAINER (LAYER/OVERLAY REMOVED) */}
      <section ref={heroRef} style={{ position: "relative", height: "100vh", width: "100vw", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        
        {/* Swiper Video Background Loop Deck */}
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect={"fade"}
          fadeEffect={{ crossFade: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={true}
          allowTouchMove={false}
          style={{ position: "absolute", inset: 0, zIndex: 0 }}
        >
          {heroReelVideos.map((vidTrack, index) => (
            <SwiperSlide key={index} style={{ background: "#030712" }}>
              <video
  src={vidTrack}
  autoPlay
  loop
  muted
  playsInline
  style={{
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center 15%"
  }}
/>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Hero Interactive Text Layer — Controlled by hero intersection toggle */}
        <div className={`reveal-element ${heroRevealed ? "active" : ""}`} style={{
          position: "relative", zIndex: 3, width: "90%", maxWidth: "1200px", textAlign: "center",
          transform: `translate3d(${mousePos.x * -0.4}px, ${mousePos.y * -0.4}px, 0)`,
          transition: "transform 0.25s cubic-bezier(0.25, 1, 0.5, 1), opacity 1.2s ease, filter 1.2s ease"
        }}>
          <span style={{ color: "#E8A830", fontSize: "11px", fontWeight: "800", letterSpacing: "4px", textTransform: "uppercase", background: "rgba(3, 7, 18, 0.65)", backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)", padding: "6px 20px", borderRadius: "50px", border: "1px solid rgba(232, 168, 48, 0.3)", display: "inline-block", marginBottom: "20px" }}>
            PROFESSIONAL MODELING &amp; TALENT ACADEMY
          </span>
          <h1 style={{ fontSize: "44px", fontWeight: "900", lineHeight: "1.2", marginBottom: "20px", letterSpacing: "-0.5px", textShadow: "0 4px 15px rgba(0,0,0,0.6)" }}>
            Launch Your Professional Modeling Career <br />Across <span style={{ color: "#E8A830" }}>Global Runways &amp; Commercials</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "16px", maxWidth: "750px", margin: "0 auto", lineHeight: "1.7", marginBottom: "35px", textShadow: "0 2px 8px rgba(0,0,0,0.8)" }}>
            A comprehensive institutional training track completely engineered to turn aspiring faces into top-tier runway models, commercial talent, and retail e-commerce portfolio professionals.
          </p>
          <div style={{ display: "flex", gap: "15px", justifyContent: "center" }}>
            <button 
              onClick={() => document.getElementById("application-form-block").scrollIntoView({ behavior: "smooth" })}
              style={{ background: "#E8A830", color: "#030712", border: "none", borderRadius: "10px", padding: "14px 35px", fontSize: "14px", fontWeight: "700", cursor: "pointer", transition: "0.3s", boxShadow: "0 10px 25px rgba(232,168,48,0.3)" }}
            >
              Apply to Academy
            </button>
            <button 
              onClick={() => document.getElementById("divisions-grid-block").scrollIntoView({ behavior: "smooth" })}
              style={{ background: "rgba(3, 7, 18, 0.6)", backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)", color: "#ffffff", border: "1px solid rgba(255,255,255,0.3)", borderRadius: "10px", padding: "14px 35px", fontSize: "14px", fontWeight: "600", cursor: "pointer", transition: "0.3s" }}
            >
              Explore Divisions
            </button>
          </div>
        </div>

        {/* Scroll Motion Vector */}
        <div style={{ position: "absolute", bottom: "40px", left: "50%", transform: "translateX(-50%)", zIndex: 4, display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", opacity: 0.5 }}>
          <div style={{ width: "22px", height: "36px", borderRadius: "10px", border: "2px solid #fff", display: "flex", justifyContent: "center", padding: "4px" }}>
            <div style={{ width: "3px", height: "6px", background: "#E8A830", borderRadius: "2px", animation: "particleDrift 2s infinite reverse" }}></div>
          </div>
        </div>
      </section>

      {/* SECTION 2: LIVE STATS TICKER */}
      <section ref={statsRef} className={`reveal-element ${statsRevealed ? "active" : ""}`} style={{ padding: "50px 0", borderTop: "1px solid #1f2937", borderBottom: "1px solid #1f2937", background: "#060b14", position: "relative", zIndex: 10 }}>
        <div style={{ width: "90%", maxWidth: "1400px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "40px", textAlign: "center" }}>
          <div>
            <h2 style={{ fontSize: "44px", fontWeight: "900", color: "#E8A830", margin: 0 }}>{counts.models}+</h2>
            <p style={{ color: "#9ca3af", fontSize: "13px", marginTop: "5px", letterSpacing: "1px", textTransform: "uppercase" }}>Trained Talent Profiles</p>
          </div>
          <div>
            <h2 style={{ fontSize: "44px", fontWeight: "900", color: "#ffffff", margin: 0 }}>{counts.placements}%</h2>
            <p style={{ color: "#9ca3af", fontSize: "13px", marginTop: "5px", letterSpacing: "1px", textTransform: "uppercase" }}>Campaign Audition Success</p>
          </div>
          <div>
            <h2 style={{ fontSize: "44px", fontWeight: "900", color: "#E8A830", margin: 0 }}>{counts.partners}+</h2>
            <p style={{ color: "#9ca3af", fontSize: "13px", marginTop: "5px", letterSpacing: "1px", textTransform: "uppercase" }}>Fashion &amp; Media Brand Partners</p>
          </div>
        </div>
      </section>

      {/* SECTION 3: INTERACTIVE STAGGERED VIDEO GRID SECTION */}
      <section id="divisions-grid-block" ref={gridRef} className={`reveal-element ${gridRevealed ? "active" : ""}`} style={{ padding: "120px 0", width: "90%", maxWidth: "1400px", margin: "0 auto", position: "relative", zIndex: 5 }}>
        
        <div style={{ textAlign: "center", marginBottom: "80px" }}>
          <span style={{ color: "#E8A830", fontSize: "11px", fontWeight: "800", letterSpacing: "3px", textTransform: "uppercase" }}>PROFESSIONAL DIVISIONS</span>
          <h2 style={{ fontSize: "38px", fontWeight: "900", marginTop: "15px", marginBottom: "20px" }}>Explore Our 9 Specialization Tracks</h2>
          <p style={{ color: "#9ca3af", fontSize: "16px", maxWidth: "650px", margin: "0 auto", lineHeight: "1.7" }}>
            Every discipline is paired with targeted portfolio content. Hover over a card to zoom and trigger interactive track layouts.
          </p>
        </div>

        {/* 3-Column Video Matrix Layout with cascade scroll triggers */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))", gap: "40px" }}>
          {modelCategories.map((cat, index) => {
            const isHovered = hoveredCard === index;
            return (
              <div
                key={index}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                className="grid-stagger-item shimmer-track"
                style={{
                  background: "#0b1324", borderRadius: "28px", overflow: "hidden",
                  border: "1px solid #131f38",
                  transform: isHovered ? "translateY(-12px) scale(1.01)" : undefined,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
                  cursor: "pointer"
                }}
              >
                {/* Video Viewport */}
                <div style={{ height: "320px", width: "100%", overflow: "hidden", position: "relative", background: "#000" }}>
                  <video
                    src={cat.video}
                    autoPlay loop muted playsInline
                    style={{
                      width: "100%", height: "100%", objectFit: "cover",
                      transform: isHovered ? "scale(1.08)" : "scale(1)",
                      transition: "transform 0.6s ease"
                    }}
                  />
                  
                  {/* Subtle Gradient Veil */}
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 40%, #0b1324 100%)" }}></div>
                  
                  <span style={{
                    position: "absolute", top: "20px", right: "20px",
                   
                   
                    background: "rgba(3, 7, 18, 0.75)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
                    color: "#fff", padding: "5px 12px", borderRadius: "50px", fontSize: "10px", fontWeight: "600"
                  }}>
                    SECTOR DIVISION
                  </span>
                </div>

                {/* Typography Block */}
                <div style={{ padding: "30px" }}>
                  <span style={{ color: "#E8A830", fontSize: "11px", fontWeight: "700", letterSpacing: "1.5px", textTransform: "uppercase", display: "block", marginBottom: "8px" }}>
                    {cat.tagline}
                  </span>
                  <h3 style={{ fontSize: "22px", fontWeight: "800", marginBottom: "12px", color: "#ffffff" }}>{cat.title}</h3>
                  <p style={{ color: "#9ca3af", fontSize: "14px", lineHeight: "1.6", margin: 0 }}>{cat.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 4: INTENSIVE CURRICULAR SCROLL-TRIGGER TRACKER */}
      <section ref={syllabusRef} className={`reveal-element ${syllabusRevealed ? "active" : ""}`} style={{ padding: "100px 0", background: "#060d1f", position: "relative", zIndex: 4 }}>
        <div style={{ width: "90%", maxWidth: "1200px", margin: "0 auto" }}>
          
          <div style={{ textAlign: "center", marginBottom: "50px" }}>
            <h2 style={{ fontSize: "34px", fontWeight: "900", marginBottom: "15px" }}>Professional Modeling Program Syllabus</h2>
            <p style={{ color: "#9ca3af", fontSize: "16px" }}>The foundational blueprint preparing talent for real-world designer campaigns.</p>
          </div>

          {/* Navigation Row */}
          <div style={{ display: "flex", justifyContent: "center", gap: "15px", marginBottom: "40px" }}>
            {Object.keys(curriculumBootcamps).map((tabKey) => (
              <button
                key={tabKey}
                onClick={() => setActiveTab(tabKey)}
                style={{
                  background: activeTab === tabKey ? "#E8A830" : "rgba(255,255,255,0.03)",
                  color: activeTab === tabKey ? "#030712" : "#ffffff",
                  border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px",
                  padding: "12px 24px", fontWeight: "700", fontSize: "13px", cursor: "pointer", transition: "0.3s"
                }}
              >
                {curriculumBootcamps[tabKey].title.split(" & ")[0]}
              </button>
            ))}
          </div>

          {/* Active Tab Screen */}
          <div style={{ background: "#0b1429", borderRadius: "20px", padding: "45px", border: "1px solid #142347", display: "grid", gridTemplateColumns: "1fr auto", gap: "40px", alignItems: "center" }}>
            <div>
              <span style={{ color: "#E8A830", fontSize: "12px", fontWeight: "700", display: "block", marginBottom: "10px" }}>{curriculumBootcamps[activeTab].duration}</span>
              <h3 style={{ fontSize: "26px", fontWeight: "800", marginBottom: "20px" }}>{curriculumBootcamps[activeTab].title}</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {curriculumBootcamps[activeTab].items.map((bullet, idx) => (
                  <div key={idx} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <span style={{ color: "#E8A830", fontWeight: "bold" }}>✦</span>
                    <span style={{ color: "#cbd5e1", fontSize: "14px" }}>{bullet}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ width: "110px", height: "110px", borderRadius: "50%", border: "2px dashed rgba(232,168,48,0.3)", display: "flex", alignItems: "center", justifyContent: "center", animation: "spinSlow 20s linear infinite" }}>
              <span style={{ color: "#E8A830", fontSize: "11px", fontWeight: "800", letterSpacing: "1px" }}>CURRICULUM</span>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 5: NEW INDEPENDENT ACADEMY APPLICATION FORM SECTION */}
      <section id="application-form-block" ref={formSectionRef} className={`reveal-element ${formSectionRevealed ? "active" : ""}`} style={{ padding: "120px 0", background: "#030712", position: "relative", zIndex: 5 }}>
        <div style={{ width: "90%", maxWidth: "850px", margin: "0 auto", background: "#0b1324", border: "1px solid #13203c", borderRadius: "32px", padding: "50px", boxShadow: "0 30px 60px rgba(0,0,0,0.6)" }}>
          
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <span style={{ color: "#E8A830", fontSize: "11px", fontWeight: "800", letterSpacing: "3px", textTransform: "uppercase" }}>ONLINE ENROLLMENT</span>
            <h2 style={{ fontSize: "32px", fontWeight: "900", marginTop: "10px", marginBottom: "15px" }}>Audition Application Entry</h2>
            <p style={{ color: "#9ca3af", fontSize: "14px", lineHeight: "1.6" }}>
              Complete the profiling structure below. Our admissions board handles validation filters continuously to confirm your entry position.
            </p>
          </div>

          <form onSubmit={handleFormSubmit} style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "25px" }}>
              
              <div>
                <label style={{ display: "block", fontSize: "12px", color: "#9ca3af", fontWeight: "700", marginBottom: "8px", letterSpacing: "0.5px" }}>FULL NAME *</label>
                <input type="text" name="full_name" required value={formData.full_name} onChange={handleInputChange} className="form-input-field" placeholder="e.g., Jane Doe" style={{ width: "100%", background: "#060b14", border: "1px solid #1a2d54", borderRadius: "10px", padding: "14px", color: "#fff", fontSize: "14px", transition: "0.3s", boxSizing: "border-box" }} />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12px", color: "#9ca3af", fontWeight: "700", marginBottom: "8px", letterSpacing: "0.5px" }}>EMAIL ADDRESS *</label>
                <input type="email" name="email" required value={formData.email} onChange={handleInputChange} className="form-input-field" placeholder="name@domain.com" style={{ width: "100%", background: "#060b14", border: "1px solid #1a2d54", borderRadius: "10px", padding: "14px", color: "#fff", fontSize: "14px", transition: "0.3s", boxSizing: "border-box" }} />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12px", color: "#9ca3af", fontWeight: "700", marginBottom: "8px", letterSpacing: "0.5px" }}>CONTACT NUMBER *</label>
                <input type="tel" name="phone" required value={formData.phone} onChange={handleInputChange} className="form-input-field" placeholder="+91 XXXXX XXXXX" style={{ width: "100%", background: "#060b14", border: "1px solid #1a2d54", borderRadius: "10px", padding: "14px", color: "#fff", fontSize: "14px", transition: "0.3s", boxSizing: "border-box" }} />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12px", color: "#9ca3af", fontWeight: "700", marginBottom: "8px", letterSpacing: "0.5px" }}>INSTAGRAM PROFILE URL</label>
                <input type="url" name="instagram" value={formData.instagram} onChange={handleInputChange} className="form-input-field" placeholder="instagram.com/username" style={{ width: "100%", background: "#060b14", border: "1px solid #1a2d54", borderRadius: "10px", padding: "14px", color: "#fff", fontSize: "14px", transition: "0.3s", boxSizing: "border-box" }} />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", color: "#9ca3af", fontWeight: "700", marginBottom: "8px", letterSpacing: "0.5px" }}>AGE (YEARS) *</label>
                  <input type="number" name="age" required value={formData.age} onChange={handleInputChange} className="form-input-field" placeholder="18" style={{ width: "100%", background: "#060b14", border: "1px solid #1a2d54", borderRadius: "10px", padding: "14px", color: "#fff", fontSize: "14px", transition: "0.3s", boxSizing: "border-box" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "12px", color: "#9ca3af", fontWeight: "700", marginBottom: "8px", letterSpacing: "0.5px" }}>HEIGHT (CM) *</label>
                  <input type="number" name="height" required value={formData.height} onChange={handleInputChange} className="form-input-field" placeholder="175" style={{ width: "100%", background: "#060b14", border: "1px solid #1a2d54", borderRadius: "10px", padding: "14px", color: "#fff", fontSize: "14px", transition: "0.3s", boxSizing: "border-box" }} />
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12px", color: "#9ca3af", fontWeight: "700", marginBottom: "8px", letterSpacing: "0.5px" }}>TARGET DIVISION INTEREST *</label>
                <select name="division" value={formData.division} onChange={handleInputChange} className="form-input-field" style={{ width: "100%", background: "#060b14", border: "1px solid #1a2d54", borderRadius: "10px", padding: "14px", color: "#fff", fontSize: "14px", transition: "0.3s", boxSizing: "border-box", cursor: "pointer" }}>
                  <option value="Modeling Foundation">Modeling Foundation</option>
                  <option value="Ramp Modeling">Ramp Modeling / Runway</option>
                  <option value="Print Modeling">Print / Editorial Modeling</option>
                  <option value="Commercial Modeling">Commercial / Media Adverts</option>
                  <option value="E-Commerce Modeling">E-Commerce Ready</option>
                  <option value="Catalogue Modeling">Catalogue Structural Modeling</option>
                  <option value="Bridal Modeling">Bridal Haute Couture</option>
                  <option value="Ethnic Wear Modeling">Traditional Ethnic Wear</option>
                  <option value="Luxury Modeling">Luxury / High-End Brands</option>
                </select>
              </div>

            </div>

            <div>
              <label style={{ display: "block", fontSize: "12px", color: "#9ca3af", fontWeight: "700", marginBottom: "8px", letterSpacing: "0.5px" }}>ADDITIONAL DETAILS / PAST EXPERIENCE (OPTIONAL)</label>
              <textarea name="message" rows="4" value={formData.message} onChange={handleInputChange} className="form-input-field" placeholder="Mention any past agencies, pageants, workshops or physical details..." style={{ width: "100%", background: "#060b14", border: "1px solid #1a2d54", borderRadius: "10px", padding: "14px", color: "#fff", fontSize: "14px", transition: "0.3s", boxSizing: "border-box", resize: "vertical" }}></textarea>
            </div>

            <button type="submit" style={{ background: "#E8A830", color: "#030712", border: "none", borderRadius: "12px", padding: "16px", fontSize: "15px", fontWeight: "700", cursor: "pointer", transition: "0.3s", marginTop: "10px", boxShadow: "0 10px 25px rgba(232,168,48,0.2)" }}>
              Submit Audition Profile
            </button>
          </form>

        </div>
      </section>

      {/* SECTION 6: SIGNATURE COURSE GUARANTEE PANEL */}
      <section ref={guaranteeRef} className={`reveal-element ${guaranteeRevealed ? "active" : ""}`} style={{ padding: "80px 0 140px", width: "90%", maxWidth: "1000px", margin: "0 auto", position: "relative", zIndex: 5 }}>
        <div style={{
          background: "linear-gradient(135deg, rgba(232, 168, 48, 0.08) 0%, rgba(11, 19, 36, 0.6) 100%)",
          border: "2px dashed #E8A830", borderRadius: "32px", padding: "50px", textAlign: "center", boxShadow: "0 30px 60px rgba(0,0,0,0.5)"
        }}>
          <span style={{ fontSize: "40px", display: "block", marginBottom: "15px" }}>🛡️</span>
          <h3 style={{ fontSize: "28px", fontWeight: "900", marginBottom: "15px", color: "#ffffff" }}>
            100% Agency Contract &amp; Portfolio Placement Guarantee
          </h3>
          <p style={{ color: "#9ca3af", fontSize: "15px", lineHeight: "1.7", margin: "0 auto", maxWidth: "800px" }}>
            Our structural training layout ensures absolute compliance with market expectations. If a candidate successfully finishes our comprehensive modeling syllabus and assessment checklist but fails to secure brand contract options or lookbook placements with verified modeling agencies and production firms, the full tuition fee is completely refundable. No hidden administrative fine print.
          </p>
        </div>
      </section>

    </div>
  );
}

export default Models;