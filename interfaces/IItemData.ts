export interface IItemData {
    name: string;
    id: number;
    type: string;
    folder: string;
    rarity: string;
}

export interface IItemDataWithWeight {
    name: string;
    id: number;
    type: string;
    folder: string;
    rarity: string;
    weight: number
}