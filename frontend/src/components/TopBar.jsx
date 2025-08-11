// TopBar.jsx
import { useState } from "react";
import logo from "../img/TopBar_logo.png";
import Dropdown from "./Dropdown";

const TopBar = ({ user, email }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <div className="flex w-screen justify-between bg-white relative p-2">
            {/* Left Logo */}
            <div>
                <img src={logo} alt="topBar-logo" className="pt-1 pb-1 w-[160px] h-[48px]" />
            </div>

            {/* Right Section */}
            <div className="flex justify-center items-center">
                <div className="hidden sm:block">
                    <div className="flex-col">
                        <h1 className="font-poppins text-lg">Hey {user} 👋</h1>
                        <p className="text-gray-400 font-poppins text-xs">
                            Welcome to your transaction partner
                        </p>
                    </div>
                </div>

                <div
                    tabIndex={0} // makes div focusable
                    onClick={() => setDropdownOpen(prev => !prev)}
                    className="ms-6 me-4 bg-[#04bcf4] w-[48px] h-[48px] rounded-full flex justify-center items-center cursor-pointer focus:border-2 focus:border-[#042c74]"
                >
                    <h1 className="text-center text-2xl text-white font-semibold">
                        {user[0]}
                    </h1>
                </div>


                {/* Dropdown */}
                {dropdownOpen && (
                    <div className="absolute top-[64px] right-4 z-50">
                        <Dropdown user={user} email={email} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default TopBar;
