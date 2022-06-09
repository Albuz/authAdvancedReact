import { useRef, useContext } from "react";
import AuthContex from "../../stores/auth-context";
import classes from "./ProfileForm.module.css";

const ProfileForm = () => {
  const newPasswordInputRef = useRef();
  const authContext = useContext(AuthContex);

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredPassword = newPasswordInputRef.current.value;

    const updatePassword = fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBO4gXLdBK4BNFBa-3Wti3kAXTRoZDaGec",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authContext.token,
          password: enteredPassword,
          returnSecureToken: false,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        return res.json().then((data) => {
          console.log(data);
        });
      })
      .catch((err) => {});
  };
  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={newPasswordInputRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
