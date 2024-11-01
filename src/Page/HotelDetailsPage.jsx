import { Link, useParams } from "react-router-dom";
import { useEffect, useState,useRef } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { FaArrowRight,FaArrowLeft } from "react-icons/fa";
import image from '../assets/profile.jpeg'
import { FaEdit } from "react-icons/fa";
import toast,{ Toaster } from "react-hot-toast";
import { CgUnavailable } from "react-icons/cg";
import { AiOutlineDelete } from "react-icons/ai";
function HotelDetailsPage(){
    const {hotel_id} = useParams()
    const token = localStorage.getItem("Token")
    const user_id = localStorage.getItem("user_id")
    const [bookingList,setBookingList] = useState()
    const [reviewer,setReviewer] = useState({})
    const [guestReviewer,setGuestReviewer] = useState({})
    const [hotelDetails,setHotelDetails] = useState(null)
    const [hotelReviews,setHotelReviews] = useState([])
    const [showModal, setShowModal] = useState(false);
    const [guestNumber,setGuestNumber] = useState("")
    const [roomTypes,setRoomTypes] = useState("")
    const [reviews,setReviews] = useState("")
    const [rating,setRating] = useState("")
    const [guestId,setGuestId] = useState(null)
    const [isReviewPost,setIsReviewPost] = useState(false)
    const [isLoading,setIsLoading] = useState(false)
    const [hasStayedAt,setHasStayedAt] = useState(false)
    const [bookingLoader,setBookingLoader] = useState(false)
    const [deleteLoader,setDeleteLoader] = useState(false)
    const slider = useRef(null)
    const next = ()=>{
        slider?.current.slickNext();
    }
    const prev = ()=>{
        slider?.current.slickPrev();
    };
    const setting = {
        dots: false,
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 3,
        slidesToScroll: 1,
        speed: 500,
        responsive: [
          {
            breakpoint: 1024,
            setting: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true,
            },
          },
          {
            breakpoint: 600,
            setting: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2,
            },
          },
          {
            breakpoint: 480,
            setting: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      };

    useEffect(()=>{
        const getDetails = async()=>{
           try{
            setIsLoading(true)
            const response = await fetch(`https://cph-hotel-booking.vercel.app/hotel/list/${hotel_id}/`,{method:"GET",headers:{'Authorization':`Token ${token}`,'Content-Type':'application/json'}})
            const data = await response.json()
            if(data){
              setHotelDetails(data)
              setIsLoading(false)
            }
           }catch(e){
            console.log(e)
           }
        }
        const getReviews = async()=>{
          try{
            const hotelReviews = await fetch(`https://cph-hotel-booking.vercel.app/reviews/list/?hotel_id=${hotel_id}`,{method:"GET",headers:{'Authorization':`Token ${token}`,'Content-Type':'application/json'}})
            const reviewData = await hotelReviews.json()
            setHotelReviews(reviewData)
            reviewData.forEach(async(single_reviewer)=>{
              try{
                const user_data = await fetch(`https://cph-hotel-booking.vercel.app/guest/user/?guest_id=${single_reviewer.reviewer}`,{method:"GET",headers:{'Authorization':`Token ${token}`,'Content-Type':'application/json'}})
                const responseUserData = await user_data.json()
                setReviewer(prevState=>({
                  ...prevState,
                  [single_reviewer.reviewer]:responseUserData
                }))
    
                const  guest_data = await fetch(`https://cph-hotel-booking.vercel.app/guest/list/${single_reviewer.reviewer}`,{method:"GET",headers:{'Authorization':`Token ${token}`,'Content-Type':'application/json'}})
                const responseGuestData = await guest_data.json()
                setGuestReviewer(prevState=>({
                  ...prevState,
                  [single_reviewer.reviewer]:responseGuestData
                }))
              }catch(e){
                console.log(e)
              }
            })
        
          }catch(e){
            console.log(e)
          }
        }
        const getGuestAccount=async()=>{
          try{
            const guestAccount = await fetch(`https://cph-hotel-booking.vercel.app/guest/list/?user_id=${user_id}`,{method:"GET",headers:{'Authorization':`Token ${token}`,'Content-Type':'application/json'}})
            const guestData = await guestAccount.json()
            setGuestId(guestData[0].id)
          }
          catch(e){
            console.log(e)
          }
        }
        const setBookingListMethod=async()=>{
        try{
          const bookedList = await fetch(`https://cph-hotel-booking.vercel.app/booking/list/?hotel_id=${hotel_id?hotel_id:""}&guest_id=${guestId?guestId:""}`,{method:"GET",headers:{'Authorization':`Token ${token}`,'Content-Type':'application/json'}})
          const bookedResponse = await bookedList.json()
          setBookingList(bookedResponse)
        }catch(e){
          console.log(e)
        }
       }
       
        if(hotel_id && token && user_id){
            getDetails()
            getReviews()
            getGuestAccount()
        }
        if(guestId){
          setBookingListMethod()
        } 
    },[token,hotel_id,user_id,guestId,isReviewPost,deleteLoader]);
    useEffect(()=>{
      const stayed_at=()=>{
        if (bookingList && bookingList.length>=1){
          const isTrue = bookingList.some((booked_hotel)=>booked_hotel.booking_status==="Checked-out")
          setHasStayedAt(isTrue)
        }
      }
      if(bookingList && bookingList.length>=1){
        stayed_at()
      }
    })
        let image_count;
        if(hotelDetails){
            image_count = hotelDetails.images.length
        }
        const settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };
    const bookingHandler= async(e)=>{
        e.preventDefault()
        try{
        setBookingLoader(true)
        const bookingRequest = await fetch(`https://cph-hotel-booking.vercel.app/booking/${hotel_id}/`,{method:"POST",headers:{'Authorization':`Token ${token}`,'Content-Type':'application/json'},
          body:JSON.stringify({
              number_of_guests:guestNumber,
              room_type:roomTypes
              })
          })
      const bookingResponse = await bookingRequest.json()
      if(bookingResponse.Response){
        setBookingLoader(false)
        toast.success(bookingResponse.Response, {
          icon: '👏',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        })
      setGuestNumber("")
      setRoomTypes("")
      setShowModal(false)
      }
      }catch(e){
        console.log(e)
      }
    }
    
  
   const handlePostReview = async(e)=>{
    e.preventDefault()
    try{
      setIsReviewPost(true)
      const postReview = await fetch('https://cph-hotel-booking.vercel.app/reviews/list/',{method:"POST",headers:{'Authorization':`Token ${token}`,'Content-Type':'application/json'},
        body:JSON.stringify({
          reviewer:guestId,
          hotel:hotel_id,
          reviews:reviews,
          rating:rating
          })
        })
        const reviewResponse = await postReview.json()
        if(reviewResponse){
          setIsReviewPost(false)
          toast.success("You have successfully post a review.")
        }
    }catch(e){
      console .log(e)
    }
   }
   const delete_review_handler = async(e,review_id)=>{
    e.preventDefault()
    try{
      setDeleteLoader(true)
      const delete_review_request = await fetch(`https://cph-hotel-booking.vercel.app/reviews/list/${review_id}/`,{method:"DELETE",headers:{'Authorization':`Token ${token}`}})
      toast.success("Successfully deleted this reviews.")
      setDeleteLoader(false)
    }catch(e){
      setDeleteLoader(false)
      console.log(e)
      toast.error("An unexpected error occurred!")
    }
   }
    return (
  <>
        <div><Toaster/></div>
        <div className="py-8 bg-gray-100 dark:bg-gray-800">
            {isLoading?(
               <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
                 <div className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center">
                  <div className="flex h-[400px] m-auto w-1/2 items-center justify-center  bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
                    <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                      <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                    </svg>
                  </div>
                  <div className="w-1/2">
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4" />
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5" />
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5" />
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5" />
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]" />
                  </div>
                </div>
               </div>
              ):(<div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
              <div className="flex flex-col -mx-4 md:flex-row">
              <div className="px-4 -z-0 md:flex-1">
                  <div className="h-[400px] m-auto w-96 rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                  <Slider {...settings}>
                  {hotelDetails?hotelDetails.images?.map((images,index)=>(
                    <div key={index} className="">
                      <img style={{height:'400px'}} className="w-full" src={images.image} alt="image" />
                    </div>
                  )):""
                  }    
                  {image_count>=2?"":<div></div>}
                  </Slider>
                  </div>
                  <div className="flex mb-4 -mx-2">
                      <div className="w-1/2 px-2 m-auto">
                          <button onClick={() => setShowModal(true)} className="w-full px-4 py-2 font-bold text-white bg-gray-900 rounded-full dark:bg-gray-600 hover:bg-gray-800 dark:hover:bg-gray-700">Book Now</button>
                      </div>
                  </div>
              </div>
              <div className="px-4 md:flex-1">
                  <h2 className="mb-2 text-2xl font-bold text-gray-800 dark:text-white">{hotelDetails?hotelDetails.name:""}</h2>
                  <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
                  <span className="font-bold text-gray-400">Details</span> : {hotelDetails?hotelDetails.details:""}
                  </p>
                  <div className="flex mb-4">
                  <div className="mr-4">
                      <span className="font-bold text-gray-700 dark:text-gray-300">Booking Price:</span>
                      <span className="text-gray-600 dark:text-gray-300">{hotelDetails&&hotelDetails.offer_price?(hotelDetails.offer_price):(hotelDetails&&hotelDetails.booking_price?(hotelDetails.booking_price):(""))}$</span>
                  </div>
                  <div>
                      <span className="font-bold text-gray-700 dark:text-gray-300">Number of rooms : </span>
                      <span className="text-gray-600 dark:text-gray-300">{hotelDetails?hotelDetails.number_of_rooms:""}</span>
                  </div>
                  </div>
                  <div className="mb-4">
                  <span className="font-bold text-gray-700 dark:text-gray-300">Hotel Rating : </span>
                  <span className="text-gray-600 dark:text-gray-300">{hotelDetails?hotelDetails.rating:""}</span>
                  </div>
                  <div className="mb-4">
                  <span className="font-bold text-gray-700 dark:text-gray-300">Address : </span>
                  <span className="text-gray-600 dark:text-gray-300">{hotelDetails?hotelDetails.address:""}</span>
                  </div>
                  <div>
                  <span className="font-bold text-gray-700 dark:text-gray-300">Facilities : </span>
                  <span className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                     {hotelDetails?hotelDetails.facilities:""}
                  </span>
                  </div>
                  <div>
                  <span className="font-bold text-gray-700 dark:text-gray-300">Location : </span>
                  <span className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                     {hotelDetails?hotelDetails.location:""}
                  </span>
                  </div>
                  <div>
                  <span className="font-bold text-gray-700 dark:text-gray-300">Room Types : </span>
                  <span className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                     {hotelDetails?hotelDetails.room_types:""}
                  </span>
                  </div>
                  <div>
                  <span className="font-bold text-gray-700 dark:text-gray-300">Rules : </span>
                  <span className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                     {hotelDetails?hotelDetails.rules:""}
                  </span>
                  </div>
              </div>
              </div>
          </div>)}
        </div>
        <div className="">
      <br />
      <br />
      <div className="relative md:container md:m-auto">
        <h1 className="text-3xl font-semibold">
          Hotel Reviews
        </h1>
        <div className="border-b-2 w-36 border-signup"></div>
        <br />
        <p className=" text-slate-400">Here some awesome feedback</p>
        <br />
        <Slider ref={slider} {...setting}>
          {hotelReviews?.map((item, index) => (
            <div key={index} className="p-4">
              <div className="">
                <div className="w-20">
                  {guestReviewer[item.reviewer]&&guestReviewer[item.reviewer].image?(<img className="w-16 h-16 rounded-full w" src={guestReviewer[item.reviewer].image} alt="profilePicture" />):(<img className="rounded-full " src={image} alt="profilePicture" />)}
                </div>
                <div>
                  <p className="text-md text-slate-600">
                    {item.reviews?item.reviews:""}
                  </p>
                </div>
              </div>
              <br />
              <p>
              {item.rating==="1"?"⭐":
                item.rating==="2"?"⭐⭐":
                item.rating==="3"?"⭐⭐⭐":
                item.rating==="4"?"⭐⭐⭐⭐":
                item.rating==="5"?"⭐⭐⭐⭐⭐":"⭐"}
              </p>
                {reviewer[item.reviewer]?(
                   <p className="text-sm font-semibold text-slate-600">{reviewer[item.reviewer][0].first_name} {reviewer[item.reviewer][0].last_name}</p>
                ):(
                  <span><CgUnavailable /></span>
                )}
              <p className="text-sm font-semibold text-slate-600">
                Time : {item.review_date}
              </p>
                {item.reviewer==guestId?(
                  <div className="flex justify-between">
                  <Link to={`/edit_review/${item.id}/${hotel_id}/${guestId}`}><span><FaEdit /></span></Link>
                  <button onClick={(e)=>{delete_review_handler(e,item.id)}}><AiOutlineDelete /></button>
                </div>
                ):("")}
            </div>
          ))}
          {hotelReviews.length<2?<div></div>:""}
        </Slider>
        <div className="absolute top-0 right-0 flex">
          <div
            onClick={prev}
            className="p-1 rounded-md bg-signup hover:cursor-pointer"
          >
            <FaArrowLeft />
          </div>
          <div
            onClick={next}
            className="p-1 ml-4 rounded-md bg-signup hover:cursor-pointer"
          >
            <FaArrowRight  />
          </div>
        </div>
      </div>
    </div>
    {hasStayedAt?
    <div style={{height:"420px"}} className="flex items-center bg-gradient-to-tr from-fuchsia-300 to-sky-500">
      <section className="flex flex-col max-w-md p-4 mx-auto">
        <div className="p-6 rounded bg-sky-100">
          <div className="flex items-center justify-center m-3 mb-12 font-black">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 mr-3 text-red-600 animate-pulse" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
            <h1 className="text-3xl tracking-wide text-gray-900">Review Section</h1>
          </div>
          <form onSubmit={handlePostReview} className="flex flex-col justify-center">
            <label className="text-sm font-medium">Rating</label>
            <select value={rating} onChange={(e)=>setRating(e.target.value)} name="rating" className="w-full p-2 border rounded-xl">
            <option value="1">⭐</option>
            <option value="2">⭐⭐</option>
            <option value="3">⭐⭐⭐</option>
            <option value="4">⭐⭐⭐⭐</option>
            <option value="5">⭐⭐⭐⭐⭐</option>
        </select>
            <label className="text-sm font-medium">Reviews</label>
            <textarea value={reviews} onChange={(e)=>setReviews(e.target.value)} className="
            mb-3 mt-1 block w-full px-2 py-1.5 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
            focus:outline-none
            focus:border-sky-500
            focus:ring-1
            focus:ring-sky-500
            focus:invalid:border-red-500 focus:invalid:ring-red-500" name="reviews" placeholder="Reviews"/>
            <button disabled={isReviewPost} className="block h-10 px-4 py-2 font-medium text-gray-100 transition duration-300 rounded-md shadow-lg bg-gradient-to-r from-pink-600 to-red-600" type="submit">
              {isReviewPost?<div className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-green-600 rounded-full" role="status" aria-label="loading"></div>:"Post"}
            </button>
          </form>
        </div>
      </section>
      </div>
:""
    }
      {/* Modal */}
      {showModal ? (
          <>
            <div
              className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none"
            >
              <div className="relative w-auto max-w-3xl mx-auto my-6">
                {/*content*/}
                <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-blueGray-200">
                    <h3 className="text-3xl font-semibold">
                      {hotelDetails?hotelDetails.name:"Modal Title"}
                    </h3>
                    <button
                      className="float-right p-1 ml-auto text-3xl font-semibold leading-none text-black bg-transparent border-0 outline-none opacity-5 focus:outline-none"
                      onClick={() => setShowModal(false)}
                    >
                      <span className="block w-6 h-6 text-2xl text-black bg-transparent outline-none opacity-5 focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  {/*body*/}
                  <form onSubmit={bookingHandler}>
                  <div className="relative flex-auto p-6">
                      <div className="relative">
                          <input value={guestNumber} onChange={(e)=>setGuestNumber(e.target.value)} required  autoComplete="off" id="number_of_guests" name="number_of_guests" type="number" className="w-full h-10 p-3 text-gray-900 placeholder-transparent border border-b-2 border-gray-300 rounded-full shadow-lg peer focus:outline-none focus:borer-rose-600"/>
                          <label htmlFor="number_of_guests" className="absolute font-bold left-0 -top-6 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                              Number Of Guests 
                          </label>
                      </div>
                      <div className="relative mt-6">
                          <input value={roomTypes} onChange={(e)=>setRoomTypes(e.target.value)}  autoComplete="off" id="room_type" name="room_type" type="text" className="w-full h-10 p-5 text-gray-900 placeholder-transparent border border-b-2 border-gray-300 rounded-full shadow-lg peer focus:outline-none focus:borer-rose-600"/>
                          <label htmlFor="room_type" className="absolute left-0 font-bold -top-6 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                              Room Types
                          </label>
                      </div>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid rounded-b border-blueGray-200">
                      <button
                          className="px-6 py-2 mb-1 mr-1 text-sm font-bold text-red-500 uppercase transition-all duration-150 ease-linear outline-none background-transparent focus:outline-none"
                          type="button"
                          onClick={() => setShowModal(false)}
                      >
                          Close
                      </button>
                      <button disabled={bookingLoader} className="w-20 h-10 px-5 py-2 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-500 active:bg-emerald-600 hover:shadow-lg focus:outline-none"type="submit">
                      {bookingLoader?(<div className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-gray-800 rounded-full dark:text-white" role="status" aria-label="loading"></div>):("Book")}
                      </button>
                  </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
          </>
        ) : null}
</>
)
}

export default HotelDetailsPage;