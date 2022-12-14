import fs from 'fs';
import { navigateFolder } from './navigateFolder';

export const getTableData = ( path: string ) => {
    const folderNames = fs.readdirSync(path)

    return navigateFolder(path)
        .flat(99)
        .map( tableRoute => fs.readFileSync(tableRoute, {encoding: "utf-8"}))
        .map((tableDataRow, index) => {
            // get id table spawn
            const idTableSpawn = <number>Number(tableDataRow.match(/(?<!GU)ID [0-9]+/g)?.[0].slice(3));
            
            // get id children table spawn
            const idChildrenTableSpawn: string[] = (tableDataRow.match(/(?<!GU)ID [0-9]+/g)|| []).splice(1)
                .map( idChild => idChild.slice(3));

            // get weight children table spawn
            const weightChildrenTableSpawn = tableDataRow.match(/Weight [0-9]+/g)
                ?.map( typeChild => Number(typeChild.slice(7)))

            // get type children table spawn
            const typeChildrenTableSpawn = tableDataRow.match(/_Spawn|_Asset/g)
                ?.map( typeChild => typeChild.slice(1))

            // get folder name
            const folderNameTableSpawn = folderNames[index]

            // get children data
            const childrenTableSpawn = idChildrenTableSpawn.map( ( idChildren, index ) => {return {
                id: Number(idChildren),
                type: <"Asset"|"Spawn">typeChildrenTableSpawn?.[index],
                weight: <number>weightChildrenTableSpawn?.[index]
            }})

            return {
                id: idTableSpawn,
                children: childrenTableSpawn,
                name: folderNameTableSpawn
            } 
        })
}