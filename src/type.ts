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
  isVisited: boolean;
  canReserve: boolean;
  isReturnVisited: boolean | null;
  rate: string | null;
};

export type TChildren = {
  children: React.ReactElement;
};

export type TFilter = {
  keyword: string;
  type: string[];
  mrt: string[];
  isVisited: boolean | null;
};
