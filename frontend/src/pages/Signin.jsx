import { BottomWarning } from "../components/BottomWarning";
import { Buttons } from "../components/Buttons";
import { Heading } from "../components/Heading";
import { Information } from "../components/Information";
import { InputBox } from "../components/InputBox";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Signin = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    return (
        <div className="bg-gradient-to-r from-color1 to-color2 h-screen flex items-center justify-center">
            <div className="flex flex-col items-center bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <Heading heading={"Sign in"}/>
                <Information text={"Enter your credentials to access your account"} />
                <InputBox title={"Email"} placeholder={"johndoe@example.com"} onChange={(e) => {
                    setUsername(e.target.value)
                }}/>
                <InputBox title={"Password"} onChange={(e) => {
                    setPassword(e.target.value)
                }}/>
                <Buttons title={"Sign in"} onClick={async () => {
                    const response = await axios.post('http://localhost:3000/api/v1/user/signin', {
                        username,
                        password
                    })
                    localStorage.setItem("token", response.data.token)
                    navigate("/dashboard")
                }}/>
                <BottomWarning text={"Don't have an account?"} Linktext={"Sign up"} link={"/signup"}/>
            </div>
        </div>
    );
};