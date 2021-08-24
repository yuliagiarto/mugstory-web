import React, { Component } from "react";
import router from "next/router";
import { auth } from "../firebase";

interface IProps {}
interface IState {
  status?: string;
}

const withAuthHOC = (Comp: React.ComponentType) => {
  return class extends React.Component<IProps, IState> {
    constructor(props: IProps) {
      super(props);
      this.state = {
        status: "LOADING",
      };
    }
    componentDidMount() {
      auth.onAuthStateChanged((authUser) => {
        console.log(authUser);
        if (authUser) {
          this.setState({
            status: "SIGNED_IN",
          });
        } else {
          router.push("/login");
        }
      });
    }
    renderContent() {
      const { status } = this.state;
      if (status == "LOADING") {
        return <h1>Loading ......</h1>;
      } else if (status == "SIGNED_IN") {
        return <Comp {...this.props} />;
      }
    }
    render() {
      return <React.Fragment>{this.renderContent()}</React.Fragment>;
    }
  };
};

export default withAuthHOC;
