import React, { useState } from "react";
import Add from "../images/photo-add.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
function Register() {
  const [percent, setPercent] = useState(0);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const storageRef = ref(storage, "/images/" + displayName);
      console.log("user Resp: ", res);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          var progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          // update progress
          setPercent(progress);
        },
        (err) => {
          console.log("Upload Error: ", err);
          setErr(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
            console.log("File Url: ", url);
            try {
              await updateProfile(res.user, {
                displayName,
                photoURL: url,
              });
            } catch (error) {
              console.log("Update profile Error: ", err.message);
              setErr(true);
            }

            try {
              await setDoc(doc(db, "users", res.user.uid), {
                uid: res.user.uid,
                displayName,
                email,
                photoURL: url,
              });
              await setDoc(doc(db, "userChats", res.user.uid), {});
            } catch (error) {
              setLoading(false);
              console.log("Set user to db Error: ", err.message);
              setErr(true);
            }
            setLoading(false);
            setTimeout(() => {
              navigate("/");
            }, 1000);
          });
        }
      );
    } catch (err) {
      console.log("Create User Error: ", err.message);
      setLoading(false);
      setErr(true);
    }
  };
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Chat app</span>
        <span className="title">Register</span>
        <form action="" autoComplete="off" onSubmit={handleSubmit}>
          <input type="text" placeholder="display name" />
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <input style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <img src={Add} alt="" />
            Add an avatar
          </label>
          <button className="btn btn-primary">
            {loading ? "Loading..." : "Sign Up"}
            {percent > 0 && <strong>{percent}</strong>}
          </button>
          {err && <span>Something went wrong</span>}
        </form>
        <p>
          Do you have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
