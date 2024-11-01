import { useEffect, useState } from "react"
import toast,{ Toaster } from "react-hot-toast";

const SelectFeedBack = ()=>{
    const [reviews,setReviews] = useState()
    const [searchValue,setSearchValue] = useState("")
    const token = localStorage.getItem("Token")
    const [feedbackName,setFeedBackName] = useState("")
    const [selectedReview,setSelectedReview] = useState([])
    useEffect(()=>{
        const getReview = async()=>{
            const request = await fetch(`https://cph-hotel-booking.vercel.app/reviews/list/`,{method:"GET",headers:{'Authorization':`Token ${token}`,'Content-Type':'application/json'}})
            const response = await request.json()
            if(response){
                setReviews(response)
            }
        }
        if(token){
            getReview()
        }
    },[token])
  
    const handleCreateFeedback = async (e)=>{
        e.preventDefault()
        const formData = new FormData()
        formData.append("review_list",selectedReview)
        formData.append("feedback_name",feedbackName)
        const request =  await fetch('https://cph-hotel-booking.vercel.app/hotel/feedback/',{method:"POST",headers:{'Authorization':`Token ${token}`},
            body:formData
        })
        const response = await request.json()
        // console.log(response)
        if(response){
            toast.success("Successfully created a feedback!")
        }
    }
    return (
        <div className=" h-screen">
              <Toaster/>
           <form onSubmit={(e)=>handleCreateFeedback(e)} className="md:flex">
                <div  style={{
                        boxShadow: 'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px'
                        }} className="md:w-1/5 p-4 m-auto">
                    <label htmlFor="feedback_name" className="font-bold">FeedBack Name</label>
                    <input type="text" id="feedback_name" name="feedback_name" value={feedbackName} onChange={(e)=>{setFeedBackName(e.target.value)}} placeholder="FeedBack Name" className="py-2 px-4 bg-gray-500 w-full text-white rounded-md focus:outline-none mb-4" required />
                    <button type="submit" className="bg-gray-700 mt-3 py-2 px-4 text-white w-full font-bold rounded-md hover:bg-blue-600 focus:outline-none">Create FeedBack</button>
                </div>
                <div style={{
                        boxShadow: 'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px'
                        }} className=" md:w-3/5 m-auto bg-white border-gray-500  max-h-96 overflow-y-auto">
                    <h1 className="text-gray-900 text-center font-bold text-2xl">Select Hotel</h1>
                    <p className="ms-2"><span className="font-bold">Selected Items : </span><span className="font-semibold">{selectedReview.length}</span></p>
                    {reviews?reviews.map((item,index)=>{
                        if(item.included_feedback==false){
                        return <div onClick={(e)=>{setSelectedReview((prevState)=>{
                            if(!prevState.includes(item.id)){
                                return [...prevState,item.id];
                            }
                            else{
                                return (prevState.filter((id)=> id!==item.id))
                            }
                        })}} key={index} className={`flex border-b border-gray-400 ${selectedReview.some((id)=>id===item.id)?`bg-gray-700 text-white`:""} hover:cursor-pointer p-2 min-w-[800px]`}>
                                    <div className="w-1/5">
                                        <img className="w-full h-full" src={item&&item.images&&item.images.length>0?item.guest_reviewer.image:""} alt="image" />
                                    </div>
                                    <div className="p-2">
                                        <h1><span className="font-bold">Name : </span><span className="font-semibold">{item?item.user_data.first_name:""} {item?item.user_data.last_name:""}</span></h1>
                                        <p><span className="font-bold">Reviews : </span> <span className="font-semibold">{item?item.reviews.slice(0,100):""}</span></p>
                                        <p><span className="font-bold">Rating : </span><span className="font-semibold"> {item.rating==="1"?"⭐":
                                                                                                                        item.rating==="2"?"⭐⭐":
                                                                                                                        item.rating==="3"?"⭐⭐⭐":
                                                                                                                        item.rating==="4"?"⭐⭐⭐⭐":
                                                                                                                        item.rating==="5"?"⭐⭐⭐⭐⭐":"⭐"}</span></p>
                                        <p><span className="font-bold">Date : </span><span className="font-semibold">{item?item.review_date:""}</span></p>
                                    </div>
                                </div>
                        }
                    }):""}
                </div>
           </form>
        </div>
    )
}

export default SelectFeedBack