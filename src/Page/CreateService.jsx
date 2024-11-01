import { useEffect, useState } from "react";
import toast,{ Toaster } from "react-hot-toast";
const CreateService=()=>{
    const [images,setImages] = useState([])
    const [serviceName,setServiceName] = useState("")
    const [price,setPrice] = useState("")
    const [description,setDescription] = useState("")
    const token = localStorage.getItem("Token")

    const updateDatabase = async()=>{
        const formData = new FormData()
        const json_image_data = JSON.stringify(tempUrls)
        formData.append("service_name",serviceName)
        formData.append("images",json_image_data)
        formData.append("price",price)
        formData.append("description",description)
        const request = await fetch('https://cph-hotel-booking.vercel.app/hotel/services/',{method:"POST",headers:{'Authorization':`Token ${token}`},
            body:formData
        })
        const response = await request.json()
        console.log(response)
        if(response){
            toast.success("Successfully added banners")
        }
    }

    const HandleUpload = async (e)=>{
        e.preventDefault()
        const API_KEY = import.meta.env.VITE_IMGBB_API_KEY
        const tempUrls = []
        const uploadImagesPromises = images?.map(async(item)=>{
            if (item instanceof File){
                const formData = new FormData();
                formData.append("image",item);

                try{
                    const response = await fetch(`https://api.imgbb.com/1/upload?key=${API_KEY}`,{method:"POST",body:formData,})
                    const result = await response.json()
                    if (result.success){
                        const imageUrl = result.data.url;
                        tempUrls.push(imageUrl)
                    } else{
                        console.error("Image upload failed")
                    }
                }catch(e){
                    console.error("Error uploading image:",e)
                }
            }
        })

        const updateDatabase = async()=>{
            const formData = new FormData()
            const json_image_data = JSON.stringify(tempUrls)
            formData.append("service_name",serviceName)
            formData.append("images",json_image_data)
            formData.append("price",price)
            formData.append("description",description)
            const request = await fetch('https://cph-hotel-booking.vercel.app/hotel/services/',{method:"POST",headers:{'Authorization':`Token ${token}`},
                body:formData
            })
            const response = await request.json()
            // console.log(response)
            if(response){
                toast.success("Successfully added banners")
            }
        }
        await Promise.all(uploadImagesPromises);
        await updateDatabase()
    }
    return (
        // <!-- component -->
        <div>
              <Toaster/>
            <div className="bg-gray-900 h-screen flex flex-col items-center justify-center text-center">
                <div className="border  max-h-96 overflow-y-auto border-2 flex items-center flex-wrap gap-2 justify-center border-dashed w-5/6 border-gray-500">
                    {
                        images?.map((item,index)=>{
                            const isFile = item instanceof File;
                            const image = isFile? URL.createObjectURL(item) : "";
                            return <img key={index} src={image} height={300} width={300} alt="banner" />
                        })
                    }
                </div>
                <div className="text-white">
                    <h1 className="text-4xl font-bold">Create Services</h1>
                </div>
                <div className="mt-8">
                    <form onSubmit={(e)=>HandleUpload(e)} method="post" className="flex flex-col items-center">
                        <div className="w-4/5 m-auto flex flex-col">
                            <label htmlFor="service_name" className="text-left font-bold text-white">Service Name</label>
                            <input type="text" value={serviceName} onChange={(e)=>setServiceName(e.target.value)} id="service_name" name="service_name" placeholder="Service Name" className="py-2 px-4 bg-gray-800 w-full text-white rounded-md focus:outline-none mb-4" required />
                        </div>
                        <div className="w-4/5 m-auto flex flex-col">
                            <label htmlFor="price" className="font-bold text-left text-white">Price</label>
                            <input type="number" value={price} onChange={(e)=>setPrice(e.target.value)} id="price" name="price" placeholder="Price" className="py-2 px-4 bg-gray-800 w-full text-white rounded-md focus:outline-none mb-4" required />
                        </div>
                        <div className="w-4/5 m-auto flex flex-col">
                            <label htmlFor="description" className="text-left font-bold text-white">Description</label>
                            <textarea type="text" value={description} onChange={(e)=>setDescription(e.target.value)} id="description" name="description" placeholder="Description" className="py-2 px-4 bg-gray-800 w-full text-white rounded-md focus:outline-none mb-4" required />
                        </div>
                        {/* <!-- component --> */}
                            <div className="border border-dashed border-gray-500 relative">
                                <input onChange={(e)=>{
                                    const files = Array.from(e.target.files)
                                    // console.log(files)
                                    setImages(files)
                                }} type="file" accept="image/*" multiple className="cursor-pointer relative block opacity-0 w-full h-full p-20 z-50"/>
                                <div className="text-center p-10 absolute top-0 right-0 left-0 m-auto text-white">
                                    <h4>
                                        Drop files anywhere to upload
                                        <br/>or
                                    </h4>
                                    <p className="">Select Files</p>
                                </div>
                            </div>                        
                        <button type="submit" className="bg-blue-500 mt-3 py-2 px-4 text-white rounded-md hover:bg-blue-600 focus:outline-none font-bold">Craete Service</button>
                    </form>
                </div>
            </div>
        </div>
        
    )
}


export default CreateService;