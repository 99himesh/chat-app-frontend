import axios from "axios";
import CustomButton from "../ui/CustomButton";
import CustomInput from "../ui/CustomInput";
import CustomText from "../ui/CustomText";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginHandlerAsync } from "../../feature/userSlice";
import { useDispatch } from "react-redux";
const Login=()=>{
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const [loginInput,setloginInput]=useState({
        emailAndMobile:"",
        password:""
    })
    

    const loginInputUpHandler=(e)=>{
        const {name,value}=e.target;
        
        setloginInput({...loginInput,[name]:value});

    }

  const loginHandler=async()=>{
          console.log("dfjksbdjkb");
          
          try {
              const data={
                ...loginInput
              }
              const res= await dispatch(loginHandlerAsync({data})).unwrap();
              console.log(res,"vhgcfcgf");
              
              if(res.success){
               navigate("/chat")
              }
              
              
          } catch (error) {
              console.log("error",error);
              
          }
      }
    return(
        <>
         <div className="w-[50%] h-screen m-auto flex justify-center items-center">
              <div className="flex flex-col gap-4">
                <CustomText className={"!text-[30px] text-center"} value={"Login"}/>
               <div className="flex flex-col gap-2">
                <CustomText value={"Email/Mobile"}/>
                <CustomInput name="emailAndMobile" value={loginInput?.emailAndMobile} onchange={(e)=>{loginInputUpHandler(e)}} className={"!w-[300px]"} />
               </div>
               <div className="flex flex-col gap-2">
                <CustomText value={"Password"}/>
                <CustomInput name="password" value={loginInput?.password} onchange={(e)=>{loginInputUpHandler(e)}} className={"!w-[300px]"} />
               </div>
               <div className="flex justify-center pt-3">
                 <CustomButton onclick={()=>{loginHandler()}}  value={"Log in"}/>
               </div>
               <div className="text-[#fff] flex justify-center">
               <Link to={"/signUp"}>Dont have Account? Sign Up</Link>
               </div>
               
               
         </div>
         </div>
        </>
    )
}
export default Login;