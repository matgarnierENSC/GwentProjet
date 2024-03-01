import { createContext, useContext, useState } from "react";

const GameContext = createContext({ enPartie: false, setEnPartie: () => {} });

export function GameProvider({ children }) {
  const [enPartie, setEnPartie] = useState(false);
  return (
    <GameContext.Provider value={{ enPartie, setEnPartie }}>{children}</GameContext.Provider>
  );
}

export function useGameContext() {
  return useContext(GameContext);
}
