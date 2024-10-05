import { useContext, useEffect, useState } from "react";
import { FaHotel } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { AiTwotoneDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import CreateSearchContext from "../context/SearchContext";
import not_found from "../assets/not_found.png"
import toast,{ Toaster } from "react-hot-toast";
function HomePage(){
    const token = localStorage.getItem("Token")
    const user_id = localStorage.getItem("user_id")
    const [hotelData,setHotelData] = useState(null)
    const [isLoading,setIsLoading] = useState(false)
    const [guestOrAdmin,setGuestOrAdmin] = useState()
    let [page,setPage] = useState(1)
    const {searchValue} = useContext(CreateSearchContext)
    useEffect(()=>{
       const getHotelList = async()=>{
        try{
            const response = await fetch(`https://cph-hotel-booking.vercel.app/hotel/list/?page=${page}&search=${searchValue}`,{method:"GET",headers:{'Authorization':`Token ${token}`,'Content-Type':'application/json'}})
            const data = await response.json()
            if (data){
                setHotelData(data)
            }
        }catch(e){
            console.log(e)
        }
       }
       const guest_or_admin_account = async()=>{
        try{
            const guest_or_admin_account_request = await fetch(`https://cph-hotel-booking.vercel.app/guest/list/?user_id=${user_id}`,{method:"GET",headers:{'Authorization':`Token ${token}`,'Content-Type':'application/json'}})
            const guest_or_admin_account_response = await guest_or_admin_account_request.json()
            setGuestOrAdmin(guest_or_admin_account_response[0])
        }catch(e){
            console.log(e)
        }
    }
       if(token && user_id){
        getHotelList()
        guest_or_admin_account()
       }

    },[token,user_id,page,searchValue,isLoading])
    const handleDelete = async(e,hotel_id)=>{
        e.preventDefault()
        try{
            setIsLoading(true)
            const delete_request = await fetch(`https://cph-hotel-booking.vercel.app/hotel/list/${hotel_id}/`,{method:"DELETE",headers:{'Authorization':`Token ${token}`}})
            toast.success("Successfully deleted hotel.")
            setIsLoading(false)
        }catch(e){
            setIsLoading(false)
            console.log(e)
            toast.error("Unexcepted error occurred!")
        }
    }
    console.log(user_id)
    console.log(guestOrAdmin)
    const nextPrevButton = ()=>{
        let buttons = [];
        if (hotelData){
            for(let i=1;i<=Math.ceil(hotelData.count/10);i++){
                if(i>=4){
                    buttons[3]=<li key={i}><button className={`${page==i?"flex items-center justify-center h-10 px-4 leading-tight  bg-gray-700 text-white":"flex items-center justify-center h-10 px-4 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"}`}>{page>=4?page:"..."}</button></li>
                }else{
                    buttons.push(
                        <li key={i}>
                            <button onClick={()=>setPage(i)} className={`${page==i?"flex items-center justify-center h-10 px-4 leading-tight  bg-gray-700 text-white":"flex items-center justify-center h-10 px-4 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"} `}>{i}</button>
                        </li>
                        )  
                }
            }
        }else{
            return  <li><button  className="flex items-center justify-center h-10 px-4 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">0</button></li>
        }
        return buttons
    }
    // console.log(hotelData.results[0].id)
    return (
<div>
<Toaster/>
{token&&user_id?<div><div className="flex flex-wrap gap-3">
    {hotelData && hotelData.results.length>0?hotelData.results.map((hotel,index)=>(
        <div key={index} className="flex flex-col w-full max-w-xs m-auto overflow-hidden bg-white border border-gray-100 rounded-lg shadow-md">
        <div className="flex mx-3 mt-3 overflow-hidden h-60 rounded-xl" href="#">
            <img width="100%" className="object-cover" src={hotel.images[0]?.image} alt="product image" />
        </div>
        <div className="px-5 pb-5 mt-4">
            <a href="#">
            <div className="flex justify-between">
            <h5 className="text-xl tracking-tight text-slate-900">{hotel.name.slice(0,30)}</h5>
                {(guestOrAdmin&&(guestOrAdmin.is_admin===true||guestOrAdmin.is_master_admin===true))?(
                    <div className="flex items-center gap-2">
                    <Link to={`/edit_hotel/${hotel.id}`}><FaEdit /></Link>
                    <button onClick={(e)=>handleDelete(e,hotel.id)}><AiTwotoneDelete /></button>
                </div>
                ):("")}
            </div>
            <div className="flex font-bold">
                <p className="text-sm"><FaLocationDot /></p>
                <p>{hotel.location.slice(0,30)}</p>
            </div>
            </a>
            <div className="flex items-center justify-between mt-2 mb-5">
            <p>
                <span className="text-3xl font-bold text-slate-900">{hotel.booking_price}$</span>
            </p>
            <div className="flex items-center">
                <p className="font-bold text-gray-600">Rating : {hotel.rating}</p>
            </div>
            </div>
            <Link to={`/hotel_details/${hotel.id}`} className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
            <span className="mr-2 ">{<FaHotel/>}</span>
            Details</Link>
        </div>
</div>
    )):<div className="w-full text-center">
        <img className="w-1/2 m-auto" src={not_found}/>
        <h1 className="text-gray-500">No search result found for <span className="font-bold">{searchValue}</span></h1>
    </div>
    }
</div>
<div className="text-center mt-7">
  <div aria-label="Page navigation example">
    <ul className="inline-flex h-10 -space-x-px text-base">
      <li><button disabled={hotelData?.previous==null} onClick={hotelData&&hotelData.previous?()=>setPage(page=page-1):null} className="flex items-center justify-center h-10 px-4 leading-tight text-gray-500 bg-white border border-gray-300 ms-0 border-e-0 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</button>
      </li>
      {nextPrevButton()}
      <li>
      <button disabled={hotelData?.next==null} onClick={hotelData&&hotelData.next?()=>setPage(page=page+1):null} className="flex items-center justify-center h-10 px-4 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</button>
      </li>
    </ul>
  </div>
</div>
</div>
:<Spinner/>}
</div>  
)
}

export default HomePage;
