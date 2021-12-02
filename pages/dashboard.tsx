import React from "react";
import { Contents } from "../src/helpers/enum";
import withAuth from "../src/helpers/withAuthHOC";
import Example from "./components/dashboard/contents/example";
import Profile from "./components/dashboard/contents/profile";
import Status from "./components/dashboard/contents/status";
import TreeComponent from "./components/dashboard/contents/tree";
import SidenavBar from "./components/dashboard/sidenavBar";

interface IProps {}
interface IState {
  content: Contents;
}
class Dashboard extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { content: Contents.status };
    this.getContent = this.getContent.bind(this);
    this.changeContentHandler = this.changeContentHandler.bind(this);
  }
  getContent(): React.ReactNode {
    switch (this.state.content) {
      case Contents.example:
        return <Example />;
      case Contents.profile:
        return <Profile />;
      case Contents.status:
        return <Status />;
      case Contents.tree:
        return <TreeComponent />;
      default:
        return <div>404 not found</div>;
    }
  }

  changeContentHandler(content: Contents) {
    this.setState((prev) => ({ content: content }));
  }

  render() {
    return (
      <div className="min-h-screen flex">
        <SidenavBar changeContentHandler={this.changeContentHandler} />
        <div className="bg-indigo-50 flex-grow py-12 px-10">
          {this.getContent()}
        </div>
      </div>
    );
  }
}

export default withAuth(Dashboard);
