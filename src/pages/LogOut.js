import { useEffect } from "react"
import { Navigate } from "react-router-dom"
const LogOut = () => {
    useEffect(()=>{
        localStorage.removeItem("the_token")
        localStorage.removeItem("the_user")
    },[])

    return(<Navigate to="signin" replace/>)
}

export default LogOut