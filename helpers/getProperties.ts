import fs from "fs";
import { navigateFolder } from './navigateFolder';

export const getProperties = ( basepath: string ) => {
    let properties: string[] = [];

    navigateFolder(basepath)
        .flat()
        .map(( itemsRoutes: string[] ) => itemsRoutes[1]) 
        .map(( itemRoute: string) => fs.readFileSync(itemRoute, {encoding: "utf-8"}) )
        .forEach(( itemRawData: string) => {
            itemRawData
                .match(/\n[A-Z][a-zA-Z\_0-9]+/g)
                ?.forEach( property => {
                    property = property.slice(1)
                    if (properties.includes(property)) return;
                    properties.push( property )
                })
        })

    return properties
}   