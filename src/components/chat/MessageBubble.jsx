import { useSelector } from "react-redux";
import { formatTime } from "../../constants/constants";
import { Image } from "antd";

const MessageBubble = ({msg }) => {
  const {userId}=useSelector(state=>state.user);
  const own=msg.senderId==userId;
  return (
    
    <>
    <div
      className={`flex  mb-3 ${
        own ? "justify-end" : "justify-start"
      }`}
    >
     {msg.messageType=="text"  && <div
        className={` max-w-[70%] rounded-xl px-4 py-2 shadow
        ${
          own
            ? "bg-[#DCF8C6] rounded-br-sm"
            : "bg-white rounded-bl-sm"
        }`}
      >
        <p>{msg.message}</p>

        
      </div>}
       {msg.messageType=="image/png"  && <div
        className={` max-w-[70%] rounded-xl !h-[50px] px-4 py-2 shadow
        `}
      >
        <Image className="!h-[150px] w-full" src={msg.media}/>

       
      </div>}
      {msg.messageType=="video/mp4"  && <div
        className={` max-w-[70%] rounded-xl !h-[50px] px-4 py-2 shadow
        `}
      >
       <video
          src={msg.media}
          controls
          width={250}
          height={100}
/>

       
      </div>}
    </div>
    </>

  );
};

export default MessageBubble;