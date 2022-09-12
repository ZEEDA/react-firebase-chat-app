import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import Moment from "react-moment";
import moment from "moment";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";
import { ChatContext } from "../context/ChatContext";

const Chats = () => {
  const [chats, setChats] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });
      return () => {
        unsub();
      };
    };
    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (_user) => {
    dispatch({
      type: "CHANGE_USER",
      payload: _user,
    });
  };
  return (
    <div className="chats">
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => {
          return (
            <div
              className="userChat"
              key={chat[0]}
              onClick={() => {
                handleSelect(chat[1].userInfo);
              }}
            >
              <div className="row">
                <img src={chat[1].userInfo.photoURL} alt="" />

                <div className="userChatInfo">
                  <div className="column">
                    <span>{chat[1].userInfo.displayName}</span>
                    <p>{chat[1].lastMessage?.text}</p>
                  </div>
                </div>
              </div>
              <span className="date">
                {moment(new Date(chat[1].date?.seconds * 1000)).fromNow()}
              </span>
            </div>
          );
        })}
    </div>
  );
};

export default Chats;
