import React, { InputHTMLAttributes, SelectHTMLAttributes } from "react";

interface IProp extends InputHTMLAttributes<HTMLInputElement> {
  errortext: string;
  label?: string;
  labelclass?: string[];
  inputclass?: string[];
  children?: React.ReactNode;
}
export default function MInput(props: IProp) {
  const { errortext, label, labelclass, inputclass } = props;
  const arrInputElementStyles = inputclass ?? [];
  if (errortext) arrInputElementStyles.push("border border-red-500");

  return (
    <>
      {label && (
        <label className={`block ${labelclass?.join(" ")}`}>{label}</label>
      )}
      {
        <input
          className={`shadow appearance-none border rounded w-full py-2 px-3 ${arrInputElementStyles.join(
            " "
          )}`}
          {...props}
        />
      }
      {errortext ? <p className="text-red-500 italic">{errortext}</p> : null}
    </>
  );
}
