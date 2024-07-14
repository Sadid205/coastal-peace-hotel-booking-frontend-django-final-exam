import { useState,useEffect } from "react";
import Logo from "../assets/logo.png";
// import Lock from "../assets/Lock.png";
import { LiaBarsSolid } from "react-icons/lia";
import { RxCross1 } from "react-icons/rx";
// import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast,{ Toaster } from "react-hot-toast";
const Header = () => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false);
  const [userData,setUserData] = useState(null)
  const token = localStorage.getItem("Token")
  const user_id = localStorage.getItem("user_id")
  const Links = [
    { name: "Home", link: "/" },
    // { name: "Supports", link: "/supports" },
    // { name: "About", link: "/about" },
  ];
  if (token){
    Links.push({ name: "Deposit", link: "deposit" })
  }
  useEffect(()=>{
    const fetchData = async()=>{
      try{
        const getUser = await fetch(`https://coastal-peace-hotel-booking.onrender.com/guest/list/?user_id=${user_id}`,{method:"GET",headers:{'Authorization':`Token ${token}`,'Content-Type':'application/json'}})
        if (!getUser.ok){
          throw new Error(`HTTP error! status: ${getUser.status}`)
        }
        const data = await getUser.json()
        setUserData(data)
      }catch(e){
        console.log(e)
      }
    }
    if (user_id && token){
      fetchData()
    }
  },[user_id,token])
  const LogoutHandler = async()=>{
    try{
      const response = await fetch('https://coastal-peace-hotel-booking.onrender.com/guest/logout/',{method:"GET",headers:{Authorization:`Token ${token}`,"Content-Type":"application/json"}})
      const value = await response.json()
      if (value.Success){
        toast.success(value.Success)
        localStorage.removeItem("Token")
        localStorage.removeItem("user_id")
        navigate('/login')
      }
      else{
        toast.error(value.detail)
        navigate('/login')
      }
    }
    catch(err){
      console.log(err)
      navigate('/login')
    }
    
  }
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <div className="bg-gray-700 shadow-md ">
      <div><Toaster/></div>
      <div
        className={`md:flex pr-3 bg-gray-700 md:static transition-all ease-in duration-500 absolute p-2 md:shadow- md:shadow-none shadow-md w-screen md:container m-auto md:justify-between item-center ${
          open ? "top-0 left-0" : "-top-96"
        }`}
      >
        {/* Left Side Section */}
        <div className="items-center p-3 md:flex">
          <div className="flex items-center">
            <img className="text-gray-900" width={100} src={Logo} alt="logo" />
            {/* <h1 className="ml-4 font-bold">CPH Booking</h1> */}
          </div>

          <ul className="md:flex md:ml-24">
            {Links.map((item, index) => (
              <li className="md:ml-3" key={index}>
                <Link className="font-bold text-gray-900" to={item.link}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        {/* Right Side Div */}
        {token?<div className="items-center md:flex">
          <div className="flex ml-2">
              {/* <img src={Lock} alt="Lock" /> */}
              <a href="#" onClick={LogoutHandler} className="ml-2 font-bold">
                Logout
              </a>
            </div>
            <div className="mt-2 ms-2 md:mt-0">
              <Link to={"profile"} className="px-2 py-2 ml-2 text-white rounded-md">
                {
                  userData?<img className="rounded-full shadow-lg" width={40} src={userData[0].image ? userData[0].image:"../assets/profile.jpeg"} alt="image" />:"Profile"
                }
              </Link>
            </div>
          </div>:<div className="items-center md:flex">
          <div className="flex ml-2">
              {/* <img src={Lock} alt="Lock" /> */}
              <Link to="login" className="ml-2 font-bold">
                Login
              </Link>
            </div>
            <div className="mt-2 md:mt-0">
              <Link to="register" className="px-2 py-2 ml-2 text-white bg-green-600 rounded-md font-semi-bold">
                SignUp
              </Link>
            </div>
          </div>}
      </div>
      <div onClick={handleClick} className="absolute z-10 top-5 right-8 md:hidden ">
        {open ? (
          <span className="text-3xl">
            <RxCross1 />
          </span>
        ) : (
          <span className="text-3xl">
            <LiaBarsSolid />
          </span>
        )}
      </div>
    </div>
  );
};

export default Header;
