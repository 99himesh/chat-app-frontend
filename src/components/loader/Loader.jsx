const TypingLoader = () => {
  return (
    <div className="flex items-center space-x-1 bg-gray-200 rounded-full px-4 py-2 w-fit">
      <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"></div>
      <div
        className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"
        style={{ animationDelay: "0.15s" }}
      ></div>
      <div
        className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"
        style={{ animationDelay: "0.3s" }}
      ></div>
    </div>
  );
};

export default TypingLoader;