import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { TbSocial } from "react-icons/tb";
import { BsShare } from "react-icons/bs";
import { AiOutlineInteraction } from "react-icons/ai";
import { ImConnection } from "react-icons/im";
import CustomButton from "./ngo/CustomButton";
import Loading from "./ngo/Loading";
import TextInput from "./ngo/TextInput";
import { BgImage } from "./assets"; // Ensure this is the correct import
import { apiRequest } from "./utils/index.js"; // Ensure the path is correct
import { UserLogin } from "./redux/userSlice.js";

const NgoLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const [errMsg, setErrMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();

  // const onSubmit = async (data) => {
  //   setIsSubmitting(true);
  //   try {
  //     const res = await apiRequest({
  //       url: "/auth/login",
  //       data,
  //       method: "POST",
  //     });

  //     if (res?.status === "failed") {
  //       setErrMsg(res?.message);
  //     } else {
  //       setErrMsg("");
  //       localStorage.setItem("authToken", token);
  //       localStorage.setItem("username", res.user.username);
  //       const newData = { token: res?.token, ...res?.user };
  //       dispatch(UserLogin(newData));
  //       window.location.replace("/mgo");
  //     }
  //   } catch (error) {
  //     setErrMsg("An error occurred during login. Please try again.");
  //     console.log(error);
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };
  const onSubmit = async (data, e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
   
  
      setIsSubmitting(true);
  
      const res = await apiRequest({
        url: "/auth/login",
        data,
        method: "POST",
      });
  

  
      if (res?.status === "failed") {
        setErrMsg(res?.message);
        alert(`Error Message: ${res?.message}`); // Display error message
      } else {
        setErrMsg("");
        const token = res?.token;
  
        if (token) {
          localStorage.setItem("BearerToken", token);
        
          localStorage.setItem("authToken", token);
          localStorage.setItem("username", res.user.firstName);
          dispatch(UserLogin({ token, ...res.user }));
          const newData = { token, ...res?.user };
          dispatch(UserLogin(newData));
          window.location.replace("/Home");
        } else {
          setErrMsg("Token is undefined. Please try again.");
          alert("Token is undefined. Please try again."); // Alert if token is undefined
        }
      }
    } catch (error) {
      alert(`Error: ${JSON.stringify(error)}`); // Display error details
      setErrMsg("An error occurred during login. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className='bg-bgColor w-full h-[120vh] flex items-center justify-center p-6'>
      <div className='w-full md:w-4/3 h-fit lg:h-full 2xl:h-5/6 py-8 lg:py-0 flex bg-[#70ac54] rounded-xl overflow-hidden shadow-xl'>
        {/* LEFT */}
        <div className='w-full lg:w-1/2 h-full p-10 2xl:px-20 flex flex-col justify-center'>
          <div className='w-full flex gap-2 items-center mb-6'>
            <div className='p-2 bg-[#104D3E] rounded text-white'>
              <TbSocial />
            </div>
            <span className='text-2xl text-[#20570E] font-semibold'>
            WildMedia360
            </span>
          </div>

          <p className='text-ascent-1 text-base font-semibold'>
            Log in to your account
          </p>
          <span className='text-sm mt-2 text-ascent-2'>Welcome back</span>

          <form
            className='py-8 flex flex-col gap-5'
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextInput
              name='email'
              placeholder='email@example.com'
              label='Email Address'
              type='email'
              register={register("email", {
                required: "Email Address is required",
              })}
              styles='w-full rounded-full'
              labelStyle='ml-2'
              error={errors.email ? errors.email.message : ""}
            />

            <TextInput
              name='password'
              label='Password'
              placeholder='Password'
              type='password'
              styles='w-full rounded-full'
              labelStyle='ml-2'
              register={register("password", {
                required: "Password is required!",
              })}
              error={errors.password ? errors.password?.message : ""}
            />

            <Link
              to='/reset-password'
              className='text-sm text-right text-blue font-semibold'
            >
              Forgot Password?
            </Link>

            {errMsg && (
              <span
                aria-live="assertive"
                className={`text-sm ${
                  errMsg?.status === "failed"
                    ? "text-[#f64949fe]"
                    : "text-[#2ba150fe]"
                } mt-0.5`}
              >
                {errMsg}
              </span>
            )}

            {isSubmitting ? (
              <Loading />
            ) : (
              <CustomButton
                type='submit'
                containerStyles={`inline-flex justify-center rounded-md bg-[#20570E] px-8 py-3 text-sm font-medium text-white outline-none`}
                title='Login'
              />
            )}
          </form>

          <p className='text-ascent-2 text-sm text-center'>
            Don't have an account?
            <Link
              to='/ngoregister'
              className='text-[#065ad8] font-semibold ml-2 cursor-pointer'
            >
              Create Account
            </Link>
          </p>
        </div>
        {/* RIGHT */}
        <div className='hidden w-1/2 h-full lg:flex flex-col items-center justify-center bg-blue'>
          <div className='relative w-full flex items-center justify-center'>
            <img
              src={BgImage}
              alt='Bg Image'
              className='w-48 2xl:w-64 h-48 2xl:h-64 rounded-full object-cover'
            />

            <div className='absolute flex items-center gap-1 bg-white left-160 top-10 py-2 px-5 rounded-full'>
              <BsShare size={14} />
              <span className='text-xs font-medium'>Share</span>
            </div>

            <div className='absolute flex items-center gap-1 bg-white right-40 top-6 py-2 px-5 rounded-full'>
              <ImConnection />
              <span className='text-xs font-medium'>Connect</span>
            </div>

            <div className='absolute flex items-center gap-1 bg-white left-12 bottom-6 py-2 px-5 rounded-full'>
              <AiOutlineInteraction />
              <span className='text-xs font-medium'>Interact</span>
            </div>
          </div>

          <div className='mt-16 text-center'>
            <p className='text-white text-base'>
              Connect with friends & have share for fun
            </p>
            <span className='text-sm text-white/80'>
              Share memories with friends and the world.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NgoLogin;