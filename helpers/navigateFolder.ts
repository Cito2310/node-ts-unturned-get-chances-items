import fs from "fs";
import path from "path";

export const navigateFolder = ( routePath: string ): Array<any> => {
    let files: any = [];
    const folderRoute = fs.readdirSync( routePath ).map( route => path.join(routePath, route) );
    
    folderRoute.forEach( route => {
        if (/\.[a-z]+$/.test(route)) { files.push( route ) }
        else { files.push( navigateFolder(route) ) }
    });

    return files;
}