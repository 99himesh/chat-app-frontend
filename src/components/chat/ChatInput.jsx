import { Input, Button } from "antd";
import { SendOutlined } from "@ant-design/icons";

const ChatInput = () => {
  return (
    <div className="border-t bg-white p-4">

      <div className="flex gap-3">

        <Input
          placeholder="Type a message..."
          size="large"
        />

        <Button
          type="primary"
          size="large"
          icon={<SendOutlined />}
        />

      </div>

    </div>
  );
};

export default ChatInput;