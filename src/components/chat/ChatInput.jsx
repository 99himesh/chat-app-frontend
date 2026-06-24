import { Input, Button, message } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessageAsync } from "../../feature/messageSlice";

const ChatInput = ({recieverId}) => {
  const {userId}=useSelector(state=>state.user);
  const dispatch=useDispatch();
  const [chatInput,setChatInput]=useState({
    message:""
  })
  const sendMessageHandler=async()=>{
    try {
      const data={
        senderId:userId,
        recieverId:recieverId,
        message:chatInput
      }
      const res=await dispatch(sendMessageAsync({data})).unwrap();
      console.log(res,"dvfhjdsfhjdfjh");
      
      if(res.success){
        console.log("sdfsdf");
        
        setChatInput({...chatInput,message:""})
      }
      
    } catch (error) {
      console.log(error);
      
    }
    
  }
  return (
    <div className="border-t bg-white p-4">

      <div className="flex gap-3">

        <Input
          name="message"
          placeholder="Type a message..."
          size="large"
          value={chatInput.message}
          onChange={(e)=>{setChatInput(e.target.value)}}
        />

        <Button
        onClick={()=>{sendMessageHandler()}}
          type="primary"
          size="large"
          icon={<SendOutlined />}
        />

      </div>

    </div>
  );
};

export default ChatInput;