import { createContext, ReactNode, useContext, useState } from "react";
import { ICell } from "../types/Cell.interface";
import initialBoard from "../utils/initialBoard";

interface IGameContext {
  board: ICell[];
}

const GameContext = createContext<IGameContext | null>(null);
export const useGame = () => useContext(GameContext) as IGameContext;

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [board, setBoard] = useState<ICell[]>(initialBoard);

  const value: IGameContext = {
    board,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
