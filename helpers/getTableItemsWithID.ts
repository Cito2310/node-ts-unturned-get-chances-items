import { getItemsData } from './getItemsData';
import { getTableData } from './getTableData';
import { replaceData } from './replaceData';

export const getTableItemsWithID = (
    pathItems: string,
    pathTable: string,
    id: number, 
    parentWeight = 100
) => {
    const itemsData = getItemsData(pathItems)
    const tableData = getTableData(pathTable)

    const replaceItemsTable = replaceData(itemsData, tableData)

    // console.log(replaceItemsTable)

    const getItems = ( id: number, parentWeight = 100) => {
        // @ts-ignore
        const itemsArray = replaceItemsTable.find( item => item.id == id) as any;
        let resultArr: any = [];
    
        const sumWeight = itemsArray.children.reduce(( valueOld: number, current: any ) => valueOld + current.weight ,0 )
    
        itemsArray.children.forEach((item : any) => {
            const weightPercentaje = ((item.weight*100/sumWeight)/100*parentWeight/100)*100
    
            if (item.children) { resultArr.push(getItems(item.id, weightPercentaje)) }
            if (item.folder) {
                item.chances = weightPercentaje;
                resultArr.push( item )
            }
        })
        return resultArr;
    }
    return getItems(id).flat(99)
}