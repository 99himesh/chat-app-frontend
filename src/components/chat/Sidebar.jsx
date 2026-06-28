import {
  SearchOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Avatar, Badge, Input } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserAsync } from "../../feature/userSlice";



const Sidebar = ({setRecieverId,recieverId,setRecieverMail,socket}) => {
  const {userId,user}=useSelector(state=>state.user);
  const users=user.filter((item)=>item.id!=userId);
  const dispatch=useDispatch();
  

    const joinRoomHandler=(user)=>{
      setRecieverId(user.id)
      setRecieverMail(user.email)
      socket.emit("join-room",user.email)
    
    }


  const getUsers=async()=>{
    try {
      const res=await dispatch(getUserAsync({})).unwrap();
      
      
    } catch (error) {
      console.log(error);
      
    }
  }


   
  useEffect(()=>{ 
      getUsers()
  },[])
  return (
    <div className="w-[340px] bg-[#562F00] backdrop-blur-xl border-r border-white/10 flex flex-col  overflow-auto">

      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <Input
          size="large"
          placeholder="Search..."
          prefix={<SearchOutlined />}
          className="mt-5 rounded-xl"
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
              dot={user.online}
              offset={[-5, 38]}
              color="#22c55e"
            >
              <Avatar size={55}>
                {user.name.charAt(0)}
              </Avatar>
            </Badge>

            <div className="flex-1 min-w-0">
              <h4 className="text-white font-semibold truncate">
                {user.name}
              </h4>

              <p className="text-gray-400 text-sm truncate">
                {/* {user.lastMessage} */}
                dsvsd
              </p>
            </div>

            <div className="flex flex-col items-end gap-2">
              <span className="text-xs text-gray-400">
                  {"15min"}
                
              </span>

             
                <div className="h-5 w-5 rounded-full bg-green-500 text-white text-xs flex items-center justify-center">
                  {/* {user.unread} */}
                  ds
                </div>
            </div>
          </div>
        ))}

      </div>

      {/* Footer */}
      <div className="border-t border-white/10 p-4 flex justify-around">

        <button className="text-gray-400 hover:text-red-400 text-2xl">
          <LogoutOutlined />
        </button>

      </div>

    </div>
  );
};

export default Sidebar;