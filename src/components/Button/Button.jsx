import "./Button.scss";

export default function Button({ styleClasses, children, disable, ...props }) {
  return (
    <button {...props} className={styleClasses}>
      {children}
    </button>
  );
}
