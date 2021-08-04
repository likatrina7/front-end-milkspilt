import React, { createContext, useState } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [name, setName] = useState("");
  const [id, setId] = useState(null);
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");

  return (
    <UserContext.Provider
      value={{
        name,
        id,
        email,
        avatar,
        setName,
        setId,
        setEmail,
        setAvatar,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
