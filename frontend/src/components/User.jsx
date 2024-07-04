import { useNavigate } from "react-router-dom";
import { Avatar } from "./Avatar";
import { Buttons } from "./Buttons";

export function User({first, last, id, username, email}){
    const navigate = useNavigate()
    // if (username == email){
    //     console.log(username, email)
    //     return
    // }
    return <div className="flex justify-between">
        <div className="flex">
            <div><Avatar></Avatar></div>
            <div className="text-xl font-bold p-4">{first} {last}</div>
        </div>
        <div className="p-4">
            <Buttons title = {"Send Money"} onClick={() => {
                navigate(`/send?id=${id}&first=${first}&last=${last}`)
            }}></Buttons>
        </div>
    </div>
}