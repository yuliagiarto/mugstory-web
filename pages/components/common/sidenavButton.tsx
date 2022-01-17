import React from "react";

const SidenavButton = (props: IProp) => {
  const { onClick, label, children } = props;
  return (
    <>
      <a
        href="#"
        className="block px-4 py-2 mt-2 text-sm font-semibold text-amber-400 hover:text-white hover:bg-amber-400 hover:bg-opacity-40 transition duration-200"
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
