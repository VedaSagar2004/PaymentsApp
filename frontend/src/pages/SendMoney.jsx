import { useState } from "react"
import { Heading } from "../components/Heading"
import axios from "axios"
import { useNavigate, useSearchParams } from "react-router-dom"

export const SendMoney = () => {
    const [money, setMoney] = useState(0)
    const [searchParams] = useSearchParams()
    const id = searchParams.get("id")
    const first = searchParams.get("first")
    const last = searchParams.get("last")
    const navigate = useNavigate()
    return (
        <div className="bg-gradient-to-r from-color1 to-color2 h-screen flex items-center justify-center">
            <div className="flex flex-col items-center bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <div className="mb-4"><Heading heading={"Send Money"}/></div>
                <div className="my-4 font-bold text-lg">{first} {last}</div>
                <input onChange = {(e) => {
                    setMoney(e.target.value)
                }} className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 box-border" placeholder="Enter amount (₹)"></input>
                <button onClick= {() => {
                    axios.post('http://localhost:3000/api/v1/account/transfer',{
                        to: id,
                        amount: money
                    },{
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("token")
                        },   
                    })
                    navigate("/dashboard")
                    }} type="button" className="w-full focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-500 dark:hover:bg-green-600">Send</button>
            </div>
        </div>
    )
}