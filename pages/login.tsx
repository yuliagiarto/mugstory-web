import { LockClosedIcon } from "@heroicons/react/solid";
import React from "react";
import { useState } from "react";
import GoogleButton from "react-google-button";
import { auth, firebase } from "../src/firebase";
import useFirebaseAuth from "../src/helpers/FBAuthApi";
import loginCss from "../styles/Login.module.css";
import styled from "styled-components";

const GoogleLoginButton = styled(GoogleButton)`
    border-radius: 5px !important;
    width: unset !important;
    > div {
        border-radius: 5px !important;
        margin-left: 3px !important;
        margin-top: 5px !important;
    }
    > * {
        width: 42px !important;
        height: 42px !important;
    }
    > div svg {
        width: 42px !important;
        height: 42px !important;
    }
`;

export default function Login() {
    const fbAuth = useFirebaseAuth();
    let [registerEmail, setRegisterEmail] = useState("");
    let [registerPassword, setRegisterPassword] = useState("");
    let [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
    let [loginEmail, setLoginEmail] = useState("");
    let [loginPassword, setLoginPassword] = useState("");

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
    let handleRegisterConfirmPasswordChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRegisterConfirmPassword(e.target.value);
    };

    let handleLoginEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginEmail(e.target.value);
    };
    let handleLoginPasswordChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setLoginPassword(e.target.value);
    };

    let handleGoogleSignIn = () => {
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

    let handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fbAuth.signInWithEmailAndPassword(loginEmail, loginPassword);
    };

    return (
        <div
            className="min-h-screen flex items-center justify-evenly bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
            id={loginCss.body}
        >
            <div
                className={`max-w-md w-full ${loginCss.outerCard} p-5 rounded-3xl`}
            >
                <div className="text-3xl text-gray-600 mb-2">Register</div>
                <div className="text-xl text-gray-500">
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
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-t-md focus:outline-none focus:ring-burnt-sienna-400 focus:border-burnt-sienna-400 focus:z-10 sm:text-sm"
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
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-burnt-sienna-400 focus:border-burnt-sienna-400 focus:z-10 sm:text-sm"
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
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-b-md focus:outline-none focus:ring-burnt-sienna-400 focus:border-burnt-sienna-400 focus:z-10 sm:text-sm"
                                    placeholder="Confirm Password"
                                    value={registerConfirmPassword}
                                    onChange={
                                        handleRegisterConfirmPasswordChange
                                    }
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-burnt-sienna-500 hover:bg-burnt-sienna-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-burnt-sienna-500"
                            >
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                    <LockClosedIcon
                                        className="h-5 w-5 text-sandy-brown-500 group-hover:text-sandy-brown-400"
                                        aria-hidden="true"
                                    />
                                </span>
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className={loginCss.vl}></div>
            <div
                className={`max-w-md w-full ${loginCss.outerCard} p-5 rounded-3xl`}
            >
                <div className="text-3xl text-gray-600 mb-2">Login</div>
                <div className="text-xl text-gray-500">
                    Welcome back, please login to your account
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
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-burnt-sienna-500 focus:border-burnt-sienna-500 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                                onChange={handleLoginEmailChange}
                                value={loginEmail}
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
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-burnt-sienna-500 focus:border-burnt-sienna-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                                value={loginPassword}
                                onChange={handleLoginPasswordChange}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-burnt-sienna-500 hover:bg-burnt-sienna-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-burnt-sienna-500"
                        >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <LockClosedIcon
                                    className="h-5 w-5 text-sandy-brown-500 group-hover:text-sandy-brown-400"
                                    aria-hidden="true"
                                />
                            </span>
                            Login
                        </button>
                        <p
                            className={`text-gray-400 my-4 ${loginCss.textBetweenLine}`}
                        >
                            or
                        </p>
                        <GoogleLoginButton onClick={handleGoogleSignIn}>
                            Login with Google
                        </GoogleLoginButton>
                    </div>
                </form>
            </div>
        </div>
    );
}
