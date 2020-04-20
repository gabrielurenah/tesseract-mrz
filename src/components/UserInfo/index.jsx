import React from "react";

export default function UserInfo(user) {
  return (
    <>
      <span style={{ fontSize: 25, marginTop: 16 }}>User info</span>🔥
      <p>Cedula: {user.documentNumber}</p>
      <p>Name: {user.firstName}</p>
      <p>LastName: {user.lastName}</p>
    </>
  );
}
