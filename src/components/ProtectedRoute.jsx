import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom"
// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({token,children})=>{
    if(!token){
        return <Navigate to="/login" replace/>
    }
    return children;
}
export const AdminPanelProtectedRoute = ({token,user_id,children})=>{
    const [isAdmin,setIsAdmin] = useState(null)
    const [isMasterAdmin,setIsMasterAdmin] = useState(null)
    const get_guest_or_admin = async()=>{
        try{
          const guest_or_admin_request = await fetch(`https://cph-hotel-booking.vercel.app/guest/list/?user_id=${user_id}`,{method:"GET",headers:{'Authorization':`Token ${token}`,'Content-Type':'application/json'}})
          const guest_or_admin_response = await guest_or_admin_request.json()

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
          setIsMasterAdmin(false)
        }
      }
      useEffect(()=>{
        if(user_id && token){
            get_guest_or_admin()
          }
      },[user_id,token])

      if(isAdmin===null && isMasterAdmin===null){
        return <div style={{height:"100vh"}} className="flex items-center justify-center">
        <div
        className="inline-block h-20 w-20 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-warning motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status">
      </div>
        </div>
      }else if(isMasterAdmin===true){
          return children
      }else if(isAdmin===false){
        return <Navigate to="/login" replace/>
      }else if(isAdmin===true && isMasterAdmin===false){
        const restrictedLink = "/admin_request"
        if (window.location.pathname===restrictedLink){
            return <Navigate to="/login" replace/>
        }
        return children
      }
    
}
export default ProtectedRoute


