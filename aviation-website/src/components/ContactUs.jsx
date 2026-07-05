
import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";


// Reusable bidirectional scroll reveal wrapper
function ScrollReveal({ children }) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { 
        threshold: 0.1,
        rootMargin: "-20px 0px -20px 0px"
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) observer.unobserve(elementRef.current);
    };
  }, []);

  return (
    <div className={`reveal-element ${isVisible ? "active" : ""}`} ref={elementRef}>
      {children}
    </div>
  );
}

function ContactUs() {
  // Form States
  const [formData, setFormData] = useState({ name: "", email: "", track: "general", message: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isBtnHovered, setIsBtnHovered] = useState(false);

  // FAQ Accordion State
  const [activeFaq, setActiveFaq] = useState(null);

  // Real-Time AI Agent Engine & Routing States
  const [aiQuery, setAiQuery] = useState("");
  const [aiChat, setAiChat] = useState([
    { sender: "agent", text:
`Hello 👋

Welcome to Aviation Training.

I can help you with:

• Course Details
• Fees
• Placement Assistance
• Admission Process
• Training Duration

Type "human" if you'd like to chat with our team.` }
  ]);
  const [isAiTyping, setIsAiTyping] = useState(false);
  
  // LIVE ESCALATION SYSTEM STATES
  // "ai" | "triage" | "live-chat-connecting" | "live-chat-active" | "callback-setup" | "callback-scheduled"
  const [chatMode, setChatMode] = useState("ai"); 
  const [phoneNumber, setPhoneNumber] = useState("");

  const location = useLocation();

useEffect(() => {
  if (location.hash === "#ai-section") {
    const el = document.getElementById("ai-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }
}, [location]);

  // Auto-scroll anchor for live chat responses
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [aiChat, isAiTyping, chatMode]);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
const handleFormSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("https://aviation-project-7d1q.onrender.com/api/contact/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok) {
      setFormSubmitted(true);

      setFormData({
        name: "",
        email: "",
        track: "general",
        message: "",
      });
    } else {
      console.log(data);
      alert("Submission failed.");
    }
  } catch (err) {
    console.log(err);
    alert("Server Error");
  }
  
};

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  // Trigger Human Escalation Triage Option
  const triggerHumanTriage = () => {
    setChatMode("triage");
    setAiChat((prev) => [
      ...prev,
      { 
        sender: "agent", 
        text: "Understood. I can route this interaction directly to our operational command center. \n\nWould you prefer to switch to a Live Chat Person right now, or request an Immediate Phone Callback from our team?" 
      }
    ]);
  };

  // Route to Live Human Chat
 const WHATSAPP_NUMBER = "919848780827"; // Replace with your WhatsApp number

const initiateLiveChatPerson = () => {
  const message =
    "Hi! I'm interested in your Aviation Training course. Can you please help me?";

  window.open(
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
    "_blank"
  );
};


const initiateCallbackSetup = () => {
  setChatMode("callback-setup");

  setAiChat((prev) => [
    ...prev,
    {
      sender: "agent",
      text:
        "📞 Callback mode activated.\n\nPlease enter your phone number below and our team will contact you shortly.",
    },
  ]);
  
};
  // Route to Callback Option
  const contactUser = () => {
  const phone = "+919848780827";

  if (/Mobi|Android|iPhone/i.test(navigator.userAgent)) {
    window.location.href = `tel:${phone}`;
  } else {
    window.open(`https://wa.me/919848780827`, "_blank");
  }
};

const handleCallbackSubmit = async (e) => {
  e.preventDefault();

  if (!phoneNumber.trim()) return;

  try {
    const response = await fetch(
      "https://aviation-project-7d1q.onrender.com/api/request-callback/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: phoneNumber,
        }),
      }
    );

    if (response.ok) {
      setAiChat((prev) => [
        ...prev,
        {
          sender: "agent",
          text: "✅ Thank you! Our team will call you shortly.",
        },
      ]);

      setChatMode("callback-scheduled");

      setPhoneNumber("");

      contactUser();
    } else {
      alert("Unable to submit callback request.");
    }
  } catch (err) {
    console.log(err);
    alert("Server Error");
  }
};

  // Handle Callback Submission
const handleAiSubmit = async (e) => {
  e.preventDefault();

  if (!aiQuery.trim()) return;

  const userMessage = aiQuery.trim();

  // Show user's message
  setAiChat((prev) => [
    ...prev,
    {
      sender: "user",
      text: userMessage,
    },
  ]);

  setAiQuery("");

  // Human Chat (keep your existing feature)
  if (chatMode === "live-chat-active") {
    setIsAiTyping(true);

    setTimeout(() => {
      setAiChat((prev) => [
        ...prev,
        {
          sender: "agent",
          text: "Our support specialist has received your message and will reply shortly.",
        },
      ]);

      setIsAiTyping(false);
    }, 1000);

    return;
  }

  // Human Escalation
  const cleanMsg = userMessage.toLowerCase();

  if (
    cleanMsg.includes("human") ||
    cleanMsg.includes("person") ||
    cleanMsg.includes("support") ||
    cleanMsg.includes("agent")
  ) {
    triggerHumanTriage();
    return;
  }

  // Ask Backend AI
  // Ask Backend AI
setIsAiTyping(true);

// Build conversation history
const messages = aiChat.map((msg) => ({
  role: msg.sender === "user" ? "user" : "assistant",
  content: msg.text,
}));

// Add the latest user message
messages.push({
  role: "user",
  content: userMessage,
});

try {
  const response = await fetch("https://aviation-project-7d1q.onrender.com/api/chat/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messages: messages,
    }),
  });

  const data = await response.json();
    console.log("Backend Reply:", data.reply);

    setAiChat((prev) => [
      ...prev,
      {
        sender: "agent",
        text: data.reply,
      },
    ]);
  } catch (error) {
    console.error(error);

    setAiChat((prev) => [
      ...prev,
      {
        sender: "agent",
        text: "Sorry, I'm unable to connect to the AI assistant right now. Please try again.",
      },
    ]);
  }

  setIsAiTyping(false);
};
  const faqs = [
    { q: "What is the typical processing turnaround for general registration inquiries?", a: "Our support operations center evaluates profile entries within 24 business hours. You will receive an access token containing terminal simulation windows once cleared." },
    { q: "Can I transition my enrollment configuration from Blue Collar to White Collar mid-semester?", a: "Yes. Core modular metrics transfer easily during the first 15 standard training lab credits. Transitions require formal approval from the airfield training registrar." },
    { q: "Are on-site compliance examinations scheduled over weekends?", a: "To mimic live international terminal networks, physical simulation bays operate 24/7. Your scheduled practical hours may overlap with rotating operational time windows." }
  ];

  return (
    <div style={{ background: "#0a111e", color: "#ffffff", minHeight: "100vh", fontFamily: "system-ui, -apple-system, sans-serif", overflowX: "hidden" }}>
      
      {/* Premium CSS Styles Injected Dynamically */}
      <style>{`
        .reveal-element {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: opacity, transform;
        }
        .reveal-element.active {
          opacity: 1;
          transform: translateY(0);
        }
        input:focus, select:focus, textarea:focus {
          outline: none;
          border-color: #00f5d4 !important;
          box-shadow: 0 0 15px rgba(0, 245, 212, 0.15);
        }
        .chat-scroll::-webkit-scrollbar {
          width: 5px;
        }
        .chat-scroll::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.08);
          border-radius: 10px;
        }
        .premium-card {
          background: rgba(16, 27, 46, 0.65);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
      `}</style>

      {/* REFINED HEADER SECTION */}
      <div style={{ padding: "90px 20px 40px 20px", textAlign: "center", maxWidth: "800px", margin: "0 auto" }}>
        <span style={{ color: "#00f5d4", fontWeight: "700", textTransform: "uppercase", letterSpacing: "3px", fontSize: "12px", display: "block", marginBottom: "14px" }}>
          We're Here to Help
        </span>
        <h1 style={{ fontSize: "50px", fontWeight: "900", margin: "0 0 20px 0", letterSpacing: "-1px", color: "#ffffff" }}>
          Contact Us
        </h1>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "17px", lineHeight: "1.6", maxWidth: "650px", margin: "0 auto" }}>
         Have questions about admissions, courses, placements, or fees? Contact our team or chat with our AI assistant anytime.
        </p>
      </div>

      {/* COMPONENT INTERACTION GRID */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px 20px 60px 20px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(450px, 1fr))", gap: "40px", alignItems: "start" }}>
          
          {/* LEFT: FORM INTERFACE */}
          <ScrollReveal>
            <div   id="ai-section"  className="premium-card" style={{ padding: "45px", borderRadius: "20px" }}>
              <h2 style={{ fontSize: "24px", fontWeight: "800", marginBottom: "8px", color: "#ffffff", letterSpacing: "-0.5px" }}>Log Telemetry</h2>
              <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "14px", marginBottom: "35px" }}>Your dispatch records will route to executive training queues instantly.</p>
              
              {formSubmitted ? (
                <div style={{ background: "rgba(0, 245, 212, 0.04)", border: "1px solid #00f5d4", borderRadius: "12px", padding: "35px", textAlign: "center" }}>
                  <h3 style={{ color: "#00f5d4", margin: "0 0 10px 0", fontSize: "19px", fontWeight: "700" }}>Message Sent Successfully ✅l</h3>
                  <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "14px", margin: "0", lineHeight: "1.6" }}>
                    Thank you for contacting us. Our team has received your enquiry and will get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px" }}>Full Name</label>
                    <input 
                      type="text" 
                      name="name" 
                      required
                      value={formData.name} 
                      onChange={handleFormChange}
                      placeholder="e.g., Dhanu" 
                      style={{ width: "100%", padding: "14px 16px", borderRadius: "8px", background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.08)", color: "#ffffff", fontSize: "15px", boxSizing: "border-box", transition: "all 0.2s" }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px" }}>Email Address</label>
                    <input 
                      type="email" 
                      name="email" 
                      required
                      value={formData.email} 
                      onChange={handleFormChange}
                      placeholder="dhanu@example.com" 
                      style={{ width: "100%", padding: "14px 16px", borderRadius: "8px", background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.08)", color: "#ffffff", fontSize: "15px", boxSizing: "border-box", transition: "all 0.2s" }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px" }}>Select Course</label>
                    <select 
                      name="track" 
                      value={formData.track} 
                      onChange={handleFormChange}
                      style={{ width: "100%", padding: "14px 16px", borderRadius: "8px", background: "#101b2e", border: "1px solid rgba(255,255,255,0.08)", color: "#ffffff", fontSize: "15px", boxSizing: "border-box", cursor: "pointer", transition: "all 0.2s" }}
                    >
                      <option value="general">General System Operations</option>
                      <option value="white-collar">White Collar Tracks (Flight Control, Compliance)</option>
                      <option value="blue-collar">Blue Collar Tracks (Marshalling, Logistics)</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px" }}>Message</label>
                    <textarea 
                      name="message" 
                      rows="4" 
                      required
                      value={formData.message} 
                      onChange={handleFormChange}
                      placeholder="Input pipeline conditions or queries..." 
                      style={{ width: "100%", padding: "14px 16px", borderRadius: "8px", background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.08)", color: "#ffffff", fontSize: "15px", boxSizing: "border-box", lineHeight: "1.6", resize: "vertical", transition: "all 0.2s" }}
                    />
                  </div>

                  <button 
                    type="submit"
                    onMouseEnter={() => setIsBtnHovered(true)}
                    onMouseLeave={() => setIsBtnHovered(false)}
                    style={{ 
                      background: "#00f5d4", 
                      color: "#0a111e", 
                      border: "none", 
                      padding: "16px", 
                      borderRadius: "8px", 
                      fontWeight: "700", 
                      fontSize: "15px", 
                      cursor: "pointer",
                      marginTop: "4px",
                      boxShadow: isBtnHovered ? "0 8px 24px rgba(0, 245, 212, 0.35)" : "none",
                      transform: isBtnHovered ? "translateY(-1px)" : "none",
                      transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)"
                    }}
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </ScrollReveal>

          {/* RIGHT: INTERACTIVE AI & HUMAN TRIAGE CHAT ENGINE */}
          <ScrollReveal>
            <div className="premium-card" style={{ borderRadius: "20px", height: "585px", display: "flex", flexDirection: "column", overflow: "hidden" }}>
              
              {/* Dynamic Agent Status Bar */}
              <div style={{ background: "rgba(255,255,255,0.01)", borderBottom: "1px solid rgba(255,255,255,0.05)", padding: "22px 28px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ 
                    width: "8px", 
                    height: "8px", 
                    borderRadius: "50%", 
                    background: chatMode.startsWith("live-chat") ? "#ff007f" : "#00f5d4", 
                    boxShadow: chatMode.startsWith("live-chat") ? "0 0 12px #ff007f" : "0 0 12px #00f5d4",
                    transition: "all 0.3s ease"
                  }}></div>
                  <div>
                    <h3 style={{ fontSize: "15px", fontWeight: "700", margin: "0", letterSpacing: "-0.3px" }}>
                      {chatMode.startsWith("live-chat") ? "Live Operations Hub" : "Aviation Support Core"}
                    </h3>
                    <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>
                      {chatMode === "live-chat-active" ? "Connected to Human Specialist" : chatMode === "live-chat-connecting" ? "Routing Intercept..." : "Automated AI Triage Instance"}
                    </span>
                  </div>
                </div>
                
                {chatMode === "ai" && (
                  <button 
                    onClick={triggerHumanTriage}
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "6px", color: "#00f5d4", fontSize: "12px", padding: "6px 12px", cursor: "pointer", fontWeight: "600" }}
                  >
                    Speak to Human
                  </button>
                )}
              </div>

              {/* Chat Conversation Scroll Layout */}
              <div className="chat-scroll" style={{ flexGrow: "1", padding: "28px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "16px" }}>
                {aiChat.map((msg, index) => (
                  <div key={index} style={{ display: "flex", justifyContent: msg.sender === "user" ? "flex-end" : "flex-start" }}>
                    <div style={{ 
                      maxWidth: "85%", 
                      padding: "14px 18px", 
                      borderRadius: "14px", 
                      fontSize: "14px", 
                      lineHeight: "1.6",
                      whiteSpace: "pre-line",
                      background: msg.sender === "user" ? (chatMode.startsWith("live-chat") ? "#ff007f" : "#00f5d4") : "rgba(255,255,255,0.03)",
                      color: msg.sender === "user" ? "#0a111e" : "rgba(255,255,255,0.85)",
                      border: msg.sender === "user" ? "none" : "1px solid rgba(255,255,255,0.04)",
                      borderTopLeftRadius: msg.sender === "agent" ? "2px" : "14px",
                      borderTopRightRadius: msg.sender === "user" ? "2px" : "14px",
                      fontWeight: msg.sender === "user" ? "600" : "400"
                    }}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                
                {/* LIVE TRIAGE INTERACTIVE SELECTION BUTTONS */}
                {chatMode === "triage" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "280px", marginTop: "4px" }}>
                    <button 
                      onClick={initiateLiveChatPerson}
                      style={{ background: "rgba(0, 245, 212, 0.1)", border: "1px solid #00f5d4", color: "#00f5d4", padding: "12px", borderRadius: "8px", fontWeight: "700", cursor: "pointer", textAlign: "left", fontSize: "13px", display: "flex", alignItems: "center", justifyContent: "space-between" }}
                    >
                      💬 Assign Chat Person <span>→</span>
                    </button>
                    <button 
                      onClick={initiateCallbackSetup}
                      style={{ background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255,255,255,0.1)", color: "#ffffff", padding: "12px", borderRadius: "8px", fontWeight: "700", cursor: "pointer", textAlign: "left", fontSize: "13px", display: "flex", alignItems: "center", justifyContent: "space-between" }}
                    >
                      📞 Get an Immediate Call <span>→</span>
                    </button>
                  </div>
                )}

                {isAiTyping && (
                  <div style={{ display: "flex", justifyContent: "flex-start" }}>
                    <div style={{ padding: "12px 16px", borderRadius: "12px", background: "rgba(255,255,255,0.02)", color: "rgba(255,255,255,0.35)", fontSize: "13px", border: "1px solid rgba(255,255,255,0.04)" }}>
                      {chatMode === "live-chat-active" ? "Operator typing..." : "Instance tracking input sequences..."}
                    </div>
                  </div>
                )}
                
                {/* Scroll Anchor Tag */}
                <div ref={chatEndRef} />
              </div>

              {/* DYNAMIC CHAT FORM FOOTER ACTIONS */}
              {chatMode === "callback-setup" ? (
                /* Specialized Input UI to collect Phone Numbers */
                <form onSubmit={handleCallbackSubmit} style={{ padding: "22px 24px", background: "rgba(0,0,0,0.2)", borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", gap: "12px" }}>
                  <input 
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Enter phone number (+91...)"
                    style={{ flexGrow: "1", padding: "14px 16px", borderRadius: "8px", background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.06)", color: "#ffffff", fontSize: "14px", boxSizing: "border-box" }}
                  />
                  <button 
                    type="submit"
                    style={{ background: "#00f5d4", color: "#0a111e", border: "none", padding: "0 22px", borderRadius: "8px", fontWeight: "700", fontSize: "14px", cursor: "pointer" }}
                  >
                    Request Call
                  </button>
                </form>
              ) : chatMode === "triage" || chatMode === "live-chat-connecting" || chatMode === "callback-scheduled" ? (
                /* Disable text fields when selecting pathways or during callbacks */
                <div style={{ padding: "24px", background: "rgba(0,0,0,0.2)", borderTop: "1px solid rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "1px", fontSize: "11px", textAlign: "center", fontWeight: "600" }}>
                  Selection Required Above to Advance Pipeline
                </div>
              ) : (
                /* Standard Text Chat Footer for normal AI tracking or live human messaging */


                /* Standard Text Chat Footer for normal AI tracking or live human messaging */
<div style={{
  padding: "12px 24px",
  background: "rgba(0,0,0,0.2)",
  borderTop: "1px solid rgba(255,255,255,0.05)"
}}>

  {/* QUICK ACTION BUTTONS */}
{/* QUICK ACTION BUTTONS */}
<div style={{
  display: "flex",
  flexWrap: "wrap",
  gap: "10px",
  marginBottom: "14px"
}}>
  {[
    { label: "💰 Fees", text: "Tell me about course fees" },
    { label: "📚 Courses", text: "What courses do you offer?" },
    { label: "🎓 Admission", text: "Admission process details" },
    { label: "✈️ Placements", text: "Placement opportunities" }
  ].map((btn, i) => (
    <button
      key={i}
      type="button"
      onClick={() => setAiQuery(btn.text)}
      style={{
        padding: "10px 14px",
        borderRadius: "999px",
        border: "1px solid rgba(255,255,255,0.10)",
        background: "rgba(255,255,255,0.04)",
        color: "#ffffff",
        fontSize: "13px",
        fontWeight: "600",
        cursor: "pointer",
        transition: "all 0.25s ease",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        display: "flex",
        alignItems: "center",
        gap: "6px"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.background = "rgba(0,245,212,0.10)";
        e.currentTarget.style.border = "1px solid rgba(0,245,212,0.5)";
        e.currentTarget.style.color = "#00f5d4";
        e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,245,212,0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0px)";
        e.currentTarget.style.background = "rgba(255,255,255,0.04)";
        e.currentTarget.style.border = "1px solid rgba(255,255,255,0.10)";
        e.currentTarget.style.color = "#ffffff";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {btn.label}
    </button>
  ))}
</div>

  {/* INPUT FORM */}
  <form onSubmit={handleAiSubmit} style={{
    display: "flex",
    gap: "12px"
  }}>
    <input 
      type="text"
      value={aiQuery}
      onChange={(e) => setAiQuery(e.target.value)}
      placeholder={
        chatMode === "live-chat-active"
          ? "Type your message to the support specialist..."
          : "Ask about courses, fees, or type 'human'..."
      }
      style={{
        flexGrow: "1",
        padding: "14px 16px",
        borderRadius: "8px",
        background: "rgba(0,0,0,0.2)",
        border: "1px solid rgba(255,255,255,0.06)",
        color: "#ffffff",
        fontSize: "14px"
      }}
    />

    <button 
      type="submit"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        color: chatMode === "live-chat-active" ? "#ff007f" : "#00f5d4",
        padding: "0 22px",
        borderRadius: "8px",
        fontWeight: "700",
        fontSize: "14px",
        cursor: "pointer"
      }}
    >
      Send
    </button>
  </form>

</div>
              )}

            </div>
          </ScrollReveal>

        </div>
      </div>

      {/* RE-ENGINEERED FAQ ACCORDION BLOCKS */}
      <div style={{ maxWidth: "850px", margin: "0 auto", padding: "40px 20px 100px 20px" }}>
        <ScrollReveal>
          <h2 style={{ fontSize: "28px", fontWeight: "800", marginBottom: "8px", textAlign: "center", letterSpacing: "-0.5px" }}>Operations Bureau FAQ</h2>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "15px", textAlign: "center", marginBottom: "40px" }}>
            Instant reference telemetry explaining system architectures and verification loops.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {faqs.map((faq, idx) => (
              <div key={idx} className="premium-card" style={{ borderRadius: "12px", overflow: "hidden" }}>
                <button 
                  onClick={() => toggleFaq(idx)}
                  style={{ width: "100%", background: "none", border: "none", color: "#ffffff", padding: "22px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", fontWeight: "700", fontSize: "16px", textAlign: "left" }}
                >
                  <span style={{ color: activeFaq === idx ? "#00f5d4" : "#ffffff", transition: "color 0.2s" }}>{faq.q}</span>
                  <span style={{ color: "#00f5d4", fontSize: "12px" }}>{activeFaq === idx ? "▲" : "▼"}</span>
                </button>
                {activeFaq === idx && (
                  <div style={{ padding: "0 24px 24px 24px", color: "rgba(255,255,255,0.6)", fontSize: "14px", lineHeight: "1.6", borderTop: "1px solid rgba(255,255,255,0.02)", paddingTop: "16px" }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>

    </div>
  );
}

export default ContactUs;