export const getItemsWithID = ( id: number, dataTable: any[], parentWeight = 100) => {
    const itemsArray = dataTable.find( item => item.id == id) as any;
    let resultArr: any = [];

    const sumWeight = itemsArray.children.reduce(( valueOld: number, current: any ) => valueOld + current.weight ,0 )

    itemsArray.children.forEach((item : any) => {
        const weightPercentaje = ((item.weight*100/sumWeight)/100*parentWeight/100)*100

        if (item.children) { resultArr.push(getItemsWithID(item.id, dataTable, weightPercentaje)) }
        if (item.folder) {
            item.chances = weightPercentaje;
            resultArr.push( item )
        }
    })

    return resultArr;
}