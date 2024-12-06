import { FaUser } from "react-icons/fa";
import { FaImagePortrait } from "react-icons/fa6";
import { MdMarkEmailUnread } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaPhone } from "react-icons/fa6";
import { useState } from "react";
import axios from "axios";
import toast,{ Toaster } from "react-hot-toast";

function RegisterPage(){
    const [username,setUsername] = useState('')
    const [profileImage,setProfileImage] = useState(null)
    const [firstName,setFirstName] = useState('')
    const [lastName,setLastName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [mobileNumber,setMobileNumber] = useState('')
    const [errors,setErrors] = useState('');
    const [isLoading,setIsLoading] = useState(false)
    const [adminRequest,setAdminRequest] = useState(false)
    const VITE_REQUEST_URL=import.meta.env.VITE_REQUEST_URL
    const RegisterHandler = async(e)=>{
        e.preventDefault()
        const formData = new FormData()
        formData.append("username",username)
        formData.append("image",profileImage)
        formData.append("first_name",firstName)
        formData.append("last_name",lastName)
        formData.append("email",email)
        formData.append("password",password)
        formData.append("confirm_password",confirmPassword)
        formData.append("mobile_number",mobileNumber)
        formData.append("admin_request",adminRequest)
        try{
            setIsLoading(true)
            const response = await axios.post(`${VITE_REQUEST_URL}guest/register/`,formData,{headers:{"Content-Type":"multipart/form-data"}})
            const data = response.data
            if(data){
                setIsLoading(false)
            }
            toast.success(data)
            setErrors(data)
            setUsername('')
            setProfileImage(null)
            setFirstName('')
            setLastName('')
            setEmail('')
            setPassword('')
            setConfirmPassword('')
            setMobileNumber('')
            setAdminRequest(false)
        }
        catch(e){
            console.log(e)
        }
    }
    return (
    <>
    <div><Toaster/></div>
    <section className="py-20 overflow-hidden bg-gray-800 -z-50 2xl:py-40">
        <div className="container px-4 mx-auto">
            <div className="max-w-5xl mx-auto">
            <div className="flex flex-wrap items-center -mx-4">
                <div className="w-full px-4 mb-16 lg:w-1/2 lg:mb-0">
                <div className="max-w-md">
                    <span className="text-lg font-bold text-blue-400">Register Account</span>
                    <h2 className="mt-8 mb-12 text-5xl font-bold text-white font-heading">Start your journey by creating an account in Coastal Peace Hotel Booking.</h2>
                </div>
                </div>
                <div className="w-full px-4 lg:w-1/2">
                <div className="px-6 py-12 bg-gray-600 rounded-lg lg:px-20 lg:py-24">
                    <form onSubmit={RegisterHandler} action="#">
                    <h3 className="mb-10 text-2xl font-bold text-white font-heading">Register Account</h3>
                    <div className="flex items-center pl-6 mb-3 bg-white rounded-full">
                        <span className="inline-block py-2 pr-3 border-r border-gray-50">
                        <FaUser/>
                        </span>
                        <input required value={username} onChange={(e)=>setUsername(e.target.value)} className="w-full py-4 pl-4 pr-6 font-bold placeholder-gray-900 rounded-r-full focus:outline-none" type="text" placeholder={errors.username?errors.username[0]:"Username"} />
                    </div>
                    <div className="flex items-center pl-6 mb-3 bg-white rounded-full">
                        <span className="inline-block py-2 pr-3 border-r border-gray-50">
                       <FaImagePortrait/>
                        </span>
                        <input required onChange={(e)=>setProfileImage(e.target.files[0])} className="w-full py-4 pl-4 pr-6 font-bold placeholder-gray-900 rounded-r-full focus:outline-none" type="file"/>
                    </div>
                    <div className="flex items-center pl-6 mb-3 bg-white rounded-full">
                        <span className="inline-block py-2 pr-3 border-r border-gray-50">
                        <FaUser/>
                        </span>
                        <input required value={firstName} onChange={(e)=>setFirstName(e.target.value)} className="w-full py-4 pl-4 pr-6 font-bold placeholder-gray-900 rounded-r-full focus:outline-none" type="text" placeholder={errors.first_name?errors.first_name[0]:"First Name"} />
                    </div>
                    <div className="flex items-center pl-6 mb-3 bg-white rounded-full">
                        <span className="inline-block py-2 pr-3 border-r border-gray-50">
                        <FaUser/>
                        </span>
                        <input required value={lastName} onChange={(e)=>setLastName(e.target.value)} className="w-full py-4 pl-4 pr-6 font-bold placeholder-gray-900 rounded-r-full focus:outline-none" type="text" placeholder={errors.last_name?errors.last_name[0]:"Last Name"} />
                    </div>
                    <div className="flex items-center pl-6 mb-3 bg-white rounded-full">
                        <span className="inline-block py-2 pr-3 border-r border-gray-50">
                        <MdMarkEmailUnread/>
                        </span>
                        <input required value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full py-4 pl-4 pr-6 font-bold placeholder-gray-900 rounded-r-full focus:outline-none" type="email" placeholder={errors.email?errors.email[0]:"example@gmail.com"} />
                    </div>
                    <div className="flex items-center pl-6 mb-3 bg-white rounded-full">
                        <span className="inline-block py-2 pr-3 border-r border-gray-50">
                       <RiLockPasswordFill/>
                        </span>
                        <input required value={password} onChange={(e)=>setPassword(e.target.value)} className="w-full py-4 pl-4 pr-6 font-bold placeholder-gray-900 rounded-r-full focus:outline-none" type="password" placeholder={errors.password?errors.password[0]:"Password"} />
                    </div>
                    <div className="flex items-center pl-6 mb-6 bg-white rounded-full">
                        <span className="inline-block py-2 pr-3 border-r border-gray-50">
                        <RiLockPasswordFill/>
                        </span>
                        <input required value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} className="w-full py-4 pl-4 pr-6 font-bold placeholder-gray-900 rounded-r-full focus:outline-none" type="password" placeholder={errors.confirm_password?errors.confirm_password[0]:"Confirm password"} />
                    </div>
                    <div className="flex items-center pl-6 mb-6 bg-white rounded-full">
                        <span className="inline-block py-2 pr-3 border-r border-gray-50">
                        <FaPhone/>
                        </span>
                        <input required value={mobileNumber} onChange={(e)=>setMobileNumber(e.target.value)} className="w-full py-4 pl-4 pr-6 font-bold placeholder-gray-900 rounded-r-full focus:outline-none" type="text" placeholder={errors.mobile_number?errors.mobile_number[0]:"Mobile Number"} />
                    </div>
                    <div class="inline-flex items-center">
                    <label class="flex items-center cursor-pointer relative" for="check-2">
                        <input type="checkbox"
                        value={adminRequest}
                        onChange={(e)=>setAdminRequest(true)}
                        class="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-slate-800 checked:border-slate-800"
                        id="check-2" />
                        <span class="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"
                            stroke="currentColor" stroke-width="1">
                            <path fill-rule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clip-rule="evenodd"></path>
                        </svg>
                        </span>
                    </label>
                    <label class="cursor-pointer ml-2 text-white font-bold text-sm" for="check-2">
                        Request for admin account
                    </label>
                    </div>                    
                    <button disabled={isLoading} type="submit" className="relative inline-flex items-center justify-center w-full px-10 py-4 overflow-hidden font-mono font-medium tracking-tighter text-white bg-gray-800 rounded-full group">
                        <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-green-500 rounded-full group-hover:w-full group-hover:h-full" />
                        <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700" />
                        <span className="relative flex justify-center h-6 font-bold">
                            {isLoading?<div className="absolute w-6 h-6 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin"/>:"Register"}
                        </span>
                    </button>
                    </form>
                </div>
                </div>
            </div>
            </div>
        </div>
    </section>
    </>
)
}

export default RegisterPage;


