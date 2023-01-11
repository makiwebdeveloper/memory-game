import { FC } from "react";

interface Props {
  orange?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button: FC<Props> = ({ children, orange, onClick }) => {
  return (
    <button
      className={`px-6 py-2 rounded-full ${
        orange ? "bg-orange text-white" : "bg-gray text-blue"
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
