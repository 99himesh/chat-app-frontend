import { Avatar } from "antd";
import { PhoneOutlined, VideoCameraOutlined, MoreOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

const ChatHeader = ({selectedUser}) => {
  const {user,userId,profile}=useSelector(state=>state.user);
   const userName=user?.filter(item=>item.id==userId) ;
   const firstLetter=userName[0]?.name.slice(0,1).toUpperCase()
   console.log(profile,"vjhkjg");
   
  
  return (
    <div className="h-16 bg-[#562F00] text-white flex justify-between items-center px-10">

      <div className="flex items-center gap-3">
        {<Avatar  src={selectedUser.profile && selectedUser.profile} size={45}>{!selectedUser.profile && firstLetter  }</Avatar>}
        <div>
          <h3 className="font-semibold">{`${selectedUser?.name.slice(0,1).toUpperCase()}${selectedUser?.name.slice(1)}`}</h3>
        </div>
      </div>

    

    </div>
  );
};

export default ChatHeader;