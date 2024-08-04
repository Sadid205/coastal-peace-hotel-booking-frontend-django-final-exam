import { useState } from "react"
import toast,{ Toaster } from "react-hot-toast";
const DepositPage = ()=>{
    const token = localStorage.getItem("Token")
    const [deposit,setDeposit] = useState("")
    const [error,setError] = useState("")
    const [isLoading,setIsLoading] = useState(false)
    const depositHandle = async(e)=>{
        e.preventDefault()
        setIsLoading(true)
        const response = await fetch('https://coastal-peace-hotel-booking.onrender.com/accounts/deposit/',{method:"POST",headers:{'Authorization':`Token ${token}`,'Content-Type':'application/json'},
            body:JSON.stringify({
                amount:deposit
                })
            })
        const data = await response.json()
        if(data){
            setIsLoading(false)
        }
        if (data.Error){
            setError(data.Error)
            toast.error(data.Error)
        }
        else{
            toast.success(data.Success)
        }
    }
    return (
        <>
        <div><Toaster/></div>
            <div>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Deposit</title>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com"/>
            <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
            <div className="flex items-center justify-center w-screen h-screen dark:bg-gray-900">
                <div className="grid gap-8">
                <div id="back-div" className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-[26px] m-4">
                    <div className="border-[20px] border-transparent rounded-[20px] dark:bg-gray-900 bg-white shadow-lg xl:p-10 2xl:p-10 lg:p-10 md:p-10 sm:p-2 m-2">
                    <h1 className="pt-8 pb-6 text-5xl font-bold text-center cursor-default dark:text-gray-400">
                        Deposit
                    </h1>
                    <form onSubmit={depositHandle} className="space-y-4">
                        <div>
                        <label htmlFor="deposit" className="mb-2 text-lg dark:text-gray-400">{error?error:"Deposit"}</label>
                        <input value={deposit} onChange={(e)=>setDeposit(e.target.value)} id="deposit" name="deposit" className="w-full p-3 duration-300 ease-in-out border border-gray-300 rounded-lg shadow-md dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 placeholder:text-base focus:scale-105" placeholder="Amount" required />
                        </div>
                        <button disabled={isLoading} className="w-full p-2 mt-6 text-white transition duration-300 ease-in-out rounded-lg shadow-lg bg-gradient-to-r dark:text-gray-300 from-blue-500 to-purple-500 hover:scale-105 hover:from-purple-500 hover:to-blue-500" type="submit">
                        {isLoading?<div className="flex justify-center"><div className="w-6 h-6 border-4 border-yellow-600 border-dashed rounded-full animate-spin" /></div>:"Deposit"}
                        </button>
                    </form>
                    </div>
                </div>
                </div>
            </div>
            </div>
            </>
    )
}

export default DepositPage