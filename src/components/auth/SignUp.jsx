import axios from "axios";
import CustomButton from "../ui/CustomButton";
import CustomInput from "../ui/CustomInput";
import CustomText from "../ui/CustomText";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { signUpHandlerAsync } from "../../feature/userSlice";
import { useNavigate,Link } from "react-router-dom";

const SignUp=()=>{
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [singUpInput,setSignUpInput]=useState({
        name:"",
        email:"",
        password:"",
        mobile:""
    })

    const signInputUpHandler=(e)=>{
        const {name,value}=e.target;
        setSignUpInput({...singUpInput,[name]:value});

    }

    const signUpHandler=async()=>{
        
        try {
            const data={
              ...singUpInput
            }
            const res= await dispatch(signUpHandlerAsync({data})).unwrap();
            console.log(res,"dfdskfugsk");
            if(res.success){
             navigate("/login")
            }
            
            
        } catch (error) {
            console.log("error",error);
            
        }
    }

    return(
        <>
         <div className="w-[50%] h-screen m-auto flex justify-center items-center">
              <div className="flex flex-col gap-4">
                <CustomText className={"!text-[30px] text-center"} value={"Sign Up"}/>
               <div className="flex flex-col gap-2">
                <CustomText value={"Name"}/>
                <CustomInput name="name" value={singUpInput?.name} onchange={(e)=>{signInputUpHandler(e)}} className={"!w-[300px]"} />
               </div>
               <div className="flex flex-col gap-2">
                <CustomText value={"Email"}/>
                <CustomInput name="email" value={singUpInput?.email} onchange={(e)=>{signInputUpHandler(e)}} className={"!w-[300px]"} />
               </div>
               <div className="flex flex-col gap-2">
                <CustomText value={"Phone Number"}/>
                <CustomInput name="mobile" value={singUpInput?.mobile} onchange={(e)=>{signInputUpHandler(e)}} className={"!w-[300px]"} />
               </div>
               <div className="flex flex-col gap-2">
                <CustomText value={"Password"}/>
                <CustomInput name="password" value={singUpInput?.password} onchange={(e)=>{signInputUpHandler(e)}} className={"!w-[300px]"} />
               </div>
               <div className="flex justify-center pt-3">
                <CustomButton onclick={()=>{signUpHandler()}}  value={"Sign Up"}/>
               </div>
                <div className="text-[#fff] flex justify-center">
               <Link to={"/logIn"}>have you already Account? Login</Link>
               </div>
         </div>
         </div>
        </>
    )
}
export default SignUp;