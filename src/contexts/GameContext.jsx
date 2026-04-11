import { createContext, useContext } from "react";

const GameContext = createContext({ enPartie: false });

export function GameProvider({ children }) {
  return <GameContext.Provider value={{ enPartie: false }}>{children}</GameContext.Provider>;
}

export function useGameContext() {
  return useContext(GameContext);
}
