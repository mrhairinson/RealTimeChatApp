import { create } from "zustand";
import type { tTheme } from "../constants";

interface IThemeState {
  theme: string; 
  setTheme: (theme:tTheme) => void;
}

export const useTheme = create<IThemeState>()((set) => ({
  theme: localStorage.getItem("$appTheme") || "retro",
  setTheme: (theme:tTheme) => {
    localStorage.setItem("$appTheme", theme);
    set({ theme });
  },
}));