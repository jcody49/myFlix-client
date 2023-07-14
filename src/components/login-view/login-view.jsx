import React, { useState } from "react";

export const LoginView = ({ onLoggedIn }) => {
    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");

    const handleSubmit = (event) => {
        // this prevents the default behavior of the form which is to reload the entire page
        event.preventDefault();
    
        const data = {
            Username: Username,
            Password: Password
        };
      
        fetch("https://myflixmovieapp-3df5d197457c.herokuapp.com/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then((data) => {
            console.log("Login response: ", data);
            if (data.user) {
            onLoggedIn(data.user, data.token);
            } else {
            alert("No such user");
            }
        })
        .catch((e) => {
            alert("Something went wrong");
        });
    };
    

    return (
        <form onSubmit={handleSubmit}>
            <label>
            Username:
            <input
                type="text"
                value={Username}
                onChange={(e) => setUsername(e.target.value)}
                required
                minLength={5}
                maxLength={20}
            />
            </label>
            <label>
            Password:
            <input
                type="text"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={5}
                maxLength={20}
            />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
};