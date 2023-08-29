import { IFurnitureDB } from "../inventories";

export interface ICartShopItem {
  furniter: IFurnitureDB;
  amount: number;
}
