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
      <div
        onClick={onCancelHandler}
        className="fixed inset-0 bg-black opacity-50"
      />
      <div className="relative px-4 min-h-screen md:flex md:items-center md:justify-center">
        <div className="bg-white rounded-lg md:max-w-md md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative">
          <div className="md:flex items-center">
            <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
              <p className="font-bold">{headerString}</p>
              {children}
            </div>
          </div>
          <div className="text-center md:text-right mt-4 md:flex md:justify-end">
            <button
              onClick={onSubmitHandler}
              className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-red-200 text-red-700 rounded-lg font-semibold text-sm md:ml-2 md:order-2"
            >
              {submitButtonString}
            </button>
            <button
              onClick={onCancelHandler}
              className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-gray-200 rounded-lg font-semibold text-sm mt-4
          md:mt-0 md:order-1"
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
