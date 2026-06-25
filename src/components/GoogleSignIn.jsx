import { auth } from "../firebase";
import { useState, useEffect } from "react";

import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
function GoogleSignIn() {

  
const [user, setUser] = useState(null);

useEffect(() => {
  const unsubscribe = onAuthStateChanged(
    auth,
    (currentUser) => {
      setUser(currentUser);
    }
  );

  return () => unsubscribe();
}, []);

  async function handleGoogleSignIn() {
    try {

      const provider = new GoogleAuthProvider();

      const result =
        await signInWithPopup(
          auth,
          provider
        );

      setUser(result.user);

    } catch (error) {

      console.error(error);

    }
  }

  async function handleLogout() {
  await signOut(auth);
  setUser(null);
}

return (
  <div className="user-section">

    {user ? (

      <div className="user-info">

        <img
          src={user.photoURL}
          alt="profile"
          className="profile-pic"
        />

        <p>{user.displayName}</p>

        <p>{user.email}</p>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    ) : (

      <button onClick={handleGoogleSignIn}>
        Sign in with Google
      </button>

    )}

  </div>
);
}

export default GoogleSignIn;