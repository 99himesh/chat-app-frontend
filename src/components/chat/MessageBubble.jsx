const MessageBubble = ({ own, message, time }) => {
  return (
    <div
      className={`flex mb-3 ${
        own ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`relative max-w-[70%] rounded-xl px-4 py-2 shadow
        ${
          own
            ? "bg-[#DCF8C6] rounded-br-sm"
            : "bg-white rounded-bl-sm"
        }`}
      >
        <p>{message}</p>

        <p className="text-[11px] text-gray-500 text-right mt-1">
          {time}
        </p>
      </div>
    </div>
  );
};

export default MessageBubble;