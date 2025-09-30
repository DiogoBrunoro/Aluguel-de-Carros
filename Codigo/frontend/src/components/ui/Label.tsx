import type React from "react"

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode
  className?: string
}


export function Label({ children, className = "", ...props }: LabelProps) {
  return (
    <label className={`field-label ${className}`} {...props}>
      {children}
    </label>
  )
}
