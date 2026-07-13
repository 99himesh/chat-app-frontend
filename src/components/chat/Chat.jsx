import Sidebar from "./Sidebar";
import ChatHeader from "./ChatHeader";
import ChatBody from "./ChatBody";
import ChatInput from "./ChatInput";
import Cookies from "js-cookie"
import { useEffect, useMemo, useState } from "react";
import { messageHandler, predectiveMessageAsync, sendMediaFileAsync } from "../../feature/messageSlice";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { Flex, Layout } from 'antd';
import debounce from "../../constants/debouncing";
import { getProfile } from "../../feature/userSlice";

const { Header, Footer, Sider, Content } = Layout;
const layoutStyle = {
  width: '100%',
};
const Chat = () => {
  const token = Cookies.get("token")
  const recieverMail = Cookies.get("recieverMail")
  const senderMail = Cookies.get("senderMail")
  const { userId, user } = useSelector(state => state.user);
  const senderData = user.filter((item) => item.id == userId);
  const [recieverId, setRecieverId] = useState("")
  const [selectedUser, setSelectedUser] = useState({})
  const dispatch = useDispatch()
  const socket = useMemo(() => io("http://localhost:3000", {
    auth: {
      token
    }
  }), [])

  console.log(user, "user");

  console.log(socket.id, "socketId");

  const [messages, setMessages] = useState([]);
  const [chatInputs, setChatInput] = useState({
    message: ""
  })

  const sendMediaFilesHandler = async (e) => {
    const roomName = [senderData[0].email, recieverMail].sort().join("-");
    console.log(roomName, "hhdgjhgsjh");

    try {
      const file = e.target.files[0];

      const fileType = file.type;
      const formdata = new FormData()
      formdata.append("file", file);


      const res = await dispatch(sendMediaFileAsync({ formdata })).unwrap();
      console.log(res);
      const messageData = {
        senderId: senderData[0].id,
        recieverId: recieverId,
        messageType: fileType,
        media: res.url
      }
    const localTime = new Date().toLocaleString();
      socket.emit("personal-message", { messageData, roomName ,createdAt: localTime });


    } catch (error) {
      console.log(error);

    }


  }

  const sendMessageHandler = () => {
    if (!chatInputs.message) return;

    const roomName = [senderData[0].email, recieverMail].sort().join("-");
    console.log(roomName, "roomName");

    const messageData = {
      senderId: senderData[0].id,
      recieverId: recieverId,
      messageType: "text",
      message: chatInputs.message
    }
    const localTime = new Date().toLocaleString();
    socket.emit("personal-message", { messageData, roomName, createdAt: localTime });
    setChatInput({ ...chatInputs, message: "" })
  }


  const prediveMessageHandler = async (text) => {
    if (typeof text != "string") return;

    const data = { text: text }
    try {
      const res = await dispatch(predectiveMessageAsync({ data })).unwrap();


    } catch (error) {
      console.log(error);

    }
  }


  const getProfileHandler = async () => {
    try {
      const res = await dispatch(getProfile({ token })).unwrap();


    } catch (error) {
      console.log(error);

    }
  }



  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected", socket.id);
    });

    socket.on("online-users", (users) => {
       console.log(users);
       
      });

    socket.on("personal-recieve-message", (msg) => {
      dispatch(messageHandler(msg))
      prediveMessageHandler(msg.message)

    })
    return () => {
      socket.off("connect");
      socket.off("connect_error");
    }
  }, [])

  useEffect(() => {
    getProfileHandler()
  }, [])


  const debouncePredective = useMemo(
    () => debounce(prediveMessageHandler, 3000),
    []
  );

  useEffect(() => {
    if (!chatInputs.message.trim()) return;
    console.log("bjhbhjvjhjhf");

    debouncePredective(chatInputs.message);
  }, [chatInputs.message]);


  useEffect(() => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth", // or "auto"
    });
  }, []);



  return (


    <div className="h-screen   relative overflow-hidden">
      <Layout style={layoutStyle}>
        <Sider width="18%" >
          <Sidebar setSelectedUser={setSelectedUser} recieverId={recieverId} setRecieverId={setRecieverId} socket={socket} />
        </Sider>
        {recieverId ? <Layout>
          <ChatHeader selectedUser={selectedUser} />
          <Content className="h-[80vh] overflow-auto">
            <ChatBody prediveMessageHandler={prediveMessageHandler} setChatInput={setChatInput} chatInputs={chatInputs} recieverId={recieverId} />
          </Content>
          <ChatInput sendMediaFilesHandler={sendMediaFilesHandler} sendMessageHandler={sendMessageHandler} setChatInput={setChatInput} chatInputs={chatInputs} />
        </Layout> : <div className="flex justify-center items-center"></div>}
      </Layout>
    </div>
  );
};

export default Chat;