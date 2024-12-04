import React from 'react'
import { twMerge } from 'tailwind-merge';
interface Props {
    children: React.ReactNode,
    className?: string;
    disabled?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = ({children, className, disabled, onClick}: Props) => {
  return <button 
    onClick={onClick}
    disabled={disabled}
    className={twMerge('bg-lightOrange text-base text-white hover:bg-lightGreen hoverEffect md:px-8 md:py-3 rounded-full font-semibold', className)}>
    {children}
  </button>
};
export default Button