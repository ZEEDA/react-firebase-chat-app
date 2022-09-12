import moment from "moment";
import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();
  useEffect(() => {
    ref.current?.scrollIntoView({ behavoir: "smooth" });

    return () => {};
  }, [message]);

  return (
    <div
      ref={ref}
      className={`message ${
        message.senderId == currentUser.uid ? "owner" : ""
      }`}
    >
      <div className="messageInfo">
        <img
          src={
            message.senderId == currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        <span>{moment(new Date(message.date.seconds * 1000)).fromNow()}</span>
      </div>
      <div className="messageContent">
        {message.text && <p>{message.text}</p>}
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
};

export default Message;
