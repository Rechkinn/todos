import "./Input.scss";
import { useState } from "react";

export default function Input({
  styleClasses,
  placeholder,
  initialValue,
  ...props
}) {
  const [valueInput, setValueInput] = useState(
    initialValue ? initialValue : ""
  );

  return (
    <input
      {...props}
      type="text"
      maxLength={20}
      className={styleClasses}
      placeholder={placeholder}
      onChange={(event) => {
        setValueInput(event.target.value);
      }}
      value={valueInput}
    />
  );
}
