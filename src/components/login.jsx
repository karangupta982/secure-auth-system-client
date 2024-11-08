import React from "react"
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { apiConnector } from "../Services/apiConnector";
import { endPoints } from "../Services/apis";
import {toast} from "react-hot-toast"
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

const {LOGIN_API} = endPoints

const Login = (props) => {

  const [loading, setLoading] = useState(false)

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isSubmitSuccessful },
    } = useForm()

    const navigate = useNavigate();

    const submitForm = async (data) => {
        // console.log("LoginForm Data - ", data)
        setLoading(true)
        const toastId = toast.loading("Loading")
        try{
            const response = await apiConnector("POST",LOGIN_API,data, { withCredentials: true })
            // console.log("response", response)
            if(!response.data.success){
                throw new Error(response.data.message);
            }
            localStorage.setItem("token", JSON.stringify(response.data.token))
            toast.success("Login successful.")
            navigate("/dashboard")
        }
        catch(error){
            toast.error(`Login failed. ${error.message}`)
            // console.log("Login failed. ",error)
            navigate("/login")
        }
        toast.dismiss(toastId)
        setLoading(false)
    }

    useEffect(()=>{
        if(isSubmitSuccessful){
            reset({
                email:"",
                password:"",
            })
        }
    }, [reset, isSubmitSuccessful])


  return (
    <form className="mx-[2vw] my-[1vh] flex flex-col gap-7 text-center" onSubmit={handleSubmit(submitForm)}>

        <div className="flex flex-col gap-2">

            <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-2xl font-bold">
                    Email
                </label>
                <input type="email" name="email" id="email"
                className="p-[0.7rem] rounded" placeholder="Enter Your Email"
                {...register("email", {required:true})} 
                />
                {
                    errors.email && (
                        <span className="-mt-1 text-[12px]  text-red-950">
                            !Please Enter Your Email Address.
                        </span>
                    )
                }

            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="password" className="text-2xl font-bold" >
                    Password
                </label>
                <input type="password" name="password" id="password"
                className="p-[0.7rem] rounded" placeholder="Enter Your Password"
                {...register("password", {required:true})}
                />
                {
                    errors.password && (
                        <span className="-mt-1 text-[12px]  text-red-950">
                            !Please Enter Your Password.
                            </span>
                        )
                }
            </div>

            <div>
            <button className="px-[0.6rem] py-[0.3rem] w-[10vw] text-center  text-2xl font-semibold rounded bg-slate-300 mt-[4vh] " type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Submit'}</button>
            </div>
        </div>

        <Link to="/signup">
            <button className="px-[0.6rem] py-[0.3rem] text-2xl font-semibold rounded bg-slate-300">Signup</button>
        </Link>

    </form>
  )
};

export default Login;
