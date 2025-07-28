import { atom } from "jotai";

export type ModalTypes = "register";

export const openedModalAtom = atom<ModalTypes | null>(null);

export const tokenAtom = atom<string | null>(null);
