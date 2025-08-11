import TopBar from "../components/TopBar";
import RecentTransactions from "../components/RecentTransaction";
import BalanceCard from "../components/BalanceCard";
import UsersList from "../components/UsersList";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Dashboard = () => {

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
  if (!token) return null; // prevent any render until redirect

  const [credit, setCredit] = useState(0);
  const [debit, setDebit] = useState(0);
  const [balance, setBalance] = useState(0);
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/account/balance",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setCredit(response.data.credit);
        setDebit(response.data.debit);
        setBalance(response.data.balance);
        setUserId(response.data.userId);
        setTransactions(response.data.transactions);
        setName(response.data.name);
        setEmail(response.data.email);

      } catch (error) {
        console.error("Error fetching account balance:", error);
      }
    };

    fetchData();
  }, [token]);


  return (
    <div className="flex flex-col bg-neutral-500 h-screen w-screen">
      <TopBar user={name} email={email}/>
      {/* Bottom Half */}
      <div className="flex flex-col md:flex-row justify-between py-4 px-5 bg-slate-100 flex-1 w-full">
        {/* Left Section */}
        <div className="flex-col flex-1 pe-0 md:pe-5 flex">
          <BalanceCard balance={balance} credit={credit} debit={debit} />
          <UsersList user={userId} />
        </div>
        <RecentTransactions transactions={transactions} />
      </div>

    </div>
  )
}


export default Dashboard;

