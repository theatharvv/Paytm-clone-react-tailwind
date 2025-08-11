import background from "../img/transactionBackground.jpg";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import CustomButton from "../components/CustomButton";
import BottomWarning from "../components/BottomWarning";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";

const Signup = () => {

  //Handeling if user is already logged in
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
  
    useEffect(() => {
      if (token) {
        toast.success("Session active, you are already logged in.")
        navigate("/dashboard", { replace: true });
      }
    }, [token, navigate]);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="h-screen w-screen bg-cover bg-center flex justify-center items-center" style={{ backgroundImage: `url(${background})` }}>
      <div className="bg-white flex flex-col justify-center items-center h-[540px] w-[80%] sm:w-[45%] md:w-[35%] lg:w-[360px] rounded-lg shadow-2xl">
        <Heading label={"Sign Up"} />
        <SubHeading content={"Enter your information to create an account"} />
        <InputBox label={"First Name"} placeHolder={"Atharv"}
          type={"text"}
          onChange={e => {
            setFirstName(e.target.value);
          }} />
        <InputBox label={"Last Name"} placeHolder={"Rane"}
          type={"text"}
          onChange={e => {
            setLastName(e.target.value);
          }}
        />
        <InputBox label={"Email"} placeHolder={"atharvrane@example.com"}
          type={"text"}
          onChange={e => {
            setEmail(e.target.value);
          }}
        />
        <InputBox label={"Password"} type={"password"}
          onChange={e => {
            setPassword(e.target.value);
          }}
        />
        <CustomButton label={"Sign Up"}
          onClick={
            async () => {
              try {
                const response = await axios.post("http://localhost:5000/api/v1/user/signup", {
                  firstName,
                  lastName,
                  email,
                  password
                });
                toast.success("Sign in required to proceed.")
                navigate("/signin");
              } catch (error) {
                console.error(error.response?.data || error.message);
                toast.error(
                  <>Signup failed.<br />Reason: {error.response?.data?.message || error.message || "Unknown error"}</>
                );
              }

            }
          }
        />
        <BottomWarning label={"Already have an account?"} buttonText={"login"} to={"/signin"}/>
      </div>
    </div>
  )
}

export default Signup;
