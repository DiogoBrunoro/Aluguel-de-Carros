export function Label({ children, className = "", ...props }) {
  return (
    <label className={`field-label ${className}`} {...props}>
      {children}
    </label>
  )
}
