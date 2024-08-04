import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const ProfilePage = ()=>{
    const token = localStorage.getItem("Token")
    const user_id = localStorage.getItem("user_id")
    const [guestUserData,setGuestUserData] = useState(null)
    const [defaultUserData,setDefaultUserData] = useState(null)
    const [userAccountData,setUserAccountData] = useState(null)
    const [isLoading,setIsLoading] = useState(true)
    useEffect(()=>{
        const getProfileData = async()=>{
           try{
            setIsLoading(true)
            const guest = await fetch(`https://coastal-peace-hotel-booking.onrender.com/guest/list/?user_id=${user_id}`,{method:"GET",headers:{'Authorization':`Token ${token}`,'Content-Type':'application/json'}})
            const guestData = await guest.json()
            const user = await fetch(`https://coastal-peace-hotel-booking.onrender.com/guest/user/${user_id}/`,{method:"GET",headers:{'Authorization':`Token ${token}`,'Content-Type':'application/json'}})
            const userData = await user.json()
            const account = await fetch(`https://coastal-peace-hotel-booking.onrender.com/accounts/list/?user_id=${user_id}`,{method:"GET",headers:{'Authorization':`Token ${token}`,'Content-Type':'application/json'}})
            const accountData = await account.json()
            if(guestData&&userData&&accountData){
                setGuestUserData(guestData)
                setDefaultUserData(userData)
                setUserAccountData(accountData)
                setIsLoading(false)
            }
           }catch(e){
            console.log(e)
           }
        }
        if(token && user_id){
            getProfileData()
        }
    },[token,user_id])
    return (
        <div>
            {isLoading?(
                 <div className="flex items-center justify-center h-screen space-x-2">
                 <span className="sr-only">Loading...</span>
                 <div className="h-8 w-8 bg-green-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                 <div className="h-8 w-8 bg-sky-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                 <div className="w-8 h-8 rounded-full bg-amber-500 bg--700 animate-bounce" />
               </div>
            ):(
                <div className="max-w-2xl mx-4 mt-16 text-gray-900 bg-white rounded-lg shadow-xl sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto">
                <div className="h-32 overflow-hidden rounded-t-lg">
                    <img className="object-cover object-top w-full" src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ" alt="Mountain" />
                </div>
                <div className="relative w-32 h-32 mx-auto -mt-16 overflow-hidden border-4 border-white rounded-full">
                    {
                        guestUserData?<img className="object-cover object-top w-full" src={guestUserData[0].image?guestUserData[0].image:"../assets/profile.jpeg"} alt="Mountain" />:<img className="object-cover object-top w-full" src="../assets/profile.jpeg" alt="Mountain" />
                    }
                </div>
                <div className="mt-2 text-center">
                    <h2 className="font-semibold">Username : {defaultUserData?defaultUserData.username:"Sarah Smith"}</h2>
                    <p className="text-gray-500">Name : {defaultUserData?defaultUserData.first_name:"Sarah"} {defaultUserData?defaultUserData.last_name:"Sarah"}</p>
                </div>
                <div className="mt-2 text-center">
                    <h2 className="font-semibold">Email : {defaultUserData?defaultUserData.email:"example@gmail.com"}</h2>
                    <p className="text-gray-500">Account Number : {userAccountData?userAccountData[0].account_number:"000000000"}</p>
                    <p className="text-gray-500">Account Balance : {userAccountData?userAccountData[0].balance:"000000000"}$</p>
                </div>
                <div className="p-4 mt-2 text-center border-t cursor-pointer d-flex">
                    <Link to="/edit_profile" className="block w-1/2 px-6 py-2 mx-auto font-semibold text-white bg-gray-900 rounded-full hover:shadow-lg">Edit Profile</Link>
                </div>
                <div className="p-4 mt-2 text-center cursor-pointer d-flex">
                    <Link to="/change_password" className="block w-1/2 px-6 py-2 mx-auto text-sm font-semibold text-white rounded-full bg-sky-400 hover:shadow-lg">Change Password</Link>
                </div>
            </div>
            )}
            
        </div> 
    )
}


export default ProfilePage