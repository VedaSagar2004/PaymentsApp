import { Link } from "react-router-dom"

export function BottomWarning({text, Linktext, link}){
    return <div>
        <div className="py-2">{text} <span className="cursor underline"><Link to={link}>{Linktext}</Link></span></div>
    </div>
}