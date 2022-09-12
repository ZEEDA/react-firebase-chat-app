import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";

const Search = () => {
  const [loading, setLoading] = useState("");
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext);
  
  const handleSearch = async () => {
    setLoading(true);
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        throw "No data fetched";
      }
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
        setLoading(false);
      });
    } catch (err) {
      console.log(err);
      setLoading(false);
      setErr(true);
    }
  };
  const handleKey = (e) => {
    setUser(null);
    e.code === "Enter" && handleSearch();
  };
  const handleClearSearch = () => {
    setUsername("");
    setUser(null);
    setErr(false);
  };
  const handleSelect = async () => {
    // Check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    console.log("Compined: ", combinedId);
    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      if (!res.exists()) {
        console.log("Chats not found");
        // Create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });
        // Create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        setUser(null);
      } else {
        setUser(null);
      }
    } catch (error) {}
  };

  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a user"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          onKeyDown={handleKey}
        />
        {username != "" && (
          <button className="btn clear" onClick={handleClearSearch}>
            <span className="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="21"
                viewBox="0 0 21 21"
              >
                <path
                  id="Icon_material-clear"
                  data-name="Icon material-clear"
                  d="M28.5,9.615,26.385,7.5,18,15.885,9.615,7.5,7.5,9.615,15.885,18,7.5,26.385,9.615,28.5,18,20.115,26.385,28.5,28.5,26.385,20.115,18Z"
                  transform="translate(-7.5 -7.5)"
                />
              </svg>
            </span>
          </button>
        )}
      </div>
      {err && <span className="err">User not found</span>}
      {user && (
        <div
          className="userChat"
          onClick={() => {
            handleSelect(user);
          }}
        >
          <img src={user.photoURL} alt={user.displayName} />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
