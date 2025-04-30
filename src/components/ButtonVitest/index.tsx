interface ButtonProps {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export const ButtonVitest: React.FC<ButtonProps> = ({
  children,
  type = 'button',
  className = '',
  disabled = false,
  onClick,
}) => {
  return (
    <button
      className={`h-10 w-20 bg-amber-300 active:scale-90 ${className}`}
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ButtonVitest;
