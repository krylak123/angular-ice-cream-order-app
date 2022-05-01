export interface UserState {
  uid: string | undefined;
  role: string | undefined;
  name: string | undefined;
  surname: string | undefined;
  email: string | undefined;
  phone: string | undefined;
  favoriteIceCream?: string[] | undefined;
  currentOrder?: Order | undefined;
  prevOrder?: Order | undefined;
}

export interface Order {
  date: Date;
  order: OrderDetails[];
}

export interface OrderDetails {
  name: string;
  count: string;
}
