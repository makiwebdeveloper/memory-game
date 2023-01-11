import { FC } from "react";

interface Props {
  orange?: boolean;
}

const Button: FC<Props> = ({ children, orange }) => {
  return (
    <button
      className={`px-6 py-2 rounded-full ${
        orange ? "bg-orange text-white" : "bg-gray text-blue"
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
