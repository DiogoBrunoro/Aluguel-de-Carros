export function Input({ className = "", ...props }) {
  return <input className={`custom-input ${className}`} {...props} />
}
