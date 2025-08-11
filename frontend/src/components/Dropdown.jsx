import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Dropdown = ({ user, email }) => {

    const navigate = useNavigate();
    const handleSignOut = () => {
        localStorage.removeItem("token");
        toast.success("Signed out successfully!");
        navigate("/signin");
    };

    return (
        <div className="z-50  text-base list-none bg-[#04bcf4] divide-gray-100 rounded-lg shadow-sm border-2 ">
            <div className="px-4 py-3">
                <span className="block text-sm text-gray-900 dark:text-white font-poppins">{user}</span>
                <span className="block text-sm text-gray-600 truncat font-poppins">
                    {email}
                </span>
            </div>
            <ul className="py-2">
                <li>
                    <button
                        onClick={handleSignOut}
                        className="w-full text-left px-4 py-2 text-sm font-poppins text-white hover:bg-gray-100 hover:text-black"
                    >
                        Sign out
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default Dropdown;

// [#04bcf4]