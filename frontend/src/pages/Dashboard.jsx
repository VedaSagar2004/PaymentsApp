import { useEffect, useState } from "react"
import { Navbar } from "../components/Navbar"
import { User } from "../components/User"
import axios from "axios"

export const Dashboard = () => {
    const [amount, setBalance] = useState(0)
    const [filter, setFilter] = useState("")
    const [users, setUsers] = useState([])


    useEffect(() => {
        axios.get('http://localhost:3000/api/v1/account/balance', {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
        .then((response) => {
            setBalance(response.data.balance)
            console.log(response.data.balance)
        })
    },[amount])

    
    useEffect(() => {
        if (filter == ""){
            setUsers([])
            return
        }
        axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`,{
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
        .then((response) => {
            setUsers(response.data)
        })
    }, [filter])
    
    return <div>
        <Navbar username={"Veda"}></Navbar>
        <div className="text-xl font-bold my-10 mx-3"></div>
        <div className="text-xl font-bold my-10 mx-3">Balance: ₹{amount}</div>
        <div className="px-3">
            <input onChange = {(e) => {
                setFilter(e.target.value)
            }} className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 box-border" placeholder="Search for users..."></input>
        </div>
        {users.map((user) => {return <User key={user._id} first={user.firstName} last = {user.lastName} id = {user._id}></User>})}
    </div>
}


