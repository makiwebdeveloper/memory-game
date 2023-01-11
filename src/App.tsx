import { useEffect } from "react";
import { Board, Footer, Header } from "./components";
import { useGame } from "./contexts/GameContext";

function App() {
  const { start, timeToVisible, restart } = useGame();

  useEffect(() => {
    start();
  }, [timeToVisible]);

  return (
    <div>
      <Header restart={restart} />
      <div className="h-[60vh] w-full flex justify-center items-center relative">
        <Board />
        {timeToVisible > 0 && (
          <div className="absolute -top-5 text-blue font-semibold text-3xl">
            {timeToVisible}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;
