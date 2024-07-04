import { Avatar } from "./Avatar";

export function Navbar({username}){
    return <div className="shadow">
        <div className="flex justify-between">
            <div className="text-xl font-bold p-5">Payments App</div>
            <div className="flex text-xl font-bold">
                <Avatar username={{username}}></Avatar>
            </div>
        </div>
        
    </div>
}