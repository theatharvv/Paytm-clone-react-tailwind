const TransactionCard = ({ email, type, amount, date }) => {
  // Format the date
  const formattedDate = new Date(date).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div className="p-2 border-b border-gray-300 flex justify-between items-center">
      {/* Left section */}
      <div className="flex">
        <div className="flex justify-center items-center pe-3">
          <div className="bg-[#04bcf4] w-[48px] h-[48px] rounded-full flex justify-center items-center">
            <h1 className="text-center text-2xl text-white font-semibold">
              {email?.[0]?.toUpperCase()}
            </h1>
          </div>
        </div>
        <div className="flex-col">
          <h1 className="font-poppins text-lg">{email}</h1>
          <p className="text-gray-400 font-poppins text-xs">{formattedDate}</p>
        </div>
      </div>

      {/* Right section */}
      <div className="pe-3">
        <h1
          className={`font-poppins text-lg ${
            type === "credit" ? "text-green-500" : "text-red-500"
          }`}
        >
          {type === "credit" ? "+" : "-"}&#8377;{amount}
        </h1>
      </div>
    </div>
  );
};

export default TransactionCard;
