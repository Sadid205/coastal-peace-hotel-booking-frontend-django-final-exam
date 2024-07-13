import { useEffect, useState } from "react"

const ProfilePage = ()=>{
    const token = localStorage.getItem("Token")
    const user_id = localStorage.getItem("user_id")
    const [guestUserData,setGuestUserData] = useState(null)
    const [defaultUserData,setDefaultUserData] = useState(null)
    const [userAccountData,setUserAccountData] = useState(null)
    useEffect(()=>{
        const getProfileData = async()=>{
            const guest = await fetch(`https://coastal-peace-hotel-booking.onrender.com/guest/list/?user_id=${user_id}`,{method:"GET",headers:{'Authorization':`Token ${token}`,'Content-Type':'application/json'}})
            const guestData = await guest.json()
            setGuestUserData(guestData)
            const user = await fetch(`https://coastal-peace-hotel-booking.onrender.com/guest/user/${user_id}/`,{method:"GET",headers:{'Authorization':`Token ${token}`,'Content-Type':'application/json'}})
            const userData = await user.json()
            setDefaultUserData(userData)
            const account = await fetch(`https://coastal-peace-hotel-booking.onrender.com/accounts/list/?user_id=${user_id}`,{method:"GET",headers:{'Authorization':`Token ${token}`,'Content-Type':'application/json'}})
            const accountData = await account.json()
            setUserAccountData(accountData)
        }
        if(token && user_id){
            getProfileData()
        }
    },[token,user_id])
    return (
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
                    <a href="/edit_profile" className="block w-1/2 px-6 py-2 mx-auto font-semibold text-white bg-gray-900 rounded-full hover:shadow-lg">Edit Profile</a>
                </div>
                <div className="p-4 mt-2 text-center cursor-pointer d-flex">
                    <a href="/change_password" className="block w-1/2 px-6 py-2 mx-auto text-sm font-semibold text-white rounded-full bg-sky-400 hover:shadow-lg">Change Password</a>
                </div>
            </div>
    )
}


export default ProfilePage