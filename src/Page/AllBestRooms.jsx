import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const AllBestRooms = ()=>{
    const [bestRooms,setBestRooms] = useState([])
    const token = localStorage.getItem("Token")
    const VITE_REQUEST_URL=import.meta.env.VITE_REQUEST_URL
    useEffect(()=>{
        const get_best_rooms = async()=>{
            try{
                const get_best_room_request = await fetch(`${VITE_REQUEST_URL}hotel/best_rooms/`,{method:"GET",headers:{'Authorization':`Token ${token}`,'Content-Type':'application/json'}})
                const get_best_room_response = await get_best_room_request.json()
                if(get_best_room_response){
                    setBestRooms(get_best_room_response)
                }
            }catch(e){
                console.log(e)
            }
        }
        if(token){
            get_best_rooms()
        }
    },[token])
    return (
        <div className="w-5/6 m-auto">
            <h1 className="font-bold text-center text-2xl text-gray-700">All Best Rooms</h1>
            <div className="flex flex-wrap justify-center gap-2">
            {bestRooms && bestRooms.length>0 && bestRooms.map((room, index) => (
                    <div key={index} className="relative group w-72 h-72 overflow-hidden bg-black m-auto mt-10">
                    <img className="object-cover w-full h-full transform duration-700 backdrop-opacity-100" src={room?.images[0]} />
                    <div className="absolute w-full h-full shadow-2xl opacity-20 transform duration-500 inset-y-full group-hover:-inset-y-0" />
                    <div className="absolute bg-gradient-to-t from-black w-full h-full transform duration-500 inset-y-3/4 group-hover:-inset-y-0">
                        <div className="absolute w-full flex place-content-center">
                        <p className="capitalize font-serif font-bold text-3xl text-center shadow-2xl text-white mt-10">{room?.room_name}</p>
                        </div>
                        <div className="absolute w-full flex place-content-center mt-20">
                        <p className="font-sans font-semibold text-center w-4/5 text-white mt-5">{room?.description.slice(0,30)}</p>
                        </div>
                        <div className="absolute w-full flex place-content-center mt-28">
                        <p className="font-sans font-semibold text-center w-4/5 text-white mt-5">Size : {room?.size}</p>
                        </div>
                        <div className="absolute w-full flex place-content-center mt-36">
                        <p className="font-sans font-semibold text-center w-4/5 text-white mt-5">Capacity : {room?.capacity}</p>
                        </div>
                        <Link to={`/best_room_details/${room.id}`} className="absolute text-center left-12 bottom-4 bg-white text-black font-bold rounded-lg h-6 w-48">See Details</Link>
                    </div>
                    </div>
                ))}
            </div>
        </div>
    )
}


export default AllBestRooms