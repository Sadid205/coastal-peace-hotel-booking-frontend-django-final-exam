import { useState,useEffect, useContext } from "react";
import Logo from "../assets/logo.png";
// import Lock from "../assets/Lock.png";
import { LiaBarsSolid } from "react-icons/lia";
import { RxCross1 } from "react-icons/rx";
// import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast,{ Toaster } from "react-hot-toast";
import CreateSearchContext from "../context/SearchContext"
const Header = () => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false);
  const [userData,setUserData] = useState(null)
  const [isLoading,setIsLoading] = useState(false)
  const [searchData,setSearchData] = useState('')
  const [isAdmin,setIsAdmin] = useState(null)
  const [isMasterAdmin,setIsMasterAdmin] = useState(null)
  const token = localStorage.getItem("Token")
  const user_id = localStorage.getItem("user_id")
  const Links = [
    { name: "Home", link: "/" },
    // { name: "Supports", link: "/supports" },
    // { name: "About", link: "/about" },
  ];
  if (token){
    Links.push({ name: "Deposit", link: "/deposit" })
    Links.push({ name: "Booking-History", link: "/booking_history" })
  }
  if(isAdmin===true || isMasterAdmin===true){
    Links.push({ name: "Admin Panel", link: "/admin_panel" })
  }
  const {setSearchValue} = useContext(CreateSearchContext)
  const handleSearchValue = (e)=>{
    e.preventDefault()
    setSearchValue(searchData)
    setSearchData("")
  }
  useEffect(()=>{
    const fetchData = async()=>{
      try{
        const getUser = await fetch(`https://cph-hotel-booking.vercel.app/guest/list/?user_id=${user_id}`,{method:"GET",headers:{'Authorization':`Token ${token}`,'Content-Type':'application/json'}})
        if (!getUser.ok){
          throw new Error(`HTTP error! status: ${getUser.status}`)
        }
        const data = await getUser.json()
        setUserData(data)
      }catch(e){
        console.log(e)
      }
    }
    const get_guest_or_admin = async()=>{
      try{
        const guest_or_admin_request = await fetch(`https://cph-hotel-booking.vercel.app/guest/list/?user_id=${user_id}`,{method:"GET",headers:{'Authorization':`Token ${token}`,'Content-Type':'application/json'}})
        const guest_or_admin_response = await guest_or_admin_request.json()

      //   console.log(guest_or_admin_response[0])
      //   console.log(guest_or_admin_response.is_admin)
        if(token && guest_or_admin_response[0].is_admin===true){
          setIsAdmin(true)
        }else{
          setIsAdmin(false)
        }
        if(token && guest_or_admin_response[0].is_master_admin===true){
          setIsMasterAdmin(true)
        }else{
          setIsMasterAdmin(false)
        }
      }catch(e){
        console.log(e)
        setIsAdmin(false)
      }
    }
    if (user_id && token){
      fetchData()
      get_guest_or_admin()
    }
  },[user_id,token])
  const LogoutHandler = async()=>{
    try{
      setIsLoading(true)
      const response = await fetch('https://cph-hotel-booking.vercel.app/guest/logout/',{method:"GET",headers:{Authorization:`Token ${token}`,"Content-Type":"application/json"}})
      const value = await response.json()
      if (value.Success){
        setIsLoading(false)
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
    <div className="z-50 relative mb-5 bg-gray-700 shadow-md ">
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
                <Link className="font-bold text-white" to={item.link}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div id="search-bar" className="h-12 m-auto bg-white rounded-full shadow-lg w-80">
        <form onSubmit={handleSearchValue} className="flex items-center justify-center p-2">
          <input value={searchData} onChange={(e)=>setSearchData(e.target.value)} type="text" placeholder="Search here" className="w-full px-2 py-1 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent" />
          <button type="submit" className="px-4 py-1 ml-2 text-white bg-gray-800 rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50">
            Search
          </button>
        </form>
      </div>

        {/* Right Side Div */}
        {token?<div className="items-center md:flex">
          <div className="flex ml-2">
              <div className="relative inline-flex group">
                <div className="absolute transition-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt">
              </div>
              <button onClick={LogoutHandler} disabled={isLoading} className="relative inline-flex items-center justify-center w-20 h-10 px-3 py-2 text-sm font-bold text-white transition-all duration-200 bg-gray-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900">
                {isLoading?(<div className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-yellow-600 rounded-full" role="status" aria-label="loading"></div>):("Logout")}
              </button>
          </div>
            </div>
            <div className="mt-2 ms-2 md:mt-0">
              <Link to="/profile" className="px-2 py-2 ml-2 text-white rounded-md">
                {
                  userData?<img className="w-6 h-6 rounded-full shadow-lg"src={userData[0].image ? userData[0].image:"../assets/profile.jpeg"} alt="image" />:"Profile"
                }
              </Link>
            </div>
          </div>:<div className="items-center md:flex">
          <div className="flex ml-2">
          <Link to="/login" className="relative inline-block px-4 py-2 font-medium group">
            <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0" />
            <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black" />
            <span className="relative text-black group-hover:text-white">Login</span>
          </Link>

            </div>
            <div className="mt-2 md:mt-0">
              <Link to="/register" className="relative inline-block text-lg ms-2 group">
              <span className="relative z-10 block px-3 py-2 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                <span className="absolute inset-0 w-full h-full px-3 py-2 rounded-lg bg-gray-50" />
                <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease" />
                <span className="relative">SignUp</span>
              </span>
              <span className="absolute bottom-0 right-0 w-full h-10 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0" data-rounded="rounded-lg" />
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




