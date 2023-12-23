import { atom } from "recoil";

export const postHeaderState = atom<string>({
    key: "postHeaderState",
    default: "",
})