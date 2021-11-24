import React from "react";
import withAuth from "../src/helpers/withAuthHOC";
import SidenavBar from "./components/dashboard/sidenavBar";
import { auth, firebase } from "../src/firebase";

class Dashboard extends React.Component {
  render() {
    return (
      <div className="min-h-screen flex">
        <SidenavBar />
        <div className="bg-indigo-50 flex-grow py-12 px-10">
          <div className="flex justify-between">
            <div>
              <h4 className="text-sm font-bold text-indigo-600">Hi Andrei,</h4>
              <h1 className="text-4xl font-bold text-indigo-900 mt-">
                Welcome to Venus!
              </h1>
            </div>
            <div>
              <div className="flex items-center border rounded-lg bg-white w-max py-2 px-4 space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input type="text" placeholder="Search" />
              </div>
            </div>
          </div>
          <div>
            <div className="flex space-x-10">
              <div className="flex items-center justify-around p-6 bg-white w-64 rounded-xl space-x-2 mt-10 shadow-lg">
                <div>
                  <span className="text-sm font-semibold text-gray-400">
                    Spent this month
                  </span>
                  <h1 className="text-2xl font-bold">$682.5</h1>
                </div>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-indigo-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 11l7-7 7 7M5 19l7-7 7 7"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex items-center justify-around p-6 bg-white w-64 rounded-xl space-x-2 mt-10 shadow-lg">
                <div>
                  <span className="text-sm font-semibold text-gray-400">
                    Spent this month
                  </span>
                  <h1 className="text-2xl font-bold">$682.5</h1>
                </div>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-indigo-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                </div>
              </div>
              <div className="flex items-center justify-around p-6 bg-white w-64 rounded-xl space-x-2 mt-10 shadow-lg">
                <div>
                  <span className="text-sm font-semibold text-gray-400">
                    Spent this month
                  </span>
                  <h1 className="text-2xl font-bold">$682.5</h1>
                </div>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-indigo-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 13v-1m4 1v-3m4 3V8M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex items-center justify-around p-6 bg-white w-64 rounded-xl space-x-2 mt-10 shadow-lg">
                <div>
                  <span className="text-sm font-semibold text-gray-400">
                    Spent this month
                  </span>
                  <h1 className="text-2xl font-bold">$682.5</h1>
                </div>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-indigo-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="flex mt-10 space-x-10">
              <div className="bg-white w-2/3 p-8 flex items-center justify-around rounded-xl shadow-lg">
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-gray-400">
                    Total Spent
                  </h3>
                  <h1 className="text-4xl font-bold text-indigo-600">$682.5</h1>
                </div>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-40 w-40 text-indigo-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex-grow bg-white rounded-xl shadow-lg">sa</div>
            </div>
            <div></div>
            <div></div>
          </div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }
}

export default withAuth(Dashboard);
