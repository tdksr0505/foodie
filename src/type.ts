export type TRestaurantDetail = {
  _id: string;
  name: string;
  simpleAddress: string;
  address: string;
  tel: string;
  type: string;
  mrt: Array<string>;
  isVisited: boolean;
  isReturnVisited: boolean;
  rate: string;
  canReserve: boolean;
};

export type TOption = {
  value: any;
  label: string;
};
