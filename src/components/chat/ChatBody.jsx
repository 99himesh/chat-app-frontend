import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";

const messages = [
  {
    id: 1,
    own: false,
    message: "Hey 👋",
    time: "09:30 AM",
  },
  {
    id: 2,
    own: true,
    message: "Hello!",
    time: "09:31 AM",
  },
  {
    id: 3,
    own: false,
    message: "How are you?",
    time: "09:32 AM",
  },
  {
    id: 4,
    own: true,
    message: "Doing great 😊",
    time: "09:33 AM",
  },
];

const ChatBody = () => {
  const bottomRef = useRef();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="flex-1 overflow-y-auto p-5 bg-[#efeae2]">

      {messages.map((msg) => (
        <MessageBubble key={msg.id} {...msg} />
      ))}

      <div ref={bottomRef} />

    </div>
  );
};

export default ChatBody;