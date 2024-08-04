import { useState } from "react"
import toast,{ Toaster } from "react-hot-toast";

function ChangePasswordPage(){
    const user_id = localStorage.getItem("user_id")
    const token = localStorage.getItem("Token")
    const [changePassword,setChangePassword] = useState({})
    const [isLoading,setIsLoading] = useState(false)
    const passwordEventHandler = (e)=>{
        e.preventDefault()
        setChangePassword(
            {
                ...changePassword,
                [e.target.name]:e.target.value
            }
        )
    }
    const updatePasswordHandler =async(e)=>{
        e.preventDefault()
        try{
            setIsLoading(true)
            const response = await fetch(`https://coastal-peace-hotel-booking.onrender.com/guest/change_password/${user_id}/`,{method:"PUT",headers:{'Authorization':`Token ${token}`,'Content-Type':'application/json'},
                body:JSON.stringify({
                    old_password:changePassword.old_password,
                    new_password:changePassword.new_password,
                    retype_new_password:changePassword.confirm_password
                    })
                })
                const data = await response.json()
                if(data){
                    setIsLoading(false)
                }
                if (data.validation_error){
                    toast.error(data.validation_error[0])
                }else if(data.new_password){
                    toast.error(data.new_password[0])
                }else{
                    toast.success("You have successfully changed your password")
                }
        }catch(e){
            console.log(e)
        }
    }
    return (
        <>
        <div><Toaster/></div>
        <div className="flex items-center justify-center h-screen overflow-hidden bg-yellow-400 dark:bg-gray-800">
        <div className="w-8/12 bg-white lg:w-6/12 md:7/12 shadow-3xl rounded-xl">
            <div className="absolute p-4 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 rounded-full shadow shadow-gray-200 left-1/2 md:p-8">
            <svg width={32} height={32} viewBox="0 0 24 24" fill="#FFF">
                <path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z" />
            </svg>
            </div>
            <form onSubmit={updatePasswordHandler} className="p-12 md:p-24">
                <div className="flex items-center mb-6 text-lg md:mb-8">
                    <svg className="absolute ml-3" viewBox="0 0 24 24" width={24}>
                    <path d="m18.75 9h-.75v-3c0-3.309-2.691-6-6-6s-6 2.691-6 6v3h-.75c-1.24 0-2.25 1.009-2.25 2.25v10.5c0 1.241 1.01 2.25 2.25 2.25h13.5c1.24 0 2.25-1.009 2.25-2.25v-10.5c0-1.241-1.01-2.25-2.25-2.25zm-10.75-3c0-2.206 1.794-4 4-4s4 1.794 4 4v3h-8zm5 10.722v2.278c0 .552-.447 1-1 1s-1-.448-1-1v-2.278c-.595-.347-1-.985-1-1.722 0-1.103.897-2 2-2s2 .897 2 2c0 .737-.405 1.375-1 1.722z" />
                    </svg>
                    <input onChange={(e)=>passwordEventHandler(e)} type="password" name="old_password" id="old_password" className="w-full py-2 pl-12 bg-gray-200 rounded md:py-4 focus:outline-none" placeholder="Old Password" />
                </div>
                <div className="flex items-center mb-6 text-lg md:mb-8">
                    <svg className="absolute ml-3" viewBox="0 0 24 24" width={24}>
                    <path d="m18.75 9h-.75v-3c0-3.309-2.691-6-6-6s-6 2.691-6 6v3h-.75c-1.24 0-2.25 1.009-2.25 2.25v10.5c0 1.241 1.01 2.25 2.25 2.25h13.5c1.24 0 2.25-1.009 2.25-2.25v-10.5c0-1.241-1.01-2.25-2.25-2.25zm-10.75-3c0-2.206 1.794-4 4-4s4 1.794 4 4v3h-8zm5 10.722v2.278c0 .552-.447 1-1 1s-1-.448-1-1v-2.278c-.595-.347-1-.985-1-1.722 0-1.103.897-2 2-2s2 .897 2 2c0 .737-.405 1.375-1 1.722z" />
                    </svg>
                    <input onChange={(e)=>passwordEventHandler(e)} type="password" name="new_password"  id="new_password" className="w-full py-2 pl-12 bg-gray-200 rounded md:py-4 focus:outline-none" placeholder="New Password" />
                </div>
                <div className="flex items-center mb-6 text-lg md:mb-8">
                    <svg className="absolute ml-3" viewBox="0 0 24 24" width={24}>
                    <path d="m18.75 9h-.75v-3c0-3.309-2.691-6-6-6s-6 2.691-6 6v3h-.75c-1.24 0-2.25 1.009-2.25 2.25v10.5c0 1.241 1.01 2.25 2.25 2.25h13.5c1.24 0 2.25-1.009 2.25-2.25v-10.5c0-1.241-1.01-2.25-2.25-2.25zm-10.75-3c0-2.206 1.794-4 4-4s4 1.794 4 4v3h-8zm5 10.722v2.278c0 .552-.447 1-1 1s-1-.448-1-1v-2.278c-.595-.347-1-.985-1-1.722 0-1.103.897-2 2-2s2 .897 2 2c0 .737-.405 1.375-1 1.722z" />
                    </svg>
                    <input onChange={(e)=>passwordEventHandler(e)} type="password" name="confirm_password" id="confirm_password" className="w-full py-2 pl-12 bg-gray-200 rounded md:py-4 focus:outline-none" placeholder="Confirm Password" />
                </div>
                <button disabled={isLoading} type="submit" className="w-full p-2 font-medium text-white uppercase rounded h-14 bg-gradient-to-b from-gray-700 to-gray-900 md:p-4">
                    {isLoading?(<div className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-purple-600 rounded-full" role="status" aria-label="loading"><span className="sr-only">Loading...</span></div>):("Change Password")}
                </button>
            </form>
        </div>
        </div>
        </>
    )
}

export default ChangePasswordPage;