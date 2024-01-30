import { useState } from "react";
import LeftPanel from "../Components/LeftPanel";
import postHandler from "../Components/formHandler/postHandler";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Input from "../Components/Input";
import Loading from "../Components/loadingAnimation/loading";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [show, setShow] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const handleBack = () => {
    show === 2 ? setShow(1) : navigate("/");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  // handling form
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    gender: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordMatch(true);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit2 = async () => {
    setLoading(true);
    console.log("lll", formData);
    // Check if passwords match
    if (
      formData.password == formData.confirmPassword &&
      formData.password.length > 7
    ) {
      // Passwords match, you can proceed with form submission
      // Add your API call or further logic here.
      let res = await postHandler(
        "https://ae99-41-184-42-209.ngrok-free.app/api/auth/signup",
        formData
      );
      console.log(formData);

      if (res.status === 200) {
        toast.success("Sign up successful", {
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

        navigate("/", { replace: true });
      } else if (res.status === 400) {
        toast.error("User with the same email already exist", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigate("/", { replace: true });
      } else if (res.status === 401) {
        toast.error(
          "Oops! Looks like you are not shortlisted. please check back",
          {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );
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
      }
    } else {
      // Passwords don't match, show an error message
      // setPasswordMatch(false);
      toast.error(" Password do not match", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    setLoading(false);
  };

  const handleSubmit = async () => {
    setLoading(true);
    let res = await postHandler(
      "https://ae99-41-184-42-209.ngrok-free.app/api/auth/validateEmail",
      { email: formData.email }
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
      setShow(2);
      // } else if (res.status === 400) {
      //   toast.error("Bad request", {
      //     position: "top-center",
      //     autoClose: 3000,
      //     hideProgressBar: false,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //     theme: "light",
      //   });
    } else if (res.status === 401) {
      toast.error("Oops! You're not shortlisted", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
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
    }
    setLoading(false);
  };

  // important  data
  function checkFormData() {
    if (
      formData.address != "" &&
      formData.email != "" &&
      formData.firstName != "" &&
      formData.lastName != "" &&
      formData.phoneNumber != "" &&
      formData.gender != ""
    ) {
      
      console.log("lll", formData)
      handleSubmit();
    }
    else{
      toast.error("Enter all fields", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    

  }

  return (
    <>
      <div className="flex ">
        {/* loading */}
        {loading && (
          <div>
            <Loading />
          </div>
        )}
        <div className="grow basis-[25.625rem] max-w-[25.625rem]  ">
          <LeftPanel backBtn={handleBack} className={"h-[100vh]"} />
        </div>
        {/* right pane */}
        <div className="grow basis-[26rem] pl-4 lg:pl-[7.75rem] ">
          <div className=" ">
            <p className="text-[#0F0012] text-3xl font-medium leading-normal tracking-[0.02813rem] pt-5">
              Set up your account
            </p>
            <p className="w-[44.437rem] text-[#252E46E5] text-[1.25rem] font-light leading-normal tracking-[0.00313rem]  ">
              Please complete your profile. <br />
              Don't worry about your data its safe and can be seen by you alone
            </p>
          </div>
          {/* form */}
          <div className="pt-6 max-w-[52rem] max-h-[2.5625rem]  ">
            <form action="" className="">
              {show === 1 && (
                <>
                  <div className="grid mb-6 sm:grid-cols-2 gap-x-4">
                    <div>
                      <Input
                        label={"First Name"}
                        className={
                          "bg-[#F0EDFF] w-full shadow-lg shadow-neutral-400/30 border-none border border-gray-300 "
                        }
                        className2={"block text-[#000]"}
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        id="firstName"
                        onChange={handleChange}
                        autoComplete="off"
                        required
                      />
                    </div>
                    <div>
                      <Input
                        label={"Last Name"}
                        className={
                          "bg-[#F0EDFF] w-full shadow-lg shadow-neutral-400/30 border-none border border-gray-300"
                        }
                        className2={"block text-[#000]"}
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        id="lastName"
                        onChange={handleChange}
                        autoComplete="off"
                        required
                      />
                    </div>
                  </div>
                  <Input
                    label={"Email"}
                    span={"*"}
                    className={
                      "bg-[#F0EDFF] w-full shadow-lg shadow-neutral-400/30 border-none border border-gray-300 "
                    }
                    className2={"block text-[#000]"}
                    type="email"
                    name="email"
                    value={formData.email}
                    id="email"
                    onChange={handleChange}
                    autoComplete="off"
                    required
                  />
                  <Input
                    label={"Phone Number"}
                    span={"*"}
                    className={
                      "bg-[#F0EDFF] w-full shadow-lg shadow-neutral-400/30 border-none border border-gray-300 "
                    }
                    className2={"block text-[#000] pt-5"}
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    id="phoneNumber"
                    onChange={handleChange}
                    autoComplete="off"
                    required
                  />
                  <Input
                    label={"Address"}
                    span={"*"}
                    className={
                      "bg-[#F0EDFF] w-full shadow-lg shadow-neutral-400/30 border-none border border-gray-300 "
                    }
                    className2={"block text-[#000] pt-5"}
                    type="text"
                    name="address"
                    value={formData.address}
                    id="address"
                    onChange={handleChange}
                    autoComplete="off"
                    required
                  />

                  <div>
                    <label
                      htmlFor="Gender"
                      className=" block pt-5 text-lg font-normal text-[#000] dark:text-white "
                    >
                      Gender <span className="text-[#FF0220]">*</span>
                    </label>
                    <select
                      type="text"
                      name="gender"
                      value={formData.gender}
                      id="gender"
                      onChange={handleChange}
                      autoCmplete="off"
                      className=" bg-[#F0EDFF] pl-5 w-full h-[3rem] border border-gray-300 text-gray-900 text-sm shadow-lg shadow-neutral-400/50 border-none"
                      required
                    >
                      <option value></option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                  <div>
                    <p className=" text-[#000] text-[1.25rem] font-light leading-normal tracking-[0.00313rem] pt-3 ">
                      Already registered?{" "}
                      <Link to="/" className="font-semibold">
                        Back to Sign in
                      </Link>
                    </p>
                  </div>
                  <div>
                    <button
                      type={"button"}
                      className="rounded-2xl bg-[#BA68C8] hover:bg-[#BA68C8CC] text-white py-[0.5rem] px-[4rem] text-center text-sm font-medium leading-normal tracking-[0.025rem] ml-[40rem] "
                      onClick={() => checkFormData()}
                    >
                      Continue
                    </button>
                  </div>
                </>
              )}

              {show === 2 && (
                <>
                  <div>
                    <div className="grid mb-6 md:grid-cols-2 relative mt-10 ">
                      <Input
                        label={"Password"}
                        p={"Mininum of 8 characters "}
                        span={"*"}
                        className={
                          "pl-5 w-full border-b-2 border-t-0 border-r-0 border-l-0 border-black "
                        }
                        className2={"block mb-2"}
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        id="password"
                        onChange={handleChange}
                        autoComplete="off"
                        required
                      />
                      <i
                        className={`absolute top-[5.5rem] left-[23rem] transform -translate-y-1/2 cursor-pointer ${
                          showPassword ? "text-[#BA68C8]" : "text-[#BA68C8]"
                        }`}
                        onClick={togglePasswordVisibility}
                      >
                        <i
                          className={`fas ${
                            showPassword ? "fa-eye" : "fa-eye-slash"
                          }`}
                        ></i>
                      </i>
                    </div>
                    

                    <div className="grid mb-6 md:grid-cols-2 relative mt-20">
                      <Input
                        label={"Confirm Password"}
                        span={"*"}
                        p={"Mininum of 8 characters " }
                        className={
                          "pl-5 w-full border-b-2 border-t-0 border-r-0 border-l-0 border-black "
                        }
                        className2={"block mb-2"}
                        type={showConfirmPassword ? "text" : "confirmPassword"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        id="confirmPassword"
                        onChange={handleChange}
                        autoComplete="off"
                        required
                      />
                     <i
                        className={`absolute top-[5.5rem] left-[23rem] transform -translate-y-1/2 cursor-pointer ${
                          showConfirmPassword ? "text-[#BA68C8]" : "text-[#BA68C8]"
                        }`}
                        onClick={toggleConfirmPasswordVisibility}
                      >
                        <i
                          className={`fas ${
                            showConfirmPassword ? "fa-eye" : "fa-eye-slash"
                          }`}
                        ></i>
                      </i>
                    </div>

                    

                    <label class="inline-flex items-center mt-6">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-indigo-600"
                      />
                      <span class="ml-2 text-black text-[1.375rem] font-light leading-normal tracking[0.01719rem] ">
                        Remember me
                      </span>
                    </label>
                    <div>
                      <button
                        type={"button"}
                        onClick={handleSubmit2}
                        className="rounded-2xl bg-[#BA68C8] hover:bg-[#BA68C8CC] text-white py-[1rem] px-[4.5625rem] text-center text-sm font-medium leading-normal tracking-[0.025rem] ml-[9rem] mt-8"
                      >
                        Sign up
                      </button>
                    </div>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
