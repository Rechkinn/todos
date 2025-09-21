import "./Button.scss";

export default function Button({
  styleClasses,
  children,
  disable = false,
  ...props
}) {
  return (
    <button disabled={disable} {...props} className={styleClasses}>
      {children}
    </button>
  );
}
