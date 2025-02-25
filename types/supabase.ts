export interface Database {
    public: {
      Tables: {
        users: {
          Row: {
            id: string;
            email: string;
            full_name: string;
            phone: string | null;
            address: string | null;
            created_at: string;
            updated_at: string;
          };
          Insert: {
            id: string;
            email: string;
            full_name: string;
            phone?: string | null;
            address?: string | null;
          };
          Update: {
            email?: string;
            full_name?: string;
            phone?: string | null;
            address?: string | null;
          };
        };
        orders: {
          Row: {
            id: string;
            user_id: string;
            items: any;
            total_price: number;
            status: string;
            payment_method: string;
            sender_account: string;
            address: string;
            created_at: string;
            updated_at: string;
          };
          Insert: {
            user_id: string;
            items: any;
            total_price: number;
            status: string;
            payment_method: string;
            sender_account: string;
            address: string;
          };
          Update: {
            status?: string;
            payment_method?: string;
            sender_account?: string;
            address?: string;
          };
        };
      };
    };
  }