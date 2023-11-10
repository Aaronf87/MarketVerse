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
            console.log(data);
            Auth.login(data.login.token);
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
      <>
      <div>
        <div className="min-w-screen flex min-h-screen items-center justify-center bg-gray-900 px-5 py-5">
          <div
            className="w-full overflow-hidden rounded-3xl bg-white text-gray-500 shadow-xl"
            
          >
            <div className="w-full md:flex">
              <div className="w-full px-5 py-10 md:w-1/2 md:px-10">
                <div className="mb-10 text-center">
                  <h1 className="text-3xl font-bold text-gray-900">WELCOME BACK</h1>
                  <p>Add your username and password to login</p>
                </div>
  
                <form onSubmit={handleFormSubmit}>
                  {/*username field form */}
                  <div className="-mx-3 flex">
                    <div className="mb-5 w-full px-3">
                      <label className="px-1 text-xs font-semibold">
                        Username</label>
                      <div className="flex">
                        <div className="pointer-events-none z-10 flex w-10 items-center justify-center pl-1 text-center"></div>
                        <input
                          className="-ml-10 w-full rounded-lg border-2 border-gray-200 py-2 pl-10 pr-3 outline-none focus:border-orange-500"
                          placeholder="john1996"
                          type="text"
                          name="username"
                          value={formState.username}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  {/*password field form */}
                  <div className="-mx-3 flex">
                    <div className="mb-12 w-full px-3">
                      <label className="px-1 text-xs font-semibold">
                        Password
                      </label>
                      <div className="flex">
                        <div className="pointer-events-none z-10 flex w-10 items-center justify-center pl-1 text-center"></div>
                        <input
                          className="-ml-10 w-full rounded-lg border-2 border-gray-200 py-2 pl-10 pr-3 outline-none focus:border-orange-500"
                          placeholder="************"
                          type="password"
                          name="password"
                          value={formState.password}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
  
                    {/* singUp Button for submit form */}
                  <div className="-mx-3 flex">
                    <div className="mb-5 w-full px-3">
                      <button
                        type="submit"
                        onSubmit={handleFormSubmit}
                        className="mx-auto block w-full max-w-xs rounded-lg bg-orange-500 px-3 py-3 font-semibold text-white hover:bg-orange-600 focus:bg-orange-600"
                      >
                        LOGIN
                      </button>
                    </div>
                  </div>
  
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      </>
    );

}