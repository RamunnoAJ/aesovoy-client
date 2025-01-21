export interface Order {
  id: number;
  createdAt: string;
  clientId: number;
  clientName: string;
  clientCuit: string;
  clientEmail: string;
  state: string;
  total: number;
}
