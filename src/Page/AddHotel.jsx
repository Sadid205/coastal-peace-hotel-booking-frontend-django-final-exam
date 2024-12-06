import { useState } from "react"
import toast,{ Toaster } from "react-hot-toast";
const AddHotel = ()=>{
    const [name,setName] = useState("")
    const [address,setAddress] = useState("")
    const [details,setDetails] = useState("")
    const [bookingPrice,setBookingPrice] = useState()
    const [facilities,setFacilities] = useState("")
    const [rules,setRules] = useState("")
    const [rating,setRating] = useState("")
    const [location,setLocation] = useState("")
    const [numberOfRooms,setNumberOfRooms] = useState()
    const [roomType,setRoomType] = useState()
    const [images,setImages] = useState([])
    const [isLoading,setIsLoading] = useState(false)
    const token = localStorage.getItem("Token")
    const VITE_REQUEST_URL=import.meta.env.VITE_REQUEST_URL
    const handleSubmit= async(e)=>{
        e.preventDefault()
        const formData = new FormData();
        formData.append("name",name)
        formData.append("address",address)
        formData.append("details",details)
        formData.append("booking_price",bookingPrice)
        formData.append("facilities",facilities)
        formData.append("rules",rules)
        formData.append("rating",rating)
        formData.append("location",location)
        formData.append("number_of_rooms",numberOfRooms)
        formData.append("room_types",roomType)
        images.forEach((image)=>{
            formData.append('uploaded_images',image)
        })
        try{
            setIsLoading(true)
            const add_hotel_request = await fetch(`${VITE_REQUEST_URL}hotel/list/`,{method:"POST",headers:{'Authorization':`Token ${token}`},
                body:formData
                })
            if (add_hotel_request.ok){
              setIsLoading(false)
              const add_hotel_response = await add_hotel_request.json()
              toast.success("Successfully added a new hotel.")
            }else{
              setIsLoading(false)
              const error_response = await add_hotel_request.json();
              toast.error(`Error:${error_response}`)
            }

        }catch(e){
            setIsLoading(false)
            console.log(e)
            toast.error("An unexpected error occurred!");
        }
        // console.log({
        //     "name":name,
        //     "address":address,
        //     "details":details,
        //     "booking_price":bookingPrice,
        //     "facilities":facilities,
        //     "rules":rules,
        //     "rating":rating,
        //     "location":location,
        //     "numberOfRoomes":numberOfRooms,
        //     "images":images
        // })
    }
    return (
<div>
  {/* component */}
  <Toaster/>
  <section className="max-w-4xl p-6 mx-auto bg-indigo-600 rounded-md shadow-md dark:bg-gray-800 mt-20">
    <h1 className="text-xl font-bold text-white capitalize dark:text-white text-center">ADD HOTEL</h1>
    <form onSubmit={(e)=>handleSubmit(e)}>
      <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
        <div>
          <label className="text-white dark:text-gray-200 font-bold" htmlFor="name">Hotel Name</label>
          <input onChange={(e)=>setName(e.target.value)} value={name} required id="name" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
        </div>
        <div>
          <label className="text-white dark:text-gray-200 font-bold" htmlFor="Address">Address</label>
          <input onChange={(e)=>setAddress(e.target.value)} value={address} required id="Address" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
        </div>
        <div>
          <label className="text-white dark:text-gray-200 font-bold" htmlFor="details">Details</label>
          <textarea onChange={(e)=>setDetails(e.target.value)} value={details} required id="details" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
        </div>
        <div>
          <label className="text-white dark:text-gray-200 font-bold" htmlFor="bookingPrice">Booking Price</label>
          <input onChange={(e)=>setBookingPrice(e.target.value)} value={bookingPrice} required id="bookingPrice" type="number" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
        </div>
        <div>
          <label className="text-white font-bold dark:text-gray-200" htmlFor="facilities">Facilities</label>
          <textarea required onChange={(e)=>setFacilities(e.target.value)} value={facilities} id="facilities" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
        </div>
        <div>
          <label className="text-white font-bold dark:text-gray-200" htmlFor="rules">Rules</label>
          <textarea onChange={(e)=>setRules(e.target.value)} value={rules} required id="rules" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
        </div>
          <div>
              <label class="text-white dark:text-gray-200 font-bold" for="rating">Rating</label>
              <select onChange={(e)=>setRating(e.target.value)} value={rating} required id="rating" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                  <option>🌟</option>
                  <option>🌟🌟</option>
                  <option>🌟🌟🌟</option>
                  <option>🌟🌟🌟🌟</option>
                  <option>🌟🌟🌟🌟🌟</option>
              </select>
            </div>
        <div>
          <label className="text-white dark:text-gray-200 font-bold" htmlFor="location">Location</label>
          <input onChange={(e)=>setLocation(e.target.value)} value={location} required id="location" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" defaultValue={""} />
        </div>
        <div>
          <label className="text-white dark:text-gray-200 font-bold" htmlFor="numberOfRooms">Number Of Rooms</label>
          <input onChange={(e)=>setNumberOfRooms(e.target.value)} value={numberOfRooms} required id="numberOfRooms" type="number" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
        </div>
        <div>
          <label className="text-white dark:text-gray-200 font-bold" htmlFor="roomType">Room Type</label>
          <input onChange={(e)=>setRoomType(e.target.value)} value={roomType} required id="roomType" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" defaultValue={""} />
        </div>
        <div className="border-dashed border-2 justify-center flex gap-2 flex-wrap">
            {images?.map((item,index)=>{
                const isFile = item instanceof File;
                const image = isFile ? URL.createObjectURL(item) : "";
                return (<img width={200} height={200} key={index} src={image}/>)
          })}
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
                    setImages(files)
                  }} accept="image/*" required multiple id="file-upload" name="file-upload" type="file" className="sr-only" />
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
          ):("Add")}
        </button>
      </div>
    </form>
  </section>
</div>

    )
}
export default AddHotel

