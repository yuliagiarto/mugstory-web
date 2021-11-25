import React from "react";

const SidenavButton = (props: IProp) => {
  const { onClick, label, children } = props;
  return (
    <>
      <a
        href="#"
        className="flex items-center text-sm font-semibold text-gray-500 hover:text-indigo-600 transition duration-200"
        onClick={onClick}
      >
        {/* TODO: ganti pake image biasa, ga pake Path */}
        {children}
        {label}
      </a>
    </>
  );
};

interface IProp {
  onClick: () => void;
  label: String;
  children?: React.ReactNode;
}

export default SidenavButton;
