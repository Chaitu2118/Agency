/**
 * TiltContainer Component
 * Static container component without hover movement or tilt shifts.
 */
export default function TiltContainer({
  children,
  className = "",
  style = {},
  onClick,
}) {
  return (
    <div className={className} style={style} onClick={onClick}>
      {children}
    </div>
  );
}
