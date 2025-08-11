import UserCard from "./UserCard";
import SearchBar from "./SearchBar";
import { useEffect, useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";

const UsersList = ({ user }) => {

  const token = localStorage.getItem("token");
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/user/bulk", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            filter: query
          }
        });

        // Filter out the logged-in user
        const filteredUsers = response.data.users.filter(
          (u) => u._id !== user
        );

        setUsers(filteredUsers);
      } catch (error) {
        console.error("Error fetching user lists:", error);
      }
    };
    fetchData();
  }, [query, user, token]);

  return (
    <div className="bg-white mt-4 rounded-lg flex flex-col flex-1 shadow-lg mb-4 md:mb-1">
      {/* Fixed Header */}
      <div className="rounded-t-lg bg-[#042c74] py-2 px-2 flex justify-between items-center">
        <h1 className="font-poppins text-xl text-white px-2">Users</h1>
        <SearchBar query={query} setQuery={setQuery} />
      </div>

      {/* Scrollable list */}
      <div className="flex-1 overflow-y-auto">
        {users && users.length > 0 ? (
          users.map((u, index) => (
            <UserCard
              key={u._id}
              firstName={u.firstName}
              lastName={u.lastName}
              email={u.email}
              id={u._id} />
          ))
        ) : (
          <p className="text-gray-500 text-center py-4">No users found</p>
        )}
      </div>
    </div>
  )
}

export default UsersList;
