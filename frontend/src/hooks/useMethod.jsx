import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { methods } from "../helpers/contants";

const call = (set, get) => ({
  method: methods[0],
  change: (index) => set(() => ({ method: methods[index] })),
});
const config = {};
config.name = "method";
config.storage = createJSONStorage(() => sessionStorage);
const useMethod = create(persist(call, config));
export default useMethod;
