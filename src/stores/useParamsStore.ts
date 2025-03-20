import { create } from "zustand";

interface ParamsStore {
  params: string;
  setParams: (value: string) => void;
}

const useParamsStore = create<ParamsStore>(set => ({
  params: "",
  setParams: params => set({ params }),
}));

export const useParams = () => useParamsStore(state => state.params);

export const useParamsAction = () => useParamsStore(state => state.setParams);

// export default useParamsStore;
