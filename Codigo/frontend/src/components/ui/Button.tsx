
import type React from "react"

type ButtonVariant = "default" | "secondary" | "outline" | "ghost"
type ButtonSize = "sm" | "default" | "lg"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
}

export function Button({ children, variant = "default", size = "default", className = "", ...props }: ButtonProps) {
  const baseClass = "btn-base"

  const variants: Record<ButtonVariant, string> = {
    default: "btn-primary",
    secondary: "btn-secondary",
    outline: "btn-outline",
    ghost: "btn-ghost",
  }

  const sizes: Record<ButtonSize, string> = {
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
