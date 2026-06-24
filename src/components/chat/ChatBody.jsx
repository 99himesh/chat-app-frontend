import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import { useDispatch, useSelector } from "react-redux";
import { recieveMessageAsync } from "../../feature/messageSlice";



const ChatBody = ({recieverId}) => {
  const {userId}=useSelector(state=>state.user)
  const bottomRef = useRef();
  const dispatch=useDispatch();
  const {message}=useSelector(state=>state.message)
  console.log(recieverId,"vksfjkvbfhj");
  

  const getMessage=async()=>{
    try {
       const data={
        senderId:userId,
        recieverId:recieverId,
      }
      const res=await dispatch(recieveMessageAsync({data})).unwrap();
      console.log(res);
      
      
    } catch (error) {
      console.log(error);
      
    }
  }
  useEffect(()=>{
    if(recieverId){
    getMessage();

    }
  },[recieverId])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="flex-1 overflow-y-auto p-5 bg-[#efeae2]">

      {message.map((msg) => (
        <MessageBubble key={msg.id} msg={msg} />
      ))}

      <div ref={bottomRef} />

    </div>
  );
};

export default ChatBody;