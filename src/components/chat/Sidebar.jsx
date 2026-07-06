import {
  SearchOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Avatar, Badge, Input } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserAsync } from "../../feature/userSlice";

import Cookies from "js-cookie"
import {useNavigate} from "react-router-dom"
import { useState } from "react";
const Sidebar = ({socket,setRecieverId,recieverId,setSelectedUser}) => {
  const {userId,user,profile}=useSelector(state=>state.user);
  console.log(user,"user");
  
  const users=user?.filter((item)=>item.id!=userId);
  const senderData=user?.filter((item)=>item.id==userId);
  const [searchInput,setSearchInput]=useState("")
  const dispatch=useDispatch();
  const navigate=useNavigate()
  const recieverEmail=Cookies.get("email")

  
  const senderMail=Cookies.get("senderMail")
  ;
  
    const joinRoomHandler=(user)=>{
      setRecieverId(user.id)
      setSelectedUser(user)
      Cookies.set("recieverMail",user.email)
      const roomName=[senderData[0].email || senderMail,user.email ].sort().join("-");
      console.log(roomName,"roomNamehvhg");
      
      socket.emit("join",roomName)
    
    }
    


  const getUsers=async()=>{
    try {
      const data={search:searchInput}
      const res=await dispatch(getUserAsync({data})).unwrap();
      
      
    } catch (error) {
      console.log(error);
      
    }
  }

const logOutHandler=()=>{
  Cookies.remove("token");
   navigate("/login")
}
   
  useEffect(()=>{ 
      getUsers()
  },[searchInput])
  return (
    <div className="w-[340px] h-[100vh] bg-[#562F00] backdrop-blur-xl border-r border-white/10 flex flex-col  overflow-auto">

      {/* Header */}
      <div className="w-[90%] mx-auto">
        <Input
          placeholder="Search..."
          prefix={<SearchOutlined />}
          className="my-5 w-[80%] h-10  rounded-xl"
          onChange={(e)=>{setSearchInput(e.target.value)}}
        />
      </div>

      {/* Users */}
      <div className="flex-1 overflow-y-auto px-3 py-3">

        {users?.map((user) => (
          <div
            onClick={()=>{joinRoomHandler(user)}}
            key={user.id}
            className={`flex items-center gap-3 p-3 rounded-2xl hover:bg-white/10 cursor-pointer transition mb-2 ${user.id==recieverId && "bg-white/10 " }`}
          >
            <Badge
              offset={[-5, 38]}
              color="#22c55e"
            >
              <Avatar src={user.profile && user.profile} size={55}>
                {!user.profile && user.name.charAt(0).toUpperCase()}
              </Avatar>
            </Badge>

            <div className="flex-1 min-w-0">
              <h4 className="text-white font-semibold truncate">
                {user.name.slice(0,1).toUpperCase()}{user.name.slice(1)}
              </h4>

             
            </div>

          
          </div>
        ))}

      </div>

      {/* Footer */}
      <div className="border-t border-white/10 p-4 flex justify-center gap-5 items-center ">

        <button onClick={()=>{logOutHandler()}} className="text-gray-400 hover:text-red-400 text-2xl">
          <LogoutOutlined />
        </button>
        <div className="cursor-pointer" onClick={()=>{navigate("/profile")}}>
          <Avatar  src={profile.profile} size={28}/>
        </div>

      </div>

    </div>
  );
};

export default Sidebar;