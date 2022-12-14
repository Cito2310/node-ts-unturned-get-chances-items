import { getItemsData } from './getItemsData';
import { getTableData } from './getTableData';
import { replaceData } from './replaceData';

export const getTableItemsWithID = (
    pathItems: string,
    pathTable: string,
    id: number, 
    dataTable: any[], 
    parentWeight = 100
    ) => {
    const itemsData = getItemsData(pathItems)
    const tableData = getTableData(pathTable)
    const replaceItemsTable = replaceData(itemsData, tableData)


    const itemsArray = dataTable.find( item => item.id == id) as any;
    let resultArr: any = [];

    const sumWeight = itemsArray.children.reduce(( valueOld: number, current: any ) => valueOld + current.weight ,0 )

    itemsArray.children.forEach((item : any) => {
        const weightPercentaje = ((item.weight*100/sumWeight)/100*parentWeight/100)*100

        if (item.children) { resultArr.push(getTableItemsWithID(pathItems, pathTable, item.id, replaceItemsTable, weightPercentaje)) }
        if (item.folder) {
            item.chances = weightPercentaje;
            resultArr.push( item )
        }
    })

    return resultArr;
}