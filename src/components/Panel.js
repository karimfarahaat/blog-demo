import classNames from "classnames";

function Panel({ children, gray, className, ...rest }) {
  const finalClassNames = classNames(
    "border rounded p-4 shadow w-full",
    { "bg-gray-200": gray },
    { "bg-white": !gray },
    className
  );

  return (
    <div {...rest} className={finalClassNames}>
      {children}
    </div>
  );
}

export default Panel;
