import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast,{ Toaster } from "react-hot-toast";

const EditReviewPage=()=>{
    const {review_id,hotel_id,guestId} = useParams()
    const user_id = localStorage.getItem("user_id")
    const token = localStorage.getItem("Token")
    const [review,setReview] = useState({})
    useEffect(()=>{
       const getReviewData= async()=>{
        const user_review = await fetch(`https://coastal-peace-hotel-booking.onrender.com/reviews/list/${review_id}/`,{method:"GET",headers:{'Authorization':`Token ${token}`,'Content-Type':'application/json'}})
        const review_data = await user_review.json()
        setReview(review_data)
       }
       if(review_id && user_id && token){
        getReviewData()
       }
    },[review_id,user_id,token])
    const handleEvent = (e)=>{
        e.preventDefault()
        setReview({
            ...review,
            [e.target.name]:e.target.value
        })
    }
    const updateReview = async(e)=>{
        e.preventDefault()
        const updateRequest =  await fetch(`https://coastal-peace-hotel-booking.onrender.com/reviews/list/${review_id}/`,{method:"PUT",headers:{'Authorization':`Token ${token}`,'Content-Type':'application/json'},
            body:JSON.stringify({
                hotel:hotel_id,
                reviewer:guestId,
                reviews:review.reviews,
                rating:review.rating
                })
            })
        const updatedData = await updateRequest.json()
        if(updatedData){
          toast.success("You have successfully updated your reviews.")
        }
        
    }
    return (
  <>
  <div><Toaster/></div>
    <section className="box-border flex items-center justify-center min-h-screen bg-gray-100">
  <div className="bg-[#dfa674] rounded-2xl flex max-w-3xl p-5 items-center">
    <div className="px-8 md:w-1/2">
      <h2 className="font-bold text-3xl text-[#002D74]">Edit Reviews</h2>
      <form  onSubmit={updateReview} className="flex flex-col gap-4">
        <textarea required onChange={(e)=>handleEvent(e)} value={review.reviews} className="p-2 mt-8 border rounded-xl" type="text" name="reviews" placeholder="" />
        <div className="relative">
        <select name="rating" value={review.rating} onChange={(e)=>handleEvent(e)} className="w-full p-2 border rounded-xl">
            <option value="1">⭐</option>
            <option value="2">⭐⭐</option>
            <option value="3">⭐⭐⭐</option>
            <option value="4">⭐⭐⭐⭐</option>
            <option value="5">⭐⭐⭐⭐⭐</option>
        </select>
        </div>
        <button className="bg-[#002D74] text-white py-2 rounded-xl hover:scale-105 duration-300 hover:bg-[#206ab1] font-medium" type="submit">Update Review</button>
      </form>
    </div>
    <div className="hidden w-1/2 md:block">
      <img className="rounded-2xl max-h-[1600px]" src="https://images.unsplash.com/photo-1552010099-5dc86fcfaa38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxmcmVzaHxlbnwwfDF8fHwxNzEyMTU4MDk0fDA&ixlib=rb-4.0.3&q=80&w=1080" alt="login form image" />
    </div>
  </div>
</section>
</>
    )
}

export default EditReviewPage;


