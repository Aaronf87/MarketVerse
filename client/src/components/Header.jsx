import { Link } from "react-router-dom";
import Logo from "./Logo";

import Auth from "../utils/auth.js";


const Header = () => {

    return (
        <header className="relative flex w-full flex-wrap items-center justify-between bg-[#FBFBFB] py-5 text-neutral-500 shadow-lg hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600 lg:py-4">
            <div className="flex w-full flex-wrap items-center justify-between px-3">
                <a className="ml-2 text-xl text-neutral-800 dark:text-neutral-200" href="#">MarketVerse</a>

                {/* Logo */}
                <Logo />

                <div className="flex items-center text ">

                    {Auth.loggedIn() ? (
                        // Logout Button
                        <button type="button" onClick={() => Auth.logout()} data-te-ripple-init data-te-ripple-color="light" className="text-primary hover:text-primary-600 focus:text-primary-600 active:text-primary-700 mr-3 inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal transition duration-150 ease-in-out hover:bg-gray-200 focus:outline-none focus:ring-0 motion-reduce:transition-none">
                            Logout
                        </button>
                    ) : (
                        // Login Button
                        <Link to="/login" type="button" data-te-ripple-init data-te-ripple-color="light" className="text-primary hover:text-primary-600 focus:text-primary-600 active:text-primary-700 mr-3 inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal transition duration-150 ease-in-out hover:bg-gray-200 focus:outline-none focus:ring-0 motion-reduce:transition-none">
                            Login</Link>
                    )}

                    {/* Sing up button*/}
                    <Link to="/signUp" type="button" data-te-ripple-init data-te-ripple-color="light" className="bg-[#f6931c] hover:bg-primary-600 focus:bg-primary-600 active:bg-blue-700 mr-3 inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] ]">
                        Sign up</Link>

                    {/* Cart button*/}
                    <a className="ml-1 text-neutral-500 transition duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-700 disabled:text-black/30 motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 [&.active]:text-black/90 dark:[&.active]:text-neutral-400" href="#">
                        <span className="[&>svg]:w-5">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                                <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                            </svg>
                        </span>
                    </a>
                </div>
            </div>

        </header>
    );
};

export default Header;


