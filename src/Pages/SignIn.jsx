import React from "react";
import minerva from "../assets/minerva-logo.png";
import people from "../assets/people.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import Input from "../Components/Input";
import { toast } from "react-toastify";
import postHandler from "../Components/formHandler/postHandler";
import Loading from "../Components/loadingAnimation/loading";
import { useNavigate } from "react-router-dom";


const SignIn = () => {
  // handle toggle password
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    let res = await postHandler(
      "https://ae99-41-184-42-209.ngrok-free.app/api/auth/login",
      formData
    );
    console.log({ email: formData.email });
    
    if (res.status === 200) {
      toast.success("Successful", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log("response", res.data);
      console.log(res.data.userToken)
      setLoading(false);
      localStorage.setItem('token', res.data.userToken);

      // navigate("forgetPassword", { replace: true });
    } else if (res.status === 400) {
      toast.error("Bad request", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    setLoading(false);

    } else if (res.status === 401) {
      toast.error("Invalid email or password", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    setLoading(false);

    } else {
      toast.error("Something is wrong", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setLoading(false);

    }

  };

  return (
    <>
     <div className="flex relative ">
      {/* loading */}
      {loading && <div>
      <Loading/>
      </div>
      
      }
      {/* left pane */}
      <div className="bg-white grow basis-[20rem] max-w-[52.1875rem] h-[100vh] hidden sm:block ">
        
        <div className="">
          <img
            src={minerva}
            alt="minerva logo"
            className=" max-w-[14.25rem] pt-40 mx-auto "
          />
          <img
            className="w-[41rem] max-w-[41rem] h-[33.5rem] mx-auto -mt-10"
            alt="People search pana"
            src={people}
          />
        </div>
      </div>
      {/* right pane */}
      <div className="bg-[#BA68C8] grow basis-[53rem] max-w-[47.8125rem] h-[100vh] ">
        <div className="flex justify-center text-[2rem] font-medium leading-normal tracking-[0.025rem] pt-20">
          <Link to="#" className="text-white pr-20 underline">
            Sign in
          </Link>
          <Link
            to="signup"
            className="text-[#FFFFFF78] active:text-white hover:text-white"
          >
            sign up
          </Link>
        </div>
        <p className="text-[#E3D5D5] text-center text-3xl font-medium leading-normal tracking-[0.02813rem] pt-16">
          Login your account
        </p>
        {/* form */}
        <div className="">
          <form
            action=""
            className="flex flex-col gap-5 max-w-[32.1875rem] ml-4 mt-4 lg:ml-[9rem] "
          >
            <Input
              label={"Email Address"}
              type={"text"}
              name={"email"}
              value={formData.email}
              onChange={handleChange}
              className={"w-full rounded-lg border-white"}
              className2={"text-white"}
              required
            />
            <div className="relative">
              <Input
                label={"Password"}
                name={"password"}
                value={formData.password}
                type={showPassword ? "text" : "password"}
                onChange={handleChange}
                className={"w-full rounded-lg border-white"}
                className2={"text-white"}
                required
              />
              <i
                className={`absolute top-[3.5rem] left-[29.7rem] transform -translate-y-1/2 cursor-pointer ${
                  showPassword ? "text-[#BA68C8]" : "text-[#BA68C8]"
                }`}
                onClick={togglePasswordVisibility}
              >
                <i
                  className={`fas ${showPassword ? "fa-eye" : "fa-eye-slash"}`}
                ></i>
              </i>
            </div>

            <Link
              to={"/forgetPassword"}
              className="text-white text-[1.125rem] font-light leading-normal tracking-[0.01406rem] underline  ml-[22rem] "
            >
              Forgot Password?
            </Link>

            <label class="inline-flex items-center ">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-indigo-600"
              />
              <span class="ml-2 text-white text-[1.375rem] font-light leading-normal tracking[0.01719rem] ">
                Remember me
              </span>
            </label>
            <div>
              
              <button
                type={"button"}
                onClick={handleSubmit}
                className="rounded-lg border-white w-full  h-[3.3125rem] bg-[#F0EDFF] hover:bg-[#E8C3EFCC] text-[#BA68C8] text-center text-xl font-normal leading-normal tracking-[0.02113rem] "
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </>
   
  );
};

export default SignIn;
