import { atom } from "jotai";

export type ModalTypes = "register";

export const openedModal = atom<ModalTypes | null>(null);
