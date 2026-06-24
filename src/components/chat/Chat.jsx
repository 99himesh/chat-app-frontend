import Sidebar from "./Sidebar";
import ChatHeader from "./ChatHeader";
import ChatBody from "./ChatBody";
import ChatInput from "./ChatInput";
import Cookies from "js-cookie"
import { useState } from "react";
const Chat = () => {
  const token=Cookies.get("token")
  const userId=Cookies.get("userId")
  const [recieverId,setRecieverId]=useState(null)
  console.log(recieverId,"hnhg");
  
  return (
    <div className="h-screen  p-6 relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-20 left-1/4 w-80 h-80 bg-pink-500/20 blur-[180px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-500/20 blur-[180px] rounded-full" />
      <div className="absolute top-10 right-10 w-96 h-96 bg-cyan-500/20 blur-[180px] rounded-full" />

      <div className="relative h-full rounded-[30px] border border-white/10 bg-black/30 backdrop-blur-3xl overflow-hidden flex">

        <Sidebar setRecieverId={setRecieverId} recieverId={recieverId}/>

        <div className="flex-1 flex flex-col">
          <ChatHeader />
          <ChatBody recieverId={recieverId} />
          <ChatInput recieverId={recieverId}/>
        </div>

      </div>
    </div>
  );
};

export default Chat;