export type TOption = {
  value: any;
  label: string;
};

export type TRestaurantData = {
  _id?: string;
  name: string | null;
  simpleAddress: string | null;
  address: string | null;
  tel: string | null;
  type: string | null;
  mrt: string[];
  isVisited: string | boolean | null;
  isReturnVisited: string | boolean | null;
  rate: string | null;
  canReserve: string | boolean;
};

export type TChildren = {
  children: React.ReactElement;
};
