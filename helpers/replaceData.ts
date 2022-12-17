import { IItemData, IItemDataWithWeight } from '../interfaces/IItemData';
import { ITableData, ITableDataWithWeight } from '../interfaces/ITableData';

export const replaceData = ( itemsData: IItemData[], tablesData: ITableData[] ) => (
    tablesData.map(( tableData => {
            const children = tableData.children.map( child => {
                if (child.type === "Spawn") {
                    let childTable = {...(tablesData.find( item => child.id === item.id ))} as ITableDataWithWeight
                    // @ts-ignore
                    childTable?.weight = child.weight;
                    // @ts-ignore
                    return childTable
                    
                } else {
                    let childItem = {...(itemsData.find( item => child.id === item.id ))} as IItemDataWithWeight
                    // @ts-ignore
                    childItem?.weight = child?.weight;
                    return childItem
                } 
            });
            // @ts-ignore
            tableData.children = children;
            return tableData
        })
    )
)