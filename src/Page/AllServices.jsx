import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const AllServices = ()=>{
    const [services,setServices] = useState([])
    const token = localStorage.getItem("Token")
    const VITE_REQUEST_URL=import.meta.env.VITE_REQUEST_URL
    useEffect(()=>{
        const get_services = async()=>{
            try{
                const services_request = await fetch(`${VITE_REQUEST_URL}hotel/services/`,{method:"GET",headers:{'Authorization':`Token ${token}`,'Content-Type':'application/json'}})
                const services_response = await services_request.json()
                if(services_response){
                    setServices(services_response)
                }
            }catch(e){
                console.log(e)
            }
        }
        if(token){
            get_services()
        }
    },[token])
    return (
        <div className="w-5/6 m-auto">
            <h1 className="font-bold text-xl text-center text-gray-600">All Services</h1>
            <div className="flex flex-wrap justify-center gap-2 mt-4">
            {
                services && services.length>0?(
                    services.map((service,index)=>{
                    // console.log(services)
                    {service.image && service.images.length>0?(
                        service.images[0]
                    ):("")}
                    return <Link key={index} to={`/service_details/${service.id}`}>
                        <div>
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
    )
}


export default AllServices