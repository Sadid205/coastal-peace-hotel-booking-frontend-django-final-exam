import { useEffect, useState } from "react"
import toast,{ Toaster } from "react-hot-toast";
function EditProfilePage(){
    const token = localStorage.getItem("Token")
    // const user_id = localStorage.getItem("user_id")
    const [profile,setProfile] = useState(null)
    const handleUpdate = (e)=>{
        e.preventDefault()
        setProfile({
            ...profile,
            [e.target.name]:e.target.value
        })

    }
    const handleEditPost = async(e)=>{
      e.preventDefault()
        try{
           const response =  await fetch('https://coastal-peace-hotel-booking.onrender.com/guest/edit_profile/',{method:"POST",headers:{'Authorization':`Token ${token}`,'Content-Type':'application/json'},
            body:JSON.stringify({
                username:profile.username,
                first_name:profile.first_name,
                last_name:profile.last_name,
                email:profile.email
                })
            })
           const data = await response.json()
           toast.success("You have successfully updated your account.")
           console.log(data)
        }catch(e){
            console.log(e)
        }
    }
    useEffect(()=>{
        const profileData = async()=>{
           try{
            const Data = await fetch('https://coastal-peace-hotel-booking.onrender.com/guest/edit_profile',{method:"GET",headers:{'Authorization':`Token ${token}`,'Content-Type':'application/json'}})
            const ProfileData = await Data.json()
            setProfile(ProfileData)
           }catch(e){
            console.log(e)
           }
        }
        if(token){
            profileData()
        }
    },[token])
    return (
<>
<div><Toaster/></div>
<section className="bg-gray-50 dark:bg-gray-900">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Update Your Profile
        </h1>
        <form onSubmit={handleEditPost} className="space-y-4 md:space-y-6" action="#">
          <div>
            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Username</label>
            <input value={profile?profile.username:""} onChange={(e)=>handleUpdate(e)} type="text" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
          </div>
          <div>
            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
            <input value={profile?profile.first_name:""} onChange={(e)=>handleUpdate(e)} type="text" name="first_name" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
          </div>
          <div>
            <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
            <input value={profile?profile.last_name:""} onChange={(e)=>handleUpdate(e)} type="text" name="last_name" id="last_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
          </div>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
            <input value={profile?profile.email:""} onChange={(e)=>handleUpdate(e)} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
          </div>
          <button type="submit" className="w-full text-white bg-blue-700 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Update</button>
        </form>
      </div>
    </div>
  </div>
</section>
</>
)
}

export default EditProfilePage