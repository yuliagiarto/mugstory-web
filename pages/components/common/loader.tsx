import React from "react";

function Loader(props: IProp) {
  const { loadingText } = props;
  return (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
        <div
          style={{ borderTopColor: "transparent" }}
          className="w-16 h-16 border-4 border-blue-400 border-solid rounded-full animate-spin"
        ></div>
        <h2 className="text-center text-white text-xl font-semibold">
          Loading...
        </h2>
        {loadingText && (
          <p className="w-1/3 text-center text-white">{loadingText}</p>
        )}
      </div>
    </>
  );
}

type IProp = {
  loadingText?: string;
};

export default Loader;
