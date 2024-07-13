import { Navigate } from "react-router-dom"

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({token,children})=>{
    if(!token){
        return <Navigate to="/login" replace/>
    }
    return children;
}

export default ProtectedRoute