import { FC } from "react";
import { useGame } from "../contexts/GameContext";

const Footer: FC = () => {
  const { timer, movesCount } = useGame();
  return (
    <div className="h-[20vh] flex justify-center">
      <div className="w-[310px] flex items-center gap-5">
        <div className="bg-gray text-blue w-full px-4 py-3 rounded-lg flex justify-between items-center">
          <p>Time</p>
          <p className="font-semibold text-xl">
            {timer.m}:{timer.s < 10 ? `0${timer.s}` : timer.s}
          </p>
        </div>
        <div className="bg-gray text-blue w-full px-4 py-3 rounded-lg flex justify-between items-center">
          <p>Moves</p>
          <p className="font-semibold text-xl">{movesCount}</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
