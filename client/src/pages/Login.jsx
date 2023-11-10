import { LOGIN_USER } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import { useState } from "react";

import Auth from '../utils/auth.js';

export default function Login() {
    const [formState, setFormState] = useState ({
        username: "",
        password: "",
    });
    
    const [loginUser] = useMutation(LOGIN_USER);

    // submit form
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await loginUser({
                variables: { ...formState },
            });
            Auth.login(data.loginUser.token);
        } catch (err) {
            console.log(err);
        }
        setFormState ({
            username: "",
            password: "",
        });
    };

    //update state base on the input/change
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
        console.log(formState);
    };

    return (
        <div className="container my-1">
        <h2>Signup</h2>
        <form onSubmit={handleFormSubmit}>
          
          <div className="flex-row space-between my-2">
            <label htmlFor="username">Username:</label>
            <input
              placeholder="jhon12"
              name="username"
              type="text"
              value={formState.username}
              onChange={handleChange}
            />
          </div>
         
          <div className="flex-row space-between my-2">
            <label htmlFor="pwd">Password:</label>
            <input
              placeholder="******"
              name="password"
              type="password"
              value={formState.password}
              onChange={handleChange}
            />
          </div>
          <div className="flex-row flex-end">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    );

}