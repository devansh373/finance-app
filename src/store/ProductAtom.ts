import { atom } from "jotai";

export interface Product {
  symbol: string;
  description?: string;
  type:string;
}

export const selectedProductAtom = atom<Product | null>(null);
