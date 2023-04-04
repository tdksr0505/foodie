export type TRestaurantDetail = {
  _id: string;
  name: string;
  simpleAddress: string;
  address: string;
  tel: string;
  type: string;
  mrt: string[];
  isVisited: boolean;
  isReturnVisited: boolean | null;
  rate: string;
  canReserve: boolean;
};

export type TOption = {
  value: any;
  label: string;
};

export type TRestaurantFormData = {
  name: string | null;
  simpleAddress: string | null;
  address: string | null;
  tel: string | null;
  type: string | null;
  mrt: string[];
  isVisited: string;
  isReturnVisited: string | null;
  rate: string | null;
  canReserve: string;
};

export type TChildren = {
  children: React.ReactElement;
};
