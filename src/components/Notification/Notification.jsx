import "./Notification.scss";

export default function Notification({
  modifier,
  text = "This is empty notification.",
}) {
  return (
    <div className="notification">
      <div className={`notification__inner notification__inner_${modifier}`}>
        <span className="notification__text">{text}</span>
      </div>
    </div>
  );
}
