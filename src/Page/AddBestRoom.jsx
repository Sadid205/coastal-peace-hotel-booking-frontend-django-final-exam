import { useEffect, useState } from "react";
import toast,{ Toaster } from "react-hot-toast";
const AddBestRoom=()=>{
    const [images,setImages] = useState([])
    const [tempUrls,setTempUrls] = useState([])
    // const [tempLocationUrl,setTempLocationUrl] = useState("")
    const [amenities,setAmenities] = useState([
        {
            name:'',
            image:''
        }
    ])
    const [roomName,setRoomName] = useState("")
    const [roomSize,setRoomSize] = useState("")
    const [roomCapacity,setRoomCapacity] = useState("")
    const [roomPrice,setRoomPrice] = useState("")
    const [roomDescription,setRoomDescription] = useState("")
    const [roomLocation,setRoomLocation] = useState("")
    const [rating,setRating] = useState()
    const token = localStorage.getItem("Token")
    const VITE_REQUEST_URL=import.meta.env.VITE_REQUEST_URL

    // const [bodyData,setBodyData] = useState({
    //     room_name: "",
    //     size: "",
    //     capacity: "",
    //     price: "",
    //     images: [],
    //     description: "",
    //     location: "",
    //     amenity: [
    //         {
    //             name:"",
    //             image:""
    //         }
    //     ]
    // })

    const uploadImageToImgbb = async(file)=>{
        const API_KEY = import.meta.env.VITE_IMGBB_API_KEY
        const formData = new FormData();
        formData.append('image',file)
        try{
            const request = await fetch(`https://api.imgbb.com/1/upload?key=${API_KEY}`,{method:"POST",body:formData})
            const response = await request.json()
            if(response.success){
                return response.data.url
            }else{
                console.error("Image upload failed!")
            }
        }catch(e){
            console.error("Error uploading image:",e)
        }
    }

    const HandleUpload = async (e)=>{
        e.preventDefault()
        const uploadImagesPromises = images?.map(async(item)=>{
            if (item instanceof File){
                const imgURL = await uploadImageToImgbb(item)
                setTempUrls((prevUrls)=>[...prevUrls,imgURL])
            }
        })

        const updatedAmenities = await Promise.all(amenities.map(async (amenity)=>{
            if (amenity.image instanceof File){
                const imageUrl = await uploadImageToImgbb(amenity.image)
                return {...amenity,image:imageUrl}
            }
            return amenity
        }))

        if(roomLocation instanceof File){
            const imageURL = await uploadImageToImgbb(roomLocation)
            setRoomLocation(imageURL)
        }

        
        await Promise.all([...uploadImagesPromises]);
        setAmenities(updatedAmenities)
    }
   useEffect(()=>{
        const updateDatabase = async()=>{
            const formData = new FormData()
            const json_image_data = JSON.stringify(tempUrls)
            const json_amenities_data = JSON.stringify(amenities)
            formData.append("room_name",roomName)
            formData.append("size",roomSize)
            formData.append("capacity",roomCapacity)
            formData.append("price",roomPrice)
            formData.append("images",json_image_data)
            formData.append("description",roomDescription)
            formData.append("location",roomLocation)
            formData.append("amenities",json_amenities_data)
            formData.append("rating",rating)
            const request = await fetch(`${VITE_REQUEST_URL}hotel/best_rooms/`,{method:"POST",headers:{'Authorization':`Token ${token}`},
                body:formData
            })
            const response = await request.json()
            console.log(response)
            if(response){
                toast.success("Successfully added best room.")
            }
        }
    const isValidUrl = (string)=>{
        try{
            new URL(string);
            return true
        }catch(_){
            return false
        }
    };
    if(tempUrls && tempUrls.length>0 && isValidUrl(roomLocation) && amenities.every((amenity)=>isValidUrl(amenity.image))){
        console.log("here")
        updateDatabase()
        // console.log({
        //     "room_name": roomName,
        //     "size": roomSize,
        //     "capacity": roomCapacity,
        //     "price": roomPrice,
        //     "images": images,
        //     "description": roomDescription,
        //     "location": roomLocation,
        //     "amenity": amenities,
        //     "rating":rating
        // })
    }
   },[tempUrls,amenities,roomLocation])
   
    const handleChange = (e,index) =>{
        const {name,value,files} = e.target
        const updatedAmenities = [...amenities]
        if (name==="image"){
            updatedAmenities[index][name] = files[0]
        }else{
            updatedAmenities[index][name] = value
        }
        setAmenities(updatedAmenities)
    }
    const addAmenity = ()=>{
        console.log("add")
        setAmenities([...amenities,{name:'',image:''}])
        // console.log(amenities)
    }
    return (
        // <!-- component -->

        <div>
              <Toaster/>
            <div className="bg-gray-900 overflow-y-auto h-screen flex flex-col items-center justify-center text-center">
                <div className="border  max-h-96 overflow-y-auto border-2 flex items-center flex-wrap gap-2 justify-center border-dashed w-5/6 border-gray-500">
                    {
                        roomLocation instanceof File && (
                            <img src={URL.createObjectURL(roomLocation)} height={300} width={300} alt="location"/>
                        )
                    }
                    {
                        amenities?.map((item,index)=>{
                            const isFile = item.image instanceof File
                            if(isFile){
                                const image = URL.createObjectURL(item.image)
                                return <img key={index} src={image} height={300} width={300} alt="amenity" />
                            }
                        })
                    }
                    {
                        images?.map((item,index)=>{
                            const isFile = item instanceof File;
                            if(isFile){
                                const image = URL.createObjectURL(item);
                                return <img key={index} src={image} height={300} width={300} alt="banner" />
                            }
                            return null
                        })
                        
                    }
                </div>
                <div className="text-white">
                    <h1 className="text-4xl font-bold">Add Room</h1>
                </div>
                <div className="mt-8 w-full">
                    <form onSubmit={(e)=>HandleUpload(e)} method="post" className="md:flex">
                        <div className="w-1/2 m-auto">
                        <div className="flex flex-col text-left md:w-4/5 m-auto">
                            <label htmlFor="room_name" className="font-bold text-white">Room Name</label>
                            <input type="text" id="room_name" value={roomName} onChange={(e)=>setRoomName(e.target.value)} name="room_name" placeholder="Room Name" className="py-2 px-4 bg-gray-800 w-full text-white rounded-md focus:outline-none mb-4" required />
                        </div>
                       <div className="flex flex-col text-left md:w-4/5 m-auto">
                            <label htmlFor="size" className="font-bold text-left text-white">Room Size</label>
                            <input type="text" id="size" value={roomSize} onChange={(e)=>setRoomSize(e.target.value)}name="size" placeholder="Room Size" className="py-2 px-4 bg-gray-800 w-full text-white rounded-md focus:outline-none mb-4" required />
                       </div>
                       <div className="flex flex-col text-left md:w-4/5 m-auto">
                            <label htmlFor="capacity" className="font-bold text-left text-white">Room Capacity</label>
                            <input type="text" id="capacity" value={roomCapacity} onChange={(e)=>setRoomCapacity(e.target.value)} name="capacity" placeholder="Room Capacity" className="py-2 px-4 bg-gray-800 w-full text-white rounded-md focus:outline-none mb-4" required />
                       </div>
                       <div className="flex flex-col text-left md:w-4/5 m-auto">
                            <label htmlFor="price" className="font-bold text-left text-white">Price</label>
                            <input type="number" id="price" value={roomPrice} onChange={(e)=>setRoomPrice(e.target.value)} name="price" placeholder="Price" className="py-2 px-4 bg-gray-800 w-full text-white rounded-md focus:outline-none mb-4" required />
                       </div>
                       <div className="flex flex-col text-left md:w-4/5 m-auto">
                            <label htmlFor="description" className="font-bold text-left text-white">Room Description</label>
                            <textarea id="description" value={roomDescription} onChange={(e)=>setRoomDescription(e.target.value)} name="description" placeholder="Room Description" className="py-2 px-4 bg-gray-800 w-full text-white rounded-md focus:outline-none mb-4" required />
                       </div>
                        </div>
                        <div className="w-1/2 m-auto">
                            <div className="flex flex-col text-left md:w-4/5 m-auto">
                            <label class="text-white dark:text-gray-200 font-bold" for="rating">Rating</label>
                            <select onChange={(e)=>setRating(e.target.value)} value={rating} required id="rating" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                                <option>🌟</option>
                                <option>🌟🌟</option>
                                <option>🌟🌟🌟</option>
                                <option>🌟🌟🌟🌟</option>
                                <option>🌟🌟🌟🌟🌟</option>
                            </select>
                            </div>
                            <div className="flex flex-col text-left md:w-4/5 m-auto">
                                <label htmlFor="location" className="font-bold text-left text-white">Room Location</label>
                                <input type="file" accept="image/*" id="location" onChange={(e)=>setRoomLocation(e.target.files[0])} name="location" placeholder="Room Location" className="py-2 px-4 bg-gray-800 w-full text-white rounded-md focus:outline-none mb-4" required />
                            </div>
                            <div className="flex justify-between md:w-4/5 m-auto p-3">
                                <button className="text-white font-bold">Total Amenity : {amenities?amenities.length:""}</button>
                                <button onClick={addAmenity} className="text-white text-3xl font-bold bg-transparent">+</button>
                            </div>
                           <div className="overflow-y-auto max-h-36">
                                {amenities?.map((amenity,index)=>{
                                    return <div key={index} className="border-b-2 border-white">
                                        <div className="flex flex-col text-left md:w-4/5 m-auto">
                                            <label htmlFor="amenity" className="font-bold text-left text-white">Amenity Name</label>
                                            <input type="text" id="amenity" value={amenity.name} onChange={(e)=>handleChange(e,index)} name="name" placeholder="Amenity Name" className="py-2 px-4 bg-gray-800 w-full text-white rounded-md focus:outline-none mb-4" required />
                                        </div>
                                        <div className="flex flex-col text-left md:w-4/5 m-auto">
                                            <label htmlFor="amenity_image" className="font-bold text-left text-white">Amenity Image</label>
                                            <input type="file" id="amenity_image" onChange={(e)=>handleChange(e,index)} name="image" placeholder="Amenity Image" className="py-2 px-4 bg-gray-800 w-full text-white rounded-md focus:outline-none mb-4" required />
                                        </div>
                                    </div>
                                })}
                           </div>
                        {/* <!-- component --> */}
                            <div className="flex flex-col text-left md:w-4/5 m-auto">
                                <div className="border border-dashed border-gray-500 h-20 mt-2 relative">
                                    <input onChange={(e)=>{
                                        const files = Array.from(e.target.files)
                                        // console.log(files)
                                        setImages(files)
                                    }} type="file" accept="image/*" multiple className="cursor-pointer relative block opacity-0 w-full h-full p-10 z-50"/>
                                    <div className="text-center p-2 absolute top-0 right-0 left-0 m-auto text-white">
                                        <h4>
                                            Drop files anywhere to upload
                                            <br/>or
                                        </h4>
                                        <p className="">Select Files</p>
                                    </div>
                                </div>                  
                            </div>      
                            <div className="flex flex-col text-left md:w-4/5 m-auto">
                                <button type="submit" className="bg-blue-500 mt-3 py-2 px-4 text-white rounded-md hover:bg-blue-600 focus:outline-none">Add Room</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        
    )
}

export default AddBestRoom;