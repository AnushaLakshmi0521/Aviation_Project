
import { useNavigate } from "react-router-dom";

export default function FloatingAIButton() {
  const navigate = useNavigate();

  const goToAI = () => {
    navigate("/contactus#ai-section");
  };

  return (
    <button
      onClick={goToAI}
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        background: "#4f46e5",
        color: "white",
        border: "none",
        padding: "14px 16px",
        borderRadius: "50px",
        cursor: "pointer",
        zIndex: 9999,
        boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
        fontSize: "14px",
        fontWeight: "600"
      }}
    >
      💬 AI Help
    </button>
  );
}