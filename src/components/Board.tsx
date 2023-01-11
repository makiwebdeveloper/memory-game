import { FC } from "react";
import { useGame } from "../contexts/GameContext";
import Cell from "./Cell";

const Board: FC = () => {
  const { board } = useGame();

  return (
    <div className="w-[310px] h-[310px] flex flex-wrap gap-[10px]">
      {board.map((cell) => (
        <Cell key={cell.id} cell={cell} />
      ))}
    </div>
  );
};

export default Board;
