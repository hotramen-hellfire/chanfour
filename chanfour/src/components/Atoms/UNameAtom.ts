import { atom } from "recoil";
export interface UNameState {
    UName: string,
    isValid: boolean;
}

const defaultUNameState: UNameState = {
    UName: '',
    isValid: false,
}

export const UNameState = atom<UNameState>({
    key: "UNameState",
    default: defaultUNameState,
})