const BalanceCard = ({ balance, credit, debit }) => {
  const netSavings = credit - debit;
  const isPositive = netSavings > 0;

  return (
    <div className="bg-white flex flex-col sm:flex-row justify-between items-center rounded-lg shadow-lg p-4 sm:p-6 w-full ">
      {/* Balance Section */}
      <div className="text-center sm:text-left sm:flex-1 mb-4 sm:mb-0">
        <h2 className="font-poppins text-lg sm:text-2xl text-neutral-500">
          Your current balance
        </h2>
        <h1 className="font-poppins mt-2 text-3xl sm:text-5xl">
          ₹{balance}
        </h1>
        <h2
          className={`font-poppins mt-2 text-lg sm:text-xl ${
            isPositive ? "text-green-500" : "text-red-500"
          }`}
        >
          Net Savings {isPositive ? "+" : "-"}₹{Math.abs(netSavings)}
        </h2>
      </div>

      {/* Credit and Debit Section */}
      <div className="flex justify-around sm:justify-end sm:flex-1 w-full sm:w-auto">
        <div className="text-center sm:text-right mx-4">
          <h2 className="font-poppins text-lg sm:text-2xl text-neutral-500">
            Received
          </h2>
          <h1 className="font-poppins mt-2 text-xl sm:text-2xl text-green-500">
            +₹{credit}
          </h1>
        </div>
        <div className="text-center sm:text-right mx-4">
          <h2 className="font-poppins text-lg sm:text-2xl text-neutral-500">
            Spent
          </h2>
          <h1 className="font-poppins mt-2 text-xl sm:text-2xl text-red-500">
            -₹{debit}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default BalanceCard;
