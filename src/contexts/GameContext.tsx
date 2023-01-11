import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { ICell } from "../types/Cell.interface";
import { getInitialBoard } from "../utils/getInitialBoard";

interface IGameContext {
  board: ICell[];
  start: () => void;
  timeToVisible: number;
  restart: () => void;
}

const GameContext = createContext<IGameContext | null>(null);
export const useGame = () => useContext(GameContext) as IGameContext;

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [isGameOver, setIsGameOver] = useState(false);
  const [board, setBoard] = useState<ICell[]>(() => getInitialBoard());
  const [timeToVisible, setTimeToVisible] = useState(3);

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

  const value: IGameContext = {
    board,
    start,
    restart,
    timeToVisible,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
