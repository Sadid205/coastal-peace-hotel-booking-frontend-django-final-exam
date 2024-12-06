import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const AllOfferHotels = ()=>{
    const [specialOffer,setSpecialOffer] = useState([])
    const token = localStorage.getItem("Token")
    const VITE_REQUEST_URL=import.meta.env.VITE_REQUEST_URL
    useEffect(()=>{
        const get_special_offer = async()=>{
            try{
                const special_offer_request = await fetch(`${VITE_REQUEST_URL}special_offer/list/`,{method:"GET",headers:{'Authorization':`Token ${token}`,'Content-Type':'application/json'}})
                const special_offer_response = await special_offer_request.json()
                if(special_offer_response){
                    setSpecialOffer(special_offer_response)
                }
            }catch(e){
                console.log(e)
            }
        }
        if(token){
            get_special_offer()
        }
    },[token])
    return (
        <div className="w-5/6 m-auto">
            <h1 className="font-bold text-xl text-center text-gray-600">All {specialOffer&&specialOffer.length>0?(specialOffer[specialOffer.length-1].offer_name):("")}</h1>
            <div className="flex flex-wrap justify-center gap-2 mt-4">
                {
                    specialOffer && specialOffer.length>0?(
                        specialOffer[specialOffer.length-1].hotel&&specialOffer[specialOffer.length-1].hotel.length>0?(
                            specialOffer[specialOffer.length-1].hotel.map((item,index)=>{
                                // {item.images && item.images.length>0?(
                                //     item.images.map((image_item,index)=>{
                                //         console.log(image_item.image)
                                //     })
                                // ):("")}
                                return <div key={index} className="relative m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
                                <a className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl" href="#">
                                <img className="object-cover" src={item.images&&item.images.length>0?(item.images[0].image):("")} />
                                <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">{specialOffer[specialOffer.length-1].discount}% OFF</span>
                                </a>
                                <div className="mt-4 px-5 pb-5">
                                <a href="#">
                                    <h5 className="text-xl tracking-tight text-slate-900">{item.name}</h5>
                                </a>
                                <div className="mt-2 mb-5 flex items-center justify-between">
                                    <p>
                                    <span className="text-3xl font-bold text-slate-900">${item.offer_price}</span>
                                    <span className="text-sm text-slate-900 line-through">${item.booking_price}</span>
                                    </p>
                                    <div className="flex items-center">
                                    {item.rating}
                                    <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">{
                                        item.rating==="🌟🌟🌟🌟🌟"?"5.0":
                                        item.rating==="🌟🌟🌟🌟"?"4.0":
                                        item.rating==="🌟🌟🌟"?"3.0":
                                        item.rating==="🌟🌟"?"2.0":
                                        item.rating==="🌟"?"1.0":"0"
                                    }</span>
                                    </div>
                                </div>
                                <Link to={`/hotel_details/${item.id}`} className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    Details</Link>
                                </div>
                            </div>
                            
                            })
                        ):("")
                    ):("")
                }
            </div>
        </div>
    )
}


export default AllOfferHotels