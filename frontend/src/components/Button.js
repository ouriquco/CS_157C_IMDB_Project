import {useNavigate} from "react-router-dom";

export const Button1 = ()=>{

    const navigate = useNavigate();
    const navigate_login = ()=>{
        navigate('/login')
    }

    return <button onClick={navigate_login} className={"Sign_In"} >Sign In</button>

}

export const Button2 = ()=>{

    const navigate = useNavigate();
    const navigate_registration = ()=>{
        navigate('/registration')
    }
    return <button onClick={navigate_registration} className={"Register"}>Register</button>

}