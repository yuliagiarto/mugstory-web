import React, { Fragment, useEffect } from "react";

interface IProps {
  headerString: String;
  submitButtonString: String;
  cancelButtonString: String;
  onCancelHandler: () => void;
  onSubmitHandler: () => void;
  children: React.ReactNode;
}
const Modal = (props: IProps) => {
  const {
    cancelButtonString,
    submitButtonString,
    headerString,
    onCancelHandler,
    onSubmitHandler,
    children,
  } = props;
  useEffect(() => {});
  return (
    <Fragment>
      <div className="fixed inset-0 bg-black bg-opacity-50 px-4 z-10 md:flex items-center justify-center min-h-screen min-w-screen">
        <div
          className="bg-white opacity-100 rounded-lg md:mx-auto md:my-auto p-4 z-50 md:w-1/3 my-8 mx-4 relative"
          style={{ zIndex: 11 }}
        >
          <div className="items-center w-full">
            <div className="text-center md:text-left">
              <p className="font-bold border-b-2 mb-5 md:text-center">
                {headerString}
              </p>
              {children}
            </div>
          </div>
          <div className="text-center md:text-right mt-4 md:justify-end">
            <button
              onClick={onSubmitHandler}
              className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-green-200 text-green-700 rounded-lg font-semibold text-sm md:ml-2 md:order-2"
            >
              {submitButtonString}
            </button>
            <button
              onClick={onCancelHandler}
              className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-gray-200 rounded-lg font-semibold text-sm mt-4
          md:mt-0 md:order-1 md:ml-2"
            >
              {cancelButtonString}
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Modal;
