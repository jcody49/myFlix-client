import React, { useState } from "react";

export const LoginView = () => {
  const [user, setUser] = useState(null);

  if (!user) {
    return <LoginView />;
  }
  return (
    <form>
      <label>
        Username:
        <input type="text" />
      </label>
      <label>
        Password:
        <input type="password" />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};