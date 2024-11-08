import React from "react"
import {Link} from "react-router-dom"


const Home = (props) => {
  return (
    <div>
        <h1 className="text-5xl relative top-2 text-center text-white">Home</h1>
            <div className="flex justify-between items-center m-[5rem] text-4xl font-bold text-white">
                <Link to={"/signup"}>
                    Signup
                </Link>

                <div className="absolute top-[60%] left-[40%]">
                  <Link to={"/dashboard"}>
                      Dashboard
                  </Link>
                </div>

                <Link to={"/login"}>
                    Login
                </Link>
            </div>
    </div>
  )
};

export default Home;
