import React, { Component, useEffect, useState } from "react";
import router from "next/router";
import { auth } from "../firebase";
import useFirebaseAuth from "./FBAuthApi";

type IProp = {};

const withAuthHOC = (Comp: React.ComponentType) => {
  return (props: IProp) => {
    const [status, setStatus] = useState("LOADING");
    const { authUser, loading } = useFirebaseAuth();

    useEffect(() => {
      if (authUser?.email) {
        setStatus("SIGNED_IN");
      } else if (!loading) {
        router.push("/login");
      }
      return () => {};
    }, [authUser, loading]);

    const renderContent = () => {
      if (status == "LOADING") {
        return <h1>Loading ......</h1>;
      } else if (status == "SIGNED_IN") {
        return <Comp {...props} />;
      }
    };

    return <React.Fragment>{renderContent()}</React.Fragment>;
  };
};

export default withAuthHOC;
