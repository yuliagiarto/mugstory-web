import React, { InputHTMLAttributes, ChangeEvent, useState } from "react";

interface IProp extends InputHTMLAttributes<HTMLInputElement> {
    errortext?: string;
    label?: string;
    labelclass?: string[];
    inputclass?: string[];
}
export default function MFInput(props: IProp) {
    const [file, setFile] = useState<File>();
    const { errortext, label, labelclass, inputclass } = props;
    const arrInputElementStyles = inputclass ?? [];
    if (errortext) arrInputElementStyles.push("border border-red-500");

    return (
        <>
            {label && (
                <label className={`block ${labelclass?.join(" ")}`}>
                    {label}
                </label>
            )}
            <br />
            <input
                type="file"
                className={`shadow appearance-none border rounded w-full py-2 px-3 ${arrInputElementStyles.join(
                    " "
                )}`}
                {...props}
            />
        </>
    );
}
