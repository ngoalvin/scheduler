import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    if(!replace) {
      setMode(newMode)
      setHistory([...history, newMode])
    } else {
      const newHistory = [...history]
      newHistory.pop()
      newHistory.push(newMode)
      setMode(newMode)
      setHistory(newHistory)
    }
  }

  const back = () => {
    if (history.length) {
      const newHistory = [...history];
      newHistory.pop();
      setHistory(newHistory);
      setMode(newHistory[newHistory.length - 1])
    }
  }

  return { mode, transition, back };
}