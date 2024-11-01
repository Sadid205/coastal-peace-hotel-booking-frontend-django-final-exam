import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
const ServiceDetails = ()=>{
    const {service_id} = useParams()
    const [servicesData,setServicesData] = useState({})
    const token = localStorage.getItem("Token")
    const [imageUrl,setImageUrl] = useState("") 

    useEffect(()=>{
        const getServicesData = async()=>{
            const request = await fetch(`https://cph-hotel-booking.vercel.app/hotel/services/${service_id}/`,{method:"GET",headers:{'Authorization':`Token ${token}`,'Content-Type':'application/json'}})
            const response = await request.json()
            if(response){
                setServicesData(response)
            }
            {response&&response.images&&response.images.length>0?(
                setImageUrl(response.images[0])
            ):("")}
        }

        if(service_id){
            getServicesData()
        }

    },[service_id,token])
    
    console.log(servicesData)

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
            servicesData && servicesData.images && servicesData.images.length>0?(
                servicesData.images.map((image,index)=>{
                    return <img key={index} src={image} alt="Thumbnail 1" className="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"  onClick={()=>{changeImage(image)}} />
                })
            ):("")
            }
        </div>
      </div>
      {/* Product Details */}
      <div className="w-full md:w-1/2 px-4">
        <h2 className="text-3xl font-bold mb-2">{servicesData&&servicesData.service_name}</h2>
        <div className="mb-4">
          <span className="text-2xl font-bold mr-2">${servicesData&&servicesData.price}</span>
        </div>
        <div className="flex items-center mb-4">
        </div>
        <p className="text-gray-700 mb-6">{servicesData&&servicesData.description}</p>
        <div className="mb-6">
        </div>
      </div>
    </div>
  </div>
</div>

    )
}


export default ServiceDetails;


