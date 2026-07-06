import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import { useDispatch, useSelector } from "react-redux";
import { archievedMessageAsync, handlePredectiveMessage, messageHandler, recieveMessageAsync } from "../../feature/messageSlice";
import TypingLoader from "../loader/Loader";



const ChatBody = ({socketId,socket,recieverId,setChatInput,chatInputs}) => {
  const bottomRef = useRef();
  const dispatch=useDispatch();
  const {userId}=useSelector(state=>state.user)
  const {message}=useSelector(state=>state.message);
  const {predectiveMessage,isPredectiveloading}=useSelector(state=>state.message)  
  const getArchivedHandler=async()=>{
    try {
      const data={senderId:userId,recieverId:recieverId}
      const res=await dispatch(archievedMessageAsync({data})).unwrap()
      
    } catch (error) {
      console.log(error);
      
    }
  }
  const getMessageHandler=async()=>{
    const page=1
    try {
      const data={senderId:userId,recieverId:recieverId}
      const res=await dispatch(recieveMessageAsync({data})).unwrap()
      if(res.messages.length<50 ){
        getArchivedHandler()
      }
      
      
    } catch (error) {
      console.log(error);
      
    }
  }
  useEffect(()=>{
    getMessageHandler()
  },[recieverId])
  
   const predectiveHandler=(item)=>{
       setChatInput({...chatInputs,message:chatInputs.message+" "+item});
       dispatch(handlePredectiveMessage())
   }
 useEffect(() => {
  bottomRef.current?.scrollIntoView({
    behavior: "smooth",
  });
}, [message]);

  return (
    <div className="flex-1  px-5 py-4  overflow-auto  h-[100vh] bg-[#efeae2]">
      
      {message?.map((msg,idx) => (
        <MessageBubble key={idx} msg={msg} />
      ))}

      <div className="flex justify-start px-5 py-4 gap-3">
         {isPredectiveloading && <TypingLoader/>}
        {predectiveMessage?.map((item)=>{
          return <div onClick={()=>{predectiveHandler(item)}} className="text-[#000] bg-[#fff] px-3 py-1  rounded-full shadow-2xl">{item}</div>
        })}

       </div>
      <div ref={bottomRef} />

    </div>
  );
};

export default ChatBody;