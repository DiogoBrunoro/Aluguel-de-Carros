export function Button({ children, variant = "default", size = "default", className = "", ...props }) {
  const baseClass = "btn-base"

  const variants = {
    default: "btn-primary",
    secondary: "btn-secondary",
    outline: "btn-outline",
    ghost: "btn-ghost",
  }

  const sizes = {
    sm: "btn-sm",
    default: "btn-default",
    lg: "btn-lg",
  }

  const variantClass = variants[variant] || variants.default
  const sizeClass = sizes[size] || sizes.default

  return (
    <button className={`${baseClass} ${variantClass} ${sizeClass} ${className}`} {...props}>
      {children}
    </button>
  )
}
