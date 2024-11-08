import React from "react"
import { Link } from "react-router-dom";

const Dashboard = (props) => {
  return (
    <div className="text-white font-bold absolute w-full h-full flex justify-center items-center flex-col text-5xl bg-gray-900 gap-[10vh]">
        
        <h1 className="">WelCome to Dashboard.</h1>
        <Link to="/" className="">Home</Link>
    </div>
  )
};

export default Dashboard;
