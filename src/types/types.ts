export interface Transaction {
  _id: string;
  product: {
    _id: string;
    name: string;
    category: string;
    price: number;
  };
  meta: { units: number; priceAtTxn: number };

  amount: number;
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
  wallet: { balance: number };
  watchlist?: string[];
  role: "USER" | "ADMIN";
  kyc: {
    pan: { panNumber: string; status: string };
    aadhaar?: { aadhaarNumber: string };
  };
  createdAt: string;
}
