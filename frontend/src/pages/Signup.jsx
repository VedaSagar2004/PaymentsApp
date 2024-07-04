import axios from 'axios'
import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Buttons } from "../components/Buttons";
import { Heading } from "../components/Heading";
import { Information } from "../components/Information";
import { InputBox } from "../components/InputBox";
import { useNavigate } from 'react-router-dom';

export const Signup = () => {
    const navigate = useNavigate()
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    return (
        <div className="bg-gradient-to-r from-color1 to-color2 h-screen flex items-center justify-center">
            <div className="flex flex-col items-center bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <Heading heading={"Sign up"}/>
                <Information text={"Enter your information to create an account"} />
                <InputBox title={"First Name"} placeholder={"John"} onChange={e => {
                    setFirstName(e.target.value)
                }}/>
                <InputBox title={"Last Name"} placeholder={"Doe"} onChange={e => {
                    setLastName(e.target.value)
                }}/>
                <InputBox title={"Email"} placeholder={"johndoe@example.com"} onChange={e => {
                    setUsername(e.target.value)
                }}/>
                <InputBox title={"Password"} onChange={e => {
                    setPassword(e.target.value)
                }}/>
                <Buttons title={"Sign up"} onClick={ async () => {
                    const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                        username,
                        firstName,
                        lastName,
                        password
                    })
                    localStorage.setItem("token", response.data.token)
                    navigate("/signin")
                }}/>
                <BottomWarning text={"Already have an Account?"} Linktext={"Login"} link={"/signin"}/>
            </div>
        </div>
    );
};
