import { FC } from "react";
import { Button } from "../ui";

interface Props {
  restartGame: () => void;
}

const Header: FC<Props> = ({ restartGame }) => {
  return (
    <div className="h-[20vh] px-10 md:px-52 flex items-center justify-between">
      <h1 className="text-blue text-3xl font-semibold">memory</h1>
      <Button orange onClick={restartGame}>
        Restart
      </Button>
    </div>
  );
};

export default Header;
