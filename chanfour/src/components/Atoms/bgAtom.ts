import { atom } from "recoil";

export const bgState = atom<string>({
    key: "bgState",
    default: "",
})