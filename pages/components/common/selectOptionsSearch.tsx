import React, { PropsWithChildren, useState } from "react";

function SelectOptionsSearch(props: IProp) {
  const {
    title,
    defaultSelectedOption,
    onSelectButtonClickHandler,
    defaultShowOptions,
    options,
    onOptionSelectedHandler,
  } = props;

  const [filterText, setFilterText] = useState("");
  const [showOptions, setShowOptions] = useState(defaultShowOptions);
  const [selectedOption, setSelectedOption] = useState(defaultSelectedOption);

  const arrowUpIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 float-right  text-white"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 15l7-7 7 7"
      />
    </svg>
  );
  const arrowDownIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6  float-right  text-white"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );
  const selectedComponentIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 float-right"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
  return (
    <>
      <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white absolute">
        {title && (
          <>
            <p className="p-4">Countries</p>
            <div className="border-b-2 m-0"></div>
            <p className="p-4">Select Country: </p>
          </>
        )}
        <div className="m-4">
          <div className="relative">
            <button
              className="bg-amber-400 hover:bg-amber-400 hover:bg-opacity-70 p-3 rounded text-white shadow-inner w-full"
              onClick={() => {
                onSelectButtonClickHandler && onSelectButtonClickHandler();
                setShowOptions(!showOptions);
              }}
            >
              <span className="float-left ">
                <p>
                  {selectedOption || "Please select 1 of the options below"}
                </p>
              </span>

              {showOptions ? arrowUpIcon : arrowDownIcon}
            </button>
            {showOptions && (
              <div className="rounded shadow-md my-2 relative pin-t pin-l">
                <ul className="list-reset">
                  <li className="p-2">
                    <input
                      type="text"
                      className="border-2 rounded h-8 w-full"
                      value={filterText}
                      onChange={(e) => {
                        setFilterText(e.target.value);
                      }}
                    />
                    <br />
                  </li>
                  {options
                    .filter((x) =>
                      x.toLowerCase().includes(filterText.toLowerCase())
                    )
                    .map((s, i) => (
                      <li
                        key={i}
                        onClick={() => {
                          onOptionSelectedHandler(s, i);
                          setShowOptions(false);
                          setSelectedOption(s);
                        }}
                      >
                        <p className="p-2 block text-black hover:bg-gray-200 cursor-pointer">
                          {s}
                          {selectedComponentIcon}
                        </p>
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

type IProp = {
  title?: string;
  onSelectButtonClickHandler?: () => void;
  defaultSelectedOption?: string;
  defaultShowOptions?: boolean;
  options: string[];
  onOptionSelectedHandler: (s: string, i: number) => void;
};
function areEqual(
  prevProps: Readonly<IProp>,
  nextProps: Readonly<IProp>
): boolean {
  /*
  return true if passing nextProps to render would return
  the same result as passing prevProps to render,
  otherwise return false
  */
  const diff = prevProps.options
    .filter((x) => !nextProps.options.includes(x))
    .concat(nextProps.options.filter((x) => !prevProps.options.includes(x)));
  return (
    diff.length == 0 &&
    prevProps.options.length === nextProps.options.length &&
    prevProps.title === nextProps.title &&
    prevProps.defaultSelectedOption === nextProps.defaultSelectedOption &&
    prevProps.defaultShowOptions === nextProps.defaultShowOptions
  );
}
export default React.memo(SelectOptionsSearch, areEqual);
