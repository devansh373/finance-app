import { atom } from "jotai";

export interface User {
  id: string;
  name: string;
  email: string;
  wallet: number;
  role: "USER" | "ADMIN";
  kycCompleted: boolean;
}

export const userAtom = atom<User | null>(null);
