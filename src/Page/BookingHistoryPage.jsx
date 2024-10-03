import { useEffect, useState } from "react";
import { RxCrossCircled } from "react-icons/rx";
import toast,{ Toaster } from "react-hot-toast";
function BookingHistoryPage(){
    const date = new Date().toJSON().slice(0,10)
    const [guestId,setGuestId] = useState("")
    const [bookingHistory,setBookingHistory] = useState({})
    const [bookingStatus,setBookingStatus] = useState("Checked-in")
    const [showModal, setShowModal] = useState({bookedId:"",is_show:false});
    const [isLoading,setIsLoading] = useState(false)
    const [isChangeResponse,setIsChangeResponse] = useState(false)
    const user_id = localStorage.getItem("user_id")
    const token = localStorage.getItem("Token")
    useEffect(()=>{
            const getGuestAccount=async()=>{
                try{
                const guestAccount = await fetch(`https://cph-hotel-booking.vercel.app/guest/list/?user_id=${user_id}`,{method:"GET",headers:{'Authorization':`Token ${token}`,'Content-Type':'application/json'}})
                const guestData = await guestAccount.json()
                setGuestId(guestData[0].id)
                }
                catch(e){
                console.log(e)
                }
            }
            const getBookingHistory = async()=>{
               try{
                setIsLoading(true)
                const booking_history = await fetch(`https://cph-hotel-booking.vercel.app/booking/list/?guest_id=${guestId}`,{method:"GET",headers:{'Authorization':`Token ${token}`,'Content-Type':'application/json'}})
                const response_data = await booking_history.json()
                if(response_data){
                    setIsLoading(false)
                }
                if (response_data && response_data.length>0){
                    response_data.map((booked_hotel)=>{
                        setBookingHistory(prevState=>({
                            ...prevState,
                            [booked_hotel.id]:booked_hotel
                        }))
                    })
                }
               }catch(e){
                console.log(e)
               }
            }
            if(user_id&&token){
                getGuestAccount()
            }
            if(guestId){
                getBookingHistory()
            }
        
    },[user_id,token,guestId,isChangeResponse])
    const ChangeStatus = async(e)=>{
        e.preventDefault()
        setShowModal({is_show:false})
        if(showModal.bookedId && bookingHistory && Object.keys(bookingHistory).length && bookingHistory[showModal.bookedId]){
            if((bookingHistory[showModal.bookedId].booking_status==="Confirmed" && bookingStatus==="Checked-in")||(bookingHistory[showModal.bookedId].booking_status==="Checked-in" && bookingStatus==="Checked-out")||(bookingHistory[showModal.bookedId].booking_status==="Pending" && bookingStatus==="Cancelled")){
               if(bookingStatus==="Checked-in"){
                try{
                    setIsChangeResponse(true)
                    const change = await fetch(`https://cph-hotel-booking.vercel.app/booking/list/${showModal?.bookedId}/`,{method:"PUT",headers:{'Authorization':`Token ${token}`,'Content-Type':'application/json'},
                        body:JSON.stringify({
                            booking_status:bookingStatus,
                            check_in_date:date,
                            })
                        })
                    const change_response = await change.json()
                    if(change_response){
                        toast.success(`You have successfully ${bookingStatus}.`)
                        setIsChangeResponse(false)
                    }
                }catch(e){
                    console.log(e)
                }
               }else if(bookingStatus==="Checked-out"){
                try{
                    const change = await fetch(`https://cph-hotel-booking.vercel.app/booking/list/${showModal?.bookedId}/`,{method:"PUT",headers:{'Authorization':`Token ${token}`,'Content-Type':'application/json'},
                        body:JSON.stringify({
                            booking_status:bookingStatus,
                            check_out_date:date,
                            })
                        })
                    const change_response = await change.json()
                    setIsChangeResponse(true)
                    if(change_response){
                        toast.success(`You have successfully ${bookingStatus}.`)
                    }
                }catch(e){
                    console.log(e)
                }
               }else{
                try{
                    const change = await fetch(`https://cph-hotel-booking.vercel.app/booking/list/${showModal?.bookedId}/`,{method:"PUT",headers:{'Authorization':`Token ${token}`,'Content-Type':'application/json'},
                        body:JSON.stringify({
                            booking_status:bookingStatus,
                            })
                        })
                    const change_response = await change.json()
                    setIsChangeResponse(true)
                    if(change_response){
                        toast.success(`You have successfully ${bookingStatus} on ${bookingHistory[showModal.bookedId].hotel}.`)
                    }
                }catch(e){
                    console.log(e)
                }
               }
            }else{
                toast.error(`You can not select ${bookingStatus} now!`)
            }
        }else{
            toast.error("Booking history not found!")
        }
       
    }
    return (
        <div className="w-full overflow-x-auto">
        <div><Toaster/></div>
        <h1 className="font-bold text-center">Booking Histories</h1>
            {isLoading?(
            <table className="w-10/12 m-auto">
                 <thead>
                    <tr>
                    <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                        <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">Hotel Name</p>
                    </th>
                    <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                        <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">Booking Account</p>
                    </th>
                    <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                        <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">Booking Date</p>
                    </th>
                    <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                        <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">Booking Status</p>
                    </th>
                    <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                        <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">Booking Id</p>
                    </th>
                    <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                        <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">Checked-In Date</p>
                    </th>
                    <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                        <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">Checked-Out Date</p>
                    </th>
                    <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                        <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">Guest Number</p>
                    </th>
                    <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                        <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">Room Type</p>
                    </th>
                    <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                        <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">Change Booking Status</p>
                    </th>
                    </tr>
                </thead>
               <tbody>
               <tr>
                <td>
                <div className="animate-pulse">
                    <div className="h-4 mt-3 mb-6 bg-gray-200 rounded" />
                    <div className="h-4 mb-6 bg-gray-300 rounded" />
                    <div className="h-4 mb-6 bg-gray-200 rounded" />
                    <div className="h-4 mb-6 bg-gray-300 rounded" />
                    <div className="h-4 mb-6 bg-gray-200 rounded" />
                </div>
                </td>
                <td>
                <div className="animate-pulse">
                    <div className="h-4 mt-3 mb-6 bg-gray-200 rounded" />
                    <div className="h-4 mb-6 bg-gray-300 rounded" />
                    <div className="h-4 mb-6 bg-gray-200 rounded" />
                    <div className="h-4 mb-6 bg-gray-300 rounded" />
                    <div className="h-4 mb-6 bg-gray-200 rounded" />
                </div>
                </td>
                <td>
                <div className="animate-pulse">
                    <div className="h-4 mt-3 mb-6 bg-gray-200 rounded" />
                    <div className="h-4 mb-6 bg-gray-300 rounded" />
                    <div className="h-4 mb-6 bg-gray-200 rounded" />
                    <div className="h-4 mb-6 bg-gray-300 rounded" />
                    <div className="h-4 mb-6 bg-gray-200 rounded" />
                </div>
                </td>
                <td>
                <div className="animate-pulse">
                    <div className="h-4 mt-3 mb-6 bg-gray-200 rounded" />
                    <div className="h-4 mb-6 bg-gray-300 rounded" />
                    <div className="h-4 mb-6 bg-gray-200 rounded" />
                    <div className="h-4 mb-6 bg-gray-300 rounded" />
                    <div className="h-4 mb-6 bg-gray-200 rounded" />
                </div>
                </td>
                <td>
                <div className="animate-pulse">
                    <div className="h-4 mt-3 mb-6 bg-gray-200 rounded" />
                    <div className="h-4 mb-6 bg-gray-300 rounded" />
                    <div className="h-4 mb-6 bg-gray-200 rounded" />
                    <div className="h-4 mb-6 bg-gray-300 rounded" />
                    <div className="h-4 mb-6 bg-gray-200 rounded" />
                </div>
                </td>
                <td>
                <div className="animate-pulse">
                    <div className="h-4 mt-3 mb-6 bg-gray-200 rounded" />
                    <div className="h-4 mb-6 bg-gray-300 rounded" />
                    <div className="h-4 mb-6 bg-gray-200 rounded" />
                    <div className="h-4 mb-6 bg-gray-300 rounded" />
                    <div className="h-4 mb-6 bg-gray-200 rounded" />
                </div>
                </td>
                <td>
                <div className="animate-pulse">
                    <div className="h-4 mt-3 mb-6 bg-gray-200 rounded" />
                    <div className="h-4 mb-6 bg-gray-300 rounded" />
                    <div className="h-4 mb-6 bg-gray-200 rounded" />
                    <div className="h-4 mb-6 bg-gray-300 rounded" />
                    <div className="h-4 mb-6 bg-gray-200 rounded" />
                </div>
                </td>
                <td>
                <div className="animate-pulse">
                    <div className="h-4 mt-3 mb-6 bg-gray-200 rounded" />
                    <div className="h-4 mb-6 bg-gray-300 rounded" />
                    <div className="h-4 mb-6 bg-gray-200 rounded" />
                    <div className="h-4 mb-6 bg-gray-300 rounded" />
                    <div className="h-4 mb-6 bg-gray-200 rounded" />
                </div>
                </td>
                <td>
                <div className="animate-pulse">
                    <div className="h-4 mt-3 mb-6 bg-gray-200 rounded" />
                    <div className="h-4 mb-6 bg-gray-300 rounded" />
                    <div className="h-4 mb-6 bg-gray-200 rounded" />
                    <div className="h-4 mb-6 bg-gray-300 rounded" />
                    <div className="h-4 mb-6 bg-gray-200 rounded" />
                </div>
                </td>
                <td>
                <div className="animate-pulse">
                    <div className="h-4 mt-3 mb-6 bg-gray-200 rounded" />
                    <div className="h-4 mb-6 bg-gray-300 rounded" />
                    <div className="h-4 mb-6 bg-gray-200 rounded" />
                    <div className="h-4 mb-6 bg-gray-300 rounded" />
                    <div className="h-4 mb-6 bg-gray-200 rounded" />
                </div>
                </td>
                </tr>
               </tbody>
            </table>
                
            ):(<table className="w-10/12 m-auto">
                <thead>
                    <tr>
                    <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                        <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">Hotel Name</p>
                    </th>
                    <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                        <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">Booking Account</p>
                    </th>
                    <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                        <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">Booking Date</p>
                    </th>
                    <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                        <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">Booking Status</p>
                    </th>
                    <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                        <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">Booking Id</p>
                    </th>
                    <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                        <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">Checked-In Date</p>
                    </th>
                    <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                        <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">Checked-Out Date</p>
                    </th>
                    <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                        <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">Guest Number</p>
                    </th>
                    <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                        <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">Room Type</p>
                    </th>
                    <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                        <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">Change Booking Status</p>
                    </th>
                    </tr>
                </thead>
                <tbody>
                {bookingHistory && Object.keys(bookingHistory).length>0 ?(Object.entries(bookingHistory).map(([key,booked_hotel])=>(
                     <tr key={key}>
                     <td className="p-4 border-b border-blue-gray-50">
                         <p className="block font-sans text-sm antialiased font-bold leading-normal text-blue-gray-900">{booked_hotel.hotel}</p>
                     </td>
                     <td className="p-4 border-b border-blue-gray-50">
                         <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">{booked_hotel.guest}</p>
                     </td>
                     <td className="p-4 border-b border-blue-gray-50">
                         <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">{booked_hotel.booking_date}</p>
                     </td>
                     <td className="p-4 border-b border-blue-gray-50">
                         <div className="w-max">
                         <div className="relative grid items-center px-2 py-1 font-sans text-xs font-bold text-green-900 uppercase rounded-md select-none whitespace-nowrap bg-green-500/20" style={{opacity: 1}}>
                             <span>{booked_hotel.booking_status}</span>
                         </div>
                         </div>
                     </td>
                     <td className="p-4 border-b border-blue-gray-50">
                         <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">{booked_hotel.booking_id}</p>
                     </td>
                     <td className="p-4 border-b border-blue-gray-50">
                         <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">{booked_hotel.check_in_date?booked_hotel.check_in_date:<RxCrossCircled />}</p>
                     </td>
                     <td className="p-4 border-b border-blue-gray-50">
                         <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">{booked_hotel.check_out_date?booked_hotel.check_out_date:<RxCrossCircled />}</p>
                     </td>
                     <td className="p-4 border-b border-blue-gray-50">
                         <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">{booked_hotel.number_of_guests}</p>
                     </td>
                     <td className="p-4 border-b border-blue-gray-50">
                         <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">Double</p>
                     </td>
                     <td className="p-4 border-b border-blue-gray-50">
                        {((booked_hotel.booking_status==="Confirmed") || (booked_hotel.booking_status==="Pending") ||(booked_hotel.booking_status==="Checked-in"))?(<a className="cursor-pointer" onClick={()=>setShowModal({bookedId:booked_hotel.id,is_show:true})}>
                         <span>
                             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-4 h-4">
                             <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
                             </svg>
                         </span>
                        </a>):(<RxCrossCircled/>)}
                     </td>
                 </tr>
                ))):(
                <tr>
                <td>
                <div className="animate-pulse">
                    <div className="h-4 mt-3 mb-6 bg-gray-200 rounded" />
                    <div className="h-4 mb-6 bg-gray-300 rounded" />
                    <div className="h-4 mb-6 bg-gray-200 rounded" />
                    <div className="h-4 mb-6 bg-gray-300 rounded" />
                    <div className="h-4 mb-6 bg-gray-200 rounded" />
                </div>
                </td>
                <td>
                <div className="animate-pulse">
                    <div className="h-4 mt-3 mb-6 bg-gray-200 rounded" />
                    <div className="h-4 mb-6 bg-gray-300 rounded" />
                    <div className="h-4 mb-6 bg-gray-200 rounded" />
                    <div className="h-4 mb-6 bg-gray-300 rounded" />
                    <div className="h-4 mb-6 bg-gray-200 rounded" />
                </div>
                </td>
                <td>
                <div className="animate-pulse">
                    <div className="h-4 mt-3 mb-6 bg-gray-200 rounded" />
                    <div className="h-4 mb-6 bg-gray-300 rounded" />
                    <div className="h-4 mb-6 bg-gray-200 rounded" />
                    <div className="h-4 mb-6 bg-gray-300 rounded" />
                    <div className="h-4 mb-6 bg-gray-200 rounded" />
                </div>
                </td>
                <td>
                <div className="animate-pulse">
                    <div className="h-4 mt-3 mb-6 bg-gray-200 rounded" />
                    <div className="h-4 mb-6 bg-gray-300 rounded" />
                    <div className="h-4 mb-6 bg-gray-200 rounded" />
                    <div className="h-4 mb-6 bg-gray-300 rounded" />
                    <div className="h-4 mb-6 bg-gray-200 rounded" />
                </div>
                </td>
                <td>
                <div className="animate-pulse">
                    <div className="h-4 mt-3 mb-6 bg-gray-200 rounded" />
                    <div className="h-4 mb-6 bg-gray-300 rounded" />
                    <div className="h-4 mb-6 bg-gray-200 rounded" />
                    <div className="h-4 mb-6 bg-gray-300 rounded" />
                    <div className="h-4 mb-6 bg-gray-200 rounded" />
                </div>
                </td>
                <td>
                <div className="animate-pulse">
                    <div className="h-4 mt-3 mb-6 bg-gray-200 rounded" />
                    <div className="h-4 mb-6 bg-gray-300 rounded" />
                    <div className="h-4 mb-6 bg-gray-200 rounded" />
                    <div className="h-4 mb-6 bg-gray-300 rounded" />
                    <div className="h-4 mb-6 bg-gray-200 rounded" />
                </div>
                </td>
                <td>
                <div className="animate-pulse">
                    <div className="h-4 mt-3 mb-6 bg-gray-200 rounded" />
                    <div className="h-4 mb-6 bg-gray-300 rounded" />
                    <div className="h-4 mb-6 bg-gray-200 rounded" />
                    <div className="h-4 mb-6 bg-gray-300 rounded" />
                    <div className="h-4 mb-6 bg-gray-200 rounded" />
                </div>
                </td>
                <td>
                <div className="animate-pulse">
                    <div className="h-4 mt-3 mb-6 bg-gray-200 rounded" />
                    <div className="h-4 mb-6 bg-gray-300 rounded" />
                    <div className="h-4 mb-6 bg-gray-200 rounded" />
                    <div className="h-4 mb-6 bg-gray-300 rounded" />
                    <div className="h-4 mb-6 bg-gray-200 rounded" />
                </div>
                </td>
                <td>
                <div className="animate-pulse">
                    <div className="h-4 mt-3 mb-6 bg-gray-200 rounded" />
                    <div className="h-4 mb-6 bg-gray-300 rounded" />
                    <div className="h-4 mb-6 bg-gray-200 rounded" />
                    <div className="h-4 mb-6 bg-gray-300 rounded" />
                    <div className="h-4 mb-6 bg-gray-200 rounded" />
                </div>
                </td>
                <td>
                <div className="animate-pulse">
                    <div className="h-4 mt-3 mb-6 bg-gray-200 rounded" />
                    <div className="h-4 mb-6 bg-gray-300 rounded" />
                    <div className="h-4 mb-6 bg-gray-200 rounded" />
                    <div className="h-4 mb-6 bg-gray-300 rounded" />
                    <div className="h-4 mb-6 bg-gray-200 rounded" />
                </div>
                </td>
                </tr>)}
                </tbody>
                </table>)}
    {showModal.is_show ? (
          <>
            <div
              className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none"
            >
              <div className="relative w-auto max-w-3xl mx-auto my-6">
                <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
                  <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-blueGray-200">
                    <h3 className="text-3xl font-semibold">
                     Modal Title
                    </h3>
                  </div>
                  <form onSubmit={ChangeStatus}>
                        <div className="relative flex-auto p-6">
                            <div className="relative mt-6">
                                <select value={bookingStatus} onChange={(e)=>setBookingStatus(e.target.value)} id="status" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option value="Checked-in">Checked-in</option>
                                    <option value="Checked-out">Checked-out</option>
                                    <option value="Cancelled">Cancelled</option>
                                </select>

                            </div>
                        </div>
                        <div className="flex items-center justify-end p-6 border-t border-solid rounded-b border-blueGray-200">
                            <button
                                className="px-6 py-2 mb-1 mr-1 text-sm font-bold text-red-500 uppercase transition-all duration-150 ease-linear outline-none background-transparent focus:outline-none"
                                type="button"
                                onClick={() => setShowModal({bookedId:null,is_show:false})}
                            >
                                Close
                            </button>
                            <button
                                className="px-4 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none w-36 bg-emerald-500 active:bg-emerald-600 hover:shadow-lg focus:outline-none"
                                type="submit"
                            >
                                {isChangeResponse?<div className="flex justify-center"><div className="w-6 h-6 border-2 border-indigo-500 border-dashed rounded-full animate-spin border-t-transparent" /></div>:bookingStatus}
                            </button>
                        </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
          </>
        ) : null}
</div>
    )
}

export default BookingHistoryPage;