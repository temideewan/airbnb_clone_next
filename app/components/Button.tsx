"use client";
import { IconType } from "react-icons";
import PuffLoader from "react-spinners/PuffLoader";

interface ButtonProps {
  label: String;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: Boolean;
  small?: boolean;
  icon?: IconType;
  isLoading?: boolean;

}
export const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  icon: Icon,
  isLoading = false,
}) => {
  return (
    <button onClick={onClick} disabled={disabled} className={`
      relative
      disabled:opacity-70
      disabled:cursor-not-allowed
      rounded-lg
      hover:opacity-80
      transition
      w-full
      flex
      items-center
      justify-center
      ${outline ? 'bg-white' : 'bg-rose-500'}
      ${outline ? 'border-black' : 'bg-rose-500'}
      ${outline ? 'text-black' : 'text-white'}
      ${small ? 'py-1' : 'py-3'}
      ${small ? 'text-sm' : 'text-md'}
      ${small ? 'font-light' : 'font-semibold'}
      ${small ? 'border-[1px]' : 'border-2'}
    `}>
      {Icon && (
        <Icon
          size={24}
          className="absolute left-4 top-3"
        />
      )}
      {isLoading? <PuffLoader size={24} color={outline? '#f43f5e': "white"} />:label}
    </button>
  )
}
