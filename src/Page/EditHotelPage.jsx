import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import toast,{ Toaster } from "react-hot-toast";

const EditHotelPage = ()=>{
    const {hotel_id} = useParams()
    const token = localStorage.getItem("Token")
    const [hotelData,setHotelData] = useState()
    const [isLoading,setIsLoading] = useState(false)
    useEffect(()=>{
        const get_hotel_data = async()=>{
            const hotel_data_get_request = await fetch(`https://cph-hotel-booking.vercel.app/hotel/list/${hotel_id}/`,{method:"GET",headers:{'Authorization':`Token ${token}`,'Content-Type':'application/json'}})
            const hotel_data_get_response = await hotel_data_get_request.json()
            if(hotel_data_get_response){
                setHotelData(hotel_data_get_response)
            }
        }
        if(hotel_id){
            get_hotel_data()
        }
    },[hotel_id,isLoading])
    const handleSubmit = async(e)=>{
        e.preventDefault()
        const formData = new FormData()
        for (const key in hotelData){
          formData.append(key,hotelData[key])
        }
        const images = hotelData.images 
        if(images && images.length>0){
          images.forEach((image)=>{
            if (image instanceof File){
              formData.append("uploaded_images",image)
            }
          })
        }      
        try{
          setIsLoading(true)
          const update_hotel_data_request = await fetch(`https://cph-hotel-booking.vercel.app/hotel/list/${hotel_id}/`,{method:"PATCH",headers:{'Authorization':`Token ${token}`},
            body:formData
          })
          if (update_hotel_data_request.ok){
            const update_hotel_data_response = await update_hotel_data_request.json()
            toast.success("Successfully updated hotel.")
            setIsLoading(false)
            console.log(update_hotel_data_response)
          }else{
            setIsLoading(false)
            const error_response = await update_hotel_data_request.json()
            toast.error(`Error:${error_response}`)
            console.log(error_response)
          }
        }catch(e){
          setIsLoading(false)
          console.log(e)
          toast.error("An unxpected error occurred!")
        }
    }
    return (
<div>
  {/* component */}
  <Toaster/>
  <section className="max-w-4xl p-6 mx-auto bg-indigo-600 rounded-md shadow-md dark:bg-gray-800 mt-20">
    <h1 className="text-xl font-bold text-white capitalize dark:text-white text-center">UPDATE HOTEL</h1>
    <form onSubmit={(e)=>handleSubmit(e)}>
      <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
        <div>
          <label className="text-white dark:text-gray-200 font-bold" htmlFor="name">Hotel Name</label>
          <input onChange={(e)=>setHotelData(
            {...hotelData,[e.target.name]:e.target.value}
          )} value={hotelData?hotelData.name:""} required id="name" name="name" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
        </div>
        <div>
          <label className="text-white dark:text-gray-200 font-bold" htmlFor="Address">Address</label>
          <input onChange={(e)=>setHotelData(
            {...hotelData,[e.target.name]:e.target.value}
          )} value={hotelData?hotelData.address:""} required id="Address" type="text" name="address" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
        </div>
        <div>
          <label className="text-white dark:text-gray-200 font-bold" htmlFor="details">Details</label>
          <textarea onChange={(e)=>setHotelData(
            {...hotelData,[e.target.name]:e.target.value}
          )} value={hotelData?hotelData.details:""} required id="details" type="text" name="details" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
        </div>
        <div>
          <label className="text-white dark:text-gray-200 font-bold" htmlFor="bookingPrice">Booking Price</label>
          <input onChange={(e)=>setHotelData(
            {...hotelData,[e.target.name]:e.target.value}
          )} value={hotelData?hotelData.booking_price:""} required id="bookingPrice" type="number" name="booking_price" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
        </div>
        <div>
          <label className="text-white font-bold dark:text-gray-200" htmlFor="facilities">Facilities</label>
          <textarea required onChange={(e)=>setHotelData(
            {...hotelData,[e.target.name]:e.target.value}
          )} value={hotelData?hotelData.facilities:""} id="facilities" type="text" name="facilities" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
        </div>
        <div>
          <label className="text-white font-bold dark:text-gray-200" htmlFor="rules">Rules</label>
          <textarea onChange={(e)=>setHotelData(
            {...hotelData,[e.target.name]:e.target.value}
          )} value={hotelData?hotelData.rules:""} required id="rules" type="text" name="rules" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
        </div>
        <div>
            <label class="text-white dark:text-gray-200 font-bold" for="rating">Rating</label>
            <select onChange={(e)=>setHotelData(
            {...hotelData,[e.target.name]:e.target.value}
          )} value={hotelData?hotelData.rating:""} required id="rating" name="rating" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                <option>🌟</option>
                <option>🌟🌟</option>
                <option>🌟🌟🌟</option>
                <option>🌟🌟🌟🌟</option>
                <option>🌟🌟🌟🌟🌟</option>
            </select>
        </div>
        <div>
          <label className="text-white dark:text-gray-200 font-bold" htmlFor="location">Location</label>
          <input onChange={(e)=>setHotelData(
            {...hotelData,[e.target.name]:e.target.value}
          )} value={hotelData?hotelData.location:""} required id="location" name="location" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" defaultValue={""} />
        </div>
        <div>
          <label className="text-white dark:text-gray-200 font-bold" htmlFor="numberOfRooms">Number Of Rooms</label>
          <input onChange={(e)=>setHotelData(
            {...hotelData,[e.target.name]:e.target.value}
          )} value={hotelData?hotelData.number_of_rooms:""} required id="numberOfRooms" name="number_of_rooms" type="number" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
        </div>
        <div>
          <label className="text-white dark:text-gray-200 font-bold" htmlFor="roomType">Room Type</label>
          <input onChange={(e)=>setHotelData(
            {...hotelData,[e.target.name]:e.target.value}
          )} value={hotelData?hotelData.room_types:""} required id="roomType" type="text" name="room_types" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" defaultValue={""} />
        </div>
          <div className="border-dashed border-2 justify-center flex gap-2 flex-wrap">
            {hotelData?hotelData.images?.map((item,index)=>{
                const isFile = item instanceof File;
                const image = isFile ? URL.createObjectURL(item) : item.image;
                return (<img width={200} height={200} key={index} src={image}/>)
          }):""}
          </div>
          <div>
          <label className="block text-sm font-medium text-white">
            Image
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <svg className="mx-auto h-12 w-12 text-white" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="flex text-sm text-gray-600">
                <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                  <span className>Upload images</span>
                  <input onChange={(e)=>{
                    const files = Array.from(e.target.files)
                    setHotelData(
                      {...hotelData,[e.target.name]:files}
                    )
                  }} accept="image/*"  multiple id="file-upload" name="images" type="file" className="sr-only" />
                </label>
                <p className="pl-1 text-white">or drag and drop</p>
              </div>
              <p className="text-xs text-white">
                PNG, JPG, GIF up to 10MB
              </p>
            </div>
            </div>
            </div>
        </div>
      <div className="flex justify-end mt-6">
        <button type="submit" className="px-6 w-20 flex justify-center py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">
          {isLoading?(
            <div class="border-gray-300 h-5 w-5 animate-spin rounded-full border-4 border-t-blue-600" />
          ):("Update")}
        </button>
      </div>
    </form>
  </section>
</div>
    )
}

export default EditHotelPage