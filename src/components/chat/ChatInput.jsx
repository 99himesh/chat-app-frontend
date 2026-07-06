import { Input, Button, message } from "antd";
import { PlusCircleOutlined, PlusOutlined, SendOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { predectiveMessageAsync, sendMessageAsync } from "../../feature/messageSlice";
import debounce from "../../constants/debouncing";
import { useEffect } from "react";
import { useMemo } from "react";


const ChatInput = ({setChatInput,chatInputs,sendMessage,socket,setSendMessage,sendMessageHandler,sendMediaFilesHandler}) => {

 

const chatInputHandler=(e)=>{
    setChatInput({...chatInputs,message:e.target.value});
}

  return (
    <div className="bg-white py-4 px-10">
      
      <div className="flex gap-3 items-center ">
        <div>
            <label
        htmlFor="file-upload"
        style={{
          cursor: "pointer",
          fontSize: "24px",
        }}
      >
        <PlusOutlined />
      </label>

      <input
        id="file-upload"
        type="file"
        accept="image/*,video/*"
        style={{ display: "none" }}
        onChange={sendMediaFilesHandler}
      />
        </div>
        <Input
          name="message"
          placeholder="Type a message..."
          size="large"
          value={chatInputs.message}
          onChange={(e)=>{chatInputHandler(e)}}
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