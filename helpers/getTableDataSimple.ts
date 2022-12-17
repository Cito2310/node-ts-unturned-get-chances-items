import fs from 'fs';
import { navigateFolder } from './navigateFolder';

export const getTableDataSimple = ( path: string ) => {
    const folderNames = fs.readdirSync(path)

    return navigateFolder(path)
        .flat(99)
        .map( tableRoute => fs.readFileSync(tableRoute, {encoding: "utf-8"}))
        .map((tableDataRow, index) => {
            // get id table spawn
            const idTableSpawn = <number>Number(tableDataRow.match(/(?<!GU)ID [0-9]+/g)?.[0].slice(3));
         
            // get folder name
            const folderNameTableSpawn = folderNames[index]

            return {
                id: idTableSpawn,
                name: folderNameTableSpawn
            } 
        })
}