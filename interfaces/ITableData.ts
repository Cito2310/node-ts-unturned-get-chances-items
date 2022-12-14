export interface ITableData {
    id: number,
    children: IChild[] | [],
    name: string
}

export interface ITableDataWithWeight {
    id: number,
    children: IChild[] | [],
    name: string,
    weight: number,
    type: "Spawn",
}

export interface IChild {
    id: number,
    type: "Asset" | "Spawn",
    weight: number,
}
