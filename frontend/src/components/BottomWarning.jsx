import { useNavigate } from "react-router-dom";

const BottomWarning = ({ label, buttonText, to }) => {
  const navigate = useNavigate();

  return (
    <div className="pt-2 pb-2 mb-6 flex font-poppins">
      <p className="text-sm">{label}</p>
      <button
        type="button"
        className="mx-1 text-sm underline hover:text-[#04bcf4]"
        onClick={() => navigate(to)}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default BottomWarning;
