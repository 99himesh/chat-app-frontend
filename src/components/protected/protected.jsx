// import Cookies from "js-cookie"
// import {Navigate} from "react-router-dom"
// const Protected=({children})=>{
//     const token=Cookies.get("token"); 
//     return token ?children : <Navigate to={"/logIn"} replace/>
// }


// export default Protected;


import { Navigate } from "react-router-dom"
import Cookies from "js-cookie"
const Protected=({children})=>{
    const token=Cookies.get("token")
    return token?children : <Navigate to="/logIn" replace />;
}

export default Protected;