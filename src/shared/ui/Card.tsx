// shared/ui/Card.tsx
import type { ReactNode, HTMLAttributes } from 'react'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  title?: string
  actions?: ReactNode
}

export function Card({ children, title, actions, className = '', ...props }: CardProps) {
  return (
    <div className={`card bg-base-100 border-2 border-base-content ${className}`} {...props}>
      {(title || actions) && (
        <div className="card-header flex justify-between items-center p-4">
          {title && <h3 className="card-title">{title}</h3>}
          {actions && <div className="card-actions">{actions}</div>}
        </div>
      )}
      <div className="card-body">
        {children}
      </div>
    </div>
  )
}