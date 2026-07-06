import { useSelector } from "react-redux";
import { formatTime } from "../../constants/constants";
import { Image, Skeleton } from "antd";
import { useState } from "react";

const MessageBubble = ({ msg }) => {
  const { userId } = useSelector(state => state.user);
  const { isLoading } = useSelector(state => state.message);
  const own = msg.senderId == userId;
  return (

    <>
      <div
        className={`flex  mb-3 px-2 ${own ? "justify-end" : "justify-start"
          }`}
      >
        {msg.messageType == "text" && <div
          className={` max-w-[70%] rounded-xl px-4 py-2 shadow
        ${own
              ? "bg-[#DCF8C6] rounded-br-sm"
              : "bg-white rounded-bl-sm"
            }`}
        >
          <p>{msg.message}</p>
          <p className="text-[12px]">{formatTime(msg.createdAt)}</p>



        </div>}
        {msg.messageType == "image/png" || msg.messageType == "image/jpeg" || msg.messageType=="image/webp"  && <div
          className={` max-w-[70%] rounded-xl px-4 py-2 
        `}
        >
         
          {isLoading   ? <Skeleton.Image active={"active"} style={{ width: 160, height: 160 }} /> :  
          <Image 
          className="!h-[150px] w-full" src={msg.media} 
          />}
          <p className="text-[12px]">{formatTime(msg.createdAt)}</p>



        </div>}
        {msg.messageType == "video/mp4" && <div
          className={` max-w-[70%] rounded-xl  px-4 py-2 !rounded-xl
        `}
        >
          {isLoading ? <Skeleton.Image active={"active"} style={{ width: 160, height: 160 }} /> : <video
            src={msg.media}
            controls
            width={255}
            height={100}
          />}
        </div>}
      </div>
    </>

  );
};

export default MessageBubble;