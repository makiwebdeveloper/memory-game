import { FC } from "react";
import { Button } from "../ui";

interface Props {
  restart: () => void;
}

const Header: FC<Props> = ({ restart }) => {
  return (
    <div className="h-[20vh] px-52 flex items-center justify-between">
      <h1 className="text-blue text-3xl font-semibold">memory</h1>
      <div className="flex gap-3">
        <Button orange onClick={restart}>Restart</Button>
        <Button>New Game</Button>
      </div>
    </div>
  );
};

export default Header;
