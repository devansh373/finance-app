export interface Transaction {
  _id: string;
  productId: {
    _id: string;
    name: string;
    category: string;
    price: number;
  };
  units: number;
  priceAtTxn: number;
  totalAmount: number;
  type: string;
  createdAt: string;
  userId?: User;
  status: string;
}

export interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
}

export interface PortfolioData {
  invested: number;
  currentValue: number;
  returns: number;
  transactions: Transaction[];
}
export interface User {
  _id: string;
  name: string;
  email: string;
  wallet: number;
  watchlist?: string[];
  role: "USER" | "ADMIN";
  kyc: {
    pan: { panNumber: string,status:string };
    aadhaar?: { aadhaarNumber: string };
  };
  createdAt: string;
}
