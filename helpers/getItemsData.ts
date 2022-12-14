import fs from "fs";
import { navigateFolder } from './navigateFolder';

export const getItemsData = ( basepath: string ) => {
    const folderNames = fs.readdirSync(basepath)

    return navigateFolder(basepath)
        .flat()
        .map(( itemsRoutesArray: string[] ): string[] => {
            const folderNameItem = folderNames.filter( folderName => itemsRoutesArray[0].includes(folderName));

            return [
                itemsRoutesArray.map((itemRoute : string) => 
                    fs.readFileSync(itemRoute, { encoding: "utf-8" })
                ), folderNameItem
            ].flat()
        })
        .map((dataRawItem : string[]) => {
            // get rarity
            let rarityItem: RegExpMatchArray | string | null = dataRawItem[1].match(/Rarity [a-zA-Z]+/g)
            if (rarityItem) {rarityItem = rarityItem[0].slice(7)}
            else {rarityItem = "-"}
        
            // get name
            let nameItem = dataRawItem[0].slice(5).match(/[a-zA-Z" "0-9\.\/\-]+/)?.["0"];
            if (!nameItem) {nameItem = "-"};
            
            // // get id
            const idItem = Number(dataRawItem[1].match(/(?<!GU)ID [0-9]+/)?.["0"].slice(3));
            
            // // get type
            let typeItem  = dataRawItem[1].match(/\nType [a-zA-Z]+/)?.["0"].slice(6);
            if (!typeItem) {typeItem = "-"}
        
            // // get folder name item
            let folderNameItem  = dataRawItem[2]
            
            return {
                name: nameItem,
                id: idItem,
                type: typeItem,
                folder: folderNameItem,
                rarity: rarityItem,
            }
        })
}