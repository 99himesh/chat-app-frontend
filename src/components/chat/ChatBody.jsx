import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import { useDispatch, useSelector } from "react-redux";
import { messageHandler, recieveMessageAsync } from "../../feature/messageSlice";



const ChatBody = ({recieverId,socketId,socket}) => {
  const bottomRef = useRef();
  const {message}=useSelector(state=>state.message)
 
  console.log(message);
  
  

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="flex-1 overflow-y-auto p-5 bg-[#efeae2]">

      {message?.map((msg) => (
        <MessageBubble key={msg.id} msg={msg} />
      ))}

      <div ref={bottomRef} />

    </div>
  );
};

export default ChatBody;