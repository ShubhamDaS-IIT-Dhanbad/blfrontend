import React, { createContext, useContext, useState } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../firebase.config.js";

const UserAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [confirmationResult, setConfirmationResult] = useState(null);

  function setUpRecaptcha(number) {
    const recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          console.log("reCAPTCHA solved, you can proceed with sign-in");
        },
        "expired-callback": () => {
          console.log("reCAPTCHA expired, please solve it again");
        },
      },
      auth
    );
    recaptchaVerifier.render();
    return signInWithPhoneNumber(auth, number, recaptchaVerifier);
  }

  return (
    <UserAuthContext.Provider value={{ setUpRecaptcha, setConfirmationResult, confirmationResult }}>
      {children}
    </UserAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(UserAuthContext);
}
