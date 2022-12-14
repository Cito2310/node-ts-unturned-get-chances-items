import { IItemData, IItemDataWithWeight } from '../interfaces/IItemData';
import { ITableData, ITableDataWithWeight } from '../interfaces/ITableData';

export const replaceData = ( itemsData: IItemData[], tablesData: ITableData[] ) => {
    return tablesData.map( tableData => {
        const children = tableData.children.map( child => {
            if (child.type === "Spawn") {
                let childTable = tablesData.find( table => child.id === table.id && child.type === "Spawn") as ITableDataWithWeight
                childTable.weight = child.weight;
                childTable.type = child.type;
                return childTable
                
            } else {
                let childItem = itemsData.find( table => child.id === table.id && child.type === "Asset") as IItemDataWithWeight
                // @ts-ignore
                childItem?.weight = child?.weight;
                return childItem
            } 
        })
        // @ts-ignore
        tableData.children = children
        return tableData
    })
}