import TransactionCard from "./TransactionCard";

const RecentTransactions = ({ transactions }) => {
  return (
    <div className="bg-white w-[100%] md:w-[30%] rounded-lg flex flex-col max-h-full shadow-lg">
      {/* Fixed Header */}
      <div className="rounded-t-lg bg-[#042c74] py-2 px-4">
        <h1 className="font-poppins text-lg text-white">Recent Transactions</h1>
      </div>

      {/* Scrollable list that fills remaining space */}
      <div className="flex-1 overflow-y-auto">
        {transactions && transactions.length > 0 ? (
          transactions.map((t, index) => (
            <TransactionCard
              key={t._id}
              email={t.username}
              date={t.date}
              amount={t.moneySent}
              type={t.type}
            />
          ))
        ) : (
          <p className="text-gray-500 text-center py-4">No transactions found</p>
        )}
      </div>
    </div>
  );
};

export default RecentTransactions;
