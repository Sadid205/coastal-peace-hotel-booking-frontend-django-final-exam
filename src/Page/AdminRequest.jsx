import { useEffect, useState } from "react"
import toast,{ Toaster } from "react-hot-toast";

const AdminRequest = ()=>{
    const [adminRequestList,setAdminRequestList] = useState()
    const [confirmIsLoading,setConfirmIsLoading] = useState(false)
    const [cancelIsLoading,setCancelIsLoading] = useState(false)
    const token = localStorage.getItem("Token")
    const VITE_REQUEST_URL=import.meta.env.VITE_REQUEST_URL
    useEffect(()=>{
        const getAdminRequestList = async()=>{
            try{
                const admin_request_list_request = await fetch(`${VITE_REQUEST_URL}guest/admin_request/`,{method:"GET",headers:{'Authorization':`Token ${token}`,'Content-Type':'application/json'}})
                const admin_request_list_response = await admin_request_list_request.json()
                setAdminRequestList(admin_request_list_response.admin_request)
            }catch(e){
                console.log(e)
            }
        }
        getAdminRequestList()
    },[confirmIsLoading,cancelIsLoading])
    const confirm_admin_handler = async(e,guest_id)=>{
        e.preventDefault()
        try{
            setConfirmIsLoading(true)
            const confirm_admin_request = await fetch(`${VITE_REQUEST_URL}guest/list/${guest_id}/`,{method:"PATCH",headers:{'Authorization':`Token ${token}`,'Content-Type':'application/json'},
                body:JSON.stringify({
                    is_admin:true,
                    admin_request:false
                    })
                }) 
            const confirm_admin_response = await confirm_admin_request.json()
            if(confirm_admin_response){
                setConfirmIsLoading(false)
                toast.success("Successfully added an admin")
            }
        }catch(e){
            setConfirmIsLoading(false)
            console.log(e)
        }
    }
    const cancel_admin_handler = async(e,guest_id)=>{
        e.preventDefault()
        try{
            setCancelIsLoading(true)
            const cancel_admin_request = await fetch(`${VITE_REQUEST_URL}guest/list/${guest_id}/`,{method:"PATCH",headers:{'Authorization':`Token ${token}`,'Content-Type':'application/json'},
                body:JSON.stringify({
                    admin_request:false
                    })
                })
            const cancel_admin_response = await cancel_admin_request.json()
            if(cancel_admin_response){
                setCancelIsLoading(false)
                toast.success("Successfully cancelled an admin request.")
            }
        }catch(e){
            setCancelIsLoading(false)
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
                <th scope="col" className="px-6 py-3">
                Action
                </th>
            </tr>
            </thead>
            <tbody>
            {adminRequestList?(
                adminRequestList.map((guest,index)=>(
                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {guest.id}
                    </td>
                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {guest && guest.image?<img className="w-6 h-6 rounded-full" src={guest?.image} />:""}
                    </td>
                    <td className="px-6 py-4">
                    {guest.user_name}
                    </td>
                    <td className="px-6 py-4">
                    {guest.email}
                    </td>
                    <td className="px-6 py-4">
                    {guest.account_number}
                    </td>
                    <td className="px-6 py-4">
                       {guest.mobile_number}
                    </td>
                    <td className="px-6 py-4">
                        <div className="flex gap-2">
                            <button onClick={(e)=>confirm_admin_handler(e,guest.id)} className="border w-20 flex justify-center rounded-md py-1 px-2 bg-blue-500 font-bold">
                            {confirmIsLoading?(
                                <div class="border-gray-300 h-5 w-5 animate-spin rounded-full border-2 border-t-blue-600" />
                            ):("Confirm")}
                            </button>
                            <button onClick={(e)=>{cancel_admin_handler(e,guest.id)}} className="border w-16 rounded-md px-2 py-1 bg-red-500 font-bold flex justify-center">
                            {cancelIsLoading?(
                                <div class="border-gray-300 h-5 w-5 animate-spin rounded-full border-2 border-t-blue-600" />
                            ):("Cancel")}
                            </button>
                        </div>
                   </td>
                </tr>
                ))
            ):""}
            </tbody>
        </table>
        </div>
    )
}

export default AdminRequest