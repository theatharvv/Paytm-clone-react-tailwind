import { useLocation, useNavigate } from "react-router-dom";
import background from "../img/transactionBackground2.jpg";
import logo from "../img/TopBar_logo.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const SendMoney = () => {

  //Handeling unauthorised access to page
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      toast.error("Session expired. Please log in again.", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/signup", { replace: true });
    }
  }, [token, navigate]);
  if (!token) return null;

  //Getting data from previous page
  const location = useLocation();
  const { firstName, lastName, email, id } = location.state || {};

  const [amount, setAmount] = useState(0);

  return (
    <div
      className="h-screen w-screen bg-cover bg-center flex justify-center items-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="bg-white flex flex-col justify-center items-center h-[420px] w-[390px] sm:w-[45%] md:w-[35%] lg:w-[360px] rounded-lg shadow-2xl">

        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <img src={logo} alt="topBar-logo" className="pt-2 w-[160px] h-[48px]" />
          <h2 className="font-bold font-poppins text-3xl pt-2 text-[#042c74]">Send Money</h2>
        </div>

        {/* User Card */}
        <div className="flex justify-start w-full">
          <div className="flex pt-5 ps-4">
            <div className="flex justify-center items-start pe-3">
              <div className="bg-[#04bcf4] w-[48px] h-[48px] rounded-full flex justify-center items-center">
                <h1 className="text-center text-2xl text-white font-semibold">
                  {firstName?.[0]?.toUpperCase()}
                </h1>
              </div>
            </div>
            <div className="flex-col">
              <h1 className="font-poppins text-lg">{firstName} {lastName}</h1>
              <p className="text-gray-400 font-poppins text-xs">{email}</p>
            </div>
          </div>
        </div>

        {/* Input */}
        <div className="pt-4 pb-1 px-5 w-full">
          <p className="pb-1 font-poppins text-black">Amount</p>
          <input
            className="px-3 w-full h-[65%] border rounded-lg"
            type="number"
            placeholder="₹0"
            onChange={e => {
              setAmount(e.target.value);
            }}
          />
        </div>

        {/* Button */}
        <div className="px-5 pt-4 w-full">
          <button
            type="button"
            className="px-5 py-2 me-2 mb-2 w-full font-poppins text-white bg-[#042c74] hover:bg-[#023ba5] rounded-lg"
            onClick={async () => {
              try {
                const response = await axios.post("http://localhost:5000/api/v1/account/transfer",
                  {
                    amount: amount,
                    to: id
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${token}`
                    }
                  })
                toast.success("Money sent successfully!");
                navigate("/dashboard");
              } catch (error) {
                console.error("Error encountered while sending money:", error);
                toast.error(
                  <>Payment failed.<br />Reason: {error.response?.data?.message || error.message || "Unknown error"}</>
                );
              }

            }}
          >
            Initiate Transfer
          </button>
        </div>
        
        {/* Button */}
        <div className="px-5 pt-1 w-full">
          <button
            type="button"
            className="px-5 py-2 me-2 mb-2 w-full font-poppins text-white bg-red-500 hover:bg-red-600 rounded-lg"
            onClick={()=>{
              toast.error("Transaction failed!");
              navigate("/dashboard")
            }}
          >
            Cancel Transfer
          </button>
        </div>

      </div>
    </div>
  );
};

export default SendMoney;
