import { LockClosedIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useState } from "react";
import GoogleButton from "react-google-button";
import { auth, firebase } from "../src/firebase";
import useFirebaseAuth from "../src/helpers/FBAuthApi";
import { UseForm, ValidationType } from "../src/hooks/UseForm";
import loginCss from "../styles/Login.module.css";
import MInput from "./components/common/mInput";
import Toaster, { ToastType } from "./components/common/toaster";

export default function Login() {
  const fbAuth = useFirebaseAuth();
  const router = useRouter();

  const [showToast, setShowToast] = useState(false);
  const [toastText, setToastText] = useState("");
  const [toastTitle, setToastTitle] = useState("");
  const [toastTimer, setToastTimer] = useState(0);
  const [toastType, setToastType] = useState(ToastType.ERROR);

  useEffect(() => {
    if (toastTitle && toastText) {
      setShowToast(true);
    }
  }, [toastText, toastTitle, toastType]);
  const { form, onChangeHandler, onBlurHandler, isFormValid } = UseForm({
    email: {
      value: "",
      validation: { [ValidationType.REQUIRED]: `Email address is required!` },
      errorMsg: "",
    },
    password: {
      value: "",
      validation: {
        [ValidationType.REQUIRED]: `Password is required!`,
      },
      errorMsg: "",
    },
  });

  let handleGoogleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
    auth
      .signInWithPopup(provider)
      .then((user) => {
        setToastType(ToastType.SUCCESS);
        setToastTitle("Success Login");
        setToastText(`Success Login ${user.user?.email}`);
        router.push("/dashboard");
      })
      .catch((err) => {
        setToastTitle("Error Login");
        setToastText(err.message);
      });
  };

  const handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid()) return;
    fbAuth
      .signInWithEmailAndPassword(form.email.value, form.password.value)
      .then((user) => {
        setToastType(ToastType.SUCCESS);
        setToastTitle("Success Register");
        setToastText(`Success Register ${user.user?.email}`);
        router.push("/dashboard");
      })
      .catch((err) => {
        setToastTitle("Error Register");
        setToastText(err.message);
      });
  };

  return (
    <>
      {showToast && (
        <Toaster
          titleText={toastTitle}
          content={toastText}
          type={toastType}
          showForSecond={toastTimer}
          hideToastHandler={() => setShowToast(false)}
        />
      )}
      <div
        className="min-h-screen flex items-center justify-evenly bg-amber-200 py-12 px-4 sm:px-6 lg:px-8"
        id={loginCss.body}
      >
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
                <label htmlFor="email-address" className="sr-only"></label>
                <MInput
                  errortext={form.email.errorMsg}
                  name="email"
                  type="email"
                  autoComplete="email"
                  label="Email address"
                  labelclass={["sr-only"]}
                  required
                  inputclass={[
                    "appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm",
                  ]}
                  placeholder="Email address"
                  onChange={onChangeHandler}
                  value={form.email.value}
                  onBlur={onBlurHandler}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <MInput
                  errortext={form.password.errorMsg}
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={form.password.value}
                  onChange={onChangeHandler}
                  onBlur={onBlurHandler}
                />
              </div>
            </div>

            <a
              href="#"
              className="text-sm text-gray-600 hover:text-opacity-70 mt-2 text-right mr-0"
            >
              Forgot your password?
            </a>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-amber-400 hover:bg-opacity-70 focus:outline-none"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-white"
                    aria-hidden="true"
                  />
                </span>
                Sign in
              </button>
              <div className="grid grid-row-2 content-center mt-2">
                <div className="my-2">
                  <p className="text-gray-500 text-center">Or</p>
                </div>
                <div className="place-self-center">
                  <GoogleButton
                    onClick={handleGoogleSignIn as any}
                    className="justify-center"
                  >
                    Sign In using google
                  </GoogleButton>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
