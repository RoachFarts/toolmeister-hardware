import React from 'react'

interface LoaderProps {
  size?: 'small' | 'medium' | 'large'
  color?: string
  title?: string
}

const Loader: React.FC<LoaderProps> = ({ size = 'medium', color = '#2563eb', title }) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  }

  return (
    <div className="flex justify-center items-center" role="status" aria-label="Loading">
      <div
        className={`${sizeClasses[size]} animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]`}
        style={{ borderColor: `${color} transparent ${color} ${color}` }}
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )
}

export default Loader