import React, { useContext } from "react";
import AddUser from "../images/add-user.png";
import Cam from "../images/camera.png";
import More from "../images/more.png";
import Messages from "./Messages";

import Input from "./Input";
import { ChatContext } from "../context/ChatContext";
const Chat = () => {
  const { data } = useContext(ChatContext);
  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
          <img className="cam" src={Cam} alt="" />
          <img className="add" src={AddUser} alt="" />
          <img className="more" src={More} alt="" />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
