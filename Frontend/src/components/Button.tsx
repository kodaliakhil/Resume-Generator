type ButtonVariant = "primary" | "secondary";

type ButtonProps = {
  label: string;
  onClick: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  isLoading?: boolean;
  loadingLabel?: string;
};

const variants = {
  primary: "bg-blue-600 hover:bg-blue-700 text-white",
  secondary: "bg-gray-600 hover:bg-gray-700 text-white",
};

const Button = ({
  label,
  onClick,
  variant = "primary",
  disabled = false,
  isLoading = false,
  loadingLabel,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`rounded-md px-4 py-3 font-medium transition cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]}`}
    >
      {isLoading ? loadingLabel || label : label}
    </button>
  );
};

export default Button;
