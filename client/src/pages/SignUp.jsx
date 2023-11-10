import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth.js';

export default function SignUp () {

    const [formState, setFormState] = useState({ email: '', password: '', firstName:'', lastName:'', username:'' });
    const [addUser] = useMutation(ADD_USER);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await addUser({
                variables: { ...formState },
                onCompleted: (data) => {
                    Auth.login(data.addUser.token);
                },
            });
            if (!data) {
                throw new Error('not today');
            } 
        } catch(err) {
            console.error(err);
        }
        setFormState({
            username: "",
            email: "",
            firstName: "",
            lastName: "",
            password: "",
        });
        console.log(formState);

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
        <div className="container my-1">
        <h2>Signup</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="flex-row space-between my-2">
            <label htmlFor="firstName">First Name:</label>
            <input
              placeholder="First"
              name="firstName"
              type="text"
              id="firstName"
              value= {formState.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="flex-row space-between my-2">
            <label htmlFor="lastName">Last Name:</label>
            <input
              placeholder="Last"
              name="lastName"
              type="text"
              id="lastName"

              value= {formState.lastName}
              onChange={handleChange}
            />
          </div>
          <div className="flex-row space-between my-2">
            <label htmlFor="email">Email:</label>
            <input
              placeholder="youremail@verse.com"
              name="email"
              type="email"
              id="email"

              value= {formState.email}
              onChange={handleChange}
            />
          </div>
          <div className="flex-row space-between my-2">
            <label htmlFor="pwd">Password:</label>
            <input
              placeholder="******"
              name="password"
              type="password"
              id="pwd"

              value= {formState.password}
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
