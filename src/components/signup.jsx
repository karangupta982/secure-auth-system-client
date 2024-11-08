// import {useDispatch} from "react-redux"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import {useForm}  from "react-hook-form"
import {toast} from "react-hot-toast"
import {apiConnector} from "../Services/apiConnector"
import { endPoints } from "../Services/apis";
import { useNavigate } from 'react-router-dom';


const {SIGNUP_API} = endPoints;

const SignUp = (props) => {
    const [loading,setLoading] = useState(false)

    // const dispatch = useDispatch()
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isSubmitSuccessful },
    } = useForm()

    const navigate = useNavigate()


    const submitForm = async (data)=>{
        // console.log("Form Data - ", data)
        setLoading(true)
        const toastId = toast.loading("Signing up");
        try{
            const response = await apiConnector("POST",SIGNUP_API,data, { withCredentials: true })
            // console.log("response from signup", response);
            if(!response.data.success){
                throw new Error(response.data.message)
            }
            toast.success("SignUp Successful.")
            navigate("/login")
        }
        catch(error){
            // console.log("SignUp Failed.", error.message)
            toast.error("SignUp Failed." + error.message)
            navigate("/signup")
        }
        setLoading(false)
        toast.dismiss(toastId)
    }


    useEffect(()=>{
        if(isSubmitSuccessful){
            reset({
                userName:"",
                email:"",
                password:"",
            })
        }
    }, [reset, isSubmitSuccessful])


  return (
    <form className="mx-[2vw] my-[3vh] flex flex-col gap-7 text-center" onSubmit={handleSubmit(submitForm)}>

    <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-1">
            <label className="text-2xl font-bold" htmlFor="userName">UserName</label>

            <input type="text" name="userName" id="userName" placeholder="Your Name" className="p-[0.7rem] rounded"
            {...register("userName", { required:true})} 
            />
            {
                errors.userName && (
                    <span className="-mt-1 text-[12px]  text-red-950">
                        !Please Enter Your UserName.
                    </span>
                )
            }
        </div>

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
            <label htmlFor="password" className="text-2xl font-bold">
                Password
            </label>
            <input type="password" name="password" id="password"
            className="p-[0.7rem] rounded" placeholder="Enter Your Password"
            {...register("password", {required:true})}
            />
            {
                errors.password && (
                    <span className="-mt-1 text-[12px] text-red-950">
                        !Please Enter Your Password.
                        </span>
                    )
            }
        </div>

        <div>
            <button className="px-[0.6rem] py-[0.3rem] w-[10vw] text-center  text-2xl font-semibold rounded bg-slate-300 mt-[4vh] " type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Submit'}</button>
            </div>
    </div>

    <Link to="/login">
            <button className="px-[0.6rem] py-[0.3rem] text-2xl font-semibold rounded bg-slate-300">Login</button>
        </Link>
    </form>
    
  )
};

export default SignUp;
