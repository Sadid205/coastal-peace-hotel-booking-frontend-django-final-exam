import { useEffect, useState } from "react";
import { FaHotel } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";


function HomePage(){
    const token = localStorage.getItem("Token")
    const user_id = localStorage.getItem("user_id")
    const [hotelData,setHotelData] = useState(null)
    useEffect(()=>{
       const getHotelList = async()=>{
        try{
            const response = await fetch('https://coastal-peace-hotel-booking.onrender.com/hotel/list/',{method:"GET",headers:{'Authorization':`Token ${token}`,'Content-Type':'application/json'}})
            const data = await response.json()
            if (data){
                setHotelData(data)
            }
        }catch(e){
            console.log(e)
        }
       }

       if(token && user_id){
        getHotelList()
       }

    },[token,user_id])
    // {hotelData?console.log(hotelData.results.forEach((item,index)=>console.log(item))):""}
    return (
<>
<div className="flex flex-wrap gap-3">
    {hotelData?hotelData.results.map((hotel,index)=>(
        <div key={index} className="flex flex-col w-full max-w-xs m-10 m-auto overflow-hidden bg-white border border-gray-100 rounded-lg shadow-md">
        <div className="flex mx-3 mt-3 overflow-hidden h-60 rounded-xl" href="#">
            <img width="100%" className="object-cover" src={hotel.images[0].image} alt="product image" />
        </div>
        <div className="px-5 pb-5 mt-4">
            <a href="#">
            <h5 className="text-xl tracking-tight text-slate-900">{hotel.name.slice(0,30)}</h5>
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
    )):<Spinner/>}
</div>
</>  
    )
}

export default HomePage;
