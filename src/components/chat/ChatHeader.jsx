import { Avatar } from "antd";
import { PhoneOutlined, VideoCameraOutlined, MoreOutlined } from "@ant-design/icons";

const ChatHeader = () => {
  return (
    <div className="h-16 bg-[#562F00] text-white flex justify-between items-center px-5">

      <div className="flex items-center gap-3">
        <Avatar size={45}>H</Avatar>

        <div>
          <h3 className="font-semibold">Himesh</h3>
          <p className="text-xs opacity-80">Online</p>
        </div>
      </div>

      <div className="flex gap-5 text-xl">
        <MoreOutlined />
      </div>

    </div>
  );
};

export default ChatHeader;