import React from "react";
import { auth } from "../../../src/firebase";
import { Contents } from "../../../src/helpers/enum";
import useFirebaseAuth from "../../../src/helpers/FBAuthApi";
import SidenavButton from "../common/sidenavButton";
import Image from "next/image";
import logo from "../../../public/logo1.png";

interface IProps {
  changeContentHandler: (content: Contents) => void;
}

export default function SidenavBar(props: IProps) {
  const { signOut } = useFirebaseAuth();
  const handleLogout = () => {
    signOut()
      .then(function () {})
      .catch(function (error) {
        console.error(error);
      });
  };

  const { changeContentHandler } = props;
  return (
    <>
      <div className="py-12 px-6 w-1/6">
        <div className="flex space-2 items-center border-b-2 pb-4">
          <div className="w-fit h-fit">
            <Image src={logo} width={50} height={50} objectFit="cover"></Image>
          </div>
          <div className="ml-3 w-full item-center">
            <p className="text-3xl font-bold text-amber-500">Mugstory</p>
            <p className="text-left text-sm text-amber-400 mt-1 font-serif">
              DASHBOARD
            </p>
          </div>
        </div>
        <div className="mt-8">
          <ul>
            {Object.values(Contents).map((value, i) => {
              return (
                <li key={i}>
                  <SidenavButton
                    label={value}
                    onClick={() => changeContentHandler(value)}
                  ></SidenavButton>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="mt-20 space-x-4 items-center">
          <SidenavButton label="Logout" onClick={handleLogout}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-amber-400 hover:text-orange-600 transition duration-200 float-left mr-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
          </SidenavButton>
        </div>
      </div>
    </>
  );
}
