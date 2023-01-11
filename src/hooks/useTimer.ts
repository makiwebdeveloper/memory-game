import { useState } from "react";

export const useTimer = () => {
  const [timer, setTimer] = useState<{ m: number; s: number }>({ m: 0, s: 0 });
  const [interv, setInterv] = useState<any>();
  const [timerRun, setTimerRun] = useState(true);

  let updateM = timer.m;
  let updateS = timer.s;

  const runTimer = () => {
    if (updateS === 59) {
      updateM++;
      updateS = -1;
    }
    updateS++;
    return setTimer({ s: updateS, m: updateM });
  };

  const startTimer = () => {
    setTimerRun(true);
    runTimer();
    setInterv(setInterval(runTimer, 1000));
  };

  const stopTimer = () => {
    setInterv(clearInterval(interv));
    setTimerRun(false);
  };

  return { timer, startTimer, setTimerRun, stopTimer, setTimer };
};
