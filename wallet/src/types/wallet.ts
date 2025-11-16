export interface Player {
    id: string;
    username: string;
    created_at: Date;
  }
  
  export interface Wallet {
    id: string;
    player_id: string;
    balance: number;
    created_at: Date;
    updated_at: Date;
  }
  
  export interface Session {
    id: string;
    player_id: string;
    created_at: Date;
  }
  
  export interface Transaction {
    id: string;
    player_id: string;
    session_id: string;
    type: 'DEPOSIT' | 'WITHDRAW';
    amount: number;
    balance_before: number;
    balance_after: number;
    created_at: Date;
  }