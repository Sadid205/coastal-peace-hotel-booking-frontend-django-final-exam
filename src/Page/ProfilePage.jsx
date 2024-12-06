import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { LuWallet } from "react-icons/lu";
import { MdAccountBalance } from "react-icons/md";


const ProfilePage = () => {
    const token = localStorage.getItem("Token")
    const user_id = localStorage.getItem("user_id")
    const [guestUserData, setGuestUserData] = useState(null)
    const [defaultUserData, setDefaultUserData] = useState(null)
    const [userAccountData, setUserAccountData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const VITE_REQUEST_URL=import.meta.env.VITE_REQUEST_URL
    useEffect(() => {
        const getProfileData = async () => {
            try {
                setIsLoading(true)
                const guest = await fetch(`${VITE_REQUEST_URL}guest/list/?user_id=${user_id}`, { method: "GET", headers: { 'Authorization': `Token ${token}`, 'Content-Type': 'application/json' } })
                const guestData = await guest.json()
                const user = await fetch(`${VITE_REQUEST_URL}guest/user/${user_id}/`, { method: "GET", headers: { 'Authorization': `Token ${token}`, 'Content-Type': 'application/json' } })
                const userData = await user.json()
                const account = await fetch(`${VITE_REQUEST_URL}accounts/list/?user_id=${user_id}`, { method: "GET", headers: { 'Authorization': `Token ${token}`, 'Content-Type': 'application/json' } })
                const accountData = await account.json()
                if (guestData && userData && accountData) {
                    setGuestUserData(guestData)
                    setDefaultUserData(userData)
                    setUserAccountData(accountData)
                    setIsLoading(false)
                }
            } catch (e) {
                console.log(e)
            }
        }
        if (token && user_id) {
            getProfileData()
        }
    }, [token, user_id])
    console.log({
        "guest":guestUserData,
        "defaultUserData":defaultUserData,
        "accountData":userAccountData
    })
    return (
        <div>
            {isLoading ? (
                <div className="flex items-center justify-center h-screen space-x-2">
                    <span className="sr-only">Loading...</span>
                    <div className="h-8 w-8 bg-green-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <div className="h-8 w-8 bg-sky-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <div className="w-8 h-8 rounded-full bg-amber-500 bg--700 animate-bounce" />
                </div>
            ) : (

                <div>
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full p-8 transition-all duration-300 animate-fade-in">
                        <div className="flex flex-col md:flex-row">
                            <div className="md:w-1/3 text-center mb-8 md:mb-0">
                                <img src={guestUserData&&guestUserData[0]?(guestUserData[0].image):("")} alt="Profile Picture" className="rounded-full w-48 h-48 mx-auto mb-4 border-4 border-indigo-800 dark:border-blue-900 transition-transform duration-300 hover:scale-105" />
                                <h1 className="text-2xl font-bold text-indigo-800 dark:text-white mb-2">{defaultUserData&&defaultUserData.first_name?(defaultUserData.first_name):("")} {defaultUserData&&defaultUserData.last_name?(defaultUserData.last_name):("")}</h1>
                                <p className="text-gray-600 dark:text-gray-300">username : {defaultUserData&&defaultUserData.username?(defaultUserData.username):("")}</p>
                                <div className="flex justify-center items-center gap-4">
                                <span className="text-white"><LuWallet /></span>
                                <p className="text-gray-600 font-bold dark:text-gray-300">Balance : {userAccountData&&userAccountData[0].balance?(userAccountData[0].balance):("")}</p>
                                </div>
                               <div className="flex flex-col">
                               <Link to={'/edit_profile'}>
                                <button className="mt-4 bg-indigo-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors duration-300">Edit Profile</button>
                                </Link>
                                <Link to={'/change_password'}>
                                <button className="mt-4 bg-violet-800 text-white px-4 py-2 rounded-lg hover:bg-blue-400 transition-colors duration-300">Change Password</button>
                                </Link>
                               </div>
                            </div>
                            <div className="md:w-2/3 md:pl-8">
                                <p className="text-base font-semibold text-indigo-800 dark:text-white mb-4">Is Admin : {guestUserData&&guestUserData[0]?(guestUserData[0].is_admin===true?("Yes"):("No")):("")}</p>
                                <p className="text-base font-semibold text-indigo-800 dark:text-white mb-4">Admin Request : {guestUserData&&guestUserData[0]?(guestUserData[0].admin_request===true?("Yes"):("No")):("")}</p>
                                <p className="text-base font-semibold text-indigo-800 dark:text-white mb-4">Is Master Admin : {guestUserData&&guestUserData[0]?(guestUserData[0].is_master_admin===true?("Yes"):("No")):("")}</p>
                                
                                <h2 className="text-xl font-semibold text-indigo-800 dark:text-white mb-4">Contact Information</h2>
                                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                                    <li className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-800 dark:text-blue-900" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                        </svg>
                                        {defaultUserData&&defaultUserData.email?(defaultUserData.email):("john@gmail.com")}
                                    </li>
                                    <li className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-800 dark:text-blue-900" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                        </svg>
                                        {guestUserData&&guestUserData[0]?(guestUserData[0].mobile_number):("")}
                                    </li>
                                    <li className="flex items-center">
                                        <span className="flex items-center gap-4">
                                        <MdAccountBalance /> <p>Account Number : {userAccountData&&userAccountData[0].account_number?(userAccountData[0].account_number):("")}</p>
                                        </span>
                                        
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}


export default ProfilePage