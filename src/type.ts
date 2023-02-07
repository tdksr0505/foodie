export type TRestaurantDetail = {
  _id: string;
  name: string;
  simpleAddress: string;
  address: string;
  tel: string;
  type: string;
  mrt: Array<string>;
  isVisited: boolean;
  isReturnVisted: boolean;
  rate: string;
  canReserve: boolean;
};
