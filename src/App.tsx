import { useEffect } from "react";
import { Board, Footer, Header } from "./components";
import { useGame } from "./contexts/GameContext";
import { Button } from "./ui";

function App() {
  const { startGame, timeToVisible, restartGame, isGameOver } = useGame();

  useEffect(() => {
    startGame();
  }, [timeToVisible]);

  return (
    <div>
      <Header restartGame={restartGame} />
      <div className="h-[60vh] w-full flex justify-center items-center relative">
        {!isGameOver ? (
          <>
            <Board />
            {timeToVisible > 0 && (
              <div className="absolute -top-5 text-blue font-semibold text-3xl">
                {timeToVisible}
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center gap-5">
            <p className="text-[50px] text-blue">Game Over</p>
            <Button onClick={restartGame}>Play again</Button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;
