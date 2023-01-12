import classNames from "classnames";
import { FC } from "react";
import { useGame } from "../contexts/GameContext";
import { ICell } from "../types/Cell.interface";

interface Props {
  cell: ICell;
}

const Cell: FC<Props> = ({ cell }) => {
  const { onCellClick } = useGame();
  const classnames = classNames(
    { "bg-blue text-blue": !cell.isFinded && !cell.isVisible },
    { "bg-gray text-blue": cell.isVisible },
    { "bg-orange text-white": cell.isFinded }
  );

  return (
    <div
      onClick={() => onCellClick(cell.id)}
      className={`w-[70px] h-[70px] rounded-full flex noselect items-center justify-center text-lg font-semibold cursor-pointer ${classnames}`}
    >
      {(cell.isVisible || cell.isFinded) && cell.item}
    </div>
  );
};

export default Cell;
