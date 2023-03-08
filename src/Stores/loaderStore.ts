import { create } from "zustand";

interface ILoader {
  isLoading: boolean;
  setIsLoading: (val: boolean) => void;
}

export const useHeaderLoaderStore = create<ILoader>((set) => ({
  isLoading: true,
  setIsLoading: (val: boolean) => set((state) => ({ isLoading: val })),
}));
