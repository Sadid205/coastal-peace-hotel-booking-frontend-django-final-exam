import { useEffect, useState } from "react";
import toast,{ Toaster } from "react-hot-toast";
const AdminList = ()=>{
    const [adminList,setAdminList] = useState()
    const [isMasterAdmin,setIsMasterAdmin] = useState(null)
    const [isLoading,setIsLoading] = useState(false)
    const token = localStorage.getItem("Token")
    const user_id = localStorage.getItem("user_id")
    useEffect(()=>{
        const get_admin_list = async()=>{
            try{
                const admin_list_request = await fetch('https://cph-hotel-booking.vercel.app/guest/admin_list/',{method:"GET",headers:{'Authorization':`Token ${token}`,'Content-Type':'application/json'}})
                const admin_list_response = await admin_list_request.json()
                setAdminList(admin_list_response.admin_list)
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
        get_admin_list()
    },[isLoading])
    const remove_admin_handler = async(e,admin_id)=>{
        e.preventDefault()
        try{
            setIsLoading(true)
            const remove_admin_request = await fetch(`https://cph-hotel-booking.vercel.app/guest/list/${admin_id}/`,{method:"PATCH",headers:{'Authorization':`Token ${token}`,'Content-Type':'application/json'},
                body:JSON.stringify({
                    is_admin:false
                    })
                })
            const remove_admin_response = await remove_admin_request.json()
            if(remove_admin_response){
                setIsLoading(false)
                toast.success("Successfully remove from admin list")
            }
        }catch(e){
            setIsLoading(false)
            console.log(e)
        }
    }
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
            {adminList?(
                adminList.map((admin,index)=>(
                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {admin.id}
                    </td>
                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {admin && admin.image?<img className="w-6 h-6 rounded-full" src={admin?.image} />:""}
                    </td>
                    <td className="px-6 py-4">
                    {admin.user_name}
                    </td>
                    <td className="px-6 py-4">
                    {admin.email}
                    </td>
                    <td className="px-6 py-4">
                    {admin.account_number}
                    </td>
                    <td className="px-6 py-4">
                       {admin.mobile_number}
                    </td>
                    {isMasterAdmin===true?(
                        <td className="px-6 py-4">
                        <div className="flex gap-2">
                            <button onClick={(e)=>remove_admin_handler(e,admin.id)} className="border rounded-md px-2 bg-red-700 flex justify-center font-bold w-20 py-1">
                            {isLoading?(
                                <div class="border-gray-300 h-5 w-5 animate-spin rounded-full border-2 border-t-blue-600" />
                            ):("Remove")}
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

export default AdminList