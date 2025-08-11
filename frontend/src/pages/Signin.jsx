import background from "../img/transactionBackground.jpg";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import CustomButton from "../components/CustomButton";
import BottomWarning from "../components/BottomWarning";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";

const Signin = () => {

  //Handeling unauthorised access to page
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      toast.success("Session active, you are already logged in.")
      navigate("/dashboard", { replace: true });
    }
  }, [token, navigate]);


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div
      className="h-screen w-screen bg-cover bg-center flex justify-center items-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="bg-white flex flex-col justify-center items-center h-[390px] w-[360px] sm:w-[45%] md:w-[35%] lg:w-[360px] rounded-lg shadow-2xl">
        <Heading label={"Sign In"} />
        <SubHeading content={"Enter your credentials to access your account"} />

        <InputBox
          label={"Email"}
          placeHolder={"atharvrane@example.com"}
          type={"email"}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <InputBox
          label={"Password"}
          type={"password"}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <CustomButton
          label={"Sign In"}
          onClick={async () => {
            try {
              const response = await axios.post(
                "http://localhost:5000/api/v1/user/login",
                { email, password }
              );

              const token = response.data?.token;
              if (!token) {
                toast.error(
                  <>No token received from server. Please try again.</>
                );
                return;
              }

              localStorage.setItem("token", token);
              navigate("/dashboard");
            } catch (error) {
              console.error(error.response?.data || error.message);
              const message =
                error.response?.data?.message ||
                error.message
              toast.error(
                <>Signup failed.<br />Reason: {message || "Unknown error"}</>
              );
            }
          }}
        />

        <BottomWarning
          label={"Don't have an account?"}
          buttonText={"Sign Up"}
          to={"/signup"}
        />
      </div>
    </div>
  );
};

export default Signin;
