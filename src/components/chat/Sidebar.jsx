import {
  SearchOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Avatar, Badge, Input } from "antd";

const users = [
  {
    id: 1,
    name: "Alice Perry",
    lastMessage: "Okay.",
    time: "2:53",
    unread: 1,
    online: true,
  },
  {
    id: 2,
    name: "Bob",
    lastMessage: "Thanks",
    time: "2:40",
    unread: 3,
    online: false,
  },
  {
    id: 3,
    name: "Samuel Carter",
    lastMessage: "Typing...",
    time: "1:01",
    unread: 0,
    online: true,
  },
  {
    id: 4,
    name: "Sophia Evans",
    lastMessage: "See you tomorrow",
    time: "12:53",
    unread: 0,
    online: false,
  },
];

const Sidebar = () => {
  return (
    <div className="w-[340px] bg-[#562F00] backdrop-blur-xl border-r border-white/10 flex flex-col">

      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <Input
          size="large"
          placeholder="Search..."
          prefix={<SearchOutlined />}
          className="mt-5 rounded-xl"
        />
      </div>

      {/* Users */}
      <div className="flex-1 overflow-y-auto px-3 py-3">

        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center gap-3 p-3 rounded-2xl hover:bg-white/10 cursor-pointer transition mb-2"
          >
            <Badge
              dot={user.online}
              offset={[-5, 38]}
              color="#22c55e"
            >
              <Avatar size={55}>
                {user.name.charAt(0)}
              </Avatar>
            </Badge>

            <div className="flex-1 min-w-0">
              <h4 className="text-white font-semibold truncate">
                {user.name}
              </h4>

              <p className="text-gray-400 text-sm truncate">
                {user.lastMessage}
              </p>
            </div>

            <div className="flex flex-col items-end gap-2">
              <span className="text-xs text-gray-400">
                {user.time}
              </span>

              {user.unread > 0 && (
                <div className="h-5 w-5 rounded-full bg-green-500 text-white text-xs flex items-center justify-center">
                  {user.unread}
                </div>
              )}
            </div>
          </div>
        ))}

      </div>

      {/* Footer */}
      <div className="border-t border-white/10 p-4 flex justify-around">

        <button className="text-gray-400 hover:text-white text-2xl">
          <SettingOutlined />
        </button>

        <button className="text-gray-400 hover:text-red-400 text-2xl">
          <LogoutOutlined />
        </button>

      </div>

    </div>
  );
};

export default Sidebar;