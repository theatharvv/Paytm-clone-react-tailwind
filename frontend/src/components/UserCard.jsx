import { useNavigate } from "react-router-dom";
import { FaPaperPlane } from "react-icons/fa"; 

const UserCard = ({ firstName, lastName, email, id }) => {
  const navigate = useNavigate();

  return (
    <div className="p-2 border-b border-gray-300 flex justify-between items-center">
      {/* Left section */}
      <div className="flex">
        <div className="flex justify-center items-center pe-3">
          <div className="bg-[#04bcf4] w-[48px] h-[48px] rounded-full flex justify-center items-center">
            <h1 className="text-center text-2xl text-white font-semibold">
              {firstName?.[0]?.toUpperCase()}
            </h1>
          </div>
        </div>
        <div className="flex-col">
          <h1 className="font-poppins text-lg">
            {firstName} {lastName}
          </h1>
          <p className="text-gray-400 font-poppins text-xs">{email}</p>
        </div>
      </div>

      {/* Button */}
      <button
        type="button"
        className="flex items-center justify-center text-white bg-[#042c74] font-medium rounded-lg font-poppins 
                   px-2 md:px-5 py-1 md:py-2.5 text-center me-2 hover:transform hover:scale-105 transition-transform"
        onClick={() => {
          navigate("/send", {
            state: { firstName, lastName, email, id }
          });
        }}
      >
        {/* Mobile icon */}
        <span className="block sm:hidden text-lg p-1">
          <FaPaperPlane />
        </span>

        {/* Desktop text */}
        <span className="hidden sm:block">Send Money</span>
      </button>
    </div>
  );
};

export default UserCard;
