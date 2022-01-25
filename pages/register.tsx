import { LockClosedIcon } from "@heroicons/react/solid";
import React, { useEffect, useState } from "react";
import useFirebaseAuth from "../src/helpers/FBAuthApi";
import { UseForm, ValidationType } from "../src/hooks/UseForm";
import loginCss from "../styles/Login.module.css";
import MInput from "./components/common/mInput";
import Toaster, { ToastType } from "./components/common/toaster";

export default function Register() {
  const fbAuth = useFirebaseAuth();
  const [showToast, setShowToast] = useState(false);
  const [toastText, setToastText] = useState("");
  const [toastTitle, setToastTitle] = useState("");
  const [toastTimer, setToastTimer] = useState(2000);
  const [toastType, setToastType] = useState(ToastType.ERROR);

  let handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid()) return;
    fbAuth
      .createUserWithEmailAndPassword(form.email.value, form.password.value)
      .then((user) => {
        console.log(user);
      })
      .catch((reason) => {
        setToastTitle("Error Register");
        setToastText(reason.message);
      });
  };

  useEffect(() => {
    if (toastTitle && toastText) {
      setShowToast(true);
    }
  }, [toastText, toastTitle]);

  const { form, onChangeHandler, onBlurHandler, isFormValid } = UseForm({
    email: {
      value: "",
      validation: { [ValidationType.REQUIRED]: `Email address is required!` },
      errorMsg: "",
    },
    password: {
      value: "",
      validation: { [ValidationType.REQUIRED]: `Password is required!` },
      errorMsg: "",
    },
    confirm: {
      value: "",
      validation: {
        [ValidationType.REQUIRED]: `Confirm Password is required!`,
        [ValidationType.CONFIRM]: "Confirm Password not match Password",
      },
      errorMsg: "",
    },
  });

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
        <div
          className={`max-w-md w-full ${loginCss.outerCard} p-5 rounded-3xl`}
        >
          <div className="text-3xl text-gray-700 mb-2">Register</div>
          <div className="text-xl text-gray-600">{`Let's get you on board`}</div>

          <form
            className="mt-8 space-y-6"
            action="#"
            method="POST"
            onSubmit={(e) => handleSignUp(e)}
          >
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <MInput
                  id="email-address-signup"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  errortext={form.email.errorMsg}
                  inputclass={[
                    "appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm",
                  ]}
                  placeholder="Email Address"
                  onChange={onChangeHandler}
                  onBlur={onBlurHandler}
                  value={form.email.value}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <MInput
                  id="password-signup"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  errortext={form.password.errorMsg}
                  inputclass={[
                    "appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm",
                  ]}
                  placeholder="Password"
                  value={form.password.value}
                  onChange={onChangeHandler}
                  onBlur={onBlurHandler}
                />
              </div>
              <div>
                <label htmlFor="confirm-password" className="sr-only">
                  Confirm Password
                </label>
                <MInput
                  id="confirm-password-signup"
                  name="confirm"
                  type="password"
                  autoComplete="current-password"
                  required
                  errortext={form.confirm.errorMsg}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm"
                  placeholder="Confirm Password"
                  value={form.confirm.value}
                  onChange={onChangeHandler}
                  onBlur={onBlurHandler}
                />
              </div>
            </div>
            <div className="text-center w-full">
              <a
                href="login"
                className="font-small text-gray-400 hover:text-opacity-70"
              >
                I already have an account
              </a>
            </div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-amber-400 hover:bg-opacity-70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LockClosedIcon
                  className="h-5 w-5 text-white"
                  aria-hidden="true"
                />
              </span>
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
