import { Input, Button, message } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessageAsync } from "../../feature/messageSlice";


const ChatInput = ({recieverId,setChatInput,chatInputs,sendMessage,socket,setSendMessage,sendMessageHandler}) => {



  return (
    <div className="border-t bg-white p-4">

      <div className="flex gap-3">

        <Input
          name="message"
          placeholder="Type a message..."
          size="large"
          value={chatInputs.message}
          onChange={(e)=>{setChatInput({...chatInputs,message:e.target.value})}}
        />

        <Button
          onClick={sendMessageHandler}
          type="primary"
          size="large"
          icon={<SendOutlined />}
        />

      </div>

    </div>
  );
};

export default ChatInput;