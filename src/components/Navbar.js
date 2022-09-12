import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../firebase";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="navbar">
      <span className="logo">Chat App</span>
      <div className="user">
        <img
          src={currentUser.photoURL}
          alt={currentUser.displayName}
        />
        <span>{currentUser.displayName}</span>
        <button onClick={() => signOut(auth)}>
          <span className="text">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
