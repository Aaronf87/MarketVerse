import { LOGIN_USER } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import { useState } from "react";

import Auth from "../utils/auth.js";

export default function Login() {
  const [formState, setFormState] = useState({
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
      Auth.login(data.login.token);
    } catch (err) {
      console.log(err);
    }
    setFormState({
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
  };

  return (
    <>
         <div>
        <div className="min-w-screen flex min-h-screen items-center justify-center  px-5 py-5">
          <div className="w-full overflow-hidden rounded-3xl bg-white text-gray-500 shadow-xl">
            <div className="w-full md:flex">
              <div className=" w-full px-5 py-10 md:w-1/2 md:px-10">
                <div className="mb-10 text-center">
                  <h1 className="text-1xl font-bold text-[orange]">LOGIN</h1>
                  <p>Enter your information to Login to your account</p>
                </div>

                {/*first name field form */}
                <form onSubmit={handleFormSubmit}>
                  <div className="-mx-3 flex">
                  </div>


                  {/*username field form */}
                  <div className="-mx-3 flex">
                    <div className="mb-5 w-full px-3">
                      <label className="px-1 text-xs font-semibold">
                        Username
                      </label>
                      <div className="flex">
                        <div className="pointer-events-none z-10 flex w-10 items-center justify-center pl-1 text-center"></div>
                        <input
                          className="-ml-10 w-full rounded-lg border-2 border-gray-200 py-2 pl-10 pr-3 outline-none focus:border-[orange]"
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
                          className="-ml-10 w-full rounded-lg border-2 border-bg-[#f6931c] py-2 pl-10 pr-3 outline-none focus:border-[orange]"
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
                        className="form-btn mx-auto block w-full max-w-xs rounded-lg bg-[#f6931c] px-3 py-3 font-semibold text-[white] hover:bg-[orange] focus:bg-[orange]"
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
