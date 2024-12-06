import { useEffect, useState } from "react";
import toast,{ Toaster } from "react-hot-toast";
const UserList = ()=>{
    const [userList,setUserList] = useState()
    const [isMasterAdmin,setIsMasterAdmin] = useState(null)
    const [isLoading,setIsLoading] = useState(false)
    const token = localStorage.getItem("Token")
    const user_id = localStorage.getItem("user_id")
    const VITE_REQUEST_URL=import.meta.env.VITE_REQUEST_URL
    useEffect(()=>{
        const get_user_list = async()=>{
            try{
                const user_list_request = await fetch(`${VITE_REQUEST_URL}guest/user_list/`,{method:"GET",headers:{'Authorization':`Token ${token}`,'Content-Type':'application/json'}})
                const user_list_response = await user_list_request.json()
                setUserList(user_list_response.user_list)
            }catch(e){
                console.log(e)
            }
        }
        const get_guest_or_admin = async()=>{
            try{
              const guest_or_admin_request = await fetch(`${VITE_REQUEST_URL}guest/list/?user_id=${user_id}`,{method:"GET",headers:{'Authorization':`Token ${token}`,'Content-Type':'application/json'}})
              const guest_or_admin_response = await guest_or_admin_request.json()
    
            //   console.log(guest_or_admin_response[0])
            //   console.log(guest_or_admin_response.is_admin)
              if(token && guest_or_admin_response[0].is_master_admin===true){
                setIsMasterAdmin(true)
              }else{
                setIsMasterAdmin(false)
              }
            }catch(e){
              console.log(e)
              setIsMasterAdmin(false)
            }
          }
        get_guest_or_admin()
        get_user_list()
    },[isLoading])
    const add_admin_handler = async(e,user_id)=>{
        e.preventDefault()
        try{
            setIsLoading(true)
            const add_admin_request = await fetch(`${VITE_REQUEST_URL}guest/list/${user_id}/`,{method:"PATCH",headers:{'Authorization':`Token ${token}`,'Content-Type':'application/json'},
                body:JSON.stringify({
                    is_admin:true
                    })
                })
            const add_admin_response = await add_admin_request.json()
            if(add_admin_response){
                setIsLoading(false)
                toast.success("Successfully added into admin list")
            }
        }catch(e){
            setIsLoading(false)
            console.log(e)
        }
    }
    // console.log(userList[0].image)
    return (
        <div className="overflow-x-auto">
        <Toaster/>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                Id
                </th>
                <th scope="col" className="px-6 py-3">
                Profile Image
                </th>
                <th scope="col" className="px-6 py-3">
                User Name
                </th>
                <th scope="col" className="px-6 py-3">
                Email
                </th>
                <th scope="col" className="px-6 py-3">
                Account Number
                </th>
                <th scope="col" className="px-6 py-3">
                Mobile Number
                </th>
                {isMasterAdmin===true?(
                    <th scope="col" className="px-6 py-3">
                    Action
                    </th>
                ):""}
            </tr>
            </thead>
            <tbody>
            {userList?(
                userList.map((user,index)=>(
                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {user.id}
                    </td>
                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {user && user.image?<img className="w-6 h-6 rounded-full" src={user?.image} />:""}
                    </td>
                    <td className="px-6 py-4">
                    {user.user_name}
                    </td>
                    <td className="px-6 py-4">
                    {user.email}
                    </td>
                    <td className="px-6 py-4">
                    {user.account_number}
                    </td>
                    <td className="px-6 py-4">
                       {user.mobile_number}
                    </td>
                    {isMasterAdmin===true?(
                        <td className="px-6 py-4">
                            <div className="flex gap-2">
                                <button onClick={(e)=>add_admin_handler(e,user.id)} className="border w-16 p-1 flex justify-center rounded-md px-2 bg-sky-700 font-bold">
                                {isLoading?(
                                <div class="border-gray-300 h-5 w-5 animate-spin rounded-full border-2 border-t-blue-600" />
                                ):("Add")}
                                </button>
                            </div>
                        </td>
                    ):""}
                </tr>
                ))
            ):""}
            </tbody>
        </table>
        </div>
    )
}
export default UserList