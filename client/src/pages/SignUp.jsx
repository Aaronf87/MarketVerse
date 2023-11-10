import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";

import Auth from "../utils/auth.js";

export default function SignUp() {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    username: "",
  });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      console.log("it's broken bro");
      const { data } = await addUser({
        variables: { ...formState },
        onCompleted: (data) => {
          Auth.login(data.addUser.token);
        },
      });
      console.log("helloworld");
      console.log(data);
      if (!data) {
        throw new Error("not today");
      }
    } catch (err) {
      console.error(err);
    }
    setFormState({
      username: "",
      email: "",
      firstName: "",
      lastName: "",
      password: "",
    });
  };

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
                <h1 className="text-3xl font-bold text-gray-900">SING UP</h1>
                <p>Enter your information to Sign up</p>
              </div>

              {/*first name field form */}
              <form onSubmit={handleFormSubmit}>
                <div className="-mx-3 flex">
                  <div className="mb-5 w-1/2 px-3">
                    <label className="px-1 text-xs font-semibold">
                      First name
                    </label>
                    <div className="flex">
                      <div className="pointer-events-none z-10 flex w-10 items-center justify-center pl-1 text-center"></div>
                      <input
                        className="-ml-10 w-full rounded-lg border-2 border-gray-200 py-2 pl-10 pr-3 outline-none focus:border-orange-500"
                        type="text"
                        name="firstName"
                        value={formState.firstName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/*last name field form */}
                  <div className="mb-5 w-1/2 px-3">
                    <label className="px-1 text-xs font-semibold">
                      Last name
                    </label>
                    <div className="flex">
                      <div className="pointer-events-none z-10 flex w-10 items-center justify-center pl-1 text-center"></div>
                      <input
                        className="-ml-10 w-full rounded-lg border-2 border-gray-200 py-2 pl-10 pr-3 outline-none focus:border-orange-500"
                        placeholder="Smith"
                        type="text"
                        name="lastName"
                        value={formState.lastName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                
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

                  {/*email field form */}
                <div className="-mx-3 flex">
                  <div className="mb-5 w-full px-3">
                    <label className="px-1 text-xs font-semibold">Email</label>
                    <div className="flex">
                      <div className="pointer-events-none z-10 flex w-10 items-center justify-center pl-1 text-center"></div>
                      <input
                        className="-ml-10 w-full rounded-lg border-2 border-gray-200 py-2 pl-10 pr-3 outline-none focus:border-orange-500"
                        placeholder="johnsmith@example.com"
                        type="email "
                        name="email"
                        value={formState.email}
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
                      className="mx-auto block w-full max-w-xs rounded-lg bg-orange-500 px-3 py-3 font-semibold text-white hover:bg-orange-600 focus:bg-orange-600"
                    >
                      SIGN UP NOW
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
