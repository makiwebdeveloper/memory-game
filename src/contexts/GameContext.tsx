import { createContext, ReactNode, useContext, useState } from "react";
import { ICell } from "../types/Cell.interface";
import { getInitialBoard } from "../utils/getInitialBoard";

interface IGameContext {
  board: ICell[];
  start: () => void;
  timeToVisible: number;
  restart: () => void;
  onCellClick: (id: number) => void;
}

const GameContext = createContext<IGameContext | null>(null);
export const useGame = () => useContext(GameContext) as IGameContext;

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [isGameOver, setIsGameOver] = useState(false);
  const [board, setBoard] = useState<ICell[]>(() => getInitialBoard());
  const [timeToVisible, setTimeToVisible] = useState(3);
  const [prevCell, setPrevCell] = useState<ICell | null>(null);
  const [isTimeout, setIsTimeout] = useState(false);

  const start = () => {
    if (timeToVisible > 0) {
      setTimeout(() => {
        setTimeToVisible((prev) => prev - 1);
      }, 1000);
    } else {
      setBoard((board) =>
        board.map(
          (cell) => true && { ...cell, isVisible: false, isFinded: false }
        )
      );
    }
  };

  const restart = () => {
    if (timeToVisible === 0) {
      setTimeToVisible(3);
      setBoard(() => getInitialBoard());
    }
  };

  const onCellClick = (id: number) => {
    const clickedCell = board.find((cell) => cell.id === id);

    if (
      clickedCell &&
      !clickedCell.isFinded &&
      !clickedCell.isVisible &&
      !isTimeout
    ) {
      setBoard((board) =>
        board.map((cell) =>
          cell.id === clickedCell.id ? { ...cell, isVisible: true } : cell
        )
      );

      if (!prevCell) {
        setPrevCell(clickedCell);
      } else if (
        prevCell &&
        prevCell.id !== clickedCell.id &&
        prevCell.item === clickedCell.item
      ) {
        setBoard((board) =>
          board.map((cell) =>
            cell.id === clickedCell.id || cell.id === prevCell.id
              ? { ...cell, isFinded: true, isVisible: false }
              : cell
          )
        );
        setPrevCell(null);
      } else {
        setIsTimeout(true);
        setTimeout(() => {
          setBoard((board) =>
            board.map((cell) =>
              cell.id === clickedCell.id || cell.id === prevCell.id
                ? { ...cell, isVisible: false }
                : cell
            )
          );
          setPrevCell(null);
          setIsTimeout(false);
        }, 1000);
      }
    }
  };

  const value: IGameContext = {
    board,
    start,
    restart,
    timeToVisible,
    onCellClick,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
