import React, { useCallback, useMemo, useState } from "react";
import { Contents } from "../src/helpers/enum";
import withAuth from "../src/helpers/withAuthHOC";
import Example from "./components/dashboard/contents/example";
import Profile from "./components/dashboard/contents/profile";
import Status from "./components/dashboard/contents/status";
import StoryComponent from "./components/dashboard/contents/story";
import SidenavBar from "./components/dashboard/sidenavBar";

interface IState {
  content: Contents;
}
const Dashboard = () => {
  const [content, setContent] = useState(Contents.story);
  const getContent = (): React.ReactNode => {
    switch (content) {
      case Contents.example:
        return <Example />;
      case Contents.profile:
        return <Profile />;
      case Contents.status:
        return <Status />;
      case Contents.story:
        return <StoryComponent />;
      default:
        return <div>404 not found</div>;
    }
  };
  const changeContentHandler = useCallback(
    (content: Contents) => {
      setContent(content);
    },
    [setContent]
  );

  return (
    <div className="min-h-screen flex">
      <SidenavBar changeContentHandler={changeContentHandler} />
      <div className="bg-amber-200 bg-opacity-30 flex-grow py-12 px-10">
        {getContent()}
      </div>
    </div>
  );
};

export default withAuth(React.memo(Dashboard));
