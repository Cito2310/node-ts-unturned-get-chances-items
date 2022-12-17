import { mainMenu, AllItemsMenu, ItemsWithIdMenu, AllTablesMenu, pause, AllTablesWithItemsMenu } from './helpers/menus';
import prompts from 'prompts';
import fs from 'fs';
import { getTableItemsWithID } from './helpers/getTableItemsWithID';

const tablesPath = "./assets/Spawns";
const itemsPath = "./assets/Items";

const main = async() => {
    console.clear()

    let opt = 9;

    do {
        // console.clear()
        opt = await mainMenu()

        try {
            switch (opt) {
                case 1: 
                    try {
                        const {id}: {id: number} = await prompts({
                            type: "text",
                            message: "Introducir el ID de la tabla",
                            name: "id",
                            validate: (id: string) => Number.isInteger(Number(id))
                            
                        });
                        fs.writeFileSync(`./out/items-${id}.json` ,JSON.stringify((getTableItemsWithID(itemsPath, tablesPath, id))));
                        
                    } catch (error) { console.log(error);await pause() }

                    break;
                
                case 2: AllTablesMenu(tablesPath); break;
    
                case 3: AllItemsMenu(itemsPath); break;

                case 4: AllTablesWithItemsMenu(itemsPath, tablesPath); break;
            
                default: break;
            }
        } catch (error) {}

    } while (opt != 0);
}
main()