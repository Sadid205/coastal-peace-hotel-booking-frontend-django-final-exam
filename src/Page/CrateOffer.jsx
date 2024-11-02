import { useEffect, useState } from "react"
import toast,{ Toaster } from "react-hot-toast";

const CreateOffer = ()=>{
    const [hotel,setHotel] = useState()
    const [searchValue,setSearchValue] = useState("")
    const token = localStorage.getItem("Token")
    const [offerName,setOfferName] = useState("")
    const [discount,setDiscount] = useState("")
    const [selectedHotel,setSelectedHotel] = useState([])
    useEffect(()=>{
        const getHotel = async()=>{
            const request = await fetch(`https://cph-hotel-booking.vercel.app/hotel/list/?search=${searchValue}`,{method:"GET",headers:{'Authorization':`Token ${token}`,'Content-Type':'application/json'}})
            const response = await request.json()
            if(response){
                setHotel(response?.results)
            }
        }
        if(token){
            getHotel()
        }
    },[token])
    // {item&&item.images&&item.images.length>0?item.images[0].image:""}
    // console.log(hotel[0].images[0].image)
    // console.log(offerName,discount,selectedHotel)
    const handleCreateOffer = async (e)=>{
        e.preventDefault()
        const formData = new FormData()
        formData.append("offer_name",offerName)
        formData.append("discount",discount)
        selectedHotel.forEach(hotel=>{
            formData.append("hotel_list",hotel)
        })
        const request =  await fetch('https://cph-hotel-booking.vercel.app/special_offer/list/',{method:"POST",headers:{'Authorization':`Token ${token}`},
            body:formData
        })
        const response = await request.json()
        if(response){
            toast.success("Successfully created an Offer!")
        }
    }
    // console.log(hotel)
    return (
        <div className=" h-screen">
              <Toaster/>
           <form onSubmit={(e)=>handleCreateOffer(e)} className="md:flex">
                <div  style={{
                        boxShadow: 'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px'
                        }} className="md:w-1/5 p-4 m-auto">
                    <label htmlFor="offer_name" className="font-bold">Offer Name</label>
                    <input type="text" id="offer_name" name="offer_name" value={offerName} onChange={(e)=>{setOfferName(e.target.value)}} placeholder="Offer Name" className="py-2 px-4 bg-gray-500 w-full text-white rounded-md focus:outline-none mb-4" required />
                    <label htmlFor="discount" className="font-bold">Discount %</label>
                    <input type="number" value={discount} onChange={(e)=>{setDiscount(e.target.value)}} id="discount"  name="discount" placeholder="30" className="py-2 px-4 bg-gray-500 w-full text-white rounded-md focus:outline-none mb-4" required />
                    <button type="submit" className="bg-gray-700 mt-3 py-2 px-4 text-white w-full font-bold rounded-md hover:bg-blue-600 focus:outline-none">Create Offer</button>
                </div>
                <div style={{
                        boxShadow: 'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px'
                        }} className=" md:w-3/5 m-auto bg-white border-gray-500  max-h-96 overflow-y-auto">
                    <h1 className="text-gray-900 text-center font-bold text-2xl">Select Hotel</h1>
                    <p className="ms-2"><span className="font-bold">Selected Items : </span><span className="font-semibold">{selectedHotel.length}</span></p>
                    {hotel?hotel.map((item,index)=>{
                        if(item.offer_price==null && item.included_category==false){
                        return <div onClick={(e)=>{setSelectedHotel((prevState)=>{
                            if(!prevState.includes(item.id)){
                                return [...prevState,item.id];
                            }
                            else{
                                return (prevState.filter((id)=> id!==item.id))
                            }
                        })}} key={index} className={`flex border-b border-gray-400 ${selectedHotel.some((id)=>id===item.id)?`bg-gray-700 text-white`:""} hover:cursor-pointer p-2 min-w-[800px]`}>
                                    <div className="w-1/5">
                                        <img className="w-full h-full" src={item&&item.images&&item.images.length>0?item.images[0].image:""} alt="image" />
                                    </div>
                                    <div className="p-2">
                                        <h1><span className="font-bold">Name : </span><span className="font-semibold">{item?item.name:""}</span></h1>
                                        <p><span className="font-bold">Details : </span> <span className="font-semibold">{item?item.details.slice(0,100):""}</span></p>
                                        <p><span className="font-bold">Location : </span><span className="font-semibold">{item?item.location:""}</span></p>
                                        <p><span className="font-bold">Price : </span><span className="font-semibold">{item?item.booking_price:""}</span></p>
                                        <p><span className="font-bold">Rating : </span>{item?item.rating:""}</p>
                                    </div>
                                </div>
                        }
                    }):""}
                </div>
           </form>
        </div>
    )
}

export default CreateOffer