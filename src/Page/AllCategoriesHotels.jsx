import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import moment from 'moment';

const AllCategoriesHotels = ()=>{
    const [category,setCategory] = useState([])
    const token = localStorage.getItem("Token")
    useEffect(()=>{
        const get_category = async()=>{
            try{
                const category_request = await fetch(`https://cph-hotel-booking.vercel.app/hotel/category/`,{method:"GET",headers:{'Authorization':`Token ${token}`,'Content-Type':'application/json'}})
                const category_response = await category_request.json()
                if(category_response){
                    setCategory(category_response)
                }
            }catch(e){
                console.log(e)
            }
        }
        if(token){
            get_category()
        }
    },[token])
    return (
        <div className="w-5/6 m-auto">
            <h1 className="font-bold text-gray-700 text-center text-2xl">All {category && category.length>0?(
                category[category.length-1].category_name
            ):("")}</h1>
            <div className="flex mt-4 justify-center flex-warp gap-2">
            {
                category && category.length>0?(
                    category[category.length-1].hotel && category[category.length-1].hotel.length>0?(
                    category[category.length-1].hotel.map((hotel,index)=>{
                    // console.log(hotel)
                    // hotel.images && hotel.images.length>0?(
                    //       console.log(hotel.images[0].image)
                    //     ):("")
                    return <div key={index} className="rounded overflow-hidden shadow-lg flex flex-col">
                    <a href="#" />
                    <div className="relative"><a href="#">
                        <img className="w-full" src={hotel.images && hotel.images.length>0?(
                            hotel.images[0].image
                        ):("")} alt="Sunset in the mountains" />
                        <div className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25">
                        </div>
                        </a>
                        <a href="#!">
                        <div className="text-xs absolute top-0 right-0 bg-indigo-600 px-4 py-2 text-white mt-3 mr-3 hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out">
                        {category && category.length>0?(
                            category[category.length-1].category_name
                        ):("")}
                        </div>
                        </a>
                    </div>
                    <div className="px-6 py-4 mb-auto">
                        <a href="#" className="font-medium text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out inline-block mb-2">{hotel.name}</a>
                        <p className="text-gray-500 text-sm">
                        {hotel.details.slice(0,100)}
                        </p>
                        <p className="font-bold">Price : {hotel.booking_price}$</p>
                        <p className="font-bold ">Rating : {hotel.rating}</p>
                    </div>
                    <div className="px-6 py-3 flex flex-row items-center justify-between bg-gray-100">
                        <span href="#" className="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center">
                        <svg height="13px" width="13px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style={{enableBackground: 'new 0 0 512 512'}} xmlSpace="preserve">
                            <g>
                            <g>
                                <path d="M256,0C114.837,0,0,114.837,0,256s114.837,256,256,256s256-114.837,256-256S397.163,0,256,0z M277.333,256 c0,11.797-9.536,21.333-21.333,21.333h-85.333c-11.797,0-21.333-9.536-21.333-21.333s9.536-21.333,21.333-21.333h64v-128 c0-11.797,9.536-21.333,21.333-21.333s21.333,9.536,21.333,21.333V256z">
                                </path>
                            </g>
                            </g>
                        </svg>
                        <span className="ml-1">{category && category.length>0?(
                            moment(category[category.length-1].created_at).fromNow()
                            ):("")}</span>
                        </span>
                        <span href="#" className="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center">
                        <Link to={`/hotel_details/${hotel.id}`} className="bg-blue-400 py-2 px-2 text-white font-semibold rounded rounded-md">See Details</Link>
                        </span>
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


export default AllCategoriesHotels