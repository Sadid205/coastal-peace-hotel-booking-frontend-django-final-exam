import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
const BestRoomDetails = ()=>{
    const {room_id} = useParams()
    const [roomData,setRoomData] = useState({})
    const token = localStorage.getItem("Token")
    const [imageUrl,setImageUrl] = useState("") 

    useEffect(()=>{
        const getBestRoomData = async()=>{
            const request = await fetch(`https://cph-hotel-booking.vercel.app/hotel/best_rooms/${room_id}/`,{method:"GET",headers:{'Authorization':`Token ${token}`,'Content-Type':'application/json'}})
            const response = await request.json()
            if(response){
                setRoomData(response)
            }
            {response&&response.images&&response.images.length>0?(
                setImageUrl(response.images[0])
            ):("")}
        }

        if(room_id){
            getBestRoomData()
        }

    },[room_id,token])
    
    // console.log(roomData)

    const changeImage = (src)=>{
        setImageUrl(src)
    }


    return (
        <div className="bg-gray-100">
  <div className="container mx-auto px-4 py-8">
    <div className="flex flex-wrap -mx-4">
      {/* Product Images */}
      <div className="w-full md:w-1/2 px-4 mb-8">
        <img src={imageUrl} alt="Product" className="w-full h-auto rounded-lg shadow-md mb-4" id="mainImage" />
        <div className="flex gap-4 py-4 justify-center overflow-x-auto">
            {
            roomData && roomData.images && roomData.images.length>0?(
                roomData.images.map((image,index)=>{
                    return <img key={index} src={image} alt="Thumbnail 1" className="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"  onClick={()=>{changeImage(image)}} />
                })
            ):("")
            }
        </div>
      </div>
      {/* Product Details */}
      <div className="w-full md:w-1/2 px-4">
        <h2 className="text-3xl font-bold mb-2">{roomData&&roomData.room_name}</h2>
        <p className="text-gray-600 mb-4">Room Size: {roomData&&roomData.size}</p>
        <div className="mb-4">
          <span className="text-2xl font-bold mr-2">${roomData&&roomData.price}</span>
          {/* <span className="text-gray-500 line-through">$399.99</span> */}
        </div>
        <div className="flex items-center mb-4">
            {roomData&&roomData.rating}
        </div>
        <p className="text-gray-700 mb-6">{roomData&&roomData.description}</p>
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Capacity:{roomData&&roomData.capacity}</h3>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Amenities:</h3>
            <div className="overflow-x-auto flex">
             {
              roomData&&roomData.amenities&&roomData.amenities.map((amenity,index)=>{
                return <div key={index} className="w-32 text-center">
                  <img width={200} className="" src={amenity&&amenity.image} alt="amenities" />
                  <h4 className="font-semibold text-gray-700">{amenity&&amenity.name.slice(0,17)}</h4>
                </div>
              })
             }
            </div>
        </div>
      </div>
    </div>
  </div>
</div>

    )
}


export default BestRoomDetails;


