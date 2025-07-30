import "./Button.scss";

export default function Button({ styleClasses, children, ...props }) {
  return (
    <button {...props} className={styleClasses}>
      {children}
    </button>
  );
}
