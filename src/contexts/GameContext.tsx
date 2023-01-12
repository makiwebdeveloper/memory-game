import { createContext, ReactNode, useContext, useState } from "react";
import { useTimer } from "../hooks/useTimer";
import { ICell } from "../types/Cell.interface";
import { getInitialBoard } from "../utils/getInitialBoard";

interface IGameContext {
  board: ICell[];
  start: () => void;
  timeToVisible: number;
  restart: () => void;
  onCellClick: (id: number) => void;
  timer: { m: number; s: number };
  movesCount: number;
}

const GameContext = createContext<IGameContext | null>(null);
export const useGame = () => useContext(GameContext) as IGameContext;

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [isGameOver, setIsGameOver] = useState(false);
  const [board, setBoard] = useState<ICell[]>(() => getInitialBoard());
  const [timeToVisible, setTimeToVisible] = useState(3);
  const [prevCell, setPrevCell] = useState<ICell | null>(null);
  const [isTimeout, setIsTimeout] = useState(false);
  const [movesCount, setMovesCount] = useState(0);

  const [isFirstClick, setIsFirstClick] = useState(true);
  const { timer, startTimer, stopTimer, setTimer } = useTimer();

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
      setIsFirstClick(true);
      stopTimer();
      setTimer({ m: 0, s: 0 });
      setMovesCount(0);
    }
  };

  const onCellClick = (id: number) => {
    if (isFirstClick) {
      startTimer();
      setIsFirstClick(false);
    }

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
        setMovesCount((prev) => prev + 1);
      } else {
        setIsTimeout(true);
        setMovesCount((prev) => prev + 1);
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
    timer,
    movesCount,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
