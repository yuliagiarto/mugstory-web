import React, { useState } from "react";
import { Contents } from "../../../src/helpers/enum";
import useFirebaseAuth from "../../../src/helpers/FBAuthApi";
import SidenavButton from "../common/sidenavButton";
import Image from "next/image";
import logo from "../../../public/logo1.png";
import { SideNavObject } from "../../../src/types/sidenav";

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
  const [showSideNav, setShowSideNav] = useState(false);
  const iconBasicClass = "float-left mr-4";

  const { changeContentHandler } = props;

  const sidenavObject = Object.values(Contents).map((c) => {
    let icon = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`h-5 w-5 ${iconBasicClass}`}
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
          clipRule="evenodd"
        />
      </svg>
    );
    switch (c) {
      case Contents.story:
        icon = (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-6 w-6 ${iconBasicClass}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
        );
        break;

      default:
        break;
    }
    return { label: c, icon } as SideNavObject;
  });
  return (
    <>
      <div className="py-2 px-2 md:hidden min-h-20 bg-amber-400 items-center flex">
        <div
          className="space-y-1 float-left mr-3 px-2 py-3 bg-amber-400 bg-opacity-50 cursor-pointer"
          onClick={() => {
            setShowSideNav(!showSideNav);
          }}
        >
          <div className="w-5 h-0.5 bg-white"></div>
          <div className="w-5 h-0.5 bg-white"></div>
          <div className="w-5 h-0.5 bg-white"></div>
        </div>
        <div className="flex space-2 items-center">
          <Image src={logo} width={50} height={50} objectFit="cover"></Image>
          <div className="ml-2 w-full item-center">
            <p className="text-3xl font-bold text-white float-left mr-3">
              Mugstory
            </p>
          </div>
        </div>
      </div>
      <div
        className={`py-6 px-6 bg-white ${
          showSideNav ? "block" : "hidden"
        } md:block`}
      >
        <div className="hidden md:flex space-2 items-center border-b-2 pb-4 w-48">
          <Image src={logo} width={50} height={50} objectFit="cover"></Image>
          <div className="ml-3 w-full item-center">
            <p className="text-3xl font-bold text-amber-500">Mugstory</p>
            <p className="text-left text-sm text-amber-400 mt-1 font-serif">
              DASHBOARD
            </p>
          </div>
        </div>
        <div className="md:mt-8 sidebar-item with-children">
          <ul>
            {sidenavObject.map((value, i) => {
              return (
                <li key={i}>
                  <SidenavButton
                    label={value.label}
                    onClick={() => changeContentHandler(value.label)}
                  >
                    {value.icon}
                  </SidenavButton>
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
