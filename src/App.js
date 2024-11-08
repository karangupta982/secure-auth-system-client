import './App.css';
import Home from './components/Home.jsx';
import {Routes, Route} from "react-router-dom"
import bg from "../src/assets/bg.jpg"
import Login from "./components/login.jsx"
import SignUp from './components/signup.jsx';
import Dashboard from './components/Dashboard.jsx';
import PrivateRoute from './components/PrivateRoute.jsx'

function App() {
  return (
    <div className="h-screen w-screen relative flex justify-center items-center">
        <img src={`${bg}`} alt="Background" className="h-full w-full" />
        <div className="absolute h-[80%] w-[60%] bg-gray-700 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-70 border border-gray-100 ">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/signup' element={<SignUp/>} />
            <Route 
              path='/dashboard' 
              element={
                <PrivateRoute>
                  <Dashboard/>
                </PrivateRoute>
              } 
            />
          </Routes>

        </div>
    </div>
  );
}

export default App;
