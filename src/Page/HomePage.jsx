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
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';
import 'react-awesome-slider/dist/custom-animations/cube-animation.css';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import moment from 'moment';
import { AiOutlineDelete } from "react-icons/ai";

function HomePage(){
    const token = localStorage.getItem("Token")
    const user_id = localStorage.getItem("user_id")
    const [hotelData,setHotelData] = useState(null)
    const [isLoading,setIsLoading] = useState(false)
    const [guestOrAdmin,setGuestOrAdmin] = useState()
    const [banners,setBanners] = useState(null)
    const [bestRooms,setBestRooms] = useState([])
    const [specialOffer,setSpecialOffer] = useState([])
    const [category,setCategory] = useState([])
    const [services,setServices] = useState([])
    const [feedBack,setFeedBack] = useState([])
    let [page,setPage] = useState(1)
    const {searchValue} = useContext(CreateSearchContext)
    const AutoplaySlider = withAutoplay(AwesomeSlider);
    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };
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
        const get_banner = async()=>{
            try{
                const get_banner_request = await fetch(`https://cph-hotel-booking.vercel.app/banner/list/`,{method:"GET",headers:{'Authorization':`Token ${token}`,'Content-Type':'application/json'}})
                const get_banner_response = await get_banner_request.json()
                if(get_banner_response){
                    setBanners(get_banner_response)
                }
            }catch(e){
                console.log(e)
            }

        }
        const get_best_rooms = async()=>{
            try{
                const get_best_room_request = await fetch(`https://cph-hotel-booking.vercel.app/hotel/best_rooms/`,{method:"GET",headers:{'Authorization':`Token ${token}`,'Content-Type':'application/json'}})
                const get_best_room_response = await get_best_room_request.json()
                if(get_best_room_response){
                    setBestRooms(get_best_room_response)
                }
            }catch(e){
                console.log(e)
            }
        }
        const get_special_offer = async()=>{
            try{
                const special_offer_request = await fetch(`https://cph-hotel-booking.vercel.app/special_offer/list/`,{method:"GET",headers:{'Authorization':`Token ${token}`,'Content-Type':'application/json'}})
                const special_offer_response = await special_offer_request.json()
                if(special_offer_response){
                    setSpecialOffer(special_offer_response)
                }
            }catch(e){
                console.log(e)
            }
        }
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
        const get_services = async()=>{
            try{
                const services_request = await fetch(`https://cph-hotel-booking.vercel.app/hotel/services/`,{method:"GET",headers:{'Authorization':`Token ${token}`,'Content-Type':'application/json'}})
                const services_response = await services_request.json()
                if(services_response){
                    setServices(services_response)
                }
            }catch(e){
                console.log(e)
            }
        }
        const get_feedback = async()=>{
            try{
                const feedback_request = await fetch(`https://cph-hotel-booking.vercel.app/hotel/feedback/`,{method:"GET",headers:{'Authorization':`Token ${token}`,'Content-Type':'application/json'}})
                const feedback_response = await feedback_request.json()
                if(feedback_response){
                    setFeedBack(feedback_response)
                }
            }catch(e){
                console.log(e)
            }
        }
       if(token && user_id){
        getHotelList()
        guest_or_admin_account()
        get_banner()
        get_best_rooms()
        get_special_offer()
        get_category()
        get_services()
        get_feedback()
       }

    },[token,user_id,page,searchValue,isLoading])

    const specialOfferDeleteHandler = async(e,special_offer_id)=>{
      e.preventDefault()
      if (special_offer_id !=null){
        const delete_request = await fetch(`https://cph-hotel-booking.vercel.app/special_offer/list/${special_offer_id}/`,{method:"DELETE",headers:{'Authorization':`Token ${token}`}}) 
        if(delete_request.status===200){
          toast.success("Successfully deleted special offer.")
        }else{
          toast.error("Failed to delete special offer")
        }
      }

    }
    const hotelCategoriesDeleteHandler = async(e,category_id)=>{
      e.preventDefault()
      if (category_id !=null){
        const delete_request = await fetch(`https://cph-hotel-booking.vercel.app/hotel/category/${category_id}/`,{method:"DELETE",headers:{'Authorization':`Token ${token}`}}) 
        console.log(delete_request.status)
        if(delete_request.status===200){
          toast.success("Successfully deleted hotel category.")
        }else{
          toast.error("Failed to delete hotel category")
        }
      }

    }
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
    return (
<div>
<Toaster/>
{
  token?(
    <AutoplaySlider
    play={true}
    cancelOnInteraction={false} // should stop playing on user interaction
    interval={6000}
    animation="cubeAnimation"
  >
    
    {/* <div data-src="#" /> */}
    
    {banners && banners.length>0 && banners[0].image.length>0?(
        banners[banners.length-1].image.map((image_link,index)=>{
            return <div data-src={image_link} />
        })
    ):("")}
    
  </AutoplaySlider>
  ):("")
}

{token&&user_id?<div><div className="flex flex-wrap gap-3">
    {hotelData && hotelData.results.length>0?hotelData.results.map((hotel,index)=>{
      if(hotel.offer_price===null && hotel.included_category===false){
        return  <div key={index} className="flex flex-col w-full max-w-xs m-auto overflow-hidden bg-white border border-gray-100 rounded-lg shadow-md">
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
      }
    } 
    ):<div className="w-full text-center">
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
{token?(
  <div>
  <div className="flex justify-between w-5/6 m-auto items-center">
  <h1 className="font-bold text-4xl text-gray-600 text-center mt-3">Our Best Rooms</h1>
  <Link to={'/all-best-rooms'} className="text-center font-bold text-xs text-gray-700">See All</Link>
  </div>
  
  <Carousel responsive={responsive}>
    {bestRooms && bestRooms.length>0 && bestRooms.slice(0,4).map((room, index) => (
      <div key={index} className="relative group w-72 h-72 overflow-hidden bg-black m-auto mt-10">
        <img className="object-cover w-full h-full transform duration-700 backdrop-opacity-100" src={room?.images[0]} />
        <div className="absolute w-full h-full shadow-2xl opacity-20 transform duration-500 inset-y-full group-hover:-inset-y-0" />
        <div className="absolute bg-gradient-to-t from-black w-full h-full transform duration-500 inset-y-3/4 group-hover:-inset-y-0">
          <div className="absolute w-full flex place-content-center">
            <p className="capitalize font-serif font-bold text-3xl text-center shadow-2xl text-white mt-10">{room?.room_name}</p>
          </div>
          <div className="absolute w-full flex place-content-center mt-20">
            <p className="font-sans font-semibold text-center w-4/5 text-white mt-5">{room?.description.slice(0,100)}</p>
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
  </Carousel>
  </div>
):("")}
{token?(
  <div className="w-5/6 m-auto mt-10">
  {specialOffer&&specialOffer.length>0?(
    <div className="flex justify-between">
    <div className="flex items-center gap-2">
    <h1 className="font-bold text-gray-600 text-base">{specialOffer&&specialOffer.length>0?(specialOffer[specialOffer.length-1].offer_name):("")}</h1>
    <button onClick={(e)=>specialOfferDeleteHandler(e,specialOffer&&specialOffer.length>0?(specialOffer[specialOffer.length-1].id):(null))}><AiOutlineDelete /></button>
    </div>
    <div className="flex gap-2">
    <h3 className="font-bold text-sm text-blue-400">{specialOffer&&specialOffer.length>0?(specialOffer[specialOffer.length-1].discount):("")}% Off Today</h3>
    <Link to={'/all-offer-hotels'} className="text-center text-xs font-bold text-gray-700">See All</Link>
    </div>
</div>
  ):("")}
  <div className="flex flex-wrap overflow-y-auto max-h-screen">
  {
      specialOffer && specialOffer.length>0?(
          specialOffer[specialOffer.length-1].hotel&&specialOffer[specialOffer.length-1].hotel.length>0?(
              specialOffer[specialOffer.length-1].hotel.slice(0,8).map((item,index)=>{
                  // {item.images && item.images.length>0?(
                  //     item.images.map((image_item,index)=>{
                  //         console.log(image_item.image)
                  //     })
                  // ):("")}
                  return <div className="relative m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
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
):("")}
{token?(
  <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
  {category&&category.length>0?(
    <div className="border-b mb-5 flex justify-between text-sm">
    <div className="text-indigo-600 flex items-center pb-2 pr-2 border-b-2 border-indigo-600 uppercase">
      <svg className="h-6 mr-3" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 455.005 455.005" style={{enableBackground: 'new 0 0 455.005 455.005'}} xmlSpace="preserve">
        <g>
          <path d="M446.158,267.615c-5.622-3.103-12.756-2.421-19.574,1.871l-125.947,79.309c-3.505,2.208-4.557,6.838-2.35,10.343 c2.208,3.505,6.838,4.557,10.343,2.35l125.947-79.309c2.66-1.675,4.116-1.552,4.331-1.432c0.218,0.12,1.096,1.285,1.096,4.428 c0,8.449-6.271,19.809-13.42,24.311l-122.099,76.885c-6.492,4.088-12.427,5.212-16.284,3.084c-3.856-2.129-6.067-7.75-6.067-15.423 c0-19.438,13.896-44.61,30.345-54.967l139.023-87.542c2.181-1.373,3.503-3.77,3.503-6.347s-1.323-4.974-3.503-6.347L184.368,50.615 c-2.442-1.538-5.551-1.538-7.993,0L35.66,139.223C15.664,151.815,0,180.188,0,203.818v4c0,23.63,15.664,52.004,35.66,64.595 l209.292,131.791c3.505,2.207,8.136,1.154,10.343-2.35c2.207-3.505,1.155-8.136-2.35-10.343L43.653,259.72 C28.121,249.941,15,226.172,15,207.818v-4c0-18.354,13.121-42.122,28.653-51.902l136.718-86.091l253.059,159.35l-128.944,81.196 c-20.945,13.189-37.352,42.909-37.352,67.661c0,13.495,4.907,23.636,13.818,28.555c3.579,1.976,7.526,2.956,11.709,2.956 c6.231,0,12.985-2.176,19.817-6.479l122.099-76.885c11.455-7.213,20.427-23.467,20.427-37.004 C455.004,277.119,451.78,270.719,446.158,267.615z"> </path>
          <path d="M353.664,232.676c2.492,0,4.928-1.241,6.354-3.504c2.207-3.505,1.155-8.136-2.35-10.343l-173.3-109.126 c-3.506-2.207-8.136-1.154-10.343,2.35c-2.207,3.505-1.155,8.136,2.35,10.343l173.3,109.126 C350.916,232.303,352.298,232.676,353.664,232.676z"> </path>
          <path d="M323.68,252.58c2.497,0,4.938-1.246,6.361-3.517c2.201-3.509,1.14-8.138-2.37-10.338L254.46,192.82 c-3.511-2.202-8.139-1.139-10.338,2.37c-2.201,3.51-1.14,8.138,2.37,10.338l73.211,45.905 C320.941,252.21,322.318,252.58,323.68,252.58z"> </path>
          <path d="M223.903,212.559c-3.513-2.194-8.14-1.124-10.334,2.39c-2.194,3.514-1.124,8.14,2.39,10.334l73.773,46.062 c1.236,0.771,2.608,1.139,3.965,1.139c2.501,0,4.947-1.251,6.369-3.529c2.194-3.514,1.124-8.14-2.39-10.334L223.903,212.559z"> </path>
          <path d="M145.209,129.33l-62.33,39.254c-2.187,1.377-3.511,3.783-3.503,6.368s1.345,4.983,3.54,6.348l74.335,46.219 c1.213,0.754,2.586,1.131,3.96,1.131c1.417,0,2.833-0.401,4.071-1.201l16.556-10.7c3.479-2.249,4.476-6.891,2.228-10.37 c-2.248-3.479-6.891-4.475-10.37-2.228l-12.562,8.119l-60.119-37.38l48.2-30.355l59.244,37.147l-6.907,4.464 c-3.479,2.249-4.476,6.891-2.228,10.37c2.249,3.479,6.894,4.476,10.37,2.228l16.8-10.859c2.153-1.392,3.446-3.787,3.429-6.351 c-0.018-2.563-1.344-4.94-3.516-6.302l-73.218-45.909C150.749,127.792,147.647,127.795,145.209,129.33z"> </path>
          <path d="M270.089,288.846c2.187-3.518,1.109-8.142-2.409-10.329l-74.337-46.221c-3.518-2.188-8.143-1.109-10.329,2.409 c-2.187,3.518-1.109,8.142,2.409,10.329l74.337,46.221c1.232,0.767,2.601,1.132,3.953,1.132 C266.219,292.387,268.669,291.131,270.089,288.846z"> </path>
          <path d="M53.527,192.864c-2.187,3.518-1.109,8.142,2.409,10.329l183.478,114.081c1.232,0.767,2.601,1.132,3.953,1.132 c2.506,0,4.956-1.256,6.376-3.541c2.187-3.518,1.109-8.142-2.409-10.329L63.856,190.455 C60.338,188.266,55.714,189.346,53.527,192.864z"> </path>
        </g>
      </svg>
     <div>
      <div className="flex items-center gap-2">
      <p href="#" className="font-semibold inline-block">{category && category.length>0?(
        category[category.length-1].category_name
      ):("")}</p>
      <button onClick={(e)=>hotelCategoriesDeleteHandler(e,category && category.length>0?(
        category[category.length-1].id
      ):(null))}><AiOutlineDelete /></button>
      </div>
     </div>
    </div>
    <Link to={"/all-categories-hotels"}>See All</Link>
  </div>
  ):("")}
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
  {
      category && category.length>0?(
        category[category.length-1].hotel && category[category.length-1].hotel.length>0?(
         category[category.length-1].hotel.slice(0,8).map((hotel,index)=>{
          // console.log(hotel)
          // hotel.images && hotel.images.length>0?(
          //       console.log(hotel.images[0].image)
          //     ):("")
          return <div className="rounded overflow-hidden shadow-lg flex flex-col">
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
):("")}
{token?(
  <div>
  <div className="w-5/6 m-auto flex justify-between">
  <h1 className="text-center font-bold text-2xl text-gray-700">Our Services</h1>
  <Link to={'/all-services'} className="text-center font-bold text-gray-700">See All</Link>
  </div>
  <div className="w-5/6 m-auto mt-32">
  <div className="flex flex-col sm:flex-row mx-auto">
      {
        services && services.length>0?(
          services.slice(0,4).map((service,index)=>{
            // console.log(services)
            {service.image && service.images.length>0?(
              service.images[0]
            ):("")}
            return <Link key={index} to={`/service_details/${service.id}`}>
              <div className="rotate-6 hover:rotate-0 duration-500 hover:-translate-y-12 h-full w-full object-cover hover:scale-125 transform origin-bottom">
                <div className="flex justify-center">
                <img src={service.images && service.images.length>0?(
                  service.images[0]
                ):("")}  alt="#_" />
                </div>
                <div className="p-4">
                  <h2 className="mb-2 text-lg font-medium">{service.service_name?(service.service_name):("")}</h2>
                  <p className="mb-2 text-sm text-gray-600">{service.description?(service.description.slice(0,50)):("")}</p>
                  <div className="flex items-center">
                    <p className="mr-2 text-lg font-semibold">${service.price?(service.price):("")}</p>
                    <p className="ml-auto text-base font-medium text-green-500">See More</p>
                  </div>
                </div>
              </div>
            </Link> 
          })
        ):("")
      }
      </div>
  </div>
  </div>
):("")}
{token?(
  <div>
  <h1 className="font-bold text-2xl text-gray-500 text-center mt-3">Feedback from our Guests</h1>
  <Carousel responsive={responsive}>
  {
      feedBack && feedBack.length>0?(
        feedBack[feedBack.length-1]?.review&&feedBack[feedBack.length-1].review.length>0?(
          feedBack[feedBack.length-1].review.map((review_item,index)=>{
            return   <div className="flex flex-col overflow-hidden shadow-xl">
            <div className="flex flex-col justify-between flex-1 p-6 bg-white lg:py-8 lg:px-7">
              <div className="flex-1">
                <div className="flex items-center">
                {
                  review_item.rating==="5"?"🌟🌟🌟🌟🌟":
                  review_item.rating==="4"?"🌟🌟🌟🌟":
                  review_item.rating==="3"?"🌟🌟🌟":
                  review_item.rating==="2"?"🌟🌟":
                  review_item.rating==="1"?"🌟":"0"
                          }
                </div>
                <blockquote className="flex-1 mt-8">
                  <p className="text-lg leading-relaxed text-gray-900 font-pj">{review_item.reviews}</p>
                </blockquote>
              </div>
              <div className="flex items-center mt-8">
                <img className="flex-shrink-0 object-cover rounded-full w-11 h-11" src={review_item.reviewer && review_item.reviewer.image?(review_item.reviewer.image):""} alt="img" />
                <div className="ml-4">
                  <p className="text-base font-bold text-gray-900 font-pj">{review_item.reviewer.user && review_item.reviewer.user.first_name?(review_item.reviewer.user.first_name):""} {review_item.reviewer.user && review_item.reviewer.user.last_name?(review_item.reviewer.user.last_name):""}</p>
                  <p className="mt-0.5 text-sm font-pj text-gray-600">{review_item.reviewer.user && review_item.reviewer.user.username?(review_item.reviewer.user.username):""}</p>
                </div>
              </div>
            </div>
          </div>
          })
        ):null
      ):null
    }
      <div>
  
      </div>
  </Carousel>
  </div>
):("")}
</div>  
)
}
export default HomePage;



