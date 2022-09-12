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
        <div className="title">
          <button className="btn burger-menu">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="27"
              height="15.75"
              viewBox="0 0 27 15.75"
            >
              <g
                id="Icon_ionic-ios-menu"
                data-name="Icon ionic-ios-menu"
                transform="translate(-4.5 -10.125)"
              >
                <path
                  id="Path_1"
                  data-name="Path 1"
                  d="M30.375,12.375H5.625A1.128,1.128,0,0,1,4.5,11.25h0a1.128,1.128,0,0,1,1.125-1.125h24.75A1.128,1.128,0,0,1,31.5,11.25h0A1.128,1.128,0,0,1,30.375,12.375Z"
                />
                <path
                  id="Path_2"
                  data-name="Path 2"
                  d="M30.375,19.125H5.625A1.128,1.128,0,0,1,4.5,18h0a1.128,1.128,0,0,1,1.125-1.125h24.75A1.128,1.128,0,0,1,31.5,18h0A1.128,1.128,0,0,1,30.375,19.125Z"
                />
                <path
                  id="Path_3"
                  data-name="Path 3"
                  d="M30.375,25.875H5.625A1.128,1.128,0,0,1,4.5,24.75h0a1.128,1.128,0,0,1,1.125-1.125h24.75A1.128,1.128,0,0,1,31.5,24.75h0A1.128,1.128,0,0,1,30.375,25.875Z"
                />
              </g>
            </svg>
          </button>
          <span>{data.user?.displayName}</span>
        </div>
        {false&&<div className="chatIcons">
          <img className="cam" src={Cam} alt="" />
          <img className="add" src={AddUser} alt="" />
          <img className="more" src={More} alt="" />
        </div>}
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
