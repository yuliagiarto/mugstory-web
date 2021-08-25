import { LockClosedIcon } from "@heroicons/react/solid";
import React from "react";
import { useState } from "react";
import GoogleButton from "react-google-button";
import { auth, firebase } from "../src/firebase";
import useFirebaseAuth from "../src/helpers/FBAuthApi";
import loginCss from "../styles/Login.module.css";

export default function Login() {
    const fbAuth = useFirebaseAuth();
    let [registerEmail, setRegisterEmail] = useState("");
    let [registerPassword, setRegisterPassword] = useState("");

    let handleRegisterEmailChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRegisterEmail(e.target.value);
    };

    let handleRegisterPasswordChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRegisterPassword(e.target.value);
    };

    let handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
        auth.signInWithPopup(provider)
            .then(() => {
                alert("You are signed In");
            })
            .catch((err) => {
                alert("OOps something went wrong check your console");
                console.log(err);
            });
    };

    let handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fbAuth.createUserWithEmailAndPassword(registerEmail, registerPassword);
    };

    return (
        <div
            className="min-h-screen flex items-center justify-evenly bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
            id={loginCss.body}
        >
            <div
                className={`max-w-md w-full ${loginCss.outerCard} p-5 rounded-3xl`}
            >
                <div className="text-3xl text-gray-700 mb-2">Register</div>
                <div className="text-xl text-gray-600">
                    Let's get you on board
                </div>
                <div>
                    <form
                        className="mt-8 space-y-6"
                        action="#"
                        method="POST"
                        onSubmit={(e) => handleSignUp(e)}
                    >
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label
                                    htmlFor="email-address"
                                    className="sr-only"
                                >
                                    Email address
                                </label>
                                <input
                                    id="email-address-signup"
                                    name="emailSignup"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Email Address"
                                    onChange={handleRegisterEmailChange}
                                    value={registerEmail}
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input
                                    id="password-signup"
                                    name="passwordSignup"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Password"
                                    value={registerPassword}
                                    onChange={handleRegisterPasswordChange}
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="confirm-password"
                                    className="sr-only"
                                >
                                    Confirm Password
                                </label>
                                <input
                                    id="confirm-password-signup"
                                    name="passwordSignup"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Confirm Password"
                                    value={registerPassword}
                                    onChange={handleRegisterPasswordChange}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                            >
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                    <LockClosedIcon
                                        className="h-5 w-5 text-yellow-500 group-hover:text-yellow-400"
                                        aria-hidden="true"
                                    />
                                </span>
                                Sign Up
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div>
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Sign in to your account
                    </h2>
                </div>
                <form
                    className="mt-8 space-y-6"
                    action="#"
                    method="POST"
                    onSubmit={(e) => handleSignIn(e)}
                >
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email-address" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                                onChange={handleRegisterEmailChange}
                                value={registerEmail}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                                value={registerPassword}
                                onChange={handleRegisterPasswordChange}
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="text-sm">
                            <a
                                href="#"
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                                Forgot your password?
                            </a>
                            <a
                                href="#"
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                            ></a>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <LockClosedIcon
                                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                                    aria-hidden="true"
                                />
                            </span>
                            Sign in
                        </button>
                        <GoogleButton onClick={handleSignIn}>
                            Sign In using google
                        </GoogleButton>
                    </div>
                </form>
            </div>
        </div>
    );
}
